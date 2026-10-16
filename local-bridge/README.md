# FreeScan Drawing — personal FreeCAD bridge

Connect the public FreeScan website to FreeCAD on **your own computer**. No OpenAI API key, cloud CAD storage, new EXE installation or public tunnel is required. The existing browser-only CAD / drawing workflow stays available without a connection.

## Start (Windows) — double click

1. Extract the complete ZIP.
2. Double-click **Ket-noi-FreeCAD.cmd**. It finds existing Node.js and FreeCAD installations, reuses a running macro or opens FreeCAD with the macro automatically, starts/reuses the loopback bridge and opens the local pairing page. Keep the bridge window open.
3. Click **Mở website và ghép nối**, then **Kết nối** on the website. Allow local-network access if your browser asks. The site switches to Python mode with FCStd export.

No installer, EXE download, PowerShell policy change, automatic key persistence or public tunnel. Node.js 18+ and FreeCAD must already be installed. For unusual FreeCAD locations set FREECAD_EXE to the existing executable. If macro startup takes over 60 seconds, open FreeCAD-Web.FCMacro manually and retry. Existing FreeCAD documents are not closed. If 8876 is occupied by another app, the launcher stops with an error. Restarting the bridge revokes its previous key.

`node launch.mjs --check` checks availability without starting or pairing. `node launch.mjs --no-browser` starts without opening the browser. `node test-launch.mjs` checks installation discovery and unavailable ports. Advanced manual entry remains available in the site connection dialog.

## What works

- All **165 tools** from the bundled FreeCAD Advanced MCP definitions and handlers, including Sketcher, PartDesign, primitives, booleans, Draft, surface, mesh, assemblies, spreadsheets, TechDraw, BIM, FEM, import/export and Python. Tool schemas create real parameter forms; arrays/objects use JSON fields.
- Actual FreeCAD document tree; object property editing; BRep tessellation displayed in the web 3D viewport; face picking returns the object's actual face ID; edge IDs can populate tool parameters.
- Draw XY polyline / rectangle / circle in the existing website, close it, then **Sketch → FreeCAD**; choose constraints and Pad from the tools. Imported hand-drawn geometry is not automatically fully constrained.
- Upload an FCStd/STEP/STL/IGES/DXF/SVG directly from the browser **to localhost**, then import/open in FreeCAD. Export/download FCStd, STEP and STL. Other exports remain available through tool forms.
- Serial command execution; request IDs prevent duplicate tool submissions. An error or timeout is not automatically retried. Refresh to inspect state before another command if completion is uncertain.

Each tool requires suitable selected/named geometry and any necessary FreeCAD workbench, solver or external dependency. A listed FEM/meshing tool does not install CalculiX, Gmsh or other dependencies. This is a web control workspace for real FreeCAD, not a full replacement of every native workbench's interactive UI. Mesh viewport geometry is for display; export uses FreeCAD's BRep.

## Files and permissions

The bridge binds only to `127.0.0.1`. Requests require an unpredictable session key, approved browser Origin and Host. The public site origin and localhost preview 5174 are allowed; arbitrary websites are denied. The macro also binds only to loopback.

Pairing grants the trusted website the full Advanced MCP tool set. The Python tool has an additional per-command enable checkbox and runs with your OS account's permissions. Disconnect the tab or stop the bridge to stop using it. Do not share pairing keys. This is a personal trusted-device bridge, not a multi-tenant server.

Uploaded and exported files are retained in `~/FreeScanDrawing/local-files/` so FreeCAD can reopen them. Browser downloads are copies; local source files are **not deleted automatically**. No files are saved to cloud storage by this bridge. Remove local files yourself when no longer needed.

The local bridge does not need the private OpenAI tunnel created for ChatGPT. That tunnel can continue to serve ChatGPT independently; avoid simultaneous edits to the same active FreeCAD document.

## Upstream

`engine/` and the macro derive from [sergiudanstan/freecad-mcp](https://github.com/sergiudanstan/freecad-mcp), MIT, copyright Dan Stan. The bundled engine retains the locally installed 2.0.0 server's 165-tool definitions and Windows bridge fix. Integration fixes use Pad.Midplane for FreeCAD 1.1 compatibility and normalize FreeCAD Quantity values before JSON serialization. MIT license retained in `engine/LICENSE`. The HTTP layer, pairing and web workspace are FreeScan integration code.

## Verification

`node test.mjs` checks real localhost calls: unauthorized access, CORS, schema validation, duplicate prevention, Sketch → Pad → Pocket, property updates, live scene, native FCStd save and STEP export/reimport. It creates an isolated test document and closes only that document after verification. FreeCAD + macro must already be running. This does not exercise every advanced workbench or external solver.
