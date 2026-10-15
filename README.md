# FreeCadExtract / DimensionOCR

Public browser application for extracting drawing dimensions and assisted 2D-to-3D reconstruction.

## Run locally

Install Node.js, then run `npm ci` and `npm start`. Open http://127.0.0.1:5173.
All production assets, including OCR models and OpenCascade WASM, are committed in `dist/`.
No backend or cloud drawing storage is used. HTTPS or localhost is required for workers.
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

STEP/STL are computed locally via Replicad/OpenCascade WASM in a worker. FreeCAD Python/CadQuery/build123d are not running in the browser; FCStd uses the generated macro in native FreeCAD. No file, crop, OCR result or model is uploaded. Working data lives in memory until Clear session, reload or close. Downloads remain on the user's device.

## Validation

Real OpenCascade tests cover a stepped outline, holes on all axes, pockets, edge treatments, invalid sketches and STEP round-trip topology/volume. Browser QA covers example→confirm→solid, overlay, cube navigation, mapping, exports and responsive layouts.
Vendor licensing notices are in `dist/vendor/cad/`.
