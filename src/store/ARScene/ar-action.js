import { FETCH_DISTANCE } from '../actionTypes'

export const fetchDistance = (payload) => {
  return dispatch => {
    dispatch(setDistance(payload))
  }
}

function setDistance(payload) {
  return {
    type: FETCH_DISTANCE,
    payload
  }
}