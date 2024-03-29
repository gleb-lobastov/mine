import React from 'react';
import warning from 'warning';

export default class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    warning(
      false,
      `catch error in component three: ${
        error.message
      }. Check window.lastReactError for details`,
    );
    window.lastReactError = { error, errorInfo };
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
