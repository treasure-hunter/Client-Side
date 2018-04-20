import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import LoginCard from '../components/LoginCard'
import NewGame from '../components/NewGame'
export default class Login extends Component {

  static navigationOptions = {
    title: `cARta`
  }

  toRegisterForm = () => {
    this.props.navigation.navigate('Register')
  }

  toLoginForm = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <Container>
        <Content>
          <LoginCard toRegisterForm={ this.toRegisterForm } toLoginForm={ this.toLoginForm }/>
          {/* <NewGame /> */}
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>2018</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}