import {readFileSync} from 'node:fs';import {spawnSync} from 'node:child_process';import {dirname} from 'node:path';import {fileURLToPath} from 'node:url';
process.chdir(dirname(fileURLToPath(import.meta.url)));
const commands=JSON.parse(readFileSync('package.json','utf8')).scripts.test.split(' && ');
for(const command of commands){const args=command.split(' ');if(args.shift()!=='node')throw Error('Unsupported test command: '+command);console.log('\n> '+command);const result=spawnSync(process.execPath,args,{stdio:'inherit',windowsHide:true});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);}
console.log('\nAll enabled standalone tests passed. Native checks skipped by their scripts are not certified.');
