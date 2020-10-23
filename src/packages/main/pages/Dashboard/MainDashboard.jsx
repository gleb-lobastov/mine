import React from 'react';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { usePaths } from 'modules/packages';
import FlockingBoids from './blocks/FlockingBoids';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background:
      'url(https://sun9-55.userapi.com/c831208/v831208479/f5381/KBDMD_juXW8.jpg) no-repeat center bottom',
    backgroundSize: 'cover',
  },
  linksListContainer: {
    backgroundColor: 'rgba(64,64,64,0.6)',
    marginTop: 'auto',
    padding: '12px',
  },
  linksList: {
    padding: 0,
  },
  secondColumnItem: {
    textAlign: 'right',
  },
  title: {
    fontSize: '72px',
    fontFamily: "'Press Start 2P', 'Roboto', sans-serif",
    fontWeight: 900,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: '24px 12px 0',
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
  flockGameBoard: {
    position: 'absolute',
    height: '100%',
    width: '100%',
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
    secondColumnItem: {
      textAlign: 'left',
    },
    title: {
      fontSize: '36px',
    },
    avatarContainer: {
      margin: '18px -12px 0',
      overflow: 'hidden',
      order: 1,
    },
    avatar: {
      borderRadius: '0%',
      width: '100%',
      height: 'auto',
      transform: 'translate(0,-25%)',
    },
    linksListContainer: {
      marginTop: '0',
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
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
    <>
      <div className={classes.background} />
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
        <ThemeProvider theme={darkTheme}>
          <Paper className={classes.linksListContainer}>
            <Grid container={true}>
              <Grid item={true} xs={12} sm={6}>
                <List className={classes.linksList}>
                  <ListItem
                    button={true}
                    component={Link}
                    to={codePath.toUrl()}
                  >
                    <ListItemText primary="Кем работаю" />
                  </ListItem>
                  <ListItem
                    button={true}
                    component={Link}
                    to={travelPath.toUrl()}
                  >
                    <ListItemText primary="Где был и сколько раз" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <List className={classes.linksList}>
                  <ListItem
                    className={classes.secondColumnItem}
                    button={true}
                    component={Link}
                    to={booksPath.toUrl()}
                  >
                    <ListItemText primary="Что читал" />
                  </ListItem>
                  <ListItem
                    className={classes.secondColumnItem}
                    button={true}
                    component={Link}
                    to={articlesPath.toUrl()}
                  >
                    <ListItemText primary="Что написал" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </ThemeProvider>
      </div>
    </>
  );
}
