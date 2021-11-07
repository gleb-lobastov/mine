import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';
import VisitIcon from '../VisitIcon';

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
  period: {
    display: 'inline',
    color: 'gray',
    fontSize: 12,
  },
});

const VisitInfo = ({ visit, isLong, locationUrl }) => {
  const classes = useStyles();
  if (!visit) {
    return 'Не указано';
  }
  const { locationName } = visit;
  return (
    <div className={classes.container}>
      <VisitIcon visit={visit} className={classes.icon} />
      <ConnectedLink to={locationUrl} optional={true}>
        {locationName}
      </ConnectedLink>
      {isLong ? ', ' : ''}
      <div className={classes.period}>
        {isLong && visitDateTimePeriodToString(visit)}
      </div>
    </div>
  );
};

VisitInfo.defaultProps = {
  visit: {},
};

export default VisitInfo;
