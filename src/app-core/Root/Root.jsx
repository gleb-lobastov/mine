import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'core/Layout';
import ContentProvider from 'modules/componentsGallery/ContentProvider';

const Root = ({ routesList }) => (
  <BrowserRouter>
    <Layout>
      <ContentProvider routesList={routesList} />
    </Layout>
  </BrowserRouter>
);

Root.propTypes = {
  // eslint-disable-next-line react/require-default-props
  routesList: ContentProvider.propTypes.routesList, // is required by ContentProvider
};

export default Root;
