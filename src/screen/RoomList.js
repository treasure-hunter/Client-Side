import React, { Component } from 'react';
import {  View, } from 'react-native';

import RoomDetail from '../components/RoomDetail'

export default class RoomList extends Component {
  static navigationOptions = {
    title: `List Room`
  }

  toGamePlay = () => {
    console.log('testing masuk sini')
    this.props.navigation.navigate('AR')
  }

  render() {
    return (
      <RoomDetail toGamePlay={ this.toGamePlay }/>
    );
  }
}
