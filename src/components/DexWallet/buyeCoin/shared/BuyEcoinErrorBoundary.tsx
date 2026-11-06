
"use client";

import React, {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";

interface BuyEcoinErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface BuyEcoinErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class BuyEcoinErrorBoundary extends Component<
  BuyEcoinErrorBoundaryProps,
  BuyEcoinErrorBoundaryState
> {
  constructor(props: BuyEcoinErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): BuyEcoinErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[BuyEcoin Error Boundary]", error);

    console.error(
      "[BuyEcoin Component Stack]",
      errorInfo?.componentStack ??
        "Component stack indisponível."
    );
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] w-full items-center justify-center bg-[#070B12] p-6">
          <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#101722] p-6 text-center">
            <div className="mb-4 text-4xl">⚠️</div>

            <h2 className="text-lg font-bold text-white">
              Ocorreu um erro
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Não foi possível carregar corretamente o módulo
              Buy E-Coin. Tenta novamente.
            </p>

            {process.env.NODE_ENV === "development" &&
              this.state.error && (
                <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-black/30 p-3 text-left text-xs text-red-300">
                  {this.state.error.message}
                </pre>
              )}

            <button
              type="button"
              onClick={this.handleRetry}
              className="mt-5 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-400"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
