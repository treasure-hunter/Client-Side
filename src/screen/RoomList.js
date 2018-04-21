import React, { Component } from 'react';
import {  View, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RoomDetail from '../components/RoomDetail'

export default class RoomList extends Component {
  static navigationOptions = {
    title: `List Quest`
  }

  toGamePlay = () => {
    this.props.navigation.navigate('GamePlay')
  }

  render() {
    return (
      <LinearGradient
      colors={['#3E073E', '#210E3A']}
      style={{ flex: 1 }} >
        <RoomDetail toGamePlay={ this.toGamePlay }/>
      </LinearGradient>
    );
  }
}
