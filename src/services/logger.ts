import StackTracey from 'stacktracey'

// @ts-ignore
export const reduxActionTrace = (store: any) => (next: any) => (
  action: any
) => {
  trace(action)
  const result = next(action)
  return result
}

export const trace = (action: any) => {
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
    'color: green; font-weight: bold;',
    'color: white;',
    'color: orange;'
  )
}
