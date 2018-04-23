import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import {
  Icon,
  List,
  ListItem,
  Right,
  Left,
  Thumbnail
 } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Col, Row, Grid } from "react-native-easy-grid";

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
        <View style={{ flex: .9 }}>
          <View style={{ marginTop: 120, alignItems: 'center' }}>
            <Text style={{ fontSize:33, textAlign:'center', fontFamily:'Didot', color: '#F1F1F4', alignSelf: 'center' }} >
              Let's Find What's Hidden
            </Text>
          </View>
          <Grid style={{ alignItems: 'center' }}>
            <Col style={{ marginHorizontal: 5 }}>
              <TouchableOpacity
              iconLeft
              onPress={ () => this.createRoom() }
              style={{ paddingVertical: 5, borderRadius: 10, backgroundColor: '#F1F1F4', alignContent: 'center' }}>
                <Icon name='home' style={{ alignSelf: 'center' }}/>
                <Text style={{ fontFamily:'futura', alignSelf: 'center' }}>Create Quest</Text>
              </TouchableOpacity>
            </Col>
            <Col style={{ marginHorizontal: 5 }}>
              <TouchableOpacity
              iconLeft
              onPress={ () => this.props.toRoomList() }
              style={{ paddingVertical: 5, borderRadius: 10, backgroundColor: '#F1F1F4', alignContent: 'center' }}>
                <Icon name='people' style={{ alignSelf: 'center' }} />
                <Text style={{ fontFamily:'futura', alignSelf: 'center' }}>Join Quest</Text>
              </TouchableOpacity>
            </Col>
          </Grid>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
            iconLeft
            onPress={ () => this.createRoom() }
            style={{ width: '', borderRadius: 10, backgroundColor: '#F1F1F4', alignContent: 'center' }}>
              <Icon name='home' />
              <Text style={{ fontFamily:'futura' }}>Create Quest</Text>
            </TouchableOpacity>
            <Left />
            <TouchableOpacity
            iconLeft
            onPress={ () => this.props.toRoomList() }
            style={{ borderRadius: 10, backgroundColor: '#F1F1F4', alignContent: 'center' }}>
              <Icon name='people' />
              <Text style={{ fontFamily:'futura'}}>Join Quest</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={{ flex: .1, alignItems: 'center' }}>
          <Text style={{ color: '#F1F1F4', marginHorizontal: 5, fontWeight: '900' }}>2018</Text>
        </View>
      </View>
    );
  }
}
