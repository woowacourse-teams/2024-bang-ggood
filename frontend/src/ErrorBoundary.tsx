import * as Sentry from '@sentry/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { Component } from 'react';

interface HTTPError extends Error {}

interface ErrorBoundaryProps {
  fallback?: ReactElement;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const initialState: State = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, State> {
  state: State = initialState;

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error | HTTPError): void {
    Sentry.withScope(scope => {
      scope.setLevel('error');
      Sentry.captureMessage(`[${error.name}] ${window.location.href}`);
    });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return this.props.fallback || <div> in Error Boundary </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
