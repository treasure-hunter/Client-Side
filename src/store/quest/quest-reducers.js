import { CHECK_LOADING, CHECK_ERROR, FETCH_QUESTS } from '../actionTypes'

const initialState = {
  loading: false,
  error: false
}

export const fetchQuests = (state = { ...initialState, quests: [] }, action) => {
  switch (action.type) {
    case CHECK_LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUESTS:
      return {
        ...state,
        quests: action.payload
      }
    case CHECK_ERROR:
      return {
        ...state,
        error: true,
      }
    default:
      return state;
  }
}