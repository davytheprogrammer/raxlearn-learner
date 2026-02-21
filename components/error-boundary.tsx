'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
                <p className="text-gray-600">
                  We encountered an unexpected error. Please try again or return to the home page.
                </p>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 p-4 bg-red-50 rounded-lg text-left">
                  <summary className="cursor-pointer font-mono text-sm text-red-600 font-bold">
                    Error Details
                  </summary>
                  <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-40">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <div className="flex gap-4 justify-center pt-4">
                <button
                  onClick={() => this.setState({ hasError: false })}
                  className="px-6 py-2 rounded-lg glass font-semibold text-gray-700 hover:bg-white/80 transition-colors"
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
