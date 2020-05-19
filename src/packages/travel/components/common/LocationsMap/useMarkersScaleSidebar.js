import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSidebar } from 'core/context/SidebarContext';
import MarkersScaleSelect from './blocks/MarkersScaleSelect';
import MarkersRatingLevelSelect from './blocks/MarkersRatingLevelSelect';
import {
  MARKERS_SCALES,
  KEY_MARKERS_SCALE_BY,
  MARKERS_SCALE_DEFAULT,
  MARKERS_RATING_LEVELS,
  KEY_MARKERS_RATING_LEVEL,
  MARKERS_RATING_LEVEL_DEFAULT,
} from './consts';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
});

export default function(setQueryFilter, queryFilter) {
  const classes = useStyles();
  const {
    [KEY_MARKERS_SCALE_BY]: scaleByQuery,
    [KEY_MARKERS_RATING_LEVEL]: ratingLevelQuery,
  } = queryFilter || {};
  const scaleBy = resolveActualScaleBy(scaleByQuery);
  const ratingLevel = resolveActualRatingLevel(ratingLevelQuery);
  useSidebar(
    ({ closeSidebar }) => (
      <>
        <MarkersScaleSelect
          classes={classes}
          onClose={closeSidebar}
          scaleBy={scaleBy}
          onChange={setQueryFilter}
        />
        {scaleBy === MARKERS_SCALES.BY_RATING && (
          <MarkersRatingLevelSelect
            classes={classes}
            onClose={closeSidebar}
            ratingLevel={ratingLevel}
            onChange={setQueryFilter}
          />
        )}
      </>
    ),
    [scaleBy, ratingLevel],
  );

  return { scaleBy, ratingLevel };
}

function resolveActualScaleBy(scaleByQuery) {
  return Object.values(MARKERS_SCALES).includes(scaleByQuery)
    ? scaleByQuery
    : MARKERS_SCALE_DEFAULT;
}
function resolveActualRatingLevel(ratingLevelQuery) {
  return Object.values(MARKERS_RATING_LEVELS).includes(ratingLevelQuery)
    ? ratingLevelQuery
    : MARKERS_RATING_LEVEL_DEFAULT;
}
