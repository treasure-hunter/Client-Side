import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation'
import firebase from 'firebase';

// const iosClientId = "449951420031-legoh60gk28cma8qhrbandiaj7ge9645.apps.googleusercontent.com"

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor:'#fff' }} >
        <Content style={{ padding:16 }}>
          <Text style={{ marginVertical:30, fontSize:36, textAlign:'center', fontFamily:'Didot' }} >
            Let's Find What's Hidden
          </Text>
           <Card>
            <CardItem>
              <Icon active name="logo-googleplus" style={{ color:'red' }}/>
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" style={{ color:'blue' }}/>
              </Right>
             </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Icon active name="logo-facebook" style={{ color:'blue' }}/>
              <Text>Facebook </Text>
              <Right>
                <Icon name="arrow-forward" style={{ color:'blue' }}/>
              </Right>
             </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Icon active name="search" style={{ color:'gold' }} />
              <Text onPress={ this.props.toRegisterForm }>Register </Text>
              <Right>
                <Icon name="arrow-forward" style={{ color:'blue' }}/>
              </Right>
             </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Icon active name="arrow-dropright" style={{ color:'gold' }} />
              <Text onPress={ this.props.toLoginForm }>Login  </Text>
              <Right>
                <Icon name="arrow-forward" style={{ color:'blue' }}/>
              </Right>
             </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default LoginForm
