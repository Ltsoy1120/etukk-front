import { ReactHookError } from "app/components/containers/ErrorBoundary/ErrorBoundary.errors"
import { useParams } from "react-router-dom"

function useParam<N extends boolean = false>(paramKey: string, numeric?: N): N extends true ? number : string {
  const params = useParams()
  const paramValue = params[paramKey]

  if (paramValue == null) {
    throw new ReactHookError(useParam, `got no ${paramKey}`)
  }
  if (numeric && isNaN(Number(paramValue))) {
    throw new ReactHookError(useParam, `${paramKey} is not number`)
  }

  return paramValue as N extends true ? number : string
}

export default useParam