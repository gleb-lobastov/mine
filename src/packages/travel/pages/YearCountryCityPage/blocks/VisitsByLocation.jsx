import React from 'react';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import sum from 'lodash/sum';
import max from 'lodash/max';
import PropTypes from 'prop-types';
import countriesPropTypes from 'travel/models/countries/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import { plural } from '../utils';

const VisitsByLocation = ({ visitsList }) => {
  const totalDays = sum(
    visitsList.map(({ arrivalDateTime, departureDateTime }) =>
      max([1, differenceInCalendarDays(arrivalDateTime, departureDateTime)]),
    ),
  );
  return (
    <span>
      {visitsList.length > 1 && (
        <span>
          {`${visitsList.length} `}
          {plural(totalDays, {
            one: 'визит',
            few: 'визита',
            many: 'визитов',
          })}
          {totalDays > 1 ? ', ' : ''}
        </span>
      )}
      {totalDays > 1 && (
        <span>
          {`${totalDays} `}
          {plural(totalDays, { one: 'день', few: 'дня', many: 'дней' })}
        </span>
      )}
    </span>
  );
};
VisitsByLocation.propTypes = {
  countriesDict: PropTypes.shape(countriesPropTypes),
  visits: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
};
VisitsByLocation.defaultProps = {
  countriesDict: {},
  visits: [],
};

export default VisitsByLocation;
