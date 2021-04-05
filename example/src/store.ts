import { createStore, applyMiddleware, combineReducers, Store } from 'redux'
import thunk from 'redux-thunk'
import { config } from 'redux-action-trace'

import { testReducer } from './reducer'

const reduxActionTrace = config({
  disable: false,
  style: {
    actionName: 'color: Chartreuse; font-size: 12px;',
    path: 'color:white;',
    lineNumber: 'font-size: 12px; color:magenta'
  },
  details: {
    collapsed: true,
    action: true,
    currentState: true,
    previousState: true,
    differences: true,
    order: ['Action', 'Current State', 'Previous State', 'State Differences']
  }
})

const middleware = applyMiddleware(thunk, reduxActionTrace)

const rootReducer = combineReducers({
  test: testReducer
})

const store: Store = createStore(rootReducer, middleware)

export { store }
