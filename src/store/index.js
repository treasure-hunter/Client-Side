import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { authEmail } from './auth/auth-reducers'
import { fetchQuests } from './quest/quest-reducers'

const reducers = combineReducers({
  authEmail,
  fetchQuests
})

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(logger, thunk)
  )
)

export default store;