import { REGISTER, LOGIN_WITH_EMAIL, CHECK_LOADING, LOGIN_SUCCESS, CHECK_ERROR, REGISTER_SUCCESS } from '../actionTypes'

const initialState = {
  loading: false,
  error: false,
  errorData: null,
  status: false,
  email: '',
  password: '',
  token: '',
  uid: ''
}

export const authEmail = (state= { ...initialState }, action) => {
  switch (action.type) {
    case CHECK_LOADING:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loading: false,
        status: true
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true
      }
    case CHECK_ERROR:
      return {
        ...state,
        error: true,
        errorData: action.payload
      }
    default:
      return state;
  }
}
