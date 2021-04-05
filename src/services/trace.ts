// eslint-disable-next-line no-unused-vars
import { AnyAction } from 'redux'
import StackTracey from 'stacktracey'
import { diff } from './helpers'
// eslint-disable-next-line no-unused-vars
import { IStyle, IOrder } from './types'

export interface ITraceProps {
  action: AnyAction
  style?: IStyle
  details?: {
    collapsed?: boolean
    action?: boolean
    previousState?: boolean
    currentState?: boolean
    differences?: boolean
    previousStateObj?: any
    currentStateObj?: any
    order?: IOrder[]
  }
}

export const trace = ({
  action,
  style = {
    actionName: 'color: Chartreuse;',
    path: 'color: white;',
    lineNumber: 'color: magenta;'
  },
  details = {
    collapsed: false,
    action: false,
    previousState: false,
    currentState: false,
    differences: false,
    previousStateObj: {},
    currentStateObj: {},
    order: ['Action', 'Previous State', 'Current State', 'State Differences']
  }
}: ITraceProps): void => {
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
    `%cRedux Action Trace\n%c[${action.type}] %c${file} %c${item.line}`,
    'color: #999; font-size: 10px;',
    style.actionName,
    style.path,
    style.lineNumber
  )

  if (details.action || details.currentState || details.previousState)
    details.collapsed
      ? console.groupCollapsed('%cDetails', 'color:#999; font-size:10px')
      : console.group('%cDetails', 'color:#999; font-size:10px')

  const logs = {
    Action: {
      name: 'Action',
      enable: details.action,
      log: () =>
        console.log(
          '%cAction:            ',
          `${style.actionName}; font-size:11px;`,
          action
        )
    },
    'Previous State': {
      name: 'Previous State:',
      enable: details.previousState,
      log: () =>
        console.log(
          '%cPrevious State:    ',
          'color: DodgerBlue; font-size: 11px',
          details.previousStateObj
        )
    },
    'Current State': {
      name: 'Current State',
      enable: details.currentState,
      log: () =>
        console.log(
          '%cCurrent State:     ',
          'color: OrangeRed;font-size: 11px ',
          details.currentStateObj
        )
    },
    'State Differences': {
      name: 'State Differences   ',
      enable: details.differences,
      log: () =>
        console.log(
          '%cState Differences: ',
          'color: Gold; font-size: 11px;',
          diff(details.previousStateObj, details.currentStateObj)
        )
    }
  }

  details.order &&
    details.order.forEach((name: string) => {
      if (logs[name].enable) logs[name].log()
    })

  if (details.action || details.currentState || details.previousState)
    console.groupEnd()
}
