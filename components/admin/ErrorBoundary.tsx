'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[200px] p-8">
          <div className="text-center">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Something went wrong</h3>
            <p className="text-sm text-gray-500 mb-4">
              {this.props.fallbackMessage || 'An error occurred while loading this section.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0d9488] border border-[#0d9488] rounded-md hover:bg-[#0d9488]/5"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
