/* global __API_URL__ */
import createApi from '@request-kit/react-redux';
import createRequestEngine from '@request-kit/engine-rest';

const {
  middleware: requestMiddleware,
  provide,
  reducer: requestReducer,
} = createApi({
  engine: createRequestEngine({
    presetOptions: {
      format: 'json',
      endpoint: () => `${__API_URL__}/api/routes`,
    },
    plugins: [
      next => ({ endpoint, ...restOptions }) =>
        next({
          endpoint: typeof endpoint === 'string' ? endpoint : endpoint(restOptions),
          ...restOptions,
        }),
      next => options => next(options).then(
        ({ articles }) => ({
          articles: articles.map(({
            created_at: date,
            header,
            content,
            id,
          }) => ({
            date,
            header,
            content: content.replace(/\\n/g, '\n'),
            id,
          })),
        }),
      ),
      next => ({ format, ...restOptions }) => next(restOptions)
        .then(response => response.json()),
    ],
  }),
});

export {
  requestMiddleware,
  provide,
  requestReducer,
};
