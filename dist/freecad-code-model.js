export const SAMPLE_PYTHON=`import FreeCAD as App
import Part, Sketcher

# Millimetres. The website provides a fresh active document by default.
doc = App.ActiveDocument
width, height, thickness = 40.0, 25.0, 8.0
hole_radius, pocket_depth = 3.0, 4.0
body = doc.addObject("PartDesign::Body", "Body")
sketch = body.newObject("Sketcher::SketchObject", "BaseSketch")
points = [(0, 0), (width, 0), (width, height), (0, height)]
for i in range(4):
    a, b = points[i], points[(i + 1) % 4]
    sketch.addGeometry(Part.LineSegment(App.Vector(*a, 0), App.Vector(*b, 0)), False)
for i in range(4):
    sketch.addConstraint(Sketcher.Constraint("Coincident", i, 2, (i + 1) % 4, 1))
for i in (0, 2):
    sketch.addConstraint(Sketcher.Constraint("Horizontal", i))
for i in (1, 3):
    sketch.addConstraint(Sketcher.Constraint("Vertical", i))
sketch.addConstraint(Sketcher.Constraint("Coincident", 0, 1, -1, 1))
sketch.addConstraint(Sketcher.Constraint("Distance", 0, width))
sketch.addConstraint(Sketcher.Constraint("Distance", 1, height))
pad = body.newObject("PartDesign::Pad", "Pad")
pad.Profile, pad.Length = sketch, thickness
doc.recompute()
sketch.Visibility = False

cut = body.newObject("Sketcher::SketchObject", "PocketSketch")
cut.Placement.Base = App.Vector(0, 0, thickness)
cut.addGeometry(Part.Circle(App.Vector(width / 2, height / 2, 0), App.Vector(0, 0, 1), hole_radius), False)
cut.addConstraint(Sketcher.Constraint("Diameter", 0, 2 * hole_radius))
cut.addConstraint(Sketcher.Constraint("DistanceX", 0, 3, width / 2))
cut.addConstraint(Sketcher.Constraint("DistanceY", 0, 3, height / 2))
pocket = body.newObject("PartDesign::Pocket", "Pocket")
pocket.Profile, pocket.Length = cut, pocket_depth
doc.recompute()
pad.Visibility = False
cut.Visibility = False
body.Tip = pocket
assert pocket.Shape.isValid() and len(pocket.Shape.Solids) == 1
print("Valid solid:", round(pocket.Shape.Volume, 6), "mm3")
print("Sketches fully constrained:", sketch.FullyConstrained, cut.FullyConstrained)
`;

export const CHATGPT_PROMPT=`Phân tích các crop bản vẽ kỹ thuật tôi gửi và tạo một script Python chạy trong FreeCAD 1.1 qua website FreeScan Drawing.
1. Trước hết lập bảng kích thước, nguồn crop/cạnh/datum; tách số đọc được, số suy ra và phần còn thiếu. Không âm thầm đoán.
2. Dùng mm, Sketcher có ràng buộc thật và PartDesign Pad/Pocket/Hole/Fillet/Chamfer phù hợp. Không thay chi tiết bằng khối hộp bao.
3. Trả về MỘT khối code Python hoàn chỉnh để copy. Không dùng pip, terminal, API key, yêu cầu input() hay hộp thoại tương tác.
4. Dùng doc = App.ActiveDocument (website tạo tài liệu mới mặc định). Import FreeCAD as App, Part, Sketcher. Không đóng hoặc sửa tài liệu khác; không tự ghi file hoặc truy cập mạng.
5. Cần file FCStd sửa được: giữ Sketch, ràng buộc và cây feature PartDesign có tên; không gộp toàn bộ thành một Part::Feature tĩnh. Dùng expression hoặc Spreadsheet cho kích thước dùng lại nếu cần. Đặt tham số có tên ở đầu mã. Recompute sau feature; ẩn Sketch/feature cũ và chỉ hiện kết quả cuối.
6. Kiểm tra Shape.isValid(), số solid và in kết quả bằng print(). Ghi rõ phần chưa xác nhận; không tự khẳng định đúng dung sai.
7. Mã chạy trên FreeCAD của máy tôi. Website sẽ đồng bộ 3D; FCStd/STEP/STL được xuất bằng nút trên web. Nếu thiếu dữ kiện quan trọng, hỏi tôi trước khi sinh mô hình cuối.`;

export function normalizePython(input){
  let code=String(input).replace(/^\uFEFF/,'').trim();
  const fence=code.match(/^```(?:python|py)?\s*\r?\n([\s\S]*?)\r?\n```$/i);
  if(fence)code=fence[1].trim();
  if(!code)throw Error('Dán mã Python trước khi chạy.');
  if(code.length>200000)throw Error('Mã vượt giới hạn 200.000 ký tự.');
  if(code.includes('```'))throw Error('Chỉ dán một khối Python, bỏ phần giải thích và dấu ``` còn lại.');
  return code+'\n';
}

// One MCP call, isolated script globals, bounded print output and real traceback.
// This is NOT a Python sandbox; the paired user grants OS-level Python access.
export function executionCode(input,{newDocument=true,name='WebCode_'+Date.now()}={}){
  const code=normalizePython(input);
  return `import FreeCAD as _web_app, Part as _web_part, Sketcher as _web_sketcher
import io as _web_io, contextlib as _web_context, traceback as _web_tb, time as _web_time
class _WebOutput(_web_io.StringIO):
    def write(self, value):
        remaining = max(0, 20000 - self.tell())
        super().write(value[:remaining])
        return len(value)
_web_out, _web_err = _WebOutput(), _WebOutput()
_web_start = _web_time.monotonic()
_web_result = {'ok': False, 'document': None}
try:
    with _web_context.redirect_stdout(_web_out), _web_context.redirect_stderr(_web_err):
        _web_compiled = compile(${JSON.stringify(code)}, 'WebCAD.py', 'exec')
        _web_doc = _web_app.newDocument(${JSON.stringify(name)}) if ${newDocument?'True':'False'} else _web_app.ActiveDocument
        if _web_doc is None: raise RuntimeError('No active document. Enable New document or create one first.')
        _web_result['document'] = _web_doc.Name
        _web_scope = {'__name__': '__main__', '__file__': 'WebCAD.py', 'App': _web_app, 'FreeCAD': _web_app, 'Part': _web_part, 'Sketcher': _web_sketcher, 'doc': _web_doc}
        exec(_web_compiled, _web_scope, _web_scope)
        _web_active = _web_app.ActiveDocument
        if _web_active:
            _web_active.recompute()
            _web_result['document'] = _web_active.Name
        _web_result['ok'] = True
except BaseException:
    _web_result['traceback'] = _web_tb.format_exc()[-18000:]
_web_result.update({'stdout': _web_out.getvalue(), 'stderr': _web_err.getvalue(), 'elapsedMs': round((_web_time.monotonic()-_web_start)*1000)})
_mcp_result['result'] = _web_result
`;
}
