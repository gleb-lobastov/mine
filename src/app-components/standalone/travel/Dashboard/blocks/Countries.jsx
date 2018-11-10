import React from "react";
import groupBy from "lodash/groupBy";

const byCitiesCount = ([, citiesA = []], [, citiesB = []]) =>
  citiesB.length - citiesA.length;
const alphabetically = ({ locationName: a }, { locationName: b }) =>
  a.localeCompare(b);

export default ({ contents = {} }) => (
  <div>
    {Object.entries(groupBy(contents.locations, "countryName"))
      .sort(byCitiesCount)
      .map(([countryName, cities], countryIndex) => (
        <div key={countryName}>
          <h1>{`${countryIndex + 1}. ${countryName}`}</h1>
          {cities
            .sort(alphabetically)
            .map(({ locationName }, locationIndex) => (
              <div key={locationName}>{`${locationIndex +
                1}. ${locationName}`}</div>
            ))}
        </div>
      ))}
  </div>
);
