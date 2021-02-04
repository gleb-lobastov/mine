import React, { useState } from 'react';
import QueryControls from './QueryControls';
import { IMPORTANCE_LEVELS } from './consts';

export default function useSkillQuery() {
  const [skillsQuery, setSkillsQuery] = useState({
    filter: { importanceLevel: IMPORTANCE_LEVELS.ACTUAL },
  });

  return {
    skillsQuery,
    skillsQueryControlsNode: (
      <QueryControls value={skillsQuery} onChange={setSkillsQuery} />
    ),
  };
}
