import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles(theme => ({
  sidebar: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  sidebarContent: {
    position: 'sticky',
    top: '108px',
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));
