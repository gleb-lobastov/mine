import React from "react";

const alphabetically = ({ locationName: a }, { locationName: b }) =>
  a.localeCompare(b);

export default ({ contents: { locations = [] } }) => (
  <div>
    {locations.sort(alphabetically).map(({ locationName }, locationIndex) => (
      <div key={locationName}>{`${locationIndex + 1}. ${locationName}`}</div>
    ))}
  </div>
);
