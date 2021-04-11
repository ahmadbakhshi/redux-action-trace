// eslint-disable-next-line no-unused-vars
import { Middleware } from 'redux'
import { trace } from './trace'
// eslint-disable-next-line no-unused-vars
import { IOrder, IStyle } from './types'

export interface IConfigProps {
  disable?: boolean
  style?: IStyle
  details?: {
    collapsed?: boolean
    action?: boolean
    previousState?: boolean
    currentState?: boolean
    differences?: boolean
    order?: IOrder[]
  }
}

// @ts-ignore
export const reduxActionTrace = (store) => (next) => (action) => {
  try {
    trace({
      action
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
  style,
  details = {
    collapsed: false,
    action: false,
    previousState: false,
    currentState: false,
    differences: false,
    order: ['Action', 'Previous State', 'Current State', 'State Differences']
  }
}: IConfigProps): Middleware => {
  try {
    let reduxActionTrace: Middleware

    switch (disable) {
      case true:
        reduxActionTrace = (_) => (next) => (action) => {
          return next(action)
        }
        break

      default:
        reduxActionTrace = (store) => (next) => (action): Middleware => {
          const previousStateObj = store.getState()

          const result = next(action)

          const currentStateObj = store.getState()

          trace({
            action,
            style,
            details: {
              ...details,
              previousStateObj,
              currentStateObj
            }
          })

          return result
        }
        break
    }

    return reduxActionTrace
  } catch (error) {
    return error
  }
}
