import React, { useState } from 'react';
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
  compact: {
    '&:not($ghost)': {
      marginTop: '-52px',
    },
  },
  ghost: {},
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
  const [sortingIndex, setSortingIndex] = useState(null);

  const showCreationDialog = (dialogName, dialogParams) => {
    const [prevVisit, visit] = neighbors(formVisitsIds, creatorsNodeIndex).map(
      visitId => (visitId && visitsDict[visitId]) || null,
    );
    showDialog(dialogName, {
      ...dialogParams,
      orderInTrip: calculateOrderInTripBetweenTwoVisits(prevVisit, visit),
    });
  };

  if (!formVisitsIds.length) {
    return <VisitCreator key="visitCreator" showDialog={showCreationDialog} />;
  }

  return (
    <FieldArray
      name="trip.visits"
      render={arrayHelpers => (
        <Sortable
          useWindowAsScrollContainer={true}
          className={classes.resetFlow}
          onSortStart={({ index }) => {
            setSortingIndex(index);
          }}
          onSortEnd={data => {
            setSortingIndex(null);
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

            const {
              isArrivalRideMatch,
              isDepartureRideMatch,
            } = checkIsRidesMatch(prevVisit, visit, nextVisit);

            const shouldCollapseRides =
              indexOfVisit >= 1 &&
              isArrivalRideMatch &&
              creatorsNodeIndex !== indexOfVisit;

            const visitAndRidesFormSectionNode = (
              <VisitAndRidesFormSection
                key={`v${formVisitId}`}
                index={indexOfVisit /* for SortableNode */}
                style={{ zIndex: formVisitsIds.length - indexOfVisit }}
                className={cls({
                  [classes.compact]: shouldCollapseRides,
                  [classes.ghost]: sortingIndex === indexOfVisit,
                })}
                showDialog={showDialog}
                isArrivalRideMatch={isArrivalRideMatch}
                isDepartureRideMatch={isDepartureRideMatch}
                prevVisit={prevVisit}
                visit={visit}
                nextVisit={nextVisit}
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

function neighbors(array, index) {
  const prevValue = array[index - 1] || null;
  const value = array[index] || null;
  const nextValue = array[index + 1] || null;
  return [prevValue, value, nextValue];
}
