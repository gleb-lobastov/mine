import React from 'react';

export default function Country({ country: { countryName } = {} }) {
  return (
    <div>
      <b>{countryName}</b>
    </div>
  );
}
