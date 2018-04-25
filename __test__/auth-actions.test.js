import configureStore from 'redux-mock-store'
import React from 'react';
import thunk from 'redux-thunk'

import { loginwithEmail, signOut, registerwithEmail, checkErr } from '../src/store/auth/auth-actions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})

describe('auth with email password actions test', () => {
  it('should signin without error', async () => {
    const res = await store.dispatch(loginwithEmail('new@mail.com', '123456', () => {}))
    const actions = store.getActions()

    expect(res).toBeDefined()
    expect(res.user.uid).toBeDefined()
    expect(res.user.email).toBeDefined()
    expect(res.user.displayName).toBeDefined()
    expect(res.idToken).toBeDefined()
    expect(typeof res.idToken).toEqual('string')
    expect(actions[0].type).toEqual('CHECK_LOADING')
    expect(actions[1].type).toEqual('LOGIN_SUCCESS')
    expect(actions[1].payload).toBeDefined()
    expect(typeof actions[1].payload).toEqual('string')
  })

  it('should handle log out properly', async () => {
    const res = await store.dispatch(signOut())

    expect(res.logout).toBeUndefined()
    expect(res.remove).toBeNull()
  })

  it('should handle register when succeed', async () => {
    const res = await store.dispatch(registerwithEmail('ewerwer', 'niasdasdni@mail.com', '123456', () => {}))
    const actions = store.getActions()

    expect(res).toBeDefined()
    expect(res.uid).toBeDefined()
    expect(res.email).toBeDefined()

    expect(actions[3].type).toEqual('REGISTER_SUCCESS')
  })

  it('should handle error correctly', () => {
    const res = store.dispatch(checkErr('error message'))
    const actions = store.getActions()
    
    expect(res.type).toEqual('CHECK_ERROR')
    expect(res.payload).toBeDefined()
    expect(res.payload).toEqual('error message')
  })
})