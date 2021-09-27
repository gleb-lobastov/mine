import React from 'react';
import LocationInfo from 'travel/components/models/locations/LocationInfoNext';
import { PLAIN_GROUPS } from '../../../../consts';
import StatsPanel from '../../../StatsPanel';

export default function LocationVisitsGroup({
  groupKey: locationId,
  children,
  groupingOrder,
  className,
  provision,
  provision: { countriesDict, locationsDict },
  visitsList,
  isObscure,
}) {
  const location = locationsDict[locationId];
  const isGroupedByCountry = groupingOrder.includes(PLAIN_GROUPS.COUNTRIES);
  return (
    <>
      <LocationInfo
        className={className}
        location={location}
        countriesDict={countriesDict}
        showCountry={!isGroupedByCountry}
      >
        <StatsPanel
          provision={provision}
          visitsList={visitsList}
          daysTravellingStats={{ considerRides: false }}
          isObscure={isObscure}
        />
      </LocationInfo>
      {children}
    </>
  );
}
