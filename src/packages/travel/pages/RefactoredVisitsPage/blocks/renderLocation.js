import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconStar from '@material-ui/icons/StarBorder';
import IconThumbDown from '@material-ui/icons/ThumbDownOutlined';
import IconThumbsUpDown from '@material-ui/icons/ThumbsUpDownOutlined';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import RideInfo from 'travel/components/models/rides/RideInfo';
import LocationInfo from 'travel/components/models/locations/LocationInfo';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import { LOCATION_RATING } from 'travel/models/users/consts';
import { GROUP_VISITS_BY, SORT_VISITS_BY } from '../consts';
import { resolvePhotos } from '../resolvePhotos';
import {
  getYearsOfVisits,
  getLocationVisitsByYearCount,
  getLocationVisitsCount,
} from '../calcCounters';

const GROUPS_TO_RENDER_YEARS_OF_VISIT = [
  GROUP_VISITS_BY.LOCATIONS,
  GROUP_VISITS_BY.COUNTRIES,
];

export default function renderLocation({
  visit,
  visit: { visitId, locationId, countryId, departureRideId },
  className,
  classes,
  changes: {
    isYearChanged,
    isCountryChanged,
    isTripChanged,
    isLocationChanged,
  },
  year,
  provision: {
    locationsDict,
    locationsRating,
    countriesDict,
    visitsDict,
    ridesDict,
  },
  groupBy,
  sortBy,
  counters,
  visitEditUrl,
  isObscure,
}) {

}
