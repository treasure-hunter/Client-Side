import React, { Component } from 'react';
import { View, Image } from 'react-native'
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
