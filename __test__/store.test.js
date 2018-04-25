import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import store from '../src/store/index'

Enzyme.configure({ adapter: new Adapter() })

const url_test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g

describe('Test authemail', () => {
  it('should return state', () => {
    const state = store.getState().authEmail
    expect(state).toBeDefined()
  })

  it('should change loading state to be true', () => {
    store.dispatch({type: 'CHECK_LOADING'})
    const loading = store.getState().authEmail.loading
    expect(loading).toBe(true)
  })

  it('should receive idToken when login succeed', () => {
    store.dispatch({
      type: 'LOGIN_SUCCESS',
      payload: '123456',
      loading: false,
      status: true
    })
    const state = store.getState().authEmail
    expect(state.error).toBe(false)
    expect(state.status).toBe(true)
    expect(state.token).toBeDefined()
    expect(state.token).toEqual('123456')
    expect(state.errorData).toBeNull()
  })
})

describe('register with email', () => {
  it('test register if succeed', () => {
    store.dispatch({
      type: 'REGISTER_SUCCESS',
    })
    const state = store.getState().authEmail
    expect(state.error).toBe(false)
    expect(state.status).toBe(true)
    expect(state.errorData).toBeNull()
  })
})

describe('Error testing', () => {
  it('should handle error correctly', () => {
    store.dispatch({
      type: 'CHECK_ERROR',
      payload: 'This is an error message'
    })
    const state = store.getState().authEmail
    expect(state.error).toBe(true)
    expect(state.errorData).toBeDefined()
    expect(state.errorData).toEqual('This is an error message')
    expect(state.status).toBeFalsy()
  })
})

describe('Fetching Quests', () => {
  it('should receive list of quests', () => {
    store.dispatch({
      type: 'FETCH_QUESTS',
      payload: [
        {
          roomName: 'test',
          description: 'test',
          hint: 'test hint',
          latitude: 0.233,
          longitude: 1.323,
          image_path: 'http://thisshouldbepathtoimageuri.com',
          isCompleted: false,
          uid: '123456',
          createdAt: new Date()
        }
      ]
    })
    const state = store.getState().fetchQuests
    expect(state.error).toBeFalsy()
    expect(state.quests).not.toHaveLength(0)
    expect(typeof state.quests).toEqual('object')
    state.quests.forEach(quest => {
      const isUrl = url_test.test(quest.image_path)
      expect(quest).toHaveProperty('roomName')
      expect(quest).toHaveProperty('description')
      expect(quest).toHaveProperty('hint')
      expect(quest).toHaveProperty('latitude')
      expect(quest).toHaveProperty('longitude')
      expect(quest).toHaveProperty('image_path')
      expect(quest).toHaveProperty('isCompleted')
      expect(quest).toHaveProperty('uid')
      expect(isUrl).toEqual(true)
    });
  })
})

describe('AR reducers', () => {
  it('should return distance correctly', () => {
    store.dispatch({
      type: 'FETCH_DISTANCE',
      payload: 1.2332
    })

    const state = store.getState().fetchAction
    expect(state.distance).toBeDefined()
    expect(typeof state.distance).toEqual('number')
  })

  it('should return position', () => {
    store.dispatch({
      type: 'FETCH_POSITION',
      payload: {
        latitude: 1.2333,
        longitude: 0.2656,
        image_path: 'http://shouldbeuri.com',
        hint: 'this should be a hint'
      }
    })
    const state = store.getState().fetchAction
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        const element = state[key]
        expect(element).toBeDefined()
      }
    }
    expect(typeof state.distance).toEqual('number')
    expect(typeof state.latitude).toEqual('number')
    expect(typeof state.longitude).toEqual('number')
    const isUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(state.image_path)
    expect(isUrl).toEqual(true)
  })
})