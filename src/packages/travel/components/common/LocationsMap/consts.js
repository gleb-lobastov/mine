export const KEY_MARKERS_SCALE_BY = 'scale';

export const MARKERS_SCALES = {
  BY_FIRST_VISIT: 'fv',
  BY_LAST_VISIT: 'lv',
  BY_VISITS_COUNT: 'vc',
  BY_RATING: 'r',
};

export const MARKERS_SCALE_DEFAULT = MARKERS_SCALES.BY_FIRST_VISIT;

export const MARKERS_SCALE_IMAGES_BASE_PATH =
  'https://res.cloudinary.com/dc2eke0gj/image/upload/markers/';

export const MARKERS_SCALE_BY_TIME_FILENAMES = [
  'step_by_time_1_zjtrlw.png',
  'step_by_time_2_tvotvg.png',
  'step_by_time_3_ylj1vi.png',
  'step_by_time_4_uovfrs.png',
  'step_by_time_5_s4jq0u.png',
  'step_by_time_6_lmihnf.png',
];

export const MARKERS_SCALE_BY_RATING_FILENAMES = [
  'step_by_rating_1_id2qgb.png',
  'step_by_rating_2_iiqvik.png',
  'step_by_rating_3_x2gzsd.png',
  'step_by_rating_4_cbqdcn.png',
  'step_by_rating_5_viyhls.png',
  'step_by_rating_6_zzfgki.png',
  'step_by_rating_7_pjjhhq.png',
  'step_by_rating_8_vgetsd.png',
  'step_by_rating_9_t6tenz.png',
  'step_by_rating_10_yjywr0.png',
];

export const MARKERS_SCALE_BY_VISITS_FILENAMES = [
  'step_by_visits_1_zv3tba.png',
  'step_by_visits_2_qthjqa.png',
  'step_by_visits_3_xcjyla.png',
  'step_by_visits_4_kwdwka.png',
  'step_by_visits_5_xnnipa.png',
];

export const MARKERS_SCALE_BY_SOURCES = {
  [MARKERS_SCALES.BY_FIRST_VISIT]: MARKERS_SCALE_BY_TIME_FILENAMES,
  [MARKERS_SCALES.BY_LAST_VISIT]: MARKERS_SCALE_BY_TIME_FILENAMES,
  [MARKERS_SCALES.BY_VISITS_COUNT]: MARKERS_SCALE_BY_VISITS_FILENAMES,
  [MARKERS_SCALES.BY_RATING]: MARKERS_SCALE_BY_RATING_FILENAMES,
};
