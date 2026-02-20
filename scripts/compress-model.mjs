import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import { dedup, quantize, weld } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';

const io = new NodeIO()
  .registerExtensions([KHRDracoMeshCompression])
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });

const doc = await io.read('public/models/con_one.glb');

await doc.transform(
  dedup(),
  weld(),
  quantize(),
);

await io.write('public/models/con_one_compressed.glb', doc);
console.log('Model compressed successfully');
