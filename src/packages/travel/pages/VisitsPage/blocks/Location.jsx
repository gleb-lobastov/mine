import React from 'react';

export default function Location({ location: { locationName } = {} }) {
  return <div>{locationName}</div>;
}
