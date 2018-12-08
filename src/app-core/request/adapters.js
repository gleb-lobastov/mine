export const articlesAdapter = articles => ({
  articles: articles.map(({ created_at: date, header, content, id }) => ({
    date,
    header,
    content: content.replace(/\\n/g, '\n'),
    id,
  })),
});

export const locationsAdapter = locations => ({
  locations: locations.map(({ country_name, location_name, id }) => ({
    countryName: country_name,
    locationName: location_name,
    locationId: id,
  })),
});

export const tripsAdapter = trips => ({
  trips: trips.map(({ trip_name, id }) => ({
    tripName: trip_name,
    tripId: id,
  })),
});

export const visitsAdapter = visits => ({
  visits: visits.map(({ id, location_id, trip_id }) => ({
    tripId: trip_id,
    locationId: location_id,
    visitId: id,
  })),
});
