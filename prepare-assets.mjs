import fs from 'node:fs';
import path from 'node:path';
fs.mkdirSync('dist/vendor',{recursive:true});fs.mkdirSync('dist/models',{recursive:true});
for(const file of ['ort-wasm-simd-threaded.wasm','ort-wasm-simd-threaded.mjs'])fs.copyFileSync('node_modules/onnxruntime-web/dist/'+file,'dist/vendor/'+file);
fs.copyFileSync('node_modules/onnxruntime-web/dist/ort.wasm.min.js','dist/vendor/ort.min.js');
for(const file of ['pdf.mjs','pdf.worker.mjs'])fs.copyFileSync('node_modules/pdfjs-dist/build/'+file,'dist/vendor/'+file);
const root=process.env.FREESCAN_MODELS_DIR||process.argv[2];if(!root)throw Error('OCR models are already bundled in dist/models. To rebuild, set FREESCAN_MODELS_DIR to your original ONNX model directory.');
const models={detector:'onnx_yolo/yolo_best_1class071026.onnx',regions:'onnx_yolo/yolo_3regions_31026.onnx',recognizer:'onnx_ppocr/PP-OCRv6_small_rec_041026 v2.onnx'},manifest={};
for(const [key,file] of Object.entries(models)){const bytes=fs.readFileSync(path.join(root,file));manifest[key]=[];for(let offset=0,i=0;offset<bytes.length;offset+=16*1024*1024,i++){const name=key+'-'+i+'.bin';fs.writeFileSync('dist/models/'+name,bytes.subarray(offset,offset+16*1024*1024));manifest[key].push(name);}}
fs.copyFileSync(path.join(root,'onnx_ppocr/ppocrv6_dict.txt'),'dist/models/dict.txt');fs.writeFileSync('dist/models/manifest.json',JSON.stringify(manifest));
