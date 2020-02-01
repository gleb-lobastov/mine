import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default function() {
  return makeStyles(theme => ({
    sidebar: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }));
}
