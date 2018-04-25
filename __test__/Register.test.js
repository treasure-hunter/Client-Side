import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Register } from '../src/screen/Register'

Enzyme.configure({ adapter: new Adapter() })

const authEmail = {
  loading: false,
  error: false,
  errorData: null,
  status: false,
  email: '',
  password: '',
  token: '',
  uid: ''
}

let wrapper;
beforeEach(function() {
  wrapper = shallow( <Register authEmail={ authEmail }/> ) 
})

describe('register screen test', () => {
  it('should render without error', () => {
    expect(wrapper).toBeDefined()
  })
})