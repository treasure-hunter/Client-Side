import React, { Component } from 'react';
import {  View, Text, Button } from 'react-native';

export default class GamePlay extends Component {
  back = () => {
    this.props.navigation.navigate('HomeStack')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> This should be AR game play </Text>
        <Button
          onPress={ () => this.back() }
          title="Back"
          color="#841584"
          accessibilityLabel="Back"
        />
      </View>
    );
  }
}
