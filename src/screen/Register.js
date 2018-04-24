import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Item, Input, Label, Spinner } from 'native-base';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { db, auth } from '../firebase/index'
import firebase from 'firebase'
import { bindActionCreators } from 'redux'

import { registerwithEmail } from '../store/auth/auth-actions'

export class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: `Register`
  }

  onRegister = () => {
    const {username, email, password} = this.state
    this.props.registerwithEmail(username, email, password, () => {
      Alert.alert('Register Succes')
      this.props.navigation.navigate('Login')
    })

    this.resetInput()
  }

  resetInput = () => {
    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }

  render() {
    const resizeMode = 'center'

    return (
      <View
      style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#210E3A' }} >
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
          <Text style={{ fontSize:48, textAlign:'center', fontFamily:'Didot', color: '#F1F1F4' }} >
            Register
          </Text>
          {
            this.props.authEmail.loading ?
            <View>
              <Spinner color="white" />
            </View>
            :
            <View style={{ paddingHorizontal:20 }}>
              <Form style={{ paddingVertical:20 }}>
                <Item fixedLabel last style={ styles.questionForm }>
                  <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Username</Label>
                  <Input
                  name="username"
                  autoCapitalize='none'
                  value={ this.state.username }
                  onChangeText={(username) => this.setState({username}) }/>
                </Item>
                <Item fixedLabel last style={ styles.questionForm }>
                  <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Email</Label>
                  <Input
                  name="email"
                  autoCapitalize='none'
                  value={ this.state.email }
                  onChangeText={(email) => this.setState({email}) }/>
                </Item>
                <Item fixedLabel last rounded style={ styles.questionForm }>
                  <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Password</Label>
                  <Input
                  name="password"
                  secureTextEntry={ true }
                  type="password"
                  value={ this.state.password }
                  onChangeText={(password) => this.setState({password}) }/>
                </Item>
              </Form>
              <TouchableOpacity
              style={{ paddingVertical: 10, alignSelf:'center', width: '50%', borderRadius: 10, backgroundColor: '#F1F1F4', alignItems: 'center', shadowColor: '#F1F1F4', shadowOffset: {width: 0, height: 5}, shadowRadius: 0, shadowOpacity: .9 } }
              success
              onPress={ () => this.onRegister() }>
                <Text style={{ fontFamily: 'futura', fontWeight: 'bold', color: '#3E073E', textAlign: 'center' }}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  questionForm: {
    marginVertical:10,
    width: 300,
    backgroundColor:'#B1AEC4',
    borderRadius: 10
  },
})

const mapStateToProps = state => ({
  authEmail: state.authEmail
})

const mapDispatchToProps = dispatch => bindActionCreators ({
  registerwithEmail
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
