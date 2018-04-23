import React, { Component } from 'react';
import {  View, Text, } from 'react-native';

export default class Winner extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent:'center' }}>
        <Text style={{ fontSize: 40 }}> Congrats you have won!!! </Text>
      </View>
    );
  }
}
