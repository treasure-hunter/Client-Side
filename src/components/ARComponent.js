import React, { Component } from 'react';
import {
  ViroARScene,
  ViroText,
} from 'react-viro'
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native'

export default class ARComponent extends Component {

  _back = () => {
    this.props.navigation.navigate('Test')
  }

  render() {
    return (
      <View collapsable={ false } style={{ flex: 1 }}>
        <ViroARScene>
          <ViroText text="helloooooo" scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
          <TouchableHighlight onPress={this._back}>
            <Text style={{ fontSize: 40 }}>hello</Text>
          </TouchableHighlight>
        </ViroARScene>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});
