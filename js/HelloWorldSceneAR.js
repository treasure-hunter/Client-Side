// 'use strict';

// import React, { Component } from 'react';

// import {StyleSheet, View} from 'react-native';

// import {
//   ViroARScene,
//   ViroText,
//   ViroConstants,
//   ViroBox,
//   Viro3DObject,
//   ViroMaterials,
//   ViroAnimations,
//   ViroSound
// } from 'react-viro';

// import Geolocation from 'react-native-geolocation-service'
// import projector from 'ecef-projector'
// import RNSimpleCompass from 'react-native-simple-compass';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { setDistance } from '../src/store/ARScene/ar-action'

// export class HelloWorldSceneAR extends Component {

//   constructor() {
//     super();

//     // Set initial state here
//     this.state = {
//       latitude: null,
//       longitude: null,
//       error: null,
//       selisih: null,
//       xSel: null,
//       ySel: null,
//       zSel: null,
//       distance: null,
//       string: '',
//       isString: true,
//       count: 0,
//       _condition: false,
//       condition: '',
//       degree: null
//     };

//     // bind 'this' to functions
//     this._onInitialized = this._onInitialized.bind(this);
//   }

//   getCoordinate = () => {
//     const userxyz = projector.project(this.state.latitude, this.state.longitude, 0.0);
//     const objectxyz = projector.project(Number(this.props.latitude), Number(this.props.longitude), 0.0)
//     if (this.state.count < 1) {
//       this.distanceLocation(userxyz, objectxyz)
//     }
//     const distance = this.getDistance(this.state.latitude, this.state.longitude, Number(this.props.latitude), Number(this.props.longitude))
//     this.setState({
//       distance: distance
//     }, () => {
//       this.props.setDistance(distance)
//     })
//   }

//   getDegree = (callback) => {
//     const degree_update_rate = 3
//     RNSimpleCompass.start(degree_update_rate, (degree) => {
//       this.setState({degree: degree},() => {
//         RNSimpleCompass.stop();
//         callback(degree)
//       })
//     })
//   }

//   distanceLocation = (user, object) => {
//     let selisih = {
//       x: user[0] - object[0],
//       y: user[1] - object[1],
//       z: user[2] - object[2]
//     }
//     this.getDegree((degree) => {
//       const xzObjectFlexible = this.getFlexibleCoordinate(0,0,selisih.x, selisih.z, degree)
//       this.setState({
//         xSel: xzObjectFlexible[0],
//         ySel: selisih.y,
//         zSel: xzObjectFlexible[1],
//         count: this.state.count + 1
//       })
//     })
//   }

//   getFlexibleCoordinate = (cx, cy, x, y, angle) => {
//       var radians = (Math.PI / 180) * angle,
//           cos = Math.cos(radians),
//           sin = Math.sin(radians),
//           nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
//           ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
//       return [nx, ny];
//   }

//   getDistance = (lon1, lat1, lon2, lat2) => {
//     if (typeof(Number.prototype.toRad) === "undefined") {
//       Number.prototype.toRad = function() {
//         return this * Math.PI / 180;
//       }
//     }

//     var R = 6371; // Radius of the earth in km
//     var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
//     var dLon = (lon2-lon1).toRad();
//     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//             Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
//             Math.sin(dLon/2) * Math.sin(dLon/2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     var d = R * c * 1000 // Distance in km
//     return d.toFixed(2)
//   }

//   componentDidMount() {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           error: null,
//         }, () => {
//           this.getCoordinate()
//         });

//       },
//       (error) => this.setState({ error: error.message }),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000, distanceFilter: 1 },
//     )

//     Geolocation.watchPosition(
//       (position) => {
//         this.setState({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           error: null,
//         }, () => {
//           this.getCoordinate()
//         });

//       },
//       (error) => this.setState({ error: error.message }),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000, distanceFilter: 1 },
//     )
//   }

//   volumeDistance = () => {
//     if (this.state.distance <= 15) {
//       return 0.8
//     } else {
//       0.4
//     }
//   }



//   render() {
//     return (
//       <ViroARScene onTrackingUpdated={this._onInitialized} >
//         {
//           this.state.xSel && this.state.ySel && this.state.zSel && this.state.distance < 10 &&
//           <Viro3DObject
//             source={require('./res/btn_close.obj')}
//             position={[this.state.xSel, this.state.ySel+1, this.state.zSel]}
//             scale={[1, 1, 1]}
//             rotation={[90, 0, 0]}
//             materials={["grid"]}
//             type="OBJ"
//             animation={{name: "rotate", run: true, loop: true}}/>
//         }
//         <ViroSound
//           source={require("./res/wkwk.mp3")}
//           loop={true}
//           volume={this.volumeDistance()}/>
//       </ViroARScene>
//     );
//   }

//   _onInitialized(state, reason) {
//     if (state == ViroConstants.TRACKING_NORMAL) {
//       this.setState({
//         text : "Hello World!"
//       });
//     } else if (state == ViroConstants.TRACKING_NONE) {
//       // Handle loss of tracking
//     }
//   }
// }

// var styles = StyleSheet.create({
//   helloWorldTextStyle: {
//     fontFamily: 'Arial',
//     fontSize: 30,
//     color: '#ffffff',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
// });

// ViroMaterials.createMaterials({
//   grid: {
//     diffuseTexture: require('./res/grid_bg.jpg'),
//   },
// });

// ViroAnimations.registerAnimations({
//   rotate: {
//     properties: {
//       rotateY: "+=90"
//     },
//     duration: 250, //.25 seconds
//   },
// })

// const mapStateToProps = (state) => ({
//   latitude: state.fetchAction.latitude,
//   longitude: state.fetchAction.longitude,
//   image_path: state.fetchAction.image_path
// })


// const mapDispatchToProps = (dispatch) => bindActionCreators ({
//   setDistance
// }, dispatch)

// export default connect(mapStateToProps, mapDispatchToProps)(HelloWorldSceneAR)
