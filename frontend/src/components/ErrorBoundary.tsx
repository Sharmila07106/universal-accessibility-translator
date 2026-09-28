import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import Logo from './Logo';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in 3D Scene:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-glow opacity-80 scale-150">
            <Logo size={120} />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
