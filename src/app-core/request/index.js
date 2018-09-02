import createApi from '@request-kit/react-redux';
import contents from 'content/contents.json';

const {
  middleware: requestMiddleware,
  provide,
  reducer: requestReducer,
} = createApi({
  engine: {
    request: () => Promise.resolve(contents),
  },
});

export {
  requestMiddleware,
  provide,
  requestReducer,
};
