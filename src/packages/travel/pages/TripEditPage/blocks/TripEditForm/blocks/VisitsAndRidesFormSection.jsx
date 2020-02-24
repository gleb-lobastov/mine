import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import Sortable from '../../../Sortable';
import VisitCreator from '../../VisitCreator';
import VisitAndRidesFormSection from './VisitAndRidesFormSection';

export default function VisitsAndRidesFormSection({ provision, formikProps }) {
  const { values } = formikProps;
  const { visits: visitsFormValues } = values;

  const [visitCreatorNodeIndex, setVisitCreatorNodeIndex] = useState(
    visitsFormValues.length,
  );

  return (
    <FieldArray
      name="visits"
      render={arrayHelpers => (
        <Sortable
          onSortEnd={data => {
            const { oldIndex, newIndex } = data;
            const isVisitCreatorNodeMoved = oldIndex === visitCreatorNodeIndex;
            if (isVisitCreatorNodeMoved) {
              setVisitCreatorNodeIndex(newIndex);
            } else {
              arrayHelpers.move(oldIndex, newIndex);
            }
          }}
        >
          {visitsFormValues.flatMap((visitFormValues, indexOfVisit) => {
            const { visitId } = visitFormValues;
            const prevVisitFormValues =
              visitsFormValues[indexOfVisit - 1] || null;
            const nextVisitFormValues =
              visitsFormValues[indexOfVisit + 1] || null;
            const visitAndRidesFormSectionNode = (
              <VisitAndRidesFormSection
                key={`v${visitId}`}
                index={indexOfVisit /* for SortableNode */}
                visitsFormValues={visitsFormValues}
                visitFormValues={visitFormValues}
                prevVisitFormValues={prevVisitFormValues}
                nextVisitFormValues={nextVisitFormValues}
                formikProps={formikProps}
                provision={provision}
              />
            );

            const shouldInsertVisitCreatorNodeBeforeFormSection =
              visitCreatorNodeIndex === indexOfVisit;
            const shouldInsertVisitCreatorNodeAfterFormSection =
              visitCreatorNodeIndex === visitsFormValues.length &&
              visitCreatorNodeIndex === indexOfVisit + 1;

            if (
              !shouldInsertVisitCreatorNodeBeforeFormSection &&
              !shouldInsertVisitCreatorNodeAfterFormSection
            ) {
              return visitAndRidesFormSectionNode;
            }

            const visitCreatorNode = (
              <VisitCreator key="visitCreator" onVisitUpdate={newVisit => {}} />
            );

            if (shouldInsertVisitCreatorNodeBeforeFormSection) {
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
