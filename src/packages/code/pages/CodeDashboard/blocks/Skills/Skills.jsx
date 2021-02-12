import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import sortBy from 'lodash/sortBy';
import property from 'lodash/property';
import { makeStyles } from '@material-ui/core/styles';
import Skill from '../../components/Skill';
import { IMPORTANCE_LEVELS } from './consts';

export { default as useSkillsQuery } from './useSkillsQuery';

const useStyles = makeStyles(theme => ({
  skillsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  gap: {
    margin: `${theme.spacing(0.5)}px`,
  },
}));

export default React.memo(function Skills({
  skills,
  query: { filter: skillsFilter } = {},
}) {
  const classes = useStyles();
  const actualSkills = filterSkills(skills, skillsFilter);

  return (
    <Flipper
      className={classes.skillsContainer}
      flipKey={skillsFilter.importanceLevel}
    >
      {sortBy(actualSkills, property('title')).map((skill, index) => (
        <Skill
          {...skill}
          key={skill.title || `skill${index}`}
          flipId={skill.title || `skill${index}`}
          className={classes.gap}
        />
      ))}
    </Flipper>
  );
});

function filterSkills(skills, { importanceLevel } = {}) {
  switch (importanceLevel) {
    case IMPORTANCE_LEVELS.PRIMARY:
      return skills.filter(({ isPrimary }) => isPrimary);
    case IMPORTANCE_LEVELS.ACTUAL:
      return skills.filter(({ isOutdated, isSupreficial }) => !isOutdated && !isSupreficial);
    case IMPORTANCE_LEVELS.ALL:
    default:
      return skills;
  }
}
