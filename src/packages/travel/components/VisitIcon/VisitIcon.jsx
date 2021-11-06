import React from 'react';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import { VISIT_TYPES } from 'travel/models/visits/consts';

export default function VisitIcon({ visit: { visitType }, className }) {
  const IconComponent = resolveRideIconComponent(visitType);
  return <IconComponent className={className} />;
}

function resolveRideIconComponent(visitType) {
  switch (visitType) {
    case VISIT_TYPES.TRANSIT:
      return TransferWithinAStationIcon;
    case VISIT_TYPES.BASE_CAMP:
      return DomainIcon;
    case VISIT_TYPES.RELOCATION:
      return LocalShippingIcon;
    case VISIT_TYPES.REGULAR:
    default:
      return LocationCityIcon;
  }
}
