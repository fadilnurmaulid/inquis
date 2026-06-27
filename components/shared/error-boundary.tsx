"use client";

/**
 * ErrorBoundary — FND-014 / FR-010
 * Client-side error boundary for component-level errors.
 * Never exposes raw error details to users.
 */

import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: process.env.NODE_ENV === "development" ? error.message : undefined,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return <>{this.props.fallback}</>;

      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-muted/30 p-8 text-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <div>
            <p className="font-medium">Ups, ada yang salah!</p>
            <p className="text-sm text-muted-foreground">Coba muat ulang halaman ini.</p>
            {this.state.errorMessage && (
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {this.state.errorMessage}
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={this.handleReset}>
            Coba Lagi
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
