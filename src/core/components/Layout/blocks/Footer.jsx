import React from 'react';
import Social from './Social';

class Footer extends React.PureComponent {
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
