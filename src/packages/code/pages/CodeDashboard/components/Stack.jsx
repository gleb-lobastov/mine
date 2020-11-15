import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Skill from './Skill';

const useStyles = makeStyles(theme => ({
  stackContainer: {
    marginTop: '24px',
    display: 'inline-flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  gap: {
    margin: `${theme.spacing(0.5)}px`,
  },
}));

export default function Stack({ className, stack, skills }) {
  const classes = useStyles();
  if (!stack) {
    return null;
  }
  return (
    <div className={cls(classes.stackContainer, className)}>
      {stack.map(skillFromStack => {
        const { title: skillTitle, description } = skillFromStack;
        const skillFromSkills = skills.find(
          ({ title }) => title.toLowerCase() === skillTitle.toLowerCase(),
        );
        return (
          <Skill
            key={skillTitle}
            {...skillFromSkills}
            {...skillFromStack}
            className={classes.gap}
            description={
              /* always override, because description from skills is not relevant */
              description
            }
            isOutdated={
              /* skill from stack is relevant in period of stack usage */
              false
            }
          />
        );
      })}
    </div>
  );
}
