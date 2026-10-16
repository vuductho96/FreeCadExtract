# FreeScanDrawing on Cloudflare

This edition keeps the same static OCR/CAD frontend and adds Cloudflare Workers Static Assets deployment. The independent local edition and its ZIP remain at Desktop/FreeScanDrawing-Standalone.

## Deploy

Use a current Node.js 22+ runtime for Wrangler (the local app itself still runs on Node 18+). No model-training or cloud CAD backend is needed.

```text
npm run build:cloudflare
npm run cloudflare:check
npm run cloudflare:login
npm run deploy:cloudflare
```

`deploy:cloudflare` builds assets, deploys with pinned Wrangler 4.86.0, reads the public workers.dev URL, writes that public URL to cloudflare-site.json, rebuilds the downloaded bridge ZIP with an exact-origin allowlist, then publishes the corrected bundle. It may deploy twice on first publication. No access token is written into the project.

If using a custom domain, set its exact HTTPS origin in cloudflare-site.json and run build/deploy. If automated URL discovery cannot find a workers.dev URL, configure siteOrigin manually and rerun deployment. Use one stable production origin; a different preview/custom-domain origin needs its own explicit bridge configuration.

## What runs where

- Cloudflare serves HTML/JS/CSS, ONNX model shards, WASM and download bundles.
- Browser: PDF/image canvas, OCR inference, parser, Replicad/OpenCascade solid generation, STEP/STL export. Drawings are not uploaded by these paths.
- Personal computer: FreeCAD and the native CAD bridges. SolidWorks and SketchUp also require their own installed desktop apps/licenses. These desktop executables do not run inside Cloudflare Workers.
- Optional external AI (Gemini) still uses the visitor's own API key and only sends selected crops on explicit action.

## Connect desktop CAD from the hosted site

Download the bridge ZIP from the Cloudflare site AFTER its final deployment, extract it and run Ket-noi-FreeCAD.cmd or Ket-noi-CAD.cmd. The ZIP includes site-config.json pointing to the published Cloudflare origin; the local pairing page returns to that same site. Never allow every workers.dev domain in CORS.

Loopback ports remain 8876/8877; browser localhost/Private Network Access permissions may require approval. Some embedded browsers block HTTPS-to-localhost requests. In that case, use a normal Chrome/Edge window or the independent local edition. A successful deployment does not certify desktop connectivity in every browser.

## Size and storage

All current assets fit the 25 MiB individual-file limit; build checks reject an oversized file before deployment. Models were already split into shards. No R2, D1, KV, accounts backend or online drawing storage is added. Cloudflare account limits/policies still apply; this source copy does not include a paid hosting or AI subscription.

## Tests

- node verify-local.mjs: existing application checks.
- node local-bridge/test-suite.mjs: mocked SolidWorks/SketchUp protocol/security.
- npm run cloudflare:check: Wrangler dry-run against packaged assets.
- Verify .cloudflare/build-report.json and the downloaded ZIP's site-config.json.

Official references:
https://developers.cloudflare.com/workers/static-assets/
https://developers.cloudflare.com/workers/wrangler/configuration/
https://developers.cloudflare.com/workers/platform/limits/
