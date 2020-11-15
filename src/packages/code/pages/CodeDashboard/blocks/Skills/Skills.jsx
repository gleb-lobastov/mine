import React from 'react';
import sortBy from 'lodash/sortBy';
import property from 'lodash/property';
import { makeStyles } from '@material-ui/core/styles';
import Skill from '../../components/Skill';

const useStyles = makeStyles(theme => ({
  skillsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: `${theme.spacing(1)}px`,
  },
}));

export default React.memo(function Skills({ skills }) {
  const classes = useStyles();
  return (
    <div className={classes.skillsContainer}>
      {sortBy(skills, property('title')).map(skill => (
        <Skill {...skill} />
      ))}
    </div>
  );
});
