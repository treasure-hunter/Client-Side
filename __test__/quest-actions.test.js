import configureStore from 'redux-mock-store'
import React from 'react';
import thunk from 'redux-thunk'

import { fetchQuests, checkErr } from '../src/store/quest/quest-actions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})

describe('quest actions test', () => {
  it('should fetch quest without error', async () => {
    const res = await store.dispatch(fetchQuests())
    const actions = store.getActions()
    const state = store.getState()

    expect(actions[1].type).toEqual('FETCH_QUESTS')
    expect(actions[1].payload).toBeDefined()
    expect(actions[1].payload).not.toHaveLength(0)
    expect(res).toBeDefined()
    res.forEach(quest => {
      expect(quest).toHaveProperty('roomName')
      expect(quest).toHaveProperty('description')
      expect(quest).toHaveProperty('hint')
      expect(quest).toHaveProperty('image_path')
      expect(quest).toHaveProperty('uid')
      expect(quest).toHaveProperty('isCompleted')
      expect(quest).toHaveProperty('latitude')
      expect(quest).toHaveProperty('longitude')
      expect(quest).toHaveProperty('id')
    });
  })

  it('should handle error when fetching quests', async () => {
    const res = await store.dispatch(checkErr('error while fetching'))
    const actions = store.getActions()

    expect(res.type).toEqual('CHECK_ERROR')
    expect(res.payload).toBeDefined()
    expect(res.payload).toEqual('error while fetching')
  })
})