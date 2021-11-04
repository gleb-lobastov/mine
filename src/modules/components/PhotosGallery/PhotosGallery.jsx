import React, { useState, useMemo, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import cls from 'classnames';
import LazyLoad from 'react-lazy-load';
import ImageGallery from 'react-image-gallery';
import { makeStyles } from '@material-ui/core/styles';
import LazyImage from './components/LazyImage';
import { useLayoutContext } from 'modules/components/LayoutContext';

const FALLBACK_ASPECT_RATIO = 1;
const PREFETCH_SLIDES = 1;
const START_INDEX = 0;
const THUMB_WIDTH_WITHOUT_BORDERS_PX = 92;

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

export default function PhotosGallery({ className, photos }) {
  const uniqKey = useMemo(() => uuidV4(), []);
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
          `[data-tag="photos-gallery-thumb-${uniqKey}-${currentIndex}"]`,
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
      {
        fullSizePhotoUrl,
        thumbnailUrl,
        previewUrl,
        blurhash,
        aspectRatio,
        description,
      },
      index,
    ) => ({
      original: previewUrl,
      originalClass: classes.photo,
      thumbnail: thumbnailUrl,
      fullscreen: fullSizePhotoUrl,
      description,
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
              aspectRatio={
                aspectRatios[item.index] ||
                item.aspectRatio ||
                FALLBACK_ASPECT_RATIO
              }
              description={item.description}
              src={fullscreen ? item.fullscreen : item.original}
              alt={item.originalAlt}
              constraints={constraints}
              title={item.originalTitle}
              blurhash={item.blurhash}
              require={Math.abs(currentIndex - item.index) <= PREFETCH_SLIDES}
            >
              {item.description && (
                <span className="image-gallery-description">
                  {item.description}
                </span>
              )}
            </LazyImage>
          )}
          renderThumbInner={item => (
            <span className="image-gallery-thumbnail-inner">
              <LazyImage
                tag={`photos-gallery-thumb-${uniqKey}-${item.index}`}
                className="image-gallery-thumbnail-image"
                aspectRatio={
                  aspectRatios[item.index] ||
                  item.aspectRatio ||
                  FALLBACK_ASPECT_RATIO
                }
                src={item.thumbnail}
                width={THUMB_WIDTH_WITHOUT_BORDERS_PX}
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
    HEIGHT: { PERCENT: 100, MAX_PX: Infinity },
    WIDTH: { PERCENT: 100, MAX_PX: Infinity },
  },
  DEFAULT: {
    HEIGHT: { PERCENT: 50, MAX_PX: 1024 },
    WIDTH: { PERCENT: 100, MAX_PX: 1024 },
  },
};
function resolveImageConstraints(fullscreen, { vh, vw }) {
  const { HEIGHT, WIDTH } = fullscreen ? RATIOS.FULLSCREEN : RATIOS.DEFAULT;
  return {
    height: calc(HEIGHT, vh),
    width: calc(WIDTH, vw),
  };

  function calc(CONFIG, unit) {
    return Math.min(CONFIG.PERCENT * unit, CONFIG.MAX_PX);
  }
}
