import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Spinner,
  Text } from 'native-base';
import { auth } from '../firebase/index';
import { AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'

import { loginwithEmail } from '../store/auth/auth-actions'

export class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: `Login`
  }

  onSignIn = () => {
    const { email, password } = this.state
    this.props.loginwithEmail(email, password, () => {
      this.loginSuccess()
    })
    this.resetInput()
  }

  resetInput = () => {
    this.setState({
      email: '',
      password: ''
    })
  }

  loginSuccess = () => {
    this.props.navigation.navigate('HomeStack')
  }

  render() {
    return (
      <Container>
        {
          this.props.authEmail.loading ?
          <Content>
            <Spinner color="blue" />
          </Content>
           : 
          <Content style={{ paddingHorizontal:20 }}>
            <Form style={{ paddingVertical:20 }}>
              <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'white' }}>
                <Label>Email</Label>
                <Input
                autoCapitalize='none'
                name="email"
                value={ this.state.email }
                onChangeText={(email) => this.setState({email}) }
                />
              </Item>
              <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'white' }}>
                <Label>Password</Label>
                <Input
                secureTextEntry={true}
                name="password"
                type="password"
                value={ this.state.password }
                onChangeText={(password) => this.setState({password}) }/>
              </Item>
            </Form>
            <Button rounded success onPress={ () => this.onSignIn() }>
              <Text>Login</Text>
            </Button>
          </Content>
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authEmail: state.authEmail
})

const mapDispatchToProps = dispatch => bindActionCreators ({
  loginwithEmail
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);
