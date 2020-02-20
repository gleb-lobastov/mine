import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  group: {
    backgroundColor: 'white',
    top: 0,
    '&:not(:first-of-type)': {
      marginTop: theme.spacing(5),
    },

    '& ~ $subgroup': {
      marginTop: theme.spacing(2),
    },

    '& + $subgroup ': {
      marginTop: 0,
    },
  },
  subgroup: {
    backgroundColor: 'white',
    top: 38,
  },
  detail: {
    color: 'gray',
    fontSize: 12,
  },
  formControl: {
    width: '100%',
  },
  ratingBlock: { display: 'inline-flex', alignItems: 'center' },
  ratingIcon: { color: 'gray', fontSize: 12 },
  halfDown: { position: 'relative', top: 12 },
}));
