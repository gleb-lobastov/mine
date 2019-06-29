import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ridePropTypes from 'travel/models/rides/propTypes';
import VisitEditCard, { useVisitState } from './blocks/VisitEditCard';

const VisitEditDialog = ({ initialState, children, onSubmit: handleSubmit }) => {
  const { visitState, setVisitState } = useVisitState(initialState);
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitInternal = () => {
    handleSubmit(visitState);
    handleClose(false);
  };

  return (
    <>
      <IconButton
        data-sort-handler="disabled"
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        {children}
      </IconButton>
      {isOpen && (
        <Dialog
          transitionDuration={500}
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Поездка</DialogTitle>
          <DialogContent>
            <DialogContentText>Редактирование поездки</DialogContentText>
            <VisitEditCard visitState={visitState} setVisitState={setVisitState} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Отмена
            </Button>
            <Button onClick={handleSubmitInternal} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

VisitEditDialog.propTypes = {
  initialState: PropTypes.shape(ridePropTypes).isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
VisitEditDialog.defaultProps = {};

export default VisitEditDialog;
