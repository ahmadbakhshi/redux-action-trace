import { createStore, applyMiddleware, combineReducers, Store } from 'redux'
import thunk from 'redux-thunk'
import { config } from 'redux-action-trace'

import { testReducer } from './reducer'

const reduxActionTrace = config({
  disable: false,
  style: {
    actionName: 'color: red; font-size: 24px;',
    path: 'color:blue;',
    lineNumber: 'font-size: 24px'
  }
})

const middleware = applyMiddleware(thunk, reduxActionTrace)

const rootReducer = combineReducers({
  test: testReducer
})

const store: Store = createStore(rootReducer, middleware)

export { store }
