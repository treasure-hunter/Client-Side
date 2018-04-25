import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Home from '../src/screen/Home'

Enzyme.configure({ adapter: new Adapter() })

const navigation = {
  navigate: function() {}
}

let wrapper;
beforeEach(function() {
  wrapper = shallow( <Home navigation={navigation} /> )
})

describe('Home screen test', () => {
  it('should render correctly', () => {
    expect(wrapper).toBeDefined()
  })

  it('should invokes toCreateRoom method', () => {
    wrapper.instance().toCreateRoom()
  })

  it('should invokes toRoomList method', () => {
    wrapper.instance().toRoomList()
  })
})