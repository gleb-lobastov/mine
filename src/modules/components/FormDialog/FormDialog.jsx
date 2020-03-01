import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const TRANSITION_DURATION_MS = 500;

export default function({
  initialValues,
  isOpen,
  onSubmit,
  onReset,
  title,
  description,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {formikProps => (
        <Dialog
          transitionDuration={TRANSITION_DURATION_MS}
          open={isOpen}
          onClose={onReset}
          aria-labelledby="form-dialog"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
            {React.cloneElement(children, { formikProps })}
          </DialogContent>
          <DialogActions>
            <Button onClick={onReset} color="secondary">
              Отмена
            </Button>
            <Button onClick={formikProps.handleSubmit} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
}
