import {SAMPLE_PYTHON,CHATGPT_PROMPT,normalizePython} from './freecad-code-model.js';
export function mountCodeWorkspace({runCode,isConnected,connect,showModel}){
  const $=id=>document.getElementById(id);
  const tab=document.createElement('button');tab.id='view-cad-code';tab.textContent='CAD Code';document.querySelector('.stage-tabs').append(tab);
  const toolbar=document.createElement('button');toolbar.id='open-cad-code';toolbar.textContent='Dán code → 3D';toolbar.className='ai-toolbar-button';document.querySelector('.cad-toolbar').append(toolbar);
  const pane=document.createElement('section');pane.id='cad-code-pane';pane.hidden=true;
  pane.innerHTML=`<div class="code-title"><div><strong>Copy code → CAD 3D</strong><p>ChatGPT phân tích crop → copy Python → dán vào đây → chạy bằng FreeCAD trên máy bạn.</p></div><span id="code-connection">Chưa ghép nối</span></div><div class="code-actions"><button id="code-connect">Kết nối FreeCAD</button><button id="code-example">Nạp mẫu Sketch + Pad + Pocket</button><button id="code-prompt">Copy prompt cho ChatGPT</button><button id="code-import">Mở .py</button><input id="code-file" type="file" accept=".py,.FCMacro,.txt" hidden><button id="code-download">Tải .py</button></div><label class="code-label" for="cad-python">Python FreeCAD <span id="code-lines">0 dòng</span></label><div class="code-editor"><pre id="code-gutter" aria-hidden="true">1</pre><textarea id="cad-python" spellcheck="false" autocapitalize="off" autocomplete="off" maxlength="200000" placeholder="Dán code Python từ ChatGPT vào đây…" aria-label="Python FreeCAD code"></textarea></div><div class="code-options"><label><input id="code-new-doc" type="checkbox" checked> Tạo tài liệu mới khi chạy</label><label><input id="code-auto-view" type="checkbox" checked> Hiện 3D sau khi chạy thành công</label></div><label class="code-consent"><input id="code-allow" type="checkbox"> Tôi đã đọc mã và cho phép đoạn Python này chạy trên máy tôi.</label><div class="code-runbar"><button id="code-run" class="primary" disabled>Chạy code → dựng CAD</button><button id="code-show-model">Xem mô hình 3D</button><span id="code-status" role="status">Mã chỉ giữ trong tab. Không cần API key hoặc gọi AI khi chạy.</span></div><details class="code-results" open><summary>Đầu ra / lỗi Python <button id="code-copy-error" type="button">Copy kết quả để nhờ ChatGPT sửa</button></summary><pre id="code-output">Chưa chạy. Hãy ghép nối FreeCAD, dán mã và bấm Chạy.</pre></details><p class="code-footnote">Python chạy bằng quyền tài khoản máy bạn. Lỗi hoặc hết thời gian chờ có thể để lại mô hình đang dựng; hãy Đồng bộ trước khi chạy lại. Xuất FCStd / STEP / STL trong bảng FreeCAD.</p>`;
  document.querySelector('.stage-content').append(pane);let running=false,resultText='';
  function open(){pane.hidden=false;document.body.classList.add('cad-code-mode');tab.classList.add('active');document.querySelectorAll('.stage-tabs>button:not(#view-cad-code)').forEach(b=>b.classList.remove('active'));update();$('cad-python').focus();}
  function close(){pane.hidden=true;document.body.classList.remove('cad-code-mode');tab.classList.remove('active');}
  tab.onclick=open;toolbar.onclick=open;
  for(const id of ['view-sketch','view-solid'])$(id).addEventListener('click',close);
  function update(){const connected=isConnected();$('code-connection').textContent=connected?'FreeCAD đã ghép nối':'Chưa ghép nối';$('code-connection').classList.toggle('connected',connected);$('code-run').disabled=running||!connected||!$('code-allow').checked||!$('cad-python').value.trim();$('code-connect').textContent=connected?'FreeCAD đã kết nối':'Kết nối FreeCAD';}
  function changed(){const n=$('cad-python').value.split('\n').length;$('code-lines').textContent=n+' dòng';$('code-gutter').textContent=Array.from({length:Math.min(n,10000)},(_,i)=>i+1).join('\n');$('code-allow').checked=false;update();}
  $('cad-python').oninput=changed;$('cad-python').onscroll=()=>$('code-gutter').scrollTop=$('cad-python').scrollTop;
  $('cad-python').onkeydown=e=>{if(e.key==='Tab'){e.preventDefault();const el=e.target;el.setRangeText('    ',el.selectionStart,el.selectionEnd,'end');changed();}};
  $('code-allow').onchange=update;document.addEventListener('freecad-local-status',update);
  $('code-connect').onclick=()=>{if(!isConnected())connect();else $('code-status').textContent='Đã ghép nối; dán mã rồi bấm Chạy.';};
  $('code-example').onclick=()=>{if($('cad-python').value.trim()&&$('cad-python').value!==SAMPLE_PYTHON){$('code-status').textContent='Ô mã đang có nội dung. Tải .py để giữ lại, hoặc xóa nội dung trước khi nạp mẫu.';return;}$('cad-python').value=SAMPLE_PYTHON;changed();$('code-status').textContent='Mẫu tạo khối 40 × 25 × 8 mm với Pocket Ø6 sâu 4 mm. Hai Sketch có ràng buộc đầy đủ.';};
  async function copy(value,message){try{await navigator.clipboard.writeText(value);$('code-status').textContent=message;}catch{$('code-output').textContent=value;$('code-status').textContent='Không truy cập được clipboard. Sao chép văn bản ở khung đầu ra.';}}
  $('code-prompt').onclick=()=>copy(CHATGPT_PROMPT,'Đã copy prompt. Gửi cùng crop bản vẽ cho ChatGPT.');
  $('code-copy-error').onclick=e=>{e.preventDefault();copy(resultText||$('code-output').textContent,'Đã copy kết quả / lỗi Python.');};
  $('code-import').onclick=()=>$('code-file').click();$('code-file').onchange=async()=>{const file=$('code-file').files[0];if(!file)return;if(file.size>800000){$('code-status').textContent='File vượt giới hạn 800 KB.';return;}$('cad-python').value=await file.text();changed();$('code-file').value='';};
  $('code-download').onclick=()=>{try{const code=normalizePython($('cad-python').value),blob=new Blob([code],{type:'text/x-python'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='FreeScan-model.py';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}catch(e){$('code-status').textContent=e.message;}};
  $('code-show-model').onclick=()=>{close();showModel();};
  $('code-run').onclick=async()=>{
    if(running)return;let code;try{code=normalizePython($('cad-python').value);}catch(e){$('code-status').textContent=e.message;return;}
    running=true;update();$('cad-python').readOnly=true;$('code-status').textContent='Đang chạy trong FreeCAD… không đóng FreeCAD hoặc bấm chạy lại.';$('code-output').textContent='Đang thực thi script…';
    try{
      const result=await runCode(code,{newDocument:$('code-new-doc').checked});
      resultText=[result.ok?'THÀNH CÔNG':'LỖI PYTHON',result.document?'Tài liệu: '+result.document:'',result.elapsedMs!==undefined?'Thời gian Python: '+result.elapsedMs+' ms':'',result.model?`Solid hiển thị: ${result.model.solids} · BRep hợp lệ: ${result.model.valid}\nFeature lỗi: ${result.model.invalidFeatures.join(', ')||'Không có'}`:'',result.stdout,result.stderr,result.traceback,result.syncError?'Chưa đồng bộ được: '+result.syncError:''].filter(Boolean).join('\n\n');$('code-output').textContent=resultText;
      $('code-status').textContent=result.ok?(result.syncError?'Script đã chạy xong; cần Đồng bộ lại để xem mô hình.':'Đã chạy và đồng bộ mô hình từ FreeCAD. Mở bảng FreeCAD để xuất file.'):'Mã có lỗi. Xem traceback bên dưới; dữ liệu đang dựng có thể còn trong FreeCAD.';
      if(result.ok&&!result.syncError&&$('code-auto-view').checked){close();showModel();}
    }catch(e){resultText=e.message;$('code-output').textContent=resultText;$('code-status').textContent='Chưa xác nhận chạy xong. Kiểm tra kết nối và Đồng bộ trước khi chạy lại.';}
    finally{running=false;$('cad-python').readOnly=false;$('code-allow').checked=false;update();}
  };
  if(new URLSearchParams(location.search).get('workspace')==='code')open();
  return {open,close};
}
