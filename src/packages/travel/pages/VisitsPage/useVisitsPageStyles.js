import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  group: {
    '&:not(:first-of-type)': {
      marginTop: theme.spacing(4),
    },

    '& ~ $subgroup': {
      marginTop: theme.spacing(2),
    },

    '& + $subgroup ': {
      marginTop: 0,
    },
  },
  subgroup: {},
}));
