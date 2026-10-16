# FreeScan Drawing — personal FreeCAD bridge

Connect the public FreeScan website to FreeCAD on **your own computer**. No OpenAI API key, cloud CAD storage, new EXE installation or public tunnel is required. The existing browser-only CAD / drawing workflow stays available without a connection.

## Start (Windows)

1. Use an existing FreeCAD installation and Node.js 18+ runtime.
2. Extract the complete bridge ZIP. Keep `engine/` beside `server.mjs`.
3. Open FreeCAD → Macro → Macros → select `FreeCAD-Web.FCMacro` → Execute. If the Advanced MCP macro is already listening on 127.0.0.1:12345, reuse it rather than starting another.
4. Run `Start-FreeCAD-Web.ps1` in PowerShell, or `node server.mjs` in this folder. It does not install software or change PowerShell policy. If scripts are restricted, use the Node command directly.
5. Open `http://127.0.0.1:8766/pair`. Read the access description and click **Connect FreeScan website**, then **Kết nối** in the website. Allow local-network access if the browser asks. Alternatively paste the local address and pairing key into the website connection dialog.
6. Click **Tài liệu mới**, choose a tool, enter its parameters and execute. Click **Đồng bộ** after changing a model directly in FreeCAD.

Closing the bridge / FreeCAD ends availability. Restarting the bridge creates a new pairing key. Each browser tab holds the key in memory only; it is not written to localStorage or sent to the Sites host. The web fragment is removed immediately after receipt. Every user runs their own bridge and FreeCAD instance.

## What works

- All **165 tools** from the bundled FreeCAD Advanced MCP definitions and handlers, including Sketcher, PartDesign, primitives, booleans, Draft, surface, mesh, assemblies, spreadsheets, TechDraw, BIM, FEM, import/export and Python. Tool schemas create real parameter forms; arrays/objects use JSON fields.
- Actual FreeCAD document tree; object property editing; BRep tessellation displayed in the web 3D viewport; face picking returns the object's actual face ID; edge IDs can populate tool parameters.
- Draw XY polyline / rectangle / circle in the existing website, close it, then **Sketch → FreeCAD**; choose constraints and Pad from the tools. Imported hand-drawn geometry is not automatically fully constrained.
- Upload an FCStd/STEP/STL/IGES/DXF/SVG directly from the browser **to localhost**, then import/open in FreeCAD. Export/download FCStd, STEP and STL. Other exports remain available through tool forms.
- Serial command execution; request IDs prevent duplicate tool submissions. An error or timeout is not automatically retried. Refresh to inspect state before another command if completion is uncertain.

Each tool requires suitable selected/named geometry and any necessary FreeCAD workbench, solver or external dependency. A listed FEM/meshing tool does not install CalculiX, Gmsh or other dependencies. This is a web control workspace for real FreeCAD, not a full replacement of every native workbench's interactive UI. Mesh viewport geometry is for display; export uses FreeCAD's BRep.

## Files and permissions

The bridge binds only to `127.0.0.1`. Requests require an unpredictable session key, approved browser Origin and Host. The public site origin and localhost preview 5173 are allowed; arbitrary websites are denied. The macro also binds only to loopback.

Pairing grants the trusted website the full Advanced MCP tool set. The Python tool has an additional per-command enable checkbox and runs with your OS account's permissions. Disconnect the tab or stop the bridge to stop using it. Do not share pairing keys. This is a personal trusted-device bridge, not a multi-tenant server.

Uploaded and exported files are retained in `~/FreeScanDrawing/local-files/` so FreeCAD can reopen them. Browser downloads are copies; local source files are **not deleted automatically**. No files are saved to cloud storage by this bridge. Remove local files yourself when no longer needed.

The local bridge does not need the private OpenAI tunnel created for ChatGPT. That tunnel can continue to serve ChatGPT independently; avoid simultaneous edits to the same active FreeCAD document.

## Upstream

`engine/` and the macro derive from [sergiudanstan/freecad-mcp](https://github.com/sergiudanstan/freecad-mcp), MIT, copyright Dan Stan. The bundled engine matches the locally installed 2.0.0 server's 165-tool definitions and Windows bridge fix. MIT license retained in `engine/LICENSE`. The HTTP layer, pairing and web workspace are FreeScan integration code.

## Verification

`node test.mjs` checks real localhost calls: unauthorized access, CORS, schema validation, duplicate prevention, Sketch → Pad → Pocket, property updates, live scene, native FCStd save and STEP export/reimport. It creates an isolated test document and closes only that document after verification. FreeCAD + macro must already be running. This does not exercise every advanced workbench or external solver.
