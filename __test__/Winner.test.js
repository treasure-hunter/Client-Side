import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Winner from '../src/screen/Winner'
import { View, TouchableOpacity } from 'react-native'

Enzyme.configure({ adapter: new Adapter() })

const navigation = {
  navigate: function() {}
}

let wrapper;
beforeEach(function() {
  wrapper = shallow( <Winner navigation={ navigation }/> )
})

describe('Winner screen test', () => {
  it('should render without error', () => {
    expect(wrapper).toBeDefined()
  })

  it('should have five view components', () => {
    expect(wrapper.find(View)).toHaveLength(2)
  })

  it('should have one TouchableOpacity component', () => {
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1)
  })

  it('should simulate register button', () => {
    const back = wrapper.find(TouchableOpacity).first()
    back.simulate('press')
    expect(back.props().children.props.children).toEqual('Back to Home')
  })
})