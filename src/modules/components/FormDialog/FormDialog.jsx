import React from 'react';
import { Formik } from 'formik';
import Dialog from '../Dialog';

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
          description={description}
          onClose={onReset}
          open={isOpen}
          primaryButtonCaption="Сохранить"
          primaryButtonHandler={formikProps.handleSubmit}
          secondaryButtonCaption="Отмена"
          secondaryButtonHandler={onReset}
          title={title}
        >
          {React.cloneElement(children, { formikProps })}
        </Dialog>
      )}
    </Formik>
  );
}
