import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { FieldArray } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import checkIsVisitsConnectedByRide from 'travel/utils/checkIsVisitsConnectedByRide';
import Sortable from 'modules/components/Sortable';
import VisitCreator from './blocks/VisitCreator';
import VisitAndRidesFormSection from './blocks/VisitAndRidesFormSection';

const useStyles = makeStyles({
  creatorsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  isCompact: {
    marginTop: '-52px',
  },
  resetFlow: {
    transform: 'translate(0, 0)',
  },
});

function checkIsRidesMatch(
  prevVisitFormValues,
  visitFormValues,
  nextVisitFormValues,
) {
  const isArrivalRideMatch = checkIsVisitsConnectedByRide(
    prevVisitFormValues,
    visitFormValues,
  );
  const isDepartureRideMatch = checkIsVisitsConnectedByRide(
    visitFormValues,
    nextVisitFormValues,
  );
  return { isDepartureRideMatch, isArrivalRideMatch };
}

export default function VisitsAndRidesFormSection({
  showDialog,
  provision,
  formikProps,
}) {
  const { values } = formikProps;
  const {
    trip: { visits: formVisitsIds },
  } = values;

  const { visitsDict } = provision;

  const classes = useStyles();

  const [creatorsNodeIndex, setCreatorsNodeIndex] = useState(
    formVisitsIds.length,
  );
  const [isSorting, setIsSorting] = useState(false);

  const showCreationDialog = (dialogName, entityId, initialValues) => {
    const [prevVisit, visit] = neighbors(formVisitsIds, creatorsNodeIndex).map(
      visitId => (visitId && visitsDict[visitId]) || null,
    );
    showDialog(dialogName, entityId, {
      ...initialValues,
      orderInTrip: calculateOrderInTripBetweenTwoVisits(prevVisit, visit),
    });
  };
  return (
    <FieldArray
      name="trip.visits"
      render={arrayHelpers => (
        <Sortable
          className={classes.resetFlow}
          updateBeforeSortStart={() => setIsSorting(true)}
          onSortEnd={data => {
            setIsSorting(false);
            const { oldIndex, newIndex } = data;
            const isVisitCreatorNodeMoved = oldIndex === creatorsNodeIndex;
            if (isVisitCreatorNodeMoved) {
              setCreatorsNodeIndex(newIndex);
            } else {
              arrayHelpers.move(oldIndex, newIndex);
            }
          }}
        >
          {formVisitsIds.flatMap((formVisitId, indexOfVisit) => {
            const [prevVisit, visit, nextVisit] = neighbors(
              formVisitsIds,
              indexOfVisit,
            ).map(visitId => (visitId && visitsDict[visitId]) || null);

            const { arrivalRideId } = visit;
            const {
              isArrivalRideMatch,
              isDepartureRideMatch,
            } = checkIsRidesMatch(prevVisit, visit, nextVisit);
            const visitAndRidesFormSectionNode = (
              <VisitAndRidesFormSection
                key={`v${formVisitId}`}
                index={indexOfVisit /* for SortableNode */}
                style={{ zIndex: formVisitsIds.length - indexOfVisit }}
                className={cls({
                  [classes.isCompact]:
                    indexOfVisit >= 1 &&
                    !isSorting &&
                    isArrivalRideMatch &&
                    arrivalRideId &&
                    creatorsNodeIndex !== indexOfVisit,
                })}
                showDialog={showDialog}
                isArrivalRideMatch={isArrivalRideMatch}
                isDepartureRideMatch={isDepartureRideMatch}
                visit={visit}
                formikProps={formikProps}
                provision={provision}
              />
            );

            const shouldInsertCreatorsNodeBeforeFormSection =
              creatorsNodeIndex === indexOfVisit;
            const shouldInsertCreatorsNodeAfterFormSection =
              creatorsNodeIndex === formVisitsIds.length &&
              creatorsNodeIndex === indexOfVisit + 1;

            if (
              !shouldInsertCreatorsNodeBeforeFormSection &&
              !shouldInsertCreatorsNodeAfterFormSection
            ) {
              return visitAndRidesFormSectionNode;
            }

            const visitCreatorNode = (
              <div style={{ zIndex: formVisitsIds.length + 1 }}>
                <VisitCreator
                  key="visitCreator"
                  showDialog={showCreationDialog}
                />
              </div>
            );

            if (shouldInsertCreatorsNodeBeforeFormSection) {
              return [visitCreatorNode, visitAndRidesFormSectionNode];
            }
            return [visitAndRidesFormSectionNode, visitCreatorNode];
          })}
        </Sortable>
      )}
    />
  );
}

VisitsAndRidesFormSection.propTypes = {};

VisitsAndRidesFormSection.defaultProps = {};

function calculateOrderInTripBetweenTwoVisits(prevVisit, nextVisit) {
  const { orderInTrip: prevOrderInTrip } = prevVisit || {};
  const { orderInTrip: nextOrderInTrip } = nextVisit || {};
  if (!prevVisit) {
    return nextOrderInTrip - 1;
  }
  if (!nextVisit) {
    return prevOrderInTrip + 1;
  }
  const randomness =
    ((Math.random() - 0.5) * (nextOrderInTrip - prevOrderInTrip)) / 2;
  return (prevOrderInTrip + nextOrderInTrip) / 2 + randomness;
}

function neighbors(array, index, mapFn) {
  const prevValue = array[index - 1] || null;
  const value = array[index] || null;
  const nextValue = array[index + 1] || null;
  return [prevValue, value, nextValue];
}
