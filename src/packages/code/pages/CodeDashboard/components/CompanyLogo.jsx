import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    border: 0,
    borderRadius: '100%',
    display: 'flex',
    height: '64px',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: 0,
    width: '64px',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  shortName: {
    fontWeight: 500,
    fontSize: 24,
  },
}));

export default function CompanyLogo({ src, name, component: Component }) {
  const classes = useStyles();
  return (
    <Component className={classes.container}>
      {src ? (
        <img className={classes.image} src={src} alt={`${name} logo`} />
      ) : (
        <div className={classes.shortName}>{pickShortName(name)}</div>
      )}
    </Component>
  );
}

function pickShortName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

CompanyLogo.defaultProps = {
  component: ({ children, ...props }) => <div {...props}>{children}</div>,
};
