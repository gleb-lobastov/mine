import React, { useState, useMemo, useEffect } from 'react';
import cls from 'classnames';
import LazyLoad from 'react-lazy-load';
import ImageGallery from 'react-image-gallery';
import { makeStyles } from '@material-ui/core/styles';
import LazyImage from './components/LazyImage';
import { useLayoutContext } from 'modules/components/LayoutContext';

const PREFETCH_SLIDES = 1;
const START_INDEX = 0;

const useStyles = makeStyles({
  photoContainer: {
    minHeight: '200px',
    margin: '24px 0',
    '& .image-gallery-thumbnails': {
      overflowY: 'auto',
      '-ms-overflow-style': 'none' /* Hide scrollbar for IE, Old Edge */,
      scrollbarWidth: 'none' /* Firefox */,
      '&::-webkit-scrollbar': {
        /* Hide scrollbar for Chrome, Safari and Opera */
        display: 'none',
      },
    },
  },
  photo: {
    display: 'block',
    width: '100%',
  },
});

export default function PhotosGallery({ className, galleryKey, photos }) {
  const classes = useStyles();
  const { vw, vh } = useLayoutContext();
  const [fullscreen, setFullscreen] = useState(false);
  const [aspectRatios, setAspectRatios] = useState({});
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);

  const constraints = useMemo(
    () => resolveImageConstraints(fullscreen, { vh, vw }),
    [fullscreen, vh, vw],
  );

  useEffect(
    () => {
      const thumbnailElement = window.document
        .querySelector(
          `[data-photos-gallery-tag="thumbnail-${galleryKey}-${currentIndex}"]`,
        )
        ?.closest('.image-gallery-thumbnail');

      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    },
    [currentIndex],
  );

  const actualPhotos = photos.map(
    (
      { fullSizePhotoUrl, thumbnailUrl, previewUrl, blurhash, aspectRatio },
      index,
    ) => ({
      original: previewUrl,
      originalClass: classes.photo,
      thumbnail: thumbnailUrl,
      fullscreen: fullSizePhotoUrl,
      blurhash,
      aspectRatio,
      index,
    }),
  );

  if (!actualPhotos.length) {
    return null;
  }

  return (
    <div
      className={cls(className, classes.photoContainer)}
      style={{ height: constraints.height }}
    >
      <LazyLoad>
        <ImageGallery
          startIndex={START_INDEX}
          showIndex={true}
          items={actualPhotos}
          thumbnailPosition="right"
          onScreenChange={nextFullscreen => setFullscreen(nextFullscreen)}
          onBeforeSlide={nextIndex => setCurrentIndex(nextIndex)}
          disableKeyDown={true}
          disableThumbnailScroll={true}
          renderItem={item => (
            <LazyImage
              className="image-gallery-image"
              aspectRatio={aspectRatios[item.index] || item.aspectRatio || 1}
              description={item.description}
              src={fullscreen ? item.fullscreen : item.original}
              alt={item.originalAlt}
              constraints={constraints}
              title={item.originalTitle}
              blurhash={item.blurhash}
              require={Math.abs(currentIndex - item.index) <= PREFETCH_SLIDES}
            />
          )}
          renderThumbInner={item => (
            <span className="image-gallery-thumbnail-inner">
              <LazyImage
                tag={`thumbnail-${item.index}`}
                className="image-gallery-thumbnail-image"
                aspectRatio={aspectRatios[item.index] || item.aspectRatio || 1}
                src={item.thumbnail}
                width={100}
                alt={item.thumbnailAlt}
                title={item.thumbnailTitle}
                blurhash={item.blurhash}
                require={true}
                onLoad={({ aspectRatio }) =>
                  setAspectRatios(prevRatios => ({
                    ...prevRatios,
                    [item.index]: aspectRatio,
                  }))
                }
              />
            </span>
          )}
        />
      </LazyLoad>
    </div>
  );
}

const RATIOS = {
  FULLSCREEN: {
    HEIGHT: { PERCENT: 100, CORRECTION_PX: 0, MAX_PX: Infinity },
    WIDTH: { PERCENT: 100, CORRECTION_PX: -100, MAX_PX: Infinity },
  },
  DEFAULT: {
    HEIGHT: { PERCENT: 50, CORRECTION_PX: 0, MAX_PX: 1024 },
    WIDTH: { PERCENT: 100, CORRECTION_PX: -450, MAX_PX: 1024 },
  },
};
function resolveImageConstraints(fullscreen, { vh, vw }) {
  const { HEIGHT, WIDTH } = fullscreen ? RATIOS.FULLSCREEN : RATIOS.DEFAULT;
  return {
    height: calc(HEIGHT, vh),
    width: calc(WIDTH, vw),
  };

  function calc(CONFIG, unit) {
    return Math.min(
      CONFIG.PERCENT * unit + CONFIG.CORRECTION_PX,
      CONFIG.MAX_PX,
    );
  }
}
