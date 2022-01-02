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
      `blurhash error: ${
        error.message
      }. Check window.lastReactError for details`,
    );
    window.lastReactError = { error, errorInfo };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return null;
    }

    return children;
  }
}
