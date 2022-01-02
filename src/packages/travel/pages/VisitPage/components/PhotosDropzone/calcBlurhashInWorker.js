import { v4 as uuidV4 } from 'uuid';

const listeners = new Set();
const worker =
  'Worker' in window
    ? new Worker(new URL('./blurhashWorker.js', import.meta.url))
    : null;
worker.onmessage = message => listeners.forEach(listener => listener(message));

export default function calcBlurhashInWorker({
  pixels,
  height,
  width,
  componentX,
  componentY,
}) {
  const uniqId = uuidV4();
  if (!worker) {
    return import('blurhash').then(blurhash =>
      blurhash.encode(pixels, height, width, componentX, componentY),
    );
  }
  return new Promise(resolve => {
    listeners.add(listen);

    worker.postMessage({
      payload: { pixels, height, width, componentX, componentY },
      uniqId,
    });

    function listen(message) {
      const {
        data: { payload: receivedPayload, uniqId: receivedUniqId },
      } = message;
      if (receivedUniqId !== uniqId) {
        return;
      }
      listeners.delete(listen);
      resolve(receivedPayload);
    }
  });
}
