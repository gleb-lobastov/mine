import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { withPaths } from 'core/context/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  title: {
    margin: '0 0 32px',
    fontSize: '5rem',
  },
  avatar: {
    height: '216px',
    borderRadius: '100%',
    marginLeft: '72px',
    display: 'block',
  },
  [theme.breakpoints.down('sm')]: {
    title: {
      fontSize: '4rem',
    },
    avatar: {
      height: '180px',
      marginLeft: '60px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      fontSize: '2rem',
    },
    avatar: {
      height: '108px',
      marginLeft: '36px',
    },
  },
}));

function MainDashboard({
  namedPaths: {
    code: { entry: codePath },
    literature: { articles: articlesPath, books: booksPath },
    travel: { entry: travelPath },
  },
}) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h1" className={classes.title}>
          <span>Мое, персональное, в&nbsp;интернете</span>
        </Typography>
        <List>
          <ListItem button={true} component={Link} to={codePath.toUrl()}>
            <ListItemText primary="Кем работаю" />
          </ListItem>
          <ListItem button={true} component={Link} to={travelPath.toUrl()}>
            <ListItemText primary="Где был и сколько раз" />
          </ListItem>
          <ListItem button={true} component={Link} to={booksPath.toUrl()}>
            <ListItemText primary="Что читал" />
          </ListItem>
          <ListItem button={true} component={Link} to={articlesPath.toUrl()}>
            <ListItemText primary="Что написал" />
          </ListItem>
        </List>
      </div>
      <img
        className={classes.avatar}
        src="/mine/static/me.jpg"
        alt="Мое фото"
      />
    </div>
  );
}

export default withPaths(MainDashboard);
