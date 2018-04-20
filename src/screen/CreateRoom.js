import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text, 
  Right,
  Left,
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid'
import { auth } from '../firebase/index';
import { AsyncStorage, Alert } from 'react-native';
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
    console.log('creating room...')
    const token = await AsyncStorage.getItem('idToken')
    const { roomName, description, longitude, latitude } = this.state
    // const result = await axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/treasure/new',
    //   headers: { token: token },
    //   data: {
    //     roomName: roomName,
    //     description: description,
    //     treasures: [longitude, latitude],
    //   }
    // })
    axios({
      method: 'post',
      url: 'http://localhost:3000/treasure/new',
      headers: { token: token },
      data: {
        roomName: roomName,
        description: description,
        treasures: [longitude, latitude],
      }
    }).then((res) => {
      Alert.alert('Create Room Success')
      this.resetInput()
    }).catch((err) => {
      console.log('err', err)
    })
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
                <Text style={{ paddingVertical: 15, paddingRight: 20 }}>{ this.state.longitude }</Text> : 
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
                <Text style={{ paddingVertical: 15, paddingRight: 20 }}>{ this.state.latitude }</Text> : 
                <Input
                editable={ false }
                autoCapitalize='none'
                name="latitude"
                value={ this.state.latitude }
                onChangeText={(latitude) => this.setState({latitude}) }/>
              }
            </Item>
          </Form>
            <Button
            rounded
            info
            style={{ alignSelf:'center', marginVertical:10 }}
            onPress={ () => this.getGeolocation() }>
              <Text>Get Location</Text>
            </Button>
            { this.state.latitudeTrig && this.state.longitudeTrig &&
              <Button
              rounded
              success
              style={{ alignSelf:'center', marginVertical:10 }}
              onPress={ () => this.createRoom() }>
                <Text>Create</Text>
              </Button>
            }
        </Content>
      </Container>
    );
  }
}

export default CreateRoom;
