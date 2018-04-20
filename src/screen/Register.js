import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { db, auth } from '../firebase/index'
import { Alert } from 'react-native'
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
      this.props.navigation.navigate('Auth')
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
    return (
      <Container>
        {
          this.props.authEmail.loading ?
          <Text>Please wait..</Text>
          :
          <Content style={{ paddingHorizontal:20 }}>
            <Form style={{ paddingVertical:20 }}>
            <Item fixedLabel last rounded style={ styles.questionForm }>
                <Label>Username</Label>
                <Input
                name="username"
                autoCapitalize='none'
                value={ this.state.username }
                onChangeText={(username) => this.setState({username}) }/>
              </Item>
              <Item fixedLabel last rounded style={ styles.questionForm }>
                <Label>Email</Label>
                <Input
                name="email"
                autoCapitalize='none'
                value={ this.state.email }
                onChangeText={(email) => this.setState({email}) }/>
              </Item>
              <Item fixedLabel last rounded style={ styles.questionForm }>
                <Label>Password</Label>
                <Input
                name="password"
                secureTextEntry={ true }
                type="password"
                value={ this.state.password }
                onChangeText={(password) => this.setState({password}) }/>
              </Item>
            </Form>
            <Button rounded success onPress={ () => this.onRegister() }>
              <Text>Register</Text>
            </Button>
          </Content>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  questionForm: {
    marginVertical:10,
    backgroundColor:'white'
  },
})

const mapStateToProps = state => ({
  authEmail: state.authEmail
})

const mapDispatchToProps = dispatch => bindActionCreators ({
  registerwithEmail
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
