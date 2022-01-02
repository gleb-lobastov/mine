import { encode } from 'blurhash';

onmessage = ({
  data: {
    payload: { pixels, height, width, componentX, componentY },
    uniqId,
  },
}) => {
  const blurhash = encode(pixels, height, width, componentX, componentY);
  postMessage({ payload: blurhash, uniqId });
};
