import React from 'react';
import PropTypes from 'prop-types';

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
        <hr />
        <a href="https://vk.com/gleb.lobastov"> VK </a>
      </footer>
    );
  }
}

export default Footer;
