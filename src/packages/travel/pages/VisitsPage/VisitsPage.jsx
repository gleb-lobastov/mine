import React from 'react';
import { FeatureToggle } from 'modules/components/FeatureToggles';
import RefactoredVisitsPage from '../RefactoredVisitsPage';
import DeprecatedVisitsPage from './DeprecatedVisitsPage';

export default function VisitsPage(props) {
  return (
    <FeatureToggle name="visitsPageRefactor">
      <RefactoredVisitsPage {...props} />
      <FeatureToggle.Fallback>
        <DeprecatedVisitsPage {...props} />
      </FeatureToggle.Fallback>
    </FeatureToggle>
  );
}
