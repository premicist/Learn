import { Component, type ErrorInfo, type ReactNode } from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallbackTitle?: string
  fallbackMessage?: string
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onReset?: () => void
  onError?: (error: Error, info: ErrorInfo) => void
}

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info)
    this.props.onError?.(error, info)
  }

  handleReset = () => {
    this.props.onReset?.()
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error || new Error('Unknown error'), this.handleReset)
      }
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="component-error-fallback" role="alert">
          <div className="component-error-fallback__icon" aria-hidden="true">⚠️</div>
          <h4 className="component-error-fallback__title">
            {this.props.fallbackTitle || 'Unable to display this content'}
          </h4>
          <p className="component-error-fallback__desc">
            {this.props.fallbackMessage || this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            type="button"
            className="component-error-fallback__btn"
            onClick={this.handleReset}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

