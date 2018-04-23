import React, { Component } from 'react';
import {  View, } from 'react-native';
import RoomDetail from '../components/RoomDetail'

export default class RoomList extends Component {
  static navigationOptions = {
    title: `List Quest`
  }

  toGamePlay = () => {
    console.log('testing masuk sini')
    this.props.navigation.navigate('AR')
  }

  render() {
    return (
      <View
      style={{ flex: 1, backgroundColor: '#210E3A' }} >
        <RoomDetail toGamePlay={ this.toGamePlay }/>
      </View>
    );
  }
}
