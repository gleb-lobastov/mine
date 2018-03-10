import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { routes } from 'core/routing';
import Footer from './Footer';

class Layout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        <main>
          {children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
