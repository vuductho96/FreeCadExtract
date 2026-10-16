import {cp,mkdir,readFile,writeFile,stat} from 'node:fs/promises';import {dirname,resolve,join} from 'node:path';import {fileURLToPath} from 'node:url';import {files,zip} from './zip.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');process.chdir(root);
const config=JSON.parse((await readFile('cloudflare-site.json','utf8')).replace(/^\uFEFF/,''));
let origin=config.siteOrigin||'http://127.0.0.1:5174';const u=new URL(origin);if(!((u.protocol==='https:')||(u.protocol==='http:'&&['127.0.0.1','localhost'].includes(u.hostname)))||u.username||u.password||u.pathname!=='/'||u.search||u.hash)throw Error('cloudflare-site.json must contain one exact HTTPS origin.');origin=u.origin;
await mkdir('.cloudflare/public',{recursive:true});await cp('dist','.cloudflare/public',{recursive:true});
await zip('local-bridge','.cloudflare/public/downloads/FreeScan-FreeCAD-Bridge.zip',{'site-config.json':JSON.stringify({siteOrigin:origin},null,2)+'\n'});
const all=await files('.cloudflare/public');let largest=0;for(const p of all){const size=(await stat(p)).size;if(size>25*1024*1024)throw Error('Cloudflare asset exceeds 25 MiB: '+p);largest=Math.max(largest,size);}if(all.length>20000)throw Error('Cloudflare free asset count exceeded');
await writeFile('.cloudflare/build-report.json',JSON.stringify({assets:all.length,largestBytes:largest,siteOrigin:origin,bridgeCloudOriginConfigured:!!config.siteOrigin},null,2)+'\n');console.log(JSON.stringify({assets:all.length,largestBytes:largest,bridgeOrigin:origin}));
