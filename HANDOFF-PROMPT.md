Tôi tiếp tục phát triển FreeScanDrawing Standalone từ thư mục mã nguồn này.

Hãy đọc AGENTS.md, README.md và DEVELOPMENT.md trước khi sửa. App chạy bằng Node.js và static HTML/JS trên http://127.0.0.1:5174, không dùng Sites hoặc yêu cầu ChatGPT Plus. OCR models và OpenCascade WASM đã được đóng gói. Không rewrite toàn bộ app.

Luồng cần giữ: mở PDF/ảnh → OCR/crop trên thiết bị; dán JavaScript Replicad để dựng solid trên web; dán Python để dựng Sketch/Pad/Pocket trong FreeCAD và xuất FCStd. SolidWorks/SketchUp là adapter bổ sung, cần kiểm thử native trước khi tuyên bố hoạt động.

Trước tiên kiểm tra git status, chạy test phù hợp, rồi thực hiện yêu cầu thay đổi của tôi. Không gửi bản vẽ/key lên cloud, không đưa key vào Git, không triển khai lên site cũ.

Yêu cầu tiếp theo của tôi: [điền thay đổi mong muốn ở đây].
