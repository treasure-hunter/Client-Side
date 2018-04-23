import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Image,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { connect } from 'react-redux';


var sharedProps = {
  apiKey:"61B4DBB3-170C-4515-B297-B388A9C75C61",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('../../js/HelloWorldSceneAR');

export default class ViroSample extends Component {
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
        <Text style={{ height: 70, width: 400, color: '#ffffff', backgroundColor: '#000000', borderRadius: 10 }}>
          { this.props.fetchDistance.distance }
        </Text>
      </View>
        <View style={{ position:"absolute", left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
          {
            (this.props.fetchDistance.distance <= 10) ?
            (
              <TouchableHighlight
                style={{ height: 80, width: 80, paddingTop: 20, paddingBottom: 20, marginVertical: 10, backgroundColor: '#00000000', borderRadius: 10, borderColor: '#ffffff00' }}
                underlayColor={'#ffffff00'}>
                <Image source={require("../../js/res/CamButton.png")}/>
              </TouchableHighlight>
            )
            : (<TouchableHighlight />)
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
  fetchDistance: state.fetchDistance
})

export default connect(mapStateToProps, null)(ViroSample)
