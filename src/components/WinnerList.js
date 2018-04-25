import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Card, CardItem, Body } from 'native-base';

export default class WinnerList extends React.Component {
  render () {

    if (this.props.winner) {
      const wins = this.props.winner
      const win = Object.entries(wins)

      return (
        <View>

          {
            win.map(data => (
              <Text style={{ color: 'white' }} >
                {data[1].displayName}
              </Text>
            ))
          }

        </View>
      )
    } else {
      return (
        <View>
          <Text style={{ color: 'white' }} >
            
          </Text>
        </View>
      )
    }


  }
}
