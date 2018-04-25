import configureStore from 'redux-mock-store'
import React from 'react';
import thunk from 'redux-thunk'

import { fetchDistance, fetchPosition } from '../src/store/ARScene/ar-action'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})

describe('ar actions test', () => {
  it('should set distance without error', async () => {
    const res = await store.dispatch(fetchDistance(1.3)) 
    const actions = store.getActions()

    expect(actions[0].type).toBeDefined()
    expect(actions[0].type).toEqual('FETCH_DISTANCE')
    expect(actions[0].payload).toBeDefined()
    expect(actions[0].payload).toEqual(1.3)
  })

  it('should fetch position without error', async () => {
    const res = await store.dispatch(fetchPosition(2.3))
    const actions = store.getActions()

    expect(actions[1].type).toBeDefined()
    expect(actions[1].type).toEqual('FETCH_POSITION')
    expect(actions[1].payload).toBeDefined()
    expect(actions[1].payload).toEqual(2.3)
  })
})