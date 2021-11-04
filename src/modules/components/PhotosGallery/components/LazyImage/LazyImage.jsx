import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Blurhash } from 'react-blurhash';
import min from 'lodash/min';

const BLURHASH_RESOLUTION = 32;
const BLURHASH_PUNCH = 1;
const ERROR_IMAGE_URL =
  'https://res.cloudinary.com/dc2eke0gj/image/upload/minetravel/common/img_placeholder.png';
const LOADING_STATE = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
const LAZY_LOADING_SUPPORT = false; // 'loading' in HTMLImageElement.prototype;
const INITIAL_STATE = LAZY_LOADING_SUPPORT
  ? LOADING_STATE.LOADING
  : LOADING_STATE.IDLE;

export default function LazyImage({
  aspectRatio,
  className,
  require,
  tag,
  src,
  alt,
  blurhash,
  constraints,
  height,
  width,
  onLoad,
  ...forwardingProps
}) {
  const [loadingState, setLoadingState] = useState(INITIAL_STATE);

  const handleError = useCallback(() => {
    setLoadingState(LOADING_STATE.ERROR);
  }, []);

  const imgRef = useRef();
  const handleLoad = useCallback(() => {
    setLoadingState(LOADING_STATE.SUCCESS);
    if (onLoad) {
      onLoad({
        aspectRatio: imgRef.current.naturalWidth / imgRef.current.naturalHeight,
      });
    }
  }, []);

  useEffect(
    () => {
      if (require && loadingState === LOADING_STATE.IDLE) {
        setLoadingState(LOADING_STATE.LOADING);
      }
    },
    [require, loadingState],
  );

  const hasResult =
    loadingState === LOADING_STATE.SUCCESS ||
    loadingState === LOADING_STATE.ERROR;

  const { imageWidth, imageHeight } = resolveImageSize(
    {
      height,
      width,
      aspectRatio,
    },
    constraints,
  );

  return (
    <>
      {!hasResult && (
        <Blurhash
          hash={blurhash}
          width={imageWidth}
          height={imageHeight}
          resolutionX={BLURHASH_RESOLUTION}
          resolutionY={BLURHASH_RESOLUTION}
          punch={BLURHASH_PUNCH}
        />
      )}
      <img
        data-tag={tag}
        ref={onLoad ? imgRef : undefined}
        className={className}
        alt={alt}
        src={resolveActualSrc(src, loadingState)}
        style={{ width: imageWidth, height: hasResult ? imageHeight : 0 }}
        onLoad={handleLoad}
        onError={handleError}
        loading={LAZY_LOADING_SUPPORT ? 'lazy' : undefined}
        {...forwardingProps}
      />
    </>
  );
}

function resolveActualSrc(src, loadingState) {
  switch (loadingState) {
    case LOADING_STATE.IDLE:
      return null;
    case LOADING_STATE.ERROR:
      return ERROR_IMAGE_URL;
    default:
      return src;
  }
}

function resolveImageSize({ aspectRatio, height, width }, constraints) {
  if (!constraints) {
    return {
      imageHeight: height || width / aspectRatio,
      imageWidth: width || height * aspectRatio,
    };
  }

  const heightConstraint = min([constraints.height, height]);
  const widthConstraint = min([constraints.width, width]);
  const constraintByHeight = heightConstraint * aspectRatio < widthConstraint;

  const [imageWidth, imageHeight] = constraintByHeight
    ? [heightConstraint * aspectRatio, heightConstraint]
    : [widthConstraint, widthConstraint / aspectRatio];

  return {
    imageHeight,
    imageWidth,
  };
}
