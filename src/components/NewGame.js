import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Icon,
  Right,
  Button,
  List,
  ListItem,
  Thumbnail
 } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export default class LoginForm extends Component {
  createRoom = async () => {
    const token = await AsyncStorage.getItem('idToken')
    if(token) {
      this.props.toCreateRoom()
    }
  }

  render() {
    return (
      <View>
        <View style={{ flex: .9, justifyContent: 'center' }}>
          <View>
            <Text style={{ fontSize:33, textAlign:'center', fontFamily:'Didot', color: '#F1F1F4' }} >
              Let's Find What's Hidden
            </Text>
          </View>
          <View>
            <Thumbnail source='../assets/map.png' />
            <TouchableOpacity
            iconLeft
            onPress={ () => this.createRoom() }
            style={{ marginBottom: 13, paddingVertical: 10, alignSelf:'center', width: '50%', borderRadius: 10, backgroundColor: '#F1F1F4', alignItems: 'center' }}
            >
            <Icon name='home' />
            <Text style={{ fontFamily:'futura' }}>Create Quest</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
            iconLeft
            onPress={ () => this.props.toRoomList() }
            style={{ paddingVertical: 10, alignSelf:'center', width: '50%', borderRadius: 10, backgroundColor: '#F1F1F4', alignItems: 'center' }}
            >
            <Icon name='people' />
            <Text style={{ fontFamily:'futura'}}>Join Quest</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: .1, alignItems: 'center' }}>
          <Text style={{ color: '#F1F1F4', marginHorizontal: 5, fontWeight: '900' }}>2018</Text>
        </View>
      </View>
    );
  }
}
