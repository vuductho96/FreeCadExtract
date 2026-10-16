# SolidWorks / SketchUp adapters — first implementation

FreeCAD continues to use Ket-noi-FreeCAD.cmd on port 8766. SolidWorks / SketchUp use **Ket-noi-CAD.cmd**, a separate loopback bridge on 8767 with its own session key. No installer or automatic application/license installation.

1. Extract the full ZIP. Start Ket-noi-CAD.cmd, keep its window open, then open http://127.0.0.1:8767/pair.
2. Open SolidWorks desktop with a licensed installation. COM attaches to the running instance; paste **PowerShell using $sw / $doc**, not VBA, Python or Replicad JavaScript. Native Part save supports SLDPRT, STEP, STL. Existing selections are cleared before export. Native viewport is the supported SolidWorks preview in this first adapter.
3. For SketchUp **desktop**, install FreeScan-SketchUp.rbz using Extension Manager, or load adapters/FreeScan-CAD.rb from Ruby Console using an absolute path. Only load this trusted script intentionally: it permits Ruby execution by a paired website. Keep SketchUp open. SketchUp for Web does not expose this Ruby API. Start the suite before using the extension. Do not weaken extension security policy to load it; use a supported trusted extension flow. Ruby code must use Sketchup.active_model and .mm units. Native SKP and mesh preview are supported; STEP and parametric feature history are not supplied by this adapter.
4. Pair the website, open **SolidWorks / SketchUp** in the code dock, select engine, check status, paste the corresponding code, explicitly allow and run. Save edits in native files. A native save does not manufacture feature history absent from the submitted code.

PowerShell and Ruby have OS-user permissions. No sandbox. Models and exports stay under your device. Restart bridge to invalidate keys. Run requests are serialized; duplicate request IDs are rejected, scripts are never automatically retried. A timeout cannot undo changes already made inside SolidWorks. SketchUp script errors abort the operation opened by the adapter, but arbitrary script file/network side effects cannot be rolled back.

Validation on this machine: both applications were absent from standard installation folders. Protocol, authorization, format restrictions and error paths are tested with mock adapters. Native SolidWorks COM and SketchUp Ruby execution require testing on installed licensed applications; do not mark them verified based on these tests. FreeCAD's separate native tests remain available.

Official APIs: https://help.solidworks.com/2017/english/api/sldworksapi/SOLIDWORKS.Interop.sldworks~SOLIDWORKS.Interop.sldworks.IModelDocExtension~SaveAs.html · https://ruby.sketchup.com/Sketchup/Model.html · https://ruby.sketchup.com/UI.html

The suite stores a private local IPC key at ~/FreeScanDrawing/cad-suite/sketchup.key so the Ruby extension can authenticate the local Node bridge. This file stays on the device; browser credentials stay in tab memory. Re-launching while port 8767 is already occupied does not rotate the active IPC key.
