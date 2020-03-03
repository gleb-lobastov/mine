import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import VisitIcon from '../VisitIcon';
import visitPropTypes from 'travel/models/visits/propTypes';

const useStyles = makeStyles({
  container: {
    display: 'inline-block',
    marginRight: '4px',
  },
  icon: {
    marginRight: '4px',
    display: 'inline-block',
    verticalAlign: 'text-bottom',
  },
  editIcon: {},
});

const VisitInfo = ({ visit }) => {
  const classes = useStyles();
  if (!visit) {
    return 'Не указано';
  }
  const { locationName } = visit;
  return (
    <div className={classes.container}>
      <VisitIcon visit={visit} className={classes.icon} />
      {locationName}
    </div>
  );
};

VisitInfo.propTypes = {
  visit: PropTypes.shape(visitPropTypes),
};

VisitInfo.defaultProps = {
  visit: {},
};

export default VisitInfo;
