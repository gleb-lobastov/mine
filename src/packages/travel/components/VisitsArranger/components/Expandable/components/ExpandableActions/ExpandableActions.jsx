import React from 'react';
import Typography from '@material-ui/core/Typography';
import MUILink from '@material-ui/core/Link';

export default function ExpandableActions({
  className,
  onExpand,
  onExpandAll,
  diffCount,
}) {
  return (
    <Typography className={className} variant="body2">
      <MUILink onClick={onExpand}>{`показать еще ${diffCount}`}</MUILink>
      {Boolean(onExpandAll) && (
        <>
          {', '}
          <MUILink onClick={onExpandAll}>раскрыть все</MUILink>
        </>
      )}
    </Typography>
  );
}
