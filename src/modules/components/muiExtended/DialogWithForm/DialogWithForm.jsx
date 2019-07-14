import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogWithForm = ({
  children,
  description,
  onReject: handleReject,
  onSubmit: handleSubmit,
  title,
  ...forwardedProps
}) => (
  <Formik {...forwardedProps} onSubmit={handleSubmit}>
    {({ handleSubmit: handleSubmitInternal, ...formikProps }) => (
      <Dialog
        transitionDuration={500}
        open={true}
        onClose={handleReject}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          {React.cloneElement(children, formikProps)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReject} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSubmitInternal} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    )}
  </Formik>
);

DialogWithForm.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.node,
  onReject: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.node,
};
DialogWithForm.defaultProps = {
  description: undefined,
  title: undefined,
};

export default DialogWithForm;
