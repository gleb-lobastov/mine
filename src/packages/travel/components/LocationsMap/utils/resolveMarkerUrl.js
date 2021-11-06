import {
  MARKERS_SCALE_BY_SOURCES,
  MARKERS_SCALE_BY_TIME_FILENAMES,
  MARKERS_SCALE_IMAGES_BASE_PATH,
} from '../consts';

export default function resolveMarkerUrl(step, scaleBy) {
  if (!scaleBy) {
    return `${MARKERS_SCALE_IMAGES_BASE_PATH}${
      MARKERS_SCALE_BY_TIME_FILENAMES[0]
    }`;
  }
  const markerSources = MARKERS_SCALE_BY_SOURCES[scaleBy];
  const subPath = markerSources[step - 1] || markerSources[0];
  return `${MARKERS_SCALE_IMAGES_BASE_PATH}${subPath}`;
}
