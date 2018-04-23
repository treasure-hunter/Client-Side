import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Header,
  Form,
  Item,
  Input,
  Label,
  Spinner,
  View,
  Text } from 'native-base';
import { auth } from '../firebase/index';
import { AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient';

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
    title: `Carta`
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
      email: 'new@mail.com',
      password: '123456'
    })
  }

  loginSuccess = () => {
    this.props.navigation.navigate('HomeStack')
  }

  render() {
    return (
      <LinearGradient colors={['#3E073E', '#210E3A']} style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize:33, textAlign:'center', fontFamily:'Didot', color: '#F1F1F4' }} >
            Let's Find What's Hidden
          </Text>
          {
            this.props.authEmail.loading ?
            <View>
              <Spinner color="white" />
            </View>
            : 
            <View>
              <Form style={{ paddingVertical:20 }}>
                <Item fixedLabel last style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10 }}>
                  <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Email</Label>
                  <Input
                  autoCapitalize='none'
                  name="email"
                  value={ this.state.email }
                  onChangeText={(email) => this.setState({email}) }
                  />
                </Item>
                <Item fixedLabel last style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10 }}>
                  <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Password</Label>
                  <Input
                  secureTextEntry={true}
                  name="password"
                  type="password"
                  value={ this.state.password }
                  onChangeText={(password) => this.setState({password}) }/>
                </Item>
              </Form>
              <TouchableOpacity
              style={{ paddingVertical: 10, alignSelf:'center', width: '50%', borderRadius: 10, backgroundColor: '#F1F1F4', alignItems: 'center' }}
              success
              onPress={ () => this.onSignIn() }>
                <Text style={{ fontFamily: 'futura', fontWeight: 'bold', color: '#3E073E', textAlign: 'center' }}>SIGN IN</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                <Text style={{ fontFamily: 'futura', color: '#F1F1F4', marginHorizontal: 5, fontWeight: '500' }}>Don't have an account yet?</Text>
                <Text
                  style={{ fontFamily: 'futura', color: '#F1F1F4', fontWeight: '500', textDecorationLine: 'underline' }}
                  onPress={ () => this.props.navigation.navigate('Register') }>Register</Text>
              </View>
            </View>
          }
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  authEmail: state.authEmail
})

const mapDispatchToProps = dispatch => bindActionCreators ({
  loginwithEmail
}, dispatch)

var styles = StyleSheet.create({
  text: {
    color: '#D8D6E1'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
