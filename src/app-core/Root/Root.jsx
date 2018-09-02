import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'core/Layout';
import store from 'state/createStore';
import ContentProvider, {
  contentProviderPropTypes,
} from 'modules/componentsGallery/ContentProvider';

const Root = ({ routesList }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <ContentProvider routesList={routesList} />
      </Layout>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  // eslint-disable-next-line react/require-default-props
  routesList: contentProviderPropTypes.routesList, // is required by ContentProvider
};

export default Root;
