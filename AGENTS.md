# Instructions for future coding assistants

Read README.md and DEVELOPMENT.md first. This is the standalone local FreeScanDrawing app, copied from the hosted project at 613899a. It must run without ChatGPT Plus, Sites or account login. The existing implementation is buildless HTML/JS; preserve it instead of rewriting frameworks.

Keep browser OCR, manual crop bypassing parser, minimum drawing zoom 22%, local CAD workers and exports working. Native FreeCAD Python is separate from browser Replicad JavaScript. Preserve parametric Sketch/feature history for FCStd; do not claim STEP preserves design history.

Bind services to loopback only. Preserve pairing consent, origin/Host checks, request IDs and code-review opt-in. Do not embed credentials or expose native execution publicly. Standalone web/bridge ports are 5174, 8876, 8877; the RPC sockets are 12345 (FreeCAD) and 12347 (SketchUp standalone). Do not send pairing links back to the old hosted site.

Use npm test plus checks relevant to the changed feature. Dist assets are already bundled; npm ci is only needed for rebuild tooling. Do not re-download OCR models unnecessarily. Native SolidWorks/SketchUp adapters are initial/unverified on real apps; report actual evidence and limitations.

Do not deploy, install new software, alter machine security policy, or configure a remote unless requested. Keep user drawings and credentials out of source control.

Cloudflare fork: read CLOUDFLARE.md. Build using node scripts/build-cloudflare.mjs; use Wrangler dry-run before deploy. Deployment was explicitly requested by the user for this edition. Credentials belong to the user's Wrangler config, never this repo. Native apps stay local. Do not wildcard the bridge origin to all Cloudflare domains. The original standalone copy must remain independent.
