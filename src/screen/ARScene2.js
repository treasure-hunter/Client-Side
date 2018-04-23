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

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosition } from '../store/ARScene/ar-action'



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
        <View style={{ position:"absolute", left: 0, right: 0, top: 60, alignItems: 'center' }}>
          <Text style={{ color: '#ffffff', fontSize: 25 }}>
            { this.props.fetchAction.distance } meters
          </Text>
        </View>
        <View style={{ position:"absolute", left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
          {
            (this.props.fetchAction.distance <= 10) ?
            (
              <TouchableHighlight
                style={{ height: 80, width: 80, paddingTop: 20, paddingBottom: 20, marginVertical: 10, backgroundColor: '#00000000', borderRadius: 10, borderColor: '#ffffff00' }}
                underlayColor={'#ffffff00'}
                onPress={ () => this.props.navigation.navigate('Winner') }
              >
                <Image source={require("../../js/res/CamButton.png")}/>
              </TouchableHighlight>
            )
            : (
              <View>
                <Text
                  style={{ fontSize: 25, color: '#FF2B5E'}}
                  >Too Far away</Text>
                  <Button
                  title='back'
                  onPress={ () => this.props.navigation.goBack() }
                  />
              </View>
              )
          }
        </View>
        <View style={{ position:"absolute", left: 0, right: 15, bottom: 77, alignItems: 'flex-end' }}>
          {
            (this.props.fetchAction.distance <= 10) ?
            (
              <Image
              style={{width: 70, height: 125}}
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
