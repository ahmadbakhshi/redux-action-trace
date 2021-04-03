import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reduxActionTrace } from 'redux-action-trace'

import { testReducer } from './reducer'

let middleware = applyMiddleware(thunk, reduxActionTrace)

const rootReducer = combineReducers({
  test: testReducer
})

const store = createStore(rootReducer, middleware)

export { store }
