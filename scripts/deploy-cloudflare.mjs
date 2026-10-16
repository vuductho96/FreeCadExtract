import {spawn} from 'node:child_process';import {readFile,writeFile} from 'node:fs/promises';
const npm=process.env.npm_execpath;if(!npm)throw Error('Run npm run deploy:cloudflare so the npm CLI path is available.');
function run(args,capture=false){return new Promise((ok,no)=>{const p=spawn(process.execPath,args,{stdio:capture?['inherit','pipe','inherit']:'inherit',env:{...process.env,WRANGLER_SEND_METRICS:'false'},windowsHide:true});let out='';if(capture)p.stdout.on('data',c=>{const text=c.toString();out+=text;process.stdout.write(text);});p.on('error',no);p.on('close',code=>code===0?ok(out):no(Error('Command failed with exit '+code)));});}
const deploy=()=>run([npm,'exec','--yes','--package=wrangler@4.86.0','--','wrangler','deploy'],true);
await run(['scripts/build-cloudflare.mjs']);const output=await deploy();const urls=output.match(/https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev/g)||[];const origin=urls.at(-1);
if(!origin)throw Error('Published, but no workers.dev URL detected. Set siteOrigin in cloudflare-site.json and run deployment again to configure the downloaded bridges.');
const config=JSON.parse((await readFile('cloudflare-site.json','utf8')).replace(/^\uFEFF/,''));if(config.siteOrigin!==origin){await writeFile('cloudflare-site.json',JSON.stringify({siteOrigin:origin},null,2)+'\n');await writeFile('local-bridge/site-config.json',JSON.stringify({siteOrigin:origin},null,2)+'\n');await run(['scripts/build-cloudflare.mjs']);await deploy();}
console.log('Ready: '+origin+' — bridge ZIP returns to this exact origin.');
