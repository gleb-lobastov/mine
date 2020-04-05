import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import CreateButton from './buttons/CreateButton';
import EditButton from './buttons/EditButton';
import DeleteButton from './buttons/DeleteButton';

const useStyles = makeStyles({
  actions: {
    display: 'inline-block',
  },
});

export default function Actions({
  'data-locator': dataLocator,
  className,
  isEntityExist,
  onEditClick,
  onDeleteClick,
  onCreateClick,
}) {
  const classes = useStyles();
  const hasCreateAction = !isEntityExist && Boolean(onCreateClick);
  const hasEditAction = isEntityExist && Boolean(onEditClick);
  const hasDeleteAction = isEntityExist && Boolean(onDeleteClick);
  return (
    <div
      data-locator={dataLocator}
      data-sort-handler="disabled"
      className={cls(classes.actions, className)}
    >
      {hasCreateAction && <CreateButton onClick={onCreateClick} />}
      {hasEditAction && <EditButton onClick={onEditClick} />}
      {hasDeleteAction && <DeleteButton onClick={onDeleteClick} />}
    </div>
  );
}
