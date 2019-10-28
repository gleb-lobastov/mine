import React from 'react';
import PropTypes from 'prop-types';
import Social from './Social';

class Footer extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
  };

  render() {
    const { className } = this.props;

    return (
      <footer className={className}>
        <Social />
      </footer>
    );
  }
}

export default Footer;
