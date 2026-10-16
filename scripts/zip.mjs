import {readdir,readFile,writeFile} from 'node:fs/promises';import {join,relative} from 'node:path';import {deflateRawSync} from 'node:zlib';
const table=Array.from({length:256},(_,i)=>{let c=i;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
const crc32=data=>{let c=0xffffffff;for(const b of data)c=table[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;};
export async function files(root){const out=[];async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){if(item.name==='node_modules'||item.name==='.git')continue;const p=join(dir,item.name);if(item.isDirectory())await walk(p);else if(item.isFile())out.push(p);}}await walk(root);return out;}
export async function zip(root,destination,extra={}){
 const entries=new Map();for(const p of await files(root))entries.set(relative(root,p).replaceAll('\\','/'),await readFile(p));for(const [name,data]of Object.entries(extra))entries.set(name,Buffer.from(data));
 const chunks=[],central=[];let offset=0;
 for(const [path,data]of entries){const name=Buffer.from(path),packed=deflateRawSync(data),crc=crc32(data),h=Buffer.alloc(30);h.writeUInt32LE(0x04034b50);h.writeUInt16LE(20,4);h.writeUInt16LE(0x800,6);h.writeUInt16LE(8,8);h.writeUInt16LE(33,12);h.writeUInt32LE(crc,14);h.writeUInt32LE(packed.length,18);h.writeUInt32LE(data.length,22);h.writeUInt16LE(name.length,26);chunks.push(h,name,packed);
 const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x800,8);c.writeUInt16LE(8,10);c.writeUInt16LE(33,14);c.writeUInt32LE(crc,16);c.writeUInt32LE(packed.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(name.length,28);c.writeUInt32LE(offset,42);central.push(c,name);offset+=h.length+name.length+packed.length;}
 const directory=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(entries.size,8);end.writeUInt16LE(entries.size,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);await writeFile(destination,Buffer.concat([...chunks,directory,end]));
}
