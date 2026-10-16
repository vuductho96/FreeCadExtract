# Verification

- All enabled tests in verify-local.mjs passed: dimension parser, manual crop bypass, actual WASM solid/STEP roundtrip, mocked Gemini request contract, Sketcher, hybrid solver, browser-code solid/export, suite auth/consent/replay/format/download/mesh and launcher discovery.
- Native FreeCAD test enabled separately: valid one-solid model, two fully constrained Sketches, STEP roundtrip, FCStd reopen and Pocket-depth edit all passed.
- Local browser at 127.0.0.1:5174/cad.html built the sample with volume 7886.902664 mm3 using bundled OpenCascade.
- Functional source has no pairing reference to the original hosted site. No Sites hosting manifest is included.
- SolidWorks / SketchUp native execution is not certified; protocol tests use mocks because the applications are absent.
