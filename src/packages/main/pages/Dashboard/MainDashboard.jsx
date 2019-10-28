import React from 'react';
import { Helmet } from 'react-helmet';
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
  },
  title: {
    margin: '0 0 24px',
    fontSize: '72px',
    fontFamily: "'Press Start 2P', 'Roboto', sans-serif",
    fontWeight: 900,
  },
  avatar: {
    height: '216px',
    borderRadius: '100%',
    marginLeft: '36px',
    display: 'block',
  },
  [theme.breakpoints.down('sm')]: {
    title: {
      fontSize: '48px',
    },
    avatar: {
      height: '180px',
      marginLeft: '24px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      fontSize: '36px',
    },
    avatar: {
      height: '108px',
      marginLeft: '16px',
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
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
        </Helmet>
        <Typography variant="h1" className={classes.title}>
          <span>Моя страница в&nbsp;сети интернет</span>
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
