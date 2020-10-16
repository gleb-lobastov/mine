import React from 'react';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { usePaths } from 'modules/packages';
import FlockingBoids from './blocks/FlockingBoids';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '16px',
    position: 'relative',
    margin: '0 auto',
    minHeight: '100%',
  },
  title: {
    margin: '0 -12px',
    fontSize: '72px',
    fontFamily: "'Press Start 2P', 'Roboto', sans-serif",
    fontWeight: 900,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleItem: {
    margin: '6px 12px',
  },
  avatarContainer: {
    height: '192px',
    margin: '0 36px',
  },
  avatar: {
    height: '100%',
    borderRadius: '100%',
    display: 'inline-block',
  },
  linksList: {
    marginTop: '24px',
  },
  flockGameBoard: {
    position: 'absolute',
    top: '-24px',
    left: '-24px',
    height: 'calc(100% + 48px)',
    width: 'calc(100% + 48px)',
  },
  [theme.breakpoints.down('sm')]: {
    title: {
      fontSize: '48px',
    },
    avatarContainer: {
      margin: '0 24px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      fontSize: '36px',
    },
    avatarContainer: {
      margin: '18px -25px',
      overflow: 'hidden',
      order: 1,
    },
    avatar: {
      borderRadius: '0%',
      width: '100%',
      height: 'auto',
      transform: 'translate(0,-25%)',
    },
    linksList: {
      marginTop: '0',
    },
  },
}));

export default function MainDashboard() {
  const classes = useStyles();
  const {
    code: { entry: codePath },
    literature: { articles: articlesPath, books: booksPath },
    travel: { entry: travelPath },
  } = usePaths();

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.title}>
        <span className={classes.titleItem}>Моя</span>
        <div className={cls(classes.avatarContainer, classes.titleItem)}>
          <img
            className={classes.avatar}
            src="https://res.cloudinary.com/dc2eke0gj/image/upload/_vlywcy.jpg"
            alt="Мое фото"
          />
        </div>
        <span className={classes.titleItem}>страница</span>
        <span className={classes.titleItem}>в</span>
        <span className={classes.titleItem}>сети</span>
        <span className={classes.titleItem}>интернет</span>
      </Typography>
      <div className={classes.flockGameBoard}>
        <FlockingBoids />
      </div>
      <div className={classes.linksList}>
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
    </div>
  );
}
