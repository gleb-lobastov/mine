import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TripEditFormSection from './blocks/TripEditFormSection';
import VisitsAndRidesFormSection from './blocks/VisitsAndRidesFormSection/VisitsAndRidesFormSection';
import TripEditTitle from './blocks/TripEditTitle';
import * as locators from '../../locators';

const useStyles = makeStyles({
  container: {
    '&:hover $visibleOnlyOnHover': {
      visibility: 'visible',
    },
  },
  visibleOnlyOnHover: {
    visibility: 'hidden',
  },
});

const TripEditForm = ({ isCreation, showDialog, provision, formikProps }) => {
  const classes = useStyles();

  return (
    <>
      <TripEditTitle
        className={classes.container}
        formikProps={formikProps}
        isCreation={isCreation}
        provision={provision}
      />
      <Form>
        <TripEditFormSection formikProps={formikProps} provision={provision} />
        <VisitsAndRidesFormSection
          classes={classes}
          showDialog={showDialog}
          formikProps={formikProps}
          provision={provision}
        />
        <Button
          data-locator={locators.SUBMIT_TRIP_BUTTON}
          type="submit"
          color="primary"
        >
          Сохранить
        </Button>
      </Form>
    </>
  );
};

TripEditForm.propTypes = {
  isCreation: PropTypes.bool.isRequired,
};

TripEditForm.defaultProps = {};

export default TripEditForm;
