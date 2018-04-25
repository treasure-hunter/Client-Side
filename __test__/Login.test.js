import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import { Login } from '../src/screen/Login'
import { Input } from 'native-base';
import { View, TouchableOpacity } from 'react-native'

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

const navigation = {
  navigate: ''
}

let wrapper;
beforeEach(function() {
  wrapper  = shallow( <Login authEmail={ authEmail } navigation={ navigation }/> )
})
describe('Login screen test', () => {
  it('renders without error', () => {
    expect(wrapper).toBeDefined()
  })

  it('should have an initial state', () => {
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  })

  it('should have five view components', () => {
    expect(wrapper.find(View)).toHaveLength(5)
  })

  it('should have two text input components', () => {
    expect(wrapper.find(Input)).toHaveLength(2)
  })

  it('should have one button', () => {
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1)
    expect(wrapper.find(TouchableOpacity).first().props().children.props.children).toEqual('SIGN IN')
  })

  it('should have email input with value dependent on state', () => {
    wrapper.setState({ email: 'new@mail.com' })
    expect(wrapper.find(Input).first().props().value).toEqual('new@mail.com')
  })

  it('should have password input with value dependent on state', () => {
    wrapper.setState({ password: '123456' })
    expect(wrapper.find(Input).at(1).props().value).toEqual('123456')
  })

  it('should change state when email input changes', () => {
    const emailInput = wrapper.find(Input).first()
    emailInput.simulate('ChangeText', 'new@mail.com')
    expect(wrapper.state('email')).toEqual('new@mail.com')
  })

  it('should change state when password input changes', () => {
    const passwordInput = wrapper.find(Input).at(1)
    passwordInput.simulate('ChangeText', '123456')
    expect(wrapper.state('password')).toEqual('123456')
  })

  it('should reset state when resetInput method invoked', () => {
    wrapper.instance().resetInput()
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  })

  it('should invokes onSignIn method with email and password', () => {
    console.log('lalalala')
    const signin = wrapper.find(TouchableOpacity).first()
    console.log(signin)
    signin.simulate('press')
  })
})