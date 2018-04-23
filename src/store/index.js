import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { authEmail } from './auth/auth-reducers'
import { fetchQuests } from './quest/quest-reducers'
import { fetchAction } from './ARScene/ar-reducers'

const reducers = combineReducers({
  authEmail,
  fetchQuests,
  fetchAction
})

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(logger, thunk)
  )
)

export default store;
