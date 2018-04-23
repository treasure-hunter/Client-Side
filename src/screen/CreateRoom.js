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
import { showImagePicker } from 'react-native-image-picker'
import { AsyncStorage, Alert, TouchableOpacity } from 'react-native';
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
      image: '',
      hint: '',
      latitudeTrig: false,
      longitudeTrig: false
    }
  }

  static navigationOptions = {
    title: `Create Room`
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    showImagePicker(options, (res) => {
      console.log('response =>', res)

      if (res.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      }
      else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      }
      else {
        let source = {
          uri: res.uri,
          name: res.fileName,
          type: res.type
        };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + res.data };

        this.setState({
          image: source
        });
      }
    })
  }

  createFormData = () => {
    let formData = new FormData()

    formData.append('roomName', this.state.roomName)
    formData.append('description', this.state.description)
    formData.append('hint', this.state.hint)
    formData.append('image', this.state.image)
    formData.append('longitude', this.state.longitude)
    formData.append('latitude', this.state.latitude)


    return formData
  }

  createRoom = async () => {
    console.log('creating room...')
    let formData = this.createFormData()
    console.log('form>>>', formData)
    const token = await AsyncStorage.getItem('idToken')
    const { roomName, description, longitude, latitude } = this.state
    axios.post('https://fancy-to-do.appspot.com/treasure/new', formData, {
      headers: { token: token }
    })
    .then((res) => {
      console.log('res>>>>>>>>>>>>>>>>>>', res)
      Alert.alert('Create Quest Success')
      this.resetInput()
      this.props.navigation.navigate('Home')
    }).catch((err) => {
      console.log('masuk errorrr', err)
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
      image: '',
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
            <Button
            rounded
            info
            style={{ alignSelf:'center', marginVertical:10 }}
            onPress={ () => this.selectPhotoTapped() }>
              <Text>Take Picture</Text>
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
