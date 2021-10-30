import { makeStyles } from '@material-ui/core/styles';

export default function makeVisibleOnHoverStyles({
  containerClassName = 'hoverTrigger',
  contentClassName = 'visibleOnHover',
} = {}) {
  return makeStyles({
    [containerClassName]: {
      '&:hover $visibleOnlyOnHover': {
        visibility: 'visible',
      },
    },
    [contentClassName]: {
      visibility: 'hidden',
    },
  });
}

export const useVisibleOnHoverStyles = makeVisibleOnHoverStyles();
