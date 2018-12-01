/* global __API_HOST__ __IS_DEV_MODE__ */
import createRequestApi from "@request-kit/react-redux";
import createRequestEngine from "@request-kit/engine-rest";

const loggerPlugin = next => options => {
  const id = Math.round(Math.random() * 10000);
  console.log("request", id, "options", options);
  const promise = next(options);
  promise.then(
    result => console.log("request", id, "result", result),
    result => console.log("request", id, "error", result)
  );
  return promise;
};

const endpointPlugin = next => ({ endpoint, ...restOptions }) =>
  next({
    endpoint: typeof endpoint === "string" ? endpoint : endpoint(restOptions),
    ...restOptions
  });

const articlesAdapter = articles => ({
  articles: articles.map(({ created_at: date, header, content, id }) => ({
    date,
    header,
    content: content.replace(/\\n/g, "\n"),
    id
  }))
});

const locationsAdapter = locations => ({
  locations: locations.map(({ country_name, location_name, id }) => ({
    countryName: country_name,
    locationName: location_name,
    id
  }))
});

const tripsAdapter = trips => ({
  trips: trips.map(({ trip_name, id }) => ({
    tripName: trip_name,
    id
  }))
});

const adaptersPlugin = next => options =>
  next(options).then(data => {
    const {
      meta: { domain }
    } = options;
    if (domain === "articles") {
      return articlesAdapter(data.articles);
    }
    if (domain === "locations") {
      return locationsAdapter(data.locations);
    }
    if (domain === "trips") {
      return tripsAdapter(data.trips);
    }
    return data;
  });

const responseAsJsonPlugin = next => ({ format, ...restOptions }) =>
  next(restOptions).then(response => response.json());

const {
  middleware: requestMiddleware,
  provide,
  reducer: requestReducer
} = createRequestApi({
  engine: createRequestEngine({
    presetOptions: {
      format: "json",
      endpoint: ({ meta: { domain } }) => `${__API_HOST__}/api/${domain}`
    },
    plugins: [
      __IS_DEV_MODE__ && loggerPlugin,
      endpointPlugin,
      adaptersPlugin,
      responseAsJsonPlugin
    ].filter(Boolean)
  })
});

export { requestMiddleware, provide, requestReducer };
