import http from 'node:http';
import net from 'node:net';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {resolve,join,basename,sep} from 'node:path';
import {homedir} from 'node:os';
import {pathToFileURL} from 'node:url';
import {FreeCADBridge} from './engine/freecad-bridge.js';

const moduleNames=['document','primitives','operations','sketcher','part-design','import-export','draft','mesh','techdraw','advanced-operations','spreadsheet','bim','fem','surface','assembly'];
export async function loadTools(){
  const tools=[],handlers=new Map();
  for(const name of moduleNames){
    const module=await import(`./engine/tools/${name}.js`);
    const definitions=Object.values(module).find(Array.isArray);
    const handler=Object.entries(module).find(([k,v])=>k.startsWith('handle')&&typeof v==='function')?.[1];
    if(!definitions||!handler)throw Error('Invalid engine module '+name);
    for(const tool of definitions){tools.push({...tool,group:name});handlers.set(tool.name,handler);}
  }
  return {tools,handlers};
}
export function validate(value,schema,path='arguments'){
  if(value===undefined)return;
  if(schema.type==='object'){
    if(!value||typeof value!=='object'||Array.isArray(value))throw Error(path+' must be an object');
    for(const k of schema.required||[])if(value[k]===undefined)throw Error(path+'.'+k+' is required');
    for(const [k,v] of Object.entries(value)){
      if(!Object.hasOwn(schema.properties||{},k))throw Error('Unknown field '+path+'.'+k);
      validate(v,schema.properties[k],path+'.'+k);
    }
  }else if(schema.type==='array'){
    if(!Array.isArray(value)||value.length>10000)throw Error(path+' must be an array (max 10000)');
    value.forEach((v,i)=>validate(v,schema.items||{},path+'['+i+']'));
  }else if(schema.type==='number'||schema.type==='integer'){
    if(typeof value!=='number'||!Number.isFinite(value)||(schema.type==='integer'&&!Number.isInteger(value)))throw Error(path+' must be a finite '+schema.type);
  }else if(schema.type==='boolean'&&typeof value!=='boolean')throw Error(path+' must be boolean');
  else if(schema.type==='string'&&(typeof value!=='string'||value.length>500000))throw Error(path+' must be a string');
  if(schema.enum&&!schema.enum.includes(value))throw Error(path+' is not an allowed value');
}
const sceneCode=`
import FreeCAD as App, Part, math
d=App.ActiveDocument
result={'documents':list(App.listDocuments()),'document':d.Name if d else None,'objects':[],'meshes':[],'wires':[]}
budget=0
if d:
    for o in d.Objects:
        props={}
        for key in o.PropertiesList:
            try:
                t=o.getTypeIdOfProperty(key)
                if t in ('App::PropertyLength','App::PropertyDistance','App::PropertyAngle','App::PropertyFloat','App::PropertyInteger','App::PropertyBool','App::PropertyString','App::PropertyEnumeration'):
                    v=getattr(o,key)
                    if hasattr(v,'Value'): v=v.Value
                    if not isinstance(v,(str,int,float,bool)): v=str(v)
                    if isinstance(v,float) and not math.isfinite(v): continue
                    props[key]={'value':v,'type':t,'readOnly':bool(o.getEditorMode(key))}
            except: pass
        visible=bool(o.ViewObject.Visibility) if App.GuiUp else True
        parents=[p.Name for p in o.InList if p.TypeId in ('PartDesign::Body','App::Part')]
        item={'name':o.Name,'label':o.Label,'type':o.TypeId,'visible':visible,'parents':parents,'state':list(o.State),'properties':props}
        if hasattr(o,'FullyConstrained'): item['fullyConstrained']=bool(o.FullyConstrained)
        if hasattr(o,'Shape') and not o.Shape.isNull():
            sh=o.Shape
            item.update({'faces':len(sh.Faces),'edges':len(sh.Edges),'valid':sh.isValid(),'solids':len(sh.Solids),'volume':sh.Volume,'bounds':[sh.BoundBox.XLength,sh.BoundBox.YLength,sh.BoundBox.ZLength]})
            # Body shape duplicates its Tip; draw the Body once. Hidden features
            # and sketch support geometry remain in the tree, not the mesh.
            parent_hidden=any(not p.ViewObject.Visibility for p in o.InList if p.TypeId in ('PartDesign::Body','App::Part')) if App.GuiUp else False
            inside_body=any(p.TypeId=='PartDesign::Body' for p in o.InList)
            if visible and not parent_hidden and not inside_body and sh.Faces and budget<400000:
                vertices=[];triangles=[];face_ids=[]
                for face_id,face in enumerate(sh.Faces,1):
                    vv,tt=face.tessellate(max(.02,sh.BoundBox.DiagonalLength/1500))
                    if budget+len(vv)>400000:break
                    offset=len(vertices)//3
                    vertices.extend([c for p in vv for c in (p.x,p.y,p.z)])
                    triangles.extend([offset+c for tri in tt for c in tri]);face_ids.extend([face_id]*len(tt));budget+=len(vv)
                result['meshes'].append({'object':o.Name,'vertices':vertices,'triangles':triangles,'faceIds':face_ids})
        result['objects'].append(item)
        if visible and o.TypeId=='Sketcher::SketchObject' and hasattr(o,'Shape'):
            for edge in o.Shape.Edges[:1000]:
                points=edge.discretize(Deflection=.02)
                result['wires'].append([[p.x,p.y,p.z] for p in points])
_mcp_result['result']=result
`;
function equalSecret(a,b){const x=Buffer.from(a||''),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);}
async function socketAvailable(){return new Promise(ok=>{const s=net.connect(12345,'127.0.0.1');s.setTimeout(800);s.once('connect',()=>{s.end();ok(true);});s.once('error',()=>ok(false));s.once('timeout',()=>{s.destroy();ok(false);});});}
export async function startBridge(options={}){
  const port=options.port??Number(process.env.FREESCAN_PORT||8766);
  const publicSite='https://dimension-ocr-numbers.youngloach8.chatgpt.site';
  const origins=new Set([publicSite,'http://127.0.0.1:5173','http://localhost:5173',...(options.origins||[])]);
  const token=options.token||randomBytes(32).toString('hex');
  const folder=resolve(options.folder||join(homedir(),'FreeScanDrawing','local-files'));
  await mkdir(folder,{recursive:true});
  const {tools,handlers}=await loadTools();const byName=new Map(tools.map(t=>[t.name,t]));
  const engine=options.engine||new FreeCADBridge(process.env.FREECAD_CMD);
  // GUI-only: never silently run another headless document when the GUI exits.
  engine.execute=async code=>{
    // Upstream tools return FreeCAD Quantity values (e.g. Pad.Length).
    // Normalize before the GUI macro serializes its response.
    const normalized=code+`\nimport json as _freescan_json\n_mcp_result = _freescan_json.loads(_freescan_json.dumps(_mcp_result, default=lambda v: v.Value if hasattr(v, 'Value') else str(v)))\n`;
    const result=await engine.executeSocket(normalized);
    if(!result.success&&result.error?.includes('Socket error'))result.error='Open FreeCAD and run FreeCAD-Web.FCMacro first. '+result.error;
    return result;
  };
  let tail=Promise.resolve();const once=new Map();
  const queue=fn=>{const p=tail.then(fn);tail=p.catch(()=>{});return p;};
  async function python(code){const r=await engine.execute(code);if(!r.success)throw Error(r.error||'FreeCAD failed');return r.result;}
  async function body(req){let bytes=0;const parts=[];for await(const chunk of req){bytes+=chunk.length;if(bytes>32*1024*1024)throw Error('Request too large');parts.push(chunk);}return JSON.parse(Buffer.concat(parts).toString()||'{}');}
  const server=http.createServer(async(req,res)=>{
    res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
    const origin=req.headers.origin;
    const host=req.headers.host;
    if(!host||!['127.0.0.1','localhost'].some(h=>host===`${h}:${server.address()?.port}`)){res.writeHead(403);res.end('Invalid host');return;}
    if(origin&&!origins.has(origin)&&origin!==`http://${host}`){res.writeHead(403);res.end('Origin not allowed');return;}
    if(origin){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');}
    if(req.method==='OPTIONS'){
      res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers','Content-Type, X-FreeScan-Key, X-Request-Id');
      res.setHeader('Access-Control-Allow-Private-Network','true');res.writeHead(204);res.end();return;
    }
    const url=new URL(req.url,`http://${host}`);
    if(req.method==='GET'&&url.pathname==='/pair'){
      // Pairing secrets are visible only to a top-level local page / same origin.
      // An allowed CAD site may call authenticated APIs, never read this key.
      if(origin&&origin!==`http://${host}`){res.writeHead(403);res.end('Open the local pairing page directly.');return;}
      res.removeHeader('Access-Control-Allow-Origin');
      res.setHeader('Content-Type','text/html; charset=utf-8');
      res.setHeader('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'");
      res.setHeader('Referrer-Policy','no-referrer');
      const fragment=new URLSearchParams({freecadBridge:`http://127.0.0.1:${server.address().port}`,freecadKey:token}).toString();
      res.end(`<!doctype html><meta charset="utf-8"><title>Connect FreeCAD</title><style>body{font:16px system-ui;max-width:640px;margin:10vh auto;padding:28px;background:#f3f5f8;color:#182438}a{display:inline-block;background:#2158d8;color:white;padding:14px 22px;border-radius:8px;text-decoration:none}code{user-select:all;overflow-wrap:anywhere}p{line-height:1.6}</style><h1>FreeCAD on this computer</h1><p>Open FreeCAD and run <b>FreeCAD-Web.FCMacro</b>, then connect. The website can run all 165 MCP tools, including Python, with your Windows account's permissions. Only pair a website you trust.</p><a href="${publicSite}/cad.html#${fragment}">Connect FreeScan website</a><p>The pairing key stays in this browser tab's memory. Restarting the bridge revokes it.</p><details><summary>Manual connection / local preview</summary><p>Address: http://127.0.0.1:${server.address().port}</p><p>Key: <code>${token}</code></p></details>`);return;
    }
    res.setHeader('Content-Type','application/json');
    if(req.method!=='POST'){res.writeHead(405);res.end(JSON.stringify({error:'Use POST'}));return;}
    if(!equalSecret(req.headers['x-freescan-key'],token)){res.writeHead(401);res.end(JSON.stringify({error:'Pair this browser tab with the local bridge.'}));return;}
    try{
      const input=await body(req);let result;
      if(url.pathname==='/connect'){
        const check=await queue(()=>engine.execute("_mcp_result['result'] = {'ready': True}"));
        result={name:'FreeScan local FreeCAD',tools:tools.length,folder,guiReady:check.success===true,pythonAccess:true};
      }
      else if(url.pathname==='/tools')result={tools};
      else if(url.pathname==='/validate'){
        if(!Array.isArray(input.commands)||!input.commands.length||input.commands.length>128)throw Error('Provide 1–128 commands.');
        for(const cmd of input.commands){const tool=byName.get(cmd.tool);if(!tool||tool.name==='freecad_execute_python')throw Error('Unsupported batch tool');validate(cmd.args||{},tool.inputSchema);}
        result={valid:true,count:input.commands.length};
      }
      else if(url.pathname==='/state')result=await queue(()=>python(sceneCode));
      else if(url.pathname==='/call'){
        const tool=byName.get(input.name);if(!tool)throw Error('Unknown MCP tool');
        validate(input.arguments||{},tool.inputSchema);
        if(tool.name==='freecad_execute_python'&&input.allowPython!==true)throw Error('Enable Python for this individual command.');
        const id=req.headers['x-request-id'];if(!id||typeof id!=='string'||id.length>100)throw Error('A unique request ID is required');
        if(!once.has(id)){
          if(once.size>500)throw Error('Command history full; restart the bridge to start a new session.');
          once.set(id,queue(()=>handlers.get(tool.name)(tool.name,input.arguments||{},engine)));
        }
        result=await once.get(id);
      }else if(url.pathname==='/property'){
        if(typeof input.object!=='string'||typeof input.property!=='string'||!['string','number','boolean'].includes(typeof input.value))throw Error('Invalid property value');
        const arg=JSON.stringify({object:input.object,property:input.property,value:input.value});
        result=await queue(()=>python(`
import FreeCAD as App, json
a=json.loads(${JSON.stringify(arg)})
d=App.ActiveDocument
o=d.getObject(a['object']) if d else None
allowed=('App::PropertyLength','App::PropertyDistance','App::PropertyAngle','App::PropertyFloat','App::PropertyInteger','App::PropertyBool','App::PropertyString','App::PropertyEnumeration')
if not o or a['property'] not in o.PropertiesList or o.getTypeIdOfProperty(a['property']) not in allowed: raise ValueError('Property cannot be edited here')
if o.getEditorMode(a['property']): raise ValueError('Read-only property')
d.openTransaction('Website: edit '+a['property'])
try:
    setattr(o,a['property'],a['value']);d.recompute()
    if 'Invalid' in o.State:raise ValueError('Feature became invalid')
    d.commitTransaction()
except:
    d.abortTransaction();raise
_mcp_result['result']={'updated':o.Name,'property':a['property']}
`));
      }else if(url.pathname==='/upload'){
        if(typeof input.name!=='string'||typeof input.data!=='string')throw Error('Invalid upload');
        const name=basename(input.name).replace(/[^\p{L}\p{N}._ -]/gu,'_');
        if(!name||name==='.'||name==='..')throw Error('Invalid filename');
        const file=join(folder,randomBytes(4).toString('hex')+'-'+name);
        await writeFile(file,Buffer.from(input.data,'base64'));result={filePath:file};
      }else if(url.pathname==='/download'){
        if(typeof input.filePath!=='string')throw Error('File path required');
        const file=resolve(input.filePath);
        if(!file.startsWith(folder+sep))throw Error('Downloads are limited to the bridge local-files folder.');
        if((await stat(file)).size>100*1024*1024)throw Error('File exceeds 100 MB');
        res.setHeader('Content-Type','application/octet-stream');res.end(await readFile(file));return;
      }else throw Error('Unknown route');
      res.end(JSON.stringify({ok:true,result}));
    }catch(e){res.writeHead(400);res.end(JSON.stringify({ok:false,error:e.message}));}
  });
  await new Promise((ok,no)=>{server.once('error',no);server.listen(port,'127.0.0.1',ok);});
  return {server,token,tools,folder,close:()=>new Promise(ok=>server.close(ok))};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const bridge=await startBridge();
  console.log(`FreeScan bridge: http://127.0.0.1:${bridge.server.address().port}/pair`);
  console.log(`${bridge.tools.length} FreeCAD Advanced MCP tools. Loopback only. No cloud storage. Ctrl+C to stop.`);
}
