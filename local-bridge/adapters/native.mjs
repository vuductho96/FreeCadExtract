import {spawn} from 'node:child_process';
import net from 'node:net';
import {join} from 'node:path';
export function powershell(body,timeout=60000){return new Promise((resolve,reject)=>{
 const p=spawn('powershell.exe',['-NoProfile','-NonInteractive','-Sta','-Command','-'],{windowsHide:true,stdio:['pipe','pipe','pipe']});let out='',err='',ended=false;
 const timer=setTimeout(()=>{p.kill();reject(Error('SolidWorks timeout. Kiểm tra mô hình trong SolidWorks trước khi chạy lại; không tự thử lại.'));},timeout);
 p.on('error',e=>{clearTimeout(timer);reject(e);});p.stdout.on('data',c=>{out+=c;if(out.length>4e6)p.kill();});p.stderr.on('data',c=>{err+=c;if(err.length>20000)err=err.slice(-20000);});
 p.on('close',()=>{clearTimeout(timer);if(ended)return;ended=true;const marker=out.lastIndexOf('__CAD_RESULT__');if(marker<0){reject(Error(err.slice(-2000)||'Không nhận được kết quả COM.'));return;}try{const r=JSON.parse(out.slice(marker+14).trim());r.ok?resolve(r.result):reject(Error(r.error));}catch(e){reject(e);}});
 const source=`[Console]::OutputEncoding=[Text.UTF8Encoding]::new($false); $ErrorActionPreference='Stop'; try { $sw=[Runtime.InteropServices.Marshal]::GetActiveObject('SldWorks.Application'); ${body}; $packet=@{ok=$true;result=$result} } catch { $packet=@{ok=$false;error=$_.Exception.Message} }; Write-Output ('__CAD_RESULT__'+(ConvertTo-Json -InputObject $packet -Compress -Depth 12))`;
 p.stdin.end(source+'\n');
 });}
const encoded=s=>Buffer.from(s,'utf8').toString('base64');
export function solidworksAdapter(){return {
 async status(){try{const r=await powershell("$doc=$sw.ActiveDoc; $result=@{ready=$true;document=$(if($doc){$doc.GetTitle()}else{''});engine='solidworks'}",8000);return r;}catch(e){return {ready:false,engine:'solidworks',message:'Mở SolidWorks desktop đã có bản quyền. '+e.message};}},
 async run(code){return powershell(`$doc=$sw.ActiveDoc; $script=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${encoded(code)}')); $log=(& ([ScriptBlock]::Create($script)) | Out-String); $doc=$sw.ActiveDoc; if($null -eq $doc){throw 'Chưa có tài liệu SolidWorks đang mở.'}; $null=$doc.ForceRebuild3($false); $result=@{engine='solidworks';document=$doc.GetTitle();output=$log.Substring(0,[Math]::Min(20000,$log.Length))}`);},
 async export(format,path){if(!['step','stl','sldprt'].includes(format))throw Error('SolidWorks hỗ trợ STEP/STL/SLDPRT cho chi tiết.');return powershell(`$doc=$sw.ActiveDoc; if($null -eq $doc){throw 'Chưa mở tài liệu.'}; $bodies=$doc.GetBodies2(0,$false);if(-not $bodies){throw 'Bản đầu chỉ xuất Part có solid/surface body, chưa hỗ trợ Assembly/Drawing.'}; $path=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${encoded(path)}')); $doc.ClearSelection2($true); [int]$errors=0;[int]$warnings=0; $saved=$doc.Extension.SaveAs($path,0,3,$null,[ref]$errors,[ref]$warnings);if(-not $saved -or $errors -ne 0){throw ('SaveAs failed: '+$errors)}; $result=@{saved=$true;warnings=$warnings}`);}
 };}
export function sketchupAdapter(secret){
 const request=input=>new Promise((resolve,reject)=>{const s=net.connect({host:'127.0.0.1',port:12347});let raw='';s.setTimeout(60000);s.on('connect',()=>s.write(JSON.stringify({...input,key:secret})+'\n'));s.on('data',c=>{raw+=c;if(raw.length>20e6){s.destroy();reject(Error('SketchUp response quá lớn.'));}if(raw.includes('\n')){s.end();try{const r=JSON.parse(raw.split('\n')[0]);r.ok?resolve(r.result):reject(Error(r.error));}catch(e){reject(e);}}});s.on('error',e=>reject(Error('Mở SketchUp desktop và nạp FreeScan-Standalone-CAD.rb. '+e.message)));s.on('timeout',()=>{s.destroy();reject(Error('SketchUp timeout. Kiểm tra ứng dụng trước khi chạy lại.'));});});
 return {async status(){try{return await request({action:'status'});}catch(e){return {ready:false,engine:'sketchup',message:e.message};}},run:code=>request({action:'run',code}),scene:()=>request({action:'scene'}),export:(format,path)=>request({action:'export',format,path})};
}
