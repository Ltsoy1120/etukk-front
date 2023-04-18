import Button from "app/components/UI/Button/Button"
import ErrorCover from "app/components/UI/ErrorCover/ErrorCover"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import {
  Action,
  MappingPredicate,
} from "infrastructure/persistence/api/client.types"
import {ReactNode, useEffect, useState} from "react"
import {QueryError, useQuery} from "react-fetching-library"
import {useSelector} from "react-redux"

import RequiredAuthCover from "./RequiredAuthCover"

/**
 * https://stackoverflow.com/questions/56687668/a-way-to-disable-type-argument-inference-in-generics
 */
type NoInfer<T> = [T][T extends unknown ? 0 : never]

interface QueryContainerProps<P, M> {
  action: Action<P>
  mapping?: MappingPredicate<NoInfer<P>, M> // Disable infer to be sure the right type is used in the callback
  requireAuth?: boolean
  children: (payload: keyof M extends never ? P : M) => ReactNode
}

function QueryContainer<P, M>(props: QueryContainerProps<P, M>) {
  const requireAuth = props.requireAuth || props.action?.config?.requireAuth

  const user = useSelector(state => state.user)

  const shouldInitQuery = requireAuth ? user.auth : true
  // console.log(props.action.config, requireAuth, shouldInitQuery)

  const [payload, setPayload] = useState<unknown>()
  const response = useQuery(props.action, shouldInitQuery)

  useEffect(() => {
    if (shouldInitQuery) {
      response.query()
      // response.query()
    }
  }, [user.auth])
  useEffect(() => {
    if (response.error) return
    if (response.payload == null) return

    setPayload(
      props.mapping ? props.mapping(response.payload) : response.payload
    )
  }, [response.payload])

  if (
    requireAuth &&
    (!user.auth ||
      (response.status == null && !response.loading && !response.error))
  ) {
    // Checks for query init
    return <RequiredAuthCover />
  }
  if (response.error) {
    if (response.status === 404) {
      return (
        <ErrorCover>
          <p>По вашему запросу ничего не найдено</p>
          {/* <em>{response.errorObject.message}</em> */}
          <Button
            color="white"
            onClick={() => (response.reset(), response.query())}>
            Попробовать ещё раз
          </Button>
        </ErrorCover>
      )
    }
    if (response.errorObject instanceof QueryError) {
      return (
        <ErrorCover>
          <p>
            Произошла ошибка {response.errorObject.response.status} во время
            запроса:
          </p>
          <em>{response.errorObject.message}</em>
          <Button color="white" onClick={response.query}>
            Попробовать ещё раз
          </Button>
        </ErrorCover>
      )
    }

    throw response.errorObject
  }
  if (response.loading) return <LoaderCover />
  if (response.payload == null)
    throw new QueryError("Response payload is empty.", response)
  // Show loader while `payload` state is still not updated
  if (payload == null) return <LoaderCover />

  return <>{props.children(payload as never)}</>
}

export default QueryContainer
