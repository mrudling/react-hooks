import * as React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    return {error, hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    const {error, hasError} = this.state
    if (hasError) {
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
