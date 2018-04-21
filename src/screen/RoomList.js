import React, { Component } from 'react';
import {  View, } from 'react-native';

import RoomDetail from '../components/RoomDetail'

export default class RoomList extends Component {
  static navigationOptions = {
    title: `List Room`
  }

  render() {
    return (
      <RoomDetail />
    );
  }
}

