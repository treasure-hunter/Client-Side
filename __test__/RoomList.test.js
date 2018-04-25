import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import RoomList from '../src/screen/RoomList'

Enzyme.configure({ adapter: new Adapter() })

const navigation = {
  navigate: function() {}
}

let wrapper;
beforeEach(function() {
  wrapper = shallow(<RoomList navigation={navigation}/>)
})

describe('RoomList screen test', () => {
  it('should render without error', () => {
    expect(wrapper).toBeDefined()
  })

  it('should invokes toGamePlay', () => {
    wrapper.instance().toGamePlay()
  })
})