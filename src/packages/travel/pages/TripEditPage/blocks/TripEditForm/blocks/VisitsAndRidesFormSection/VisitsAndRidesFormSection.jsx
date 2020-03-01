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
    visitsDict: formVisitsDict,
  } = values;

  const classes = useStyles();

  const [creatorsNodeIndex, setCreatorsNodeIndex] = useState(
    formVisitsIds.length,
  );
  const [isSorting, setIsSorting] = useState(false);

  return (
    <FieldArray
      name="trip.visits"
      render={arrayHelpers => (
        <Sortable
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
            const formPrevVisitId = formVisitsIds[indexOfVisit - 1] || null;
            const formNextVisitId = formVisitsIds[indexOfVisit + 1] || null;

            const formPrevVisit =
              (formPrevVisitId && formVisitsDict[formPrevVisitId]) || null;
            const formVisit = formVisitsDict[formVisitId] || null;
            const formNextVisit =
              (formNextVisitId && formVisitsDict[formNextVisitId]) || null;
            const {
              isArrivalRideMatch,
              isDepartureRideMatch,
            } = checkIsRidesMatch(formPrevVisit, formVisit, formNextVisit);
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
                    creatorsNodeIndex !== indexOfVisit,
                })}
                showDialog={showDialog}
                isArrivalRideMatch={isArrivalRideMatch}
                isDepartureRideMatch={isDepartureRideMatch}
                formVisit={formVisit}
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
                <VisitCreator key="visitCreator" showDialog={showDialog} />
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

/*

rb-v-rf
vb-r-vf

o-r1-v1
o-r2-v2

r1-v1-r2-v2-r1

r1-v1-r2
   v2-r2-v3
   v3-r2-v4

r1-v1-r2
   v1-r3-v3
   v1-r4-v4

o-r1-v1-r2-v2-r3-v3-r4-o
o-r1-o o-r2-o v1 v2
o-r1-v1-r2-o o-r1-v2-r2-o
o-r2-v1-r1-o o-r1-v2-r2-o
 */
