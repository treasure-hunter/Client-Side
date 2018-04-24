import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Header,
  Form,
  Item,
  Input,
  Label,
  Spinner,
  Text } from 'native-base';
import { auth } from '../firebase/index';
import { AsyncStorage, StyleSheet, TouchableOpacity, View, Image, Alert } from 'react-native'
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
    title: `Carta`
  }

  onSignIn = () => {
    const { email, password } = this.state
    this.props.loginwithEmail(email, password, () => {
      if(this.props.authEmail.error) {
        Alert.alert('Incorrect email or password')
      } else {
        this.loginSuccess()
      }
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
    const resizeMode = 'center'
    const bgImage = require('../asset/bg_2.png')

    return (
      <View style={{ flex: 1, backgroundColor: '#210E3A', alignItems: 'center', justifyContent:'space-around' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode,
            }}
            source={ require('../asset/bg_2.png')}
          />
        </View>
        <View>
          <Image source={require('../asset/Logov2.png')} style={{ width: 150, height: 170, alignSelf: 'center' }}></Image>
          {
            this.props.authEmail.loading && !this.props.authEmail.error ?
            <View>
              <Spinner color="white" />
            </View>
            :
            <View>
              <Form style={{ paddingVertical:20 }}>
                <Item fixedLabel last style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10, width: '100%' }}>
                  <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Email</Label>
                  <Input
                  autoCapitalize='none'
                  name="email"
                  value={ this.state.email }
                  onChangeText={(email) => this.setState({email}) }
                  />
                </Item>
                <Item fixedLabel last style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10, width: '100%' }}>
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
              <View style={{ flexDirection: 'row', marginVertical: 15, alignSelf: 'center' }}>
                <Text style={{ fontFamily: 'futura', color: '#F1F1F4', marginHorizontal: 5, fontWeight: '500' }}>Don't have an account yet?</Text>
                <Text
                  style={{ fontFamily: 'futura', color: '#F1F1F4', fontWeight: '500', textDecorationLine: 'underline' }}
                  onPress={ () => this.props.navigation.navigate('Register') }>Register</Text>
              </View>
            </View>
          }
        </View>
      </View>
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
