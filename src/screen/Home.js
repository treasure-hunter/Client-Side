import React, { Component } from 'react';
import { View } from 'react-native'
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
      <View
      style={{ flex: 1, alignItems: 'center', backgroundColor: '#210E3A' }} >
        <NewGame toCreateRoom={ this.toCreateRoom } toRoomList={ this.toRoomList }/>
      </View>
    );
  }
}
