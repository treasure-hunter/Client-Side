import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ModalExample from '../src/components/Modal'
import { TouchableHighlight } from 'react-native'

Enzyme.configure({ adapter: new Adapter() })

let wrapper;
beforeEach(function() {
  wrapper = shallow(<ModalExample/>)
})

describe('Modal component test', () => {
  it('should render correctly', () => {
    expect(wrapper).toBeDefined()
  })

  it('should change the initial state', () => {
    wrapper.instance().setModalVisible(true)
    expect(wrapper.state('modalVisible')).toEqual(true)
  })

  it('should have two touchablehighlight components', () => {
    expect(wrapper.find(TouchableHighlight)).toHaveLength(2)
  })

  it('should have two touchablehighlight components', () => {
    const close = wrapper.find(TouchableHighlight).first()
    close.simulate('press')
    expect(wrapper.state('modalVisible')).toEqual(true)
  })

  it('should have two touchablehighlight components', () => {
    const show = wrapper.find(TouchableHighlight).at(1)
    show.simulate('press')
    expect(wrapper.state('modalVisible')).toEqual(true)
  })
})