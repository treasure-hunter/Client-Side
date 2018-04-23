import { FETCH_DISTANCE } from '../actionTypes'

const initialState = {
  distance: null
}

export const fetchAction = (state = { ...initialState }, action) => {
  console.log(action.payload)
  switch (action.type) {
    case FETCH_DISTANCE:
      return {
        ...state,
        distance: action.payload
      }
    default:
      return state;
  }
}