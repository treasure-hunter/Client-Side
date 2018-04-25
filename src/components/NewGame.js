import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import {
  Icon,
  List,
  ListItem,
  Right,
  Left,
  Thumbnail
 } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
const Sound = require('react-native-sound');
let song = null
let buttonSong = null

export default class LoginForm extends Component {
  constructor(){
    super()
    this.state = {
      token: null
    }
  }

  componentWillMount() {
    song = new Sound('OneHome.mp3',Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      this.onPressButton()
    })
  }

  onPressButton = () => {
    if (song !== null) {
      song.play(success => {
        if (!success) {
          console.log('error');
        }
      })
    }
  }

  createRoom = () => {
    buttonSong = new Sound('tethys.mp3',Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      song.pause();
      this.onPressButtonPlay()
      if (this.state.token) {
        this.props.toCreateRoom()
      }
    })
  }

  onPressButtonPlay = () => {
    if (buttonSong !== null) {
      buttonSong.play(success => {
        if (!success) {
          console.log('error');
        }
      })
    }
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem('idToken')
    if (token) {
      this.setState({
        token: token
      })
    }
  }

  componentDidMount () {
    this.getToken()
  }

  render() {
    const resizeMode = 'center'

    return (
      <View>
        <View style={{ flex: .9 }}>
          <View style={{ marginTop: 120, alignItems: 'center' }}>
            <Image source={require('../asset/Logov2.png')} style={{ width: 150, height: 170, alignSelf: 'center' }}></Image>
          </View>
          <Grid style={{ alignItems: 'center' }}>
            <Col style={{ width: 130, marginHorizontal: 5 }}>
              <TouchableOpacity
              iconLeft
              onPress={ () => this.createRoom() }
              style={{ paddingVertical: 5, borderRadius: 10, backgroundColor: '#F1F1F4', alignContent: 'center' }}>
                <Icon name='map' style={{ alignSelf: 'center' }}/>
                <Text style={{ fontFamily:'futura', alignSelf: 'center' }}>Create Quest</Text>
              </TouchableOpacity>
            </Col>
            <Col style={{ width: 130, marginHorizontal: 5 }}>
              <TouchableOpacity
              iconLeft
              onPress={ () => this.props.toRoomList() }
              style={{ paddingVertical: 5, borderRadius: 10, backgroundColor: '#F1F1F4', alignContent: 'center' }}>
                <Icon name='people' style={{ alignSelf: 'center' }} />
                <Text style={{ fontFamily:'futura', alignSelf: 'center' }}>Join Quest</Text>
              </TouchableOpacity>
            </Col>
          </Grid>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
            iconLeft
            onPress={ () => this.createRoom() }
            style={{ width: '', borderRadius: 10, backgroundColor: '#F1F1F4', alignContent: 'center' }}>
              <Icon name='home' />
              <Text style={{ fontFamily:'futura' }}>Create Quest</Text>
            </TouchableOpacity>
            <Left />
            <TouchableOpacity
            iconLeft
            onPress={ () => this.props.toRoomList() }
            style={{ borderRadius: 10, backgroundColor: '#F1F1F4', alignContent: 'center' }}>
              <Icon name='people' />
              <Text style={{ fontFamily:'futura'}}>Join Quest</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={{ flex: .1, alignItems: 'center' }}>
          <Text style={{ color: '#F1F1F4', marginHorizontal: 5, fontWeight: '900' }}>2018</Text>
        </View>
      </View>
    );
  }
}
