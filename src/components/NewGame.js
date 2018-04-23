import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Button,
  List,
  ListItem,
  Thumbnail
 } from 'native-base';
 import Image from 'react-native';

export default class LoginForm extends Component {
  createRoom = async () => {
    const token = await AsyncStorage.getItem('idToken')
    if(token) {
      this.props.toCreateRoom()
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor:'#fff' }} >
        <Content style={{ padding:16 }}>

          <Text style={{ marginVertical:30, fontSize:36, textAlign:'center', fontFamily:'Didot' }} >
            Let's Find What's Hidden
          </Text>
          <Thumbnail source='../assets/map.png' />
          <Button
          iconLeft
          onPress={ () => this.createRoom() }
          style={{ alignSelf:'center', marginVertical:10, backgroundColor:'navy' }}
          >
          <Icon name='home' />
          <Text style={{ fontFamily:'futura' }}>Create Quest</Text>
          </Button>
          <Button
          iconLeft
          onPress={ () => this.props.toRoomList() }
          style={{ alignSelf:'center', marginVertical:10, backgroundColor:'green' }}
          >
          <Icon name='people' />
          <Text style={{ fontFamily:'futura'}}>Join Quest</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
