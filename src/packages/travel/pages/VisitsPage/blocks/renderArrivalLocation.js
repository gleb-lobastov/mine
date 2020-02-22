import React from 'react';
import renderOriginLocation from './renderOriginLocation';

export default function renderArrivalLocation(props) {
  const {
    changes: { willTripChange },
  } = props;

  if (!willTripChange) {
    return null;
  }

  return renderOriginLocation({
    ...props,
    keyBase: 'al',
  });
}
