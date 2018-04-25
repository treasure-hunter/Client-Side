import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Login } from '../src/screen/Login'
import { Input, Text } from 'native-base';
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
  navigate: function() {}
}

const loginwithEmail = function () {}

let wrapper;
beforeEach(function() {
  mockFunction = jest.fn()
  wrapper  = shallow( <Login press={mockFunction} authEmail={ authEmail } navigation={ navigation } loginwithEmail={loginwithEmail}/> )
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
    const signin = wrapper.find(TouchableOpacity).first()
    const onSignIn = wrapper.instance().onSignIn()
    wrapper.setState({email: 'new@mail.com'})
    wrapper.setState({password: '123456'})
    signin.simulate('press')
    // console.log(mockFunction)
    // expect(mockFunction).toHaveBeenCalled()
    // wrapper.instance().loginSuccess()
  })

  it('should invokes loginSucces when signin succeed', () => {
    wrapper.instance().loginSuccess()
  })

  it('should simulate register button', () => {
    const register = wrapper.find(Text).at(2)
    register.simulate('press')
    expect(register.props().children).toEqual('Register')
  })
})