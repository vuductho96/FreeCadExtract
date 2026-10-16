# Developer map

This is an independent local fork. Do not reintroduce a Sites project id or require a ChatGPT account.

- dist/index.html, app.js, editor.css: OCR workspace, zoom/pan/crop, result editing/export.
- dist/ocr-worker.js, inference.js, models/: local YOLO + PP-OCRv6 pipeline.
- dist/dimension-parser.js: geometry/tolerance parser; manual crop bypasses it.
- dist/cad.html, cad.js, cad-shell.js: main FreeCAD-style UI.
- dist/freecad-code.js: code editor, web/native execution modes.
- dist/browser-code.js, cad-worker.js: Replicad code execution, real OpenCascade solid validation, STEP/STL exports.
- dist/freecad-code-model.js: Python sample, Python execution wrapper, ChatGPT prompt.
- dist/cad-prompt-template.js: editable prompt-template dialog.
- dist/freecad-local.js: authenticated localhost FreeCAD transport.
- dist/cad-suite.js: SolidWorks/SketchUp controls; native implementations in local-bridge/adapters/.
- local-bridge/server.mjs: FreeCAD HTTP bridge, pair/CORS/secret/request-ID guards.
- local-bridge/FreeCAD-Web.FCMacro: FreeCAD UI-thread execution via loopback socket.
- local-bridge/multi-server.mjs: separate SolidWorks/SketchUp authenticated service.
- serve.mjs: dependency-free static HTTP server bound to loopback.

## Verification

Run npm test. For visual changes, open http://127.0.0.1:5174 and test the changed control. Browser CAD test sample: block 40x25x8 with diameter-6 pocket depth-4; expected volume 7886.902664 mm3. tests/browser-code.mjs validates BRep, volume, STEP roundtrip and STL with the actual WASM kernel. Native FreeCAD sample has fully constrained sketches and reopen/edit FCStd checks when enabled. Native SolidWorks/SketchUp execution remains unverified until tested on installed apps; never claim mock protocol tests are native CAD tests.

## Releasing a local bundle

Keep dist and all bundled runtime assets. After changing bridge code, regenerate dist/downloads/FreeScan-FreeCAD-Bridge.zip from local-bridge contents. Rebuild the SketchUp RBZ from local-bridge/adapters/FreeScan-Standalone-CAD.rb when changing the extension. Never include .git credentials, .env, keys, user drawings or local export folders in a distributable ZIP. To attach your own remote: git remote add origin <your-repository-url>, then git push -u origin main.
