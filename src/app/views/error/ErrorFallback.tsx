import "./ErrorView.scss"

import {showReportDialog} from "@sentry/react"
import {
  ErrorBoundaryError,
  ErrorBoundaryReset,
} from "app/components/containers/ErrorBoundary/ErrorBoundary.types"
import Button from "app/components/UI/Button/Button"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import {ErrorInfo} from "react"

function ErrorFallback(
  reset: ErrorBoundaryReset,
  error?: ErrorBoundaryError,
  errorInfo?: ErrorInfo
) {
  return <FatalError reset={reset} error={error} errorInfo={errorInfo} />
}

interface FatalErrorProps {
  reset: ErrorBoundaryReset
  error?: ErrorBoundaryError
  errorInfo?: ErrorInfo
}

function FatalError(props: FatalErrorProps) {
  function report() {
    // if (props.error == null) return

    showReportDialog({lang: "ru"})
  }
  return (
    <div className="error-view">
      <div className="error-view__container">
        <h1>FATAL</h1>
        <div className="error-view__desc">
          <h3>Произошла непредвиденная ошибка</h3>
          <h3>Сообщите нам об этом кнопкой ниже!</h3>
          <p>Название:</p>
          <pre>{props.error?.name}</pre>
          <p>Сообщение:</p>
          <pre>{props.error?.message}</pre>
          <p>Лог:</p>
          <pre>{props.error?.stack}</pre>
          <p>Лог компонента:</p>
          <pre>{props.errorInfo?.componentStack}</pre>
        </div>
        <Button color="white" onClick={report}>
          Отправить отчёт
        </Button>
        {/* <button className="error-view__button" type="button" onClick={props.reset}>Попробовать ещё раз</button> */}
        <ButtonLink to="/" onClick={props.reset}>
          На главную
        </ButtonLink>
      </div>
      <div className="error-view__icon">
        <img src="/static/images/logo.svg" alt="etukk logo" />
      </div>
    </div>
  )
}

export default ErrorFallback
