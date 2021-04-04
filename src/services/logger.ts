import StackTracey from 'stacktracey'
// eslint-disable-next-line no-unused-vars
import { Middleware, AnyAction } from 'redux'

export type IStyle = { actionName?: string; path?: string; lineNumber?: string }

export const trace = (action: AnyAction, style: IStyle): void => {
  const error = new Error('')
  const stack = new StackTracey(error.stack)
  const stacksWithSource = stack.withSources()

  const calleeExclude = [
    'Object.dispatch',
    'dispatch',
    'HTMLUnknownElement.callCallback',
    'Object.invokeGuardedCallbackDev',
    'invokeGuardedCallback',
    'invokeGuardedCallbackAndCatchFirstError',
    'executeDispatch',
    'processDispatchQueueItemsInOrder',
    'processDispatchQueue',
    'dispatchEventsForPlugins',
    'batchedEventUpdates$1',
    'batchedEventUpdates',
    'scheduler.development.js',
    'trace',
    'logger.ts',
    'unstable_runWithPriority'
  ]

  const fileNameExclude = [
    'logger.ts',
    'react-dom.development.js',
    'serializableStateInvariantMiddleware.ts'
  ]

  const filtered: StackTracey = stacksWithSource.filter(
    (a) =>
      !calleeExclude.includes(a.callee) &&
      !fileNameExclude.includes(a.fileName) &&
      !a.file.includes('node_modules')
  )

  const item = filtered.items[filtered.items.length - 1]

  const spliced = item.file.split('/')
  const splicedIndex = spliced.findIndex((a) => a === 'src')
  const file = spliced.splice(splicedIndex + 1, spliced.length - 1).join('/')

  console.log(
    `%cRedux Action Trace\n%c[${action.type}]   %c${file} %c${item.line}`,
    'color: #999; font-size: 10px;',
    style.actionName,
    style.path,
    style.lineNumber
  )
}

// @ts-ignore
export const reduxActionTrace: Middleware = (store) => (next) => (
  action
): Middleware => {
  try {
    trace(action, {
      actionName: 'color: green;',
      path: 'color: white;',
      lineNumber: 'color: orange;'
    })
    const result = next(action)
    return result
  } catch (error) {
    return error
  }
}

// @ts-ignore
export const config = ({
  disable = false,
  style = {
    actionName: 'color: green; font-weight: bold;',
    path: 'color: white;',
    lineNumber: 'color: orange;'
  }
}: {
  disable?: boolean
  style?: IStyle
}): Middleware => {
  try {
    let reduxActionTrace: Middleware

    switch (disable) {
      case true:
        reduxActionTrace = (_) => (next) => (action) => {
          return next(action)
        }
        break

      default:
        reduxActionTrace = (_) => (next) => (action): Middleware => {
          trace(action, style)
          return next(action)
        }
        break
    }

    return reduxActionTrace
  } catch (error) {
    return error
  }
}
