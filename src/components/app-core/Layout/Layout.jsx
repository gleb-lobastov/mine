import React from 'react';
import ArticlesController from 'Components/view-containers/ArticlesController';
import Footer from './Footer';

class Layout extends React.PureComponent {
  render() {
    return (
      <div>
        <main>
          <ArticlesController />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
