import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import LoginCard from '../components/LoginCard'
import NewGame from '../components/NewGame'

export default class Home extends Component {
  static navigationOptions = {
    title: `cARta`
  }

  toCreateRoom = () => {
    this.props.navigation.navigate('CreateRoom')
  }
  
  toRoomList = () => {
    this.props.navigation.navigate('RoomList')
  }

  render() {
    return (
      <Container>
        <Content>
          <NewGame toCreateRoom={ this.toCreateRoom } toRoomList={ this.toRoomList }/>
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