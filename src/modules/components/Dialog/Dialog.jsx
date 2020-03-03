import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const TRANSITION_DURATION_MS = 500;

export default function({
  isOpen,
  title,
  description,
  children,
  primaryButtonCaption,
  primaryButtonHandler,
  secondaryButtonCaption,
  secondaryButtonHandler,
  onClose,
}) {
  return (
    <Dialog
      transitionDuration={TRANSITION_DURATION_MS}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        {secondaryButtonHandler && (
          <Button onClick={secondaryButtonHandler} color="secondary">
            {secondaryButtonCaption}
          </Button>
        )}
        {primaryButtonHandler && (
          <Button onClick={primaryButtonHandler} color="primary">
            {primaryButtonCaption}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
