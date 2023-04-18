import Button from "app/components/UI/Button/Button"
import ErrorCover from "app/components/UI/ErrorCover/ErrorCover"
import { Component, ReactNode } from "react"
import { QueryError } from "react-fetching-library"

interface QueryErrorCoverBoundaryProps {
  children: ReactNode
}
interface QueryErrorCoverBoundaryState {
  hasError: boolean
  error: QueryError | undefined
}

export class QueryErrorCoverBoundary extends Component<QueryErrorCoverBoundaryProps, QueryErrorCoverBoundaryState> {
  static getDerivedStateFromError(error: unknown): QueryErrorCoverBoundaryState | void {
    if (error instanceof QueryError) {
      return { hasError: true, error }
    }

    throw error
  }

  override state: QueryErrorCoverBoundaryState = {
    hasError: false,
    error: undefined
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: undefined
    })
  }

  override render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorCover>
          <p>Произошла ошибка {this.state.error.response.status} во время запроса:</p>
          <em>{this.state.error.message}</em>
          <Button color="white" onClick={this.reset}>Попробовать ещё раз</Button>
        </ErrorCover>
      )
    }

    return this.props.children
  }
}