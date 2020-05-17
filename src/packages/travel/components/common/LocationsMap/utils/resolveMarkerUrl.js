import {
  MARKERS_SCALE_BY_SOURCES,
  MARKERS_SCALE_IMAGES_BASE_PATH,
} from '../consts';

export default function resolveMarkerUrl(step, scaleBy) {
  const markerSources = MARKERS_SCALE_BY_SOURCES[scaleBy];
  const subPath = markerSources[step - 1] || markerSources[0];
  return `${MARKERS_SCALE_IMAGES_BASE_PATH}${subPath}`;
}
