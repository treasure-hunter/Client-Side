import React, { Component } from 'react';
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroText,
  ViroConstants,
} from 'react-viro';

import {
  View,
  TouchableHighlight,
  Text,
  Image,
  Alert,
  StyleSheet
} from 'react-native'

import InitialARScene from '../components/ARComponent'

export default class ARScene extends Component {
  constructor () {
    super()
  }
  render() {
    return (
      <View collapsable={false} style={{ flex: 1 }}>
        <Text>HHAHAHHAHAHAHAH</Text>
        <ViroARSceneNavigator apiKey="61B4DBB3-170C-4515-B297-B388A9C75C61"
        style={{ flex: 1 }}
        initialScene={{scene: InitialARScene}} />
        <View style={{ position:"absolute", left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
          <TouchableHighlight
            style={{ height: 80, width: 80, paddingTop: 20, paddingBottom: 20, marginVertical: 10, backgroundColor: '#00000000', borderRadius: 10, borderColor: '#ffffff00' }}
            
            underlayColor={'#ffffff00'}
          >
            <Text style={{ fontSize: 40 }}>Capture</Text>
          </TouchableHighlight>
        </View>
      </View>
    
    )
  }
};
