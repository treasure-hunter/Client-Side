import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
      <LinearGradient
      colors={['#3E073E', '#210E3A']}
      style={{ flex: 1, alignItems: 'center' }} >
        <NewGame toCreateRoom={ this.toCreateRoom } toRoomList={ this.toRoomList }/>
      </LinearGradient>
    );
  }
}
