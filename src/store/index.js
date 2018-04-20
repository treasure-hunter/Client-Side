import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { authEmail } from './auth/auth-reducers'

const reducers = combineReducers({
  authEmail
})

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(logger, thunk)
  )
)

export default store;