import React, { Component } from 'react';
import {  View, } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem
} from 'native-base';
import { db } from '../firebase'

export default class RoomList extends Component {
  constructor() {
    super()
    this.state = {
      rooms: []
    }
  }

  static navigationOptions = {
    title: `List Room`
  }

  fetchData = () => {
    console.log('masuk 1')
    db.ref('Room').on('value', (snapshot) => {
      console.log(snapshot.val())
      const rooms = snapshot.val()
      const listRoom = Object.keys(rooms).map(key => ({
        data: rooms[key],
        id: key
      }))
      this.setState({
        rooms: listRoom
      })
      console.log(listRoom)
    })
    // .then(snapshot => {
    //   console.log(snapshot, 'masuk')
    // })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <Container>
        <List>
          { this.state.rooms.length > 0 &&
            this.state.rooms.map(room => (
              <ListItem>
                <Text>{ room.data.roomName }</Text>
                <Button />
              </ListItem>
            ))
          }
        </List>
      </Container>
    );
  }
}
