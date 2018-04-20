import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { auth } from '../firebase/index';
import { AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { loginwithEmail } from '../store/auth/auth-actions'

export class CreateRoom extends Component {
  constructor () {
    super()
    this.state = {
      roomName: '',
      description: '',
      longitude: '',
      latitude: '',
      hint: '',
      latitudeTrig: false,
      longitudeTrig: false
    }
  }

  static navigationOptions = {
    title: `Create Room`
  }

  createRoom = async () => {
    const token = await AsyncStorage.getItem('idToken')
    const { roomName, description, longitude, latitude } = this.state
    const result = await axios({
      method: 'post',
      url: 'http://localhost:3000/treasure/new',
      headers: { token: token },
      data: {
        roomName: roomName,
        description: description,
        treasures: [longitude, latitude],
      }
    })
    this.resetInput()
  }

  getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          longitudeTrig: true,
          latitudeTrig: true
        })
      }
    )
  }

  resetInput = () => {
    this.setState({
      roomName: '',
      description: '',
      longitude: '',
      latitude: '',
      hint: ''
    })
  }

  render() {
    return (
      <Container>
        <Content style={{ paddingHorizontal:20 }}>
          <Form style={{ paddingVertical:20 }}>
            <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'white' }}>
              <Label>Room Name</Label>
              <Input
              autoCapitalize='none'
              name="roomName"
              value={ this.state.roomName }
              onChangeText={(roomName) => this.setState({roomName}) }
              />
            </Item>
            <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'white' }}>
              <Label>Description</Label>
              <Input
              autoCapitalize='none'
              name="description"
              value={ this.state.description }
              onChangeText={(description) => this.setState({description}) }
              />
            </Item>
            <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'white' }}>
              <Label>Hint</Label>
              <Input
              autoCapitalize='none'
              name="description"
              value={ this.state.hint }
              onChangeText={(hint) => this.setState({hint}) }
              />
            </Item>
            <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'white' }}>
              <Label>Longitude</Label>
              {
                (this.state.longitudeTrig) ?
                <Text style={{ paddingVertical: 10, paddingRight: 20 }}>{ this.state.longitude }</Text> : 
                <Input
                editable={ false }
                autoCapitalize='none'
                name="longitude"
                value={ this.state.longitude }
                onChangeText={(longitude) => this.setState({longitude}) }
                />
              }
            </Item>
            <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'white' }}>
              <Label>Latitude</Label>
              {
                (this.state.latitudeTrig) ?
                <Text style={{ paddingVertical: 10, paddingRight: 20 }}>{ this.state.latitude }</Text> : 
                <Input
                editable={ false }
                autoCapitalize='none'
                name="latitude"
                value={ this.state.latitude }
                onChangeText={(latitude) => this.setState({latitude}) }/>
              }
            </Item>
          </Form>
          <Button rounded success onPress={ () => this.createRoom() }>
            <Text>Submit</Text>
          </Button>
          <Button rounded success onPress={ () => this.getGeolocation() }>
            <Text>Get Location</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default CreateRoom;
