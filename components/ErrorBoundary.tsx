
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-6 text-center">
          <div className="mb-4 rounded-full bg-red-50 p-4 text-red-500">
            <span className="material-symbols-outlined text-4xl">error</span>
          </div>
          <h1 className="mb-2 text-xl font-bold text-slate-900">应用遇到了一些问题</h1>
          <p className="mb-6 text-sm text-slate-500 max-w-xs">
            {this.state.error?.message || '发生未知错误，请尝试刷新页面。'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg active:scale-95 transition-all"
          >
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
