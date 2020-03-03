import React from 'react';
import Dialog from 'modules/components/Dialog';
import VisitInfo from 'travel/components/models/visits/VisitInfo';

export default function VisitDeleteDialog({
  visit,
  onSubmit,
  onReset,
  ...forwardingProps
}) {
  return (
    <Dialog
      title="Удалить посещение"
      description="Вы действительно хотите удалить посещение"
      primaryButtonCaption="Да"
      primaryButtonHandler={event => onSubmit(event, visit)}
      secondaryButtonCaption="Нет"
      secondaryButtonHandler={onReset}
      {...forwardingProps}
    >
      <VisitInfo visit={visit} />
    </Dialog>
  );
}
