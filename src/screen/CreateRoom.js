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
  Icon
} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid'
import { auth } from '../firebase/index';
import { showImagePicker } from 'react-native-image-picker'
import { AsyncStorage, Alert, TouchableOpacity, View, Image } from 'react-native';
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
    title: `Create Quest`
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        waitUntilSaved: true,
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
          type: 'image/jpeg'
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
    const resizeMode = 'center'

    return (
      <View
      style={{ flex: 1, backgroundColor: '#210E3A' }} >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode,
            }}
            source={ require('../asset/bg_2.png')}
          />
        </View>
        <Container>
          <Content style={{ paddingHorizontal:20 }}>
            <Form style={{ paddingVertical:20 }}>
              <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10 }}>
                <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Quest Name</Label>
                <Input
                autoCapitalize='none'
                name="roomName"
                value={ this.state.roomName }
                onChangeText={(roomName) => this.setState({roomName}) }
                />
              </Item>
              <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10 }}>
                <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Description</Label>
                <Input
                autoCapitalize='none'
                name="description"
                value={ this.state.description }
                onChangeText={(description) => this.setState({description}) }
                />
              </Item>
              <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10 }}>
                <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Hint</Label>
                <Input
                autoCapitalize='none'
                name="description"
                value={ this.state.hint }
                onChangeText={(hint) => this.setState({hint}) }
                />
              </Item>
              <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10 }}>
                <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Longitude</Label>
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
              <Item fixedLabel last rounded style={{ marginVertical:10, backgroundColor:'#B1AEC4', borderRadius: 10 }}>
                <Label style={{ fontFamily: 'futura', fontWeight: '500' }}>Latitude</Label>
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
              <TouchableOpacity
              rounded
              info
              style={{ marginVertical: 5, paddingVertical: 10, alignSelf:'center', width: '50%', borderRadius: 10, backgroundColor: '#F1F1F4', alignItems: 'center' }}
              onPress={ () => this.getGeolocation() }>
                <Icon name='ios-locate' />
                <Text style={{ fontFamily: 'futura', fontWeight: 'bold', color: '#3E073E', textAlign: 'center' }}>Get Location</Text>
              </TouchableOpacity>
              <TouchableOpacity
              rounded
              info
              style={{ marginVertical: 5, paddingVertical: 10, alignSelf:'center', width: '50%', borderRadius: 10, backgroundColor: '#F1F1F4', alignItems: 'center' }}
              onPress={ () => this.selectPhotoTapped() }>
                <Icon name='ios-camera' />
              </TouchableOpacity>
              { this.state.latitudeTrig && this.state.longitudeTrig &&
                <TouchableOpacity
                rounded
                success
                style={{ marginVertical: 5, paddingVertical: 10, alignSelf:'center', width: '50%', borderRadius: 10, backgroundColor: '#F1F1F4', alignItems: 'center' }}
                onPress={ () => this.createRoom() }>
                  <Text style={{ fontFamily: 'futura', fontWeight: 'bold', color: '#3E073E', textAlign: 'center' }}>Create</Text>
                </TouchableOpacity>
              }
          </Content>
        </Container>
      </View>
    );
  }
}

export default CreateRoom;
