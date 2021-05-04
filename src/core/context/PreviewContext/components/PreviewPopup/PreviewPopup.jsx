import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import Paper from '@material-ui/core/Paper';
import PreviewPopupContent from './components/PreviewPopupContent';

const useStyles = makeStyles({
  container: {
    pointerEvents: 'none',
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
});

export default React.forwardRef(PreviewPopup);

function PreviewPopup(
  { hMovePercent, anchorEl, previewProps },
  ref,
) {
  const classes = useStyles();
  return (
    <Portal container={document.body}>
      <Paper ref={ref} className={classes.container} elevation={2}>
        {Boolean(anchorEl) && (
          <PreviewPopupContent
            previewProps={previewProps}
            hMovePercent={hMovePercent}
          />
        )}
      </Paper>
    </Portal>
  );
}
