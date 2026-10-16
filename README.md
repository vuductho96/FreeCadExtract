# FreeCadExtract / DimensionOCR

Public browser application for extracting drawing dimensions and assisted 2D-to-3D reconstruction.

## Run locally

Install Node.js, then run `npm ci` and `npm start`. Open http://127.0.0.1:5173.
All production assets, including OCR models and OpenCascade WASM, are committed in `dist/`.
OCR and CAD run locally. The optional Gemini workflow sends only selected crops directly to Google; no application backend stores the drawing. HTTPS or localhost is required for workers.
`npm run prepare:cad` refreshes CAD vendor assets from pinned dependencies.
The existing OCR asset preparation script expects the original local model files; it is not needed to run the committed site.

## Two workspaces

**Extract numbers** retains YOLO + PP-OCR, optional parser, manual crop bypass, and CSV export/clear.
**2D → 3D** opens a separate in-page tab; both workspaces retain their temporary state while switching tabs.
Use OCR drawing transfers the current rendered page directly in browser memory.

## Drawing → solid workflow

1. Open PDF/image or reuse OCR page. PDFs are rendered at up to 3500px; images retain their source resolution. Crop rectangles retain page coordinates and the original rendered pixel data.
2. Select a crop and enable Assign selected crop. Click a cube face to assign it; edges/corners only orient the camera. Each face can have one crop. Rotate/flip to correct a view; this does not overwrite the source.
3. Calibrate two points using their known length in millimetres. Set a common origin for Front (X/Z), Top (X/Y), Right (Y/Z). Projection convention provides explicit layout guidance; face assignments are never guessed.
4. Constrain extent: click two boundary endpoints horizontally/vertically. Measure Z in Front and Right. The build blocks contradictory extents (>1% or0.2mm).
5. Trace the Top profile and close it, or inspect automatic dark-contour candidates. Circular candidates can be accepted as holes. OCR candidates remain editable and must be confirmed before use as a height. Add dimensioned X/Y/Z holes, rectangular pockets, fillet or chamfer.
6. Confirm geometry, build, then compare projected solid edges against Top/Front/Right crops with Model overlay.
7. Export STEP, STL, model JSON, or a FreeCAD macro. JSON can be reloaded. The macro builds an editable base sketch/pad and sequential boolean feature objects; native FCStd is saved using FreeCAD after running it.

Try 3-view example supplies a60×40×20mm stepped prismatic part with an8mm through-hole. It produces a real single BRep solid, not a bounding box or image extrusion. Kernel validates topology before export.

## Current reconstruction limits

This first release is **assisted prismatic reconstruction**, not arbitrary automatic drawing interpretation. Profiles are line segments. Curved contours are proposed as polygon vertices; true arc fitting, robust center/hidden-line semantics and general assemblies are not implemented. Front/Right constrain extents and support visual verification; hidden features must be entered and confirmed by the user. Projection selection changes placement guidance, not the manually assigned coordinate axes. Overlay projects visible and hidden mesh edges together; it is not a hidden-line-removal drawing engine.

STEP/STL are computed locally via Replicad/OpenCascade WASM in a worker. FreeCAD Python/CadQuery/build123d are not running in the browser; FCStd uses the generated macro in native FreeCAD. OCR and local CAD do not upload source drawings. The optional Gemini workflow sends user-selected cropped images to Google for inference, under Google API data terms. Working data lives in memory until Clear session, reload or close. Downloads remain on the user's device.

## Validation

Real OpenCascade tests cover a stepped outline, holes on all axes, pockets, edge treatments, invalid sketches and STEP round-trip topology/volume. Browser QA covers example→confirm→solid, overlay, cube navigation, mapping, exports and responsive layouts.
Vendor licensing notices are in `dist/vendor/cad/`.

## Compact CAD workbench

The 3D tab now uses a FreeCAD-style layout: Model tree and Data properties at left, a large shared sketch/model viewport with ViewCube, toolbars above and Tasks at right. It is an independent browser CAD interface with a deliberately smaller command set, not the FreeCAD application itself.

Start **New sketch**, choose Line (closed polyline), Rectangle or Circle. Set exact sketch width/height or circle diameter in Tasks, then **Pad**, set length and **Apply / Recompute**. Circle Pad uses a real analytic circular profile in OpenCascade. The workbench currently supports one active XY base sketch/body. A new sketch starts a new body document.

**Pocket**: set Pocket depth in Tasks, drag a rectangular region in Top sketch, then recompute. **Hole**: click center and radius in the Top sketch, or use the numerical feature dialog. Fillet/chamfer apply globally to eligible edges. Undo/Redo restore sketch/feature parameters; recompute refreshes the solid. Complete FreeCAD constraint solving, multiple bodies, arbitrary support planes and per-edge treatments are outside this compact workbench.

Drawing reference, original crop mapping, OCR and calibration remain under the expandable Drawing reference panel. Exports stay local. The compact workbench keeps working data in memory after export by default so multiple formats can be saved; Clear session after downloading remains available.

## Current focused crop → Gemini → 3D workflow

The FreeCAD dock arrangement is retained, while manual Sketcher/Pad/feature commands are removed from the visible workflow. Open drawing, Pan, Crop view, rotate/flip crop, Fit and model viewing remain. The task panel accepts the user's own Gemini API key for the current session only. Never commit a key or put one in source.

1. Crop1–12 views or detail images. Labels may be Auto, Front/Top/Right/etc., Isometric or Detail. The isometric view is not an extra orthographic cube face.
2. Tick crops to send. Optionally choose drawing units and add notes. No calibration or minimum number of orthographic views is required for AI reconstruction.
3. Enter a key from https://aistudio.google.com/api-keys and click Gemini dựng3D. The fixed Google generateContent endpoint receives only the selected PNG crops and drawing metadata. No Files API, app cloud storage or backend proxy is used in this BYOK prototype. The key is sent in x-goog-api-key, never a URL, storage or model export. Clear/reload/close removes it.
4. Gemini returns declarative JSON geometry and explicit assumptions/missing views. The user permits inferred hidden geometry and dimensions. The app automatically builds a draft through the existing OpenCascade worker, validates a single solid and shows assumptions. Unsupported features must be listed; no AI code is executed.
5. Inspect the draft before STEP/STL export. The AI proposal and assumptions are included with model JSON.

Default model: gemini-3.8-flash, documented as free-tier eligible on2026-10-15. The free tier requires a key, has project quotas and can use content to improve Google products. Actual charging depends on the user's Google project/tier. The app does not enable billing, silently switch models or promise unlimited free use. Model ID is editable in case availability differs by project. Official docs: https://ai.google.dev/gemini-api/docs/pricing and https://ai.google.dev/gemini-api/docs/rate-limits .

Integration tests use a mocked Google transport, test key/header isolation, quota/truncation failures and strict schema validation, then build/validate a real solid and STEP from the offline proposal. Browser QA covers4 crops with Isometric and an offline one-view proposal (no3-view gate). No live Google inference was tested because no user API key was supplied to the agent.
# FreeCAD on each visitor's computer

The CAD page now has **FreeCAD trên máy này**. It pairs the tab with an optional loopback-only bridge and exposes the installed Advanced MCP's 165-tool catalog, live object tree, numeric properties, viewport and native FCStd/STEP/STL exports. Each visitor connects their own FreeCAD instance; the public site never shares the owner's desktop session.

Download `dist/downloads/FreeScan-FreeCAD-Bridge.zip`, or see [local-bridge/README.md](local-bridge/README.md). No additional EXE installer or API key is needed; an existing FreeCAD and Node 18+ runtime are required. The original browser CAD and Gemini crop workflow remain available without the bridge. Uploads/exports used by FreeCAD stay in the visitor's local-files folder until they delete them.

