# FreeScanDrawing Standalone

Bản độc lập từ mã nguồn website hiện tại, snapshot gốc `613899a16fe2619d5cec028f08eab0386769f269`.
Không cần ChatGPT Plus, đăng nhập OpenAI, Sites hoặc API key để mở app, OCR local, chạy JavaScript CAD trên browser hoặc kết nối FreeCAD. Không kèm tài khoản/gói AI; công cụ AI bên ngoài có điều kiện sử dụng riêng.

## Mở ngay trên máy này

1. Bấm đúp **Start-App.cmd**, giữ cửa sổ server mở.
2. Mở **http://127.0.0.1:5174**. Có tab OCR và 2D → 3D giống bản web.
3. Dựng ngay trên web: chọn JavaScript, nạp mẫu hoặc dán Replicad code rồi chạy; xuất STEP/STL.
4. Dùng FreeCAD: bấm **Connect-FreeCAD.cmd**, sau đó ở trang ghép nối bấm mở website và xác nhận Kết nối. Dán Python; xuất FCStd để giữ cây feature mà code tạo ra.
5. SolidWorks/SketchUp: bấm **Connect-SolidWorks-SketchUp.cmd**. Hai adapter này đang ở bản đầu, chưa được kiểm thử native trên máy phát triển do chưa có hai ứng dụng. Xem `local-bridge/adapters/README.md`. SketchUp Desktop cần extension đi kèm, không hỗ trợ SketchUp Web.

Không cài EXE, không đổi chính sách PowerShell. Cần Node.js 18+ đã có. Launcher tìm Node trong PATH hoặc runtime hiện có trên máy này. Sang máy khác, dùng Node.js của máy đó. Không copy được một thuê bao AI bằng cách sao chép mã nguồn.

## Chạy không cần cài dependencies

Đã kèm `dist/`, PDF renderer, OCR models, ONNX Runtime, Three.js, Replicad và OpenCascade WASM. Chạy `node serve.mjs` là đủ. Không mở `index.html` bằng file:// vì Worker/WASM cần HTTP localhost. Các chức năng local nêu trên không cần tải model từ cloud.

Tính năng gọi Gemini/AI bên ngoài chỉ hoạt động khi người dùng chủ động cung cấp key/dịch vụ tương ứng và có Internet. Plus không đồng nghĩa với API credit. Không có key, dữ liệu bản vẽ hoặc thông tin đăng nhập cá nhân trong gói này.

## Cổng riêng của bản độc lập

- Web: `127.0.0.1:5174`
- FreeCAD HTTP bridge: `127.0.0.1:8876`
- SolidWorks/SketchUp CAD Suite: `127.0.0.1:8877`
- Macro FreeCAD: `127.0.0.1:12345` (có thể dùng chung FreeCAD đang mở)
- SketchUp Ruby standalone: `127.0.0.1:12347`
- File xuất / khóa IPC local: `%USERPROFILE%/FreeScanDrawing-Standalone/`

Các URL ghép nối trong bản này quay về localhost, không quay về site ChatGPT. Đóng cửa sổ server thì app/bridge tương ứng dừng. Không tự mở cổng ra Internet.

## Tiếp tục phát triển

Mở toàn bộ thư mục này bằng VS Code hoặc editor bất kỳ. Git đã khởi tạo, không cấu hình remote để tránh ghi đè dự án gốc.

```text
node serve.mjs
npm test
git status
git add .
git commit -m "Mô tả thay đổi"
```

Các test dùng Node core + assets đã kèm; native FreeCAD test sẽ bỏ qua nếu không có FREECAD_CMD. Muốn kiểm tra native, đặt FREECAD_CMD đến FreeCADCmd.exe và dùng Python có sẵn trong FreeCAD. Test SolidWorks/SketchUp hiện chỉ kiểm thử giao thức bằng adapter mô phỏng.

Nếu cần rebuild các thư viện frontend: `npm ci` rồi `npm run prepare:cad` (cần mạng để tải dependency từ registry). Không cần bước này chỉ để sửa UI/logic JS hiện tại.

OCR model nhị phân đã kèm trong `dist/models/`. `prepare-assets.mjs` chỉ dùng khi có ONNX gốc: đặt FREESCAN_MODELS_DIR đến thư mục gốc model của bạn. Không cần rebuild model để chạy app.

Xem `DEVELOPMENT.md`, `AGENTS.md`, `HANDOFF-PROMPT.md` và `docs/UPSTREAM_README.md` để tiếp tục với công cụ khác. Giữ các tệp LICENSE/NOTICE của thư viện và engine trong gói.

## Giới hạn file CAD

STEP giữ solid hình học, không khôi phục Sketch/ràng buộc/lịch sử thiết kế. FCStd hoặc SLDPRT chỉ giữ lịch sử thật do code dựng. SKP là model SketchUp, không phải cây feature FreeCAD. Code native chạy bằng quyền tài khoản của bạn; đọc mã trước khi cho phép chạy.

## Cloudflare edition

This folder also supports Cloudflare Workers Static Assets. See CLOUDFLARE.md before publishing. The assets directory for Wrangler is .cloudflare/public, built from dist. Cloudflare hosting is optional; source and local workflow stay usable without ChatGPT Plus. Do not commit .wrangler credentials or .dev.vars. Always configure the exact deployed origin for downloadable native bridges.
