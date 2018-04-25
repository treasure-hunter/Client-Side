import React, { Component } from 'react';
import { View, Image } from 'react-native'
import LoginCard from '../components/LoginCard'
import NewGame from '../components/NewGame'

const Sound = require('react-native-sound');
let songList = null

export default class Home extends Component {
  static navigationOptions = {
    title: `cARta`
  }

  toCreateRoom = () => {
    this.props.navigation.navigate('CreateRoom')
  }

  toRoomList = () => {

    song = new Sound('tethys.mp3',Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      this.onPressButtonPlay()
      this.props.navigation.navigate('RoomList')
    })
  }

  onPressButtonPlay = () => {
    if (song !== null) {
      song.play(success => {
        if (!success) {
          console.log('error');
        }
      })
    }
  }

  render() {
    const resizeMode = 'center'
    return (
      <View
      style={{ flex: 1, alignItems: 'center', backgroundColor: '#210E3A' }} >
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
        <NewGame toCreateRoom={ this.toCreateRoom } toRoomList={ this.toRoomList }/>
      </View>
    );
  }
}
