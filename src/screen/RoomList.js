import React, { Component } from 'react';
import {  View, } from 'react-native';

import RoomDetail from '../components/RoomDetail'

export default class RoomList extends Component {
  static navigationOptions = {
    title: `List Room`
  }

  toGamePlay = () => {
    this.props.navigation.navigate('GamePlay')
  }

  render() {
    return (
      <RoomDetail toGamePlay={ this.toGamePlay }/>
    );
  }
}
