import {readFile} from 'node:fs/promises';
export async function getSite(){
 let origin=process.env.FREESCAN_SITE_ORIGIN;
 if(!origin){try{origin=JSON.parse(await readFile(new URL('./site-config.json',import.meta.url),'utf8')).siteOrigin;}catch(e){if(e.code!=='ENOENT')throw e;}}
 if(!origin)return 'http://127.0.0.1:5174';
 const u=new URL(origin);if(!((u.protocol==='https:')||(u.protocol==='http:'&&['127.0.0.1','localhost'].includes(u.hostname)))||u.username||u.password||u.pathname!=='/'||u.search||u.hash)throw Error('FREESCAN_SITE_ORIGIN must be one exact HTTPS origin or localhost origin.');return u.origin;
}
