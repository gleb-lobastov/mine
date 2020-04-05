import React from 'react';
import { Formik } from 'formik';
import Dialog from '../Dialog';

export default function({
  'data-locator': dataLocator,
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
          data-locator={dataLocator}
          description={description}
          onClose={onReset}
          isOpen={isOpen}
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
