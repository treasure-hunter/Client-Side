import { FETCH_DISTANCE, FETCH_POSITION } from '../actionTypes'

const initialState = {
  distance: null,
  latitude: null,
  longitude: null,
  image_path: null,
  hint: null
}

export const fetchAction = (state = { ...initialState }, action) => {
  console.log(action.payload)
  switch (action.type) {
    case FETCH_DISTANCE:
      return {
        ...state,
        distance: action.payload
      }
    case FETCH_POSITION:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        image_path: action.payload.image_path,
        hint: action.payload.hint
      }
    default:
      return state;
  }
}
