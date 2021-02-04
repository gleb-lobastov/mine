import React from 'react';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { IMPORTANCE_LEVELS } from './consts';

export default function QueryControls({ value: query, onChange }) {
  const { filter: { importanceLevel } = {} } = query;
  const handleSetImportanceLevel = (event, nextImportanceLevel) => {
    onChange({
      ...query,
      filter: {
        ...query.filter,
        importanceLevel: nextImportanceLevel,
      },
    });
  };

  return (
    <ToggleButtonGroup
      value={importanceLevel}
      exclusive={true}
      onChange={handleSetImportanceLevel}
      aria-label="importance level"
    >
      <ToggleButton value={IMPORTANCE_LEVELS.PRIMARY} aria-label="left aligned">
        <Typography>Основные</Typography>
      </ToggleButton>
      <ToggleButton value={IMPORTANCE_LEVELS.ACTUAL} aria-label="centered">
        <Typography>Актуальные</Typography>
      </ToggleButton>
      <ToggleButton value={IMPORTANCE_LEVELS.ALL} aria-label="right aligned">
        <Typography>Все</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

QueryControls.defaultProps = {
  value: {},
  onChange: () => {},
};
