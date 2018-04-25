import React, { Component } from 'react';
import {  View, Text, Image, TouchableOpacity } from 'react-native';

const Sound = require('react-native-sound');
let song = null

export default class Winner extends Component {
  componentWillMount() {
    song = new Sound('victoryff.swf.mp3',Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      this.onPressButtonPlay()
    })
  }

  onPressButtonPlay = () => {
    if (song !== null) {
      song.play(success => {
        if (!success) {
          console.log('error');
        }
      })
    }
  }

  render() {
    const resizeMode = 'center'
    return (
      <View style={{ flex: 1, justifyContent:'center', backgroundColor:'#D8D6E1' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '100%',
            height: '100%',
            opacity: 0.7
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode,
            }}
            source={ require('../asset/bg_compass.png')}
          />
        </View>
        <Image source={ require("../asset/winner.png") } style={{ width: 200, height: 220, alignSelf: 'center' }} />
        <Text style={{ fontSize: 40, fontFamily:'futura' ,color:'', alignSelf:'center', textAlign:'center' }}> Congrats you have won!!! </Text>
        <TouchableOpacity
          rounded
          success
          style={{ marginVertical: 5, paddingVertical: 10, alignSelf:'center', width: '50%', borderRadius: 10, backgroundColor: '#F1F1F4', alignItems: 'center' }}
          onPress={ () => this.props.navigation.navigate('HomeStack') }>
          <Text style={{ fontFamily: 'futura', fontWeight: 'bold', color: '#3E073E', textAlign: 'center' }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
