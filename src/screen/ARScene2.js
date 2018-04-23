import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Image,
  Button
} from 'react-native';

import { Icon } from 'native-base';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosition } from '../store/ARScene/ar-action'
import { NavigationActions } from 'react-navigation';

const toHome = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
})

var sharedProps = {
  apiKey:"61B4DBB3-170C-4515-B297-B388A9C75C61",
}



// Sets the default scene you want for AR and VR
// var InitialARScene = require('../../js/HelloWorldSceneAR');/
import InitialARScene from '../../js/HelloWorldSceneAR'

export class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      sharedProps : sharedProps
    }
    this._getARNavigator = this._getARNavigator.bind(this);
  }

  render() {

    return this._getARNavigator()
  }

  // Returns the ViroARSceneNavigator which will start the AR experience

  _getARNavigator() {
    return (
      <View collapsable={false} style={{ flex: 1 }}>
        <ViroARSceneNavigator {...this.state.sharedProps}
          style={{ flex: 1 }}
          initialScene={{scene: InitialARScene}}
        />
        <View style={{ position:"absolute", left: 0, right: 0, top: 60, alignItems: 'center',  }}>
          <View style={{ width: 100, height: 40, borderRadius: 30 , backgroundColor: '#210E3A', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{  color: '#F1F1F4', fontSize: 15,  }}>
              { this.props.fetchAction.distance } m
            </Text>
          </View>
        </View>

        <View style={{ position:"absolute", left: -30, right: 0, top: 60, alignItems: 'flex-start' }}>
          <TouchableHighlight
            onPress={ () => this.props.navigation.dispatch(toHome) }
            style={{ alignItems: 'center', justifyContent: 'center',height: 40, width: 120, paddingTop: 0, paddingBottom: 0, backgroundColor: '#210E3A', borderRadius: 20, borderColor: '#210E3A' }}
            underlayColor={'#ffffff'}
          >
            <View style={{ paddingLeft: 30 ,alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="ios-home-outline" style={{fontSize: 32, color: 'white'}}/>
            </View>
          </TouchableHighlight>
        </View>

        <View style={{ position:"absolute", left: 0, right: 20, bottom: 43, alignItems: 'flex-end' }}>
          {
            (this.props.fetchAction.distance <= 10) ?
            (
              <Image
              style={{width: 70, height: 125, borderRadius: 5}}
              source={{uri: this.props.image_path}}
              />
            )
            :
            (
              <View>
                <Text> </Text>
              </View>
            )
          }
        </View>

        <View style={{ position:"absolute", left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
          {
            (this.props.fetchAction.distance <= 10) ?
            (
              <TouchableHighlight
                style={{ height: 80, width: 80, paddingTop: 20, paddingBottom: 20, marginVertical: 10, backgroundColor: '#00000000', borderRadius: 40, borderColor: '#ffffff00' }}
                underlayColor={'#7E799C'}
                onPress={ () => this.props.navigation.navigate('Winner') }
                >
                <Image source={require("../../js/res/CamButton.png")}/>
              </TouchableHighlight>
            )
            : (
              <TouchableHighlight
                style={{ height: 80, width: 80, paddingTop: 20, paddingBottom: 20, marginVertical: 10, backgroundColor: '#00000000', borderRadius: 40, borderColor: '#ffffff00' }}
                underlayColor={'#FF2B5E'}
                >
                <Text>Too far from object :(</Text>
              </TouchableHighlight>
            )
          }
        </View>

      </View>

    );
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

const mapStateToProps = state => ({
  fetchAction: state.fetchAction,
  image_path: state.fetchAction.image_path
})


export default connect(mapStateToProps, null)(ViroSample)
