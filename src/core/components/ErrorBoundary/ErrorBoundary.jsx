import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

export default class ErrorBoundary extends React.Component {
  static propTypes = { children: PropTypes.node.isRequired };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    warning(false, JSON.stringify({ error, errorInfo }));
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }

    return children;
  }
}
