import { FETCH_DISTANCE, FETCH_POSITION } from '../actionTypes'

export const fetchDistance = (payload) => {
  return dispatch => {
    dispatch(setDistance(payload))
  }
}

export const fetchPosition = (payload) => {
  return dispatch => {
    dispatch(setPosition(payload))
  }
}

export function setDistance(payload) {
  return {
    type: FETCH_DISTANCE,
    payload
  }
}

export function setPosition(payload) {
  return {
    type: FETCH_POSITION,
    payload
  }
}
