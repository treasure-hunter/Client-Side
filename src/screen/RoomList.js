import React, { Component } from 'react';
import { View, Image } from 'react-native';
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
    const resizeMode = 'center'

    return (
      <View
      style={{ flex: 1, backgroundColor: '#210E3A' }} >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '100%',
            height: '100%',
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
        <RoomDetail toGamePlay={ this.toGamePlay }/>
      </View>
    );
  }
}
