import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Button, List, ListItem } from 'native-base';

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
          <List>
            <ListItem>
              <Button
                onPress={ () => this.createRoom() }
                iconLeft rounded style={{ color:'white' }} >
                <Icon name='home' />
                <Text>Create Room</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onPress={ () => this.props.toRoomList() }
                iconLeft rounded style={{ color:'white' }} >
                <Icon name='people' />
                <Text>Room List</Text>
              </Button>
            </ListItem>
          </List>
          {/* <Card>
            <CardItem>
              <Button
              onPress={ () => this.createRoom() }
              iconLeft rounded style={{ color:'white' }} >
              <Icon name='home' />
              <Text>Create Room</Text>
              </Button>
             </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Button
              onPress={ () => this.props.toRoomList() }
              iconLeft rounded style={{ color:'white' }} >
              <Icon name='people' />
              <Text>Join Room</Text>
              </Button>
             </CardItem>
          </Card> */}
        </Content>
      </Container>
    );
  }
}