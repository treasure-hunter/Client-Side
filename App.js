console.disableYellowBox = true
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { SwitchNavigator, StackNavigator } from 'react-navigation'
import { auth  } from './src/firebase/index'

import Auth from './src/screen/Auth';
import Home from './src/screen/Home';
import Register from './src/screen/Register';
import Login from './src/screen/Login';
import CreateRoom from './src/screen/CreateRoom';
import RoomList from './src/screen/RoomList';
import GamePlay from './src/screen/GamePlay'

import store from './src/store/index'

export default class App extends React.Component {
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      console.log('user signed')
    })
  }

  render() {
    return (
      <Provider store={ store }>
        <View style={styles.container}>
          {/* <Login /> */}
          <Apps />
        </View>
      </ Provider>
    );
  }
}

const AuthStack = StackNavigator({
  Auth: {
    screen: Auth
  },
  Register: {
    screen: Register
  },
  Login: {
    screen: Login
  }
},{
  initialRouteName: 'Login'
})
const HomeStack = StackNavigator({
  Home: {
    screen: Home
  },
  CreateRoom: {
    screen: CreateRoom
  },
  RoomList: {
    screen: RoomList
  }
}, {
  initialRouteName: 'Home'
})

const Apps = SwitchNavigator({
  AuthStack: {
    screen: AuthStack
  },
  HomeStack: {
    screen: HomeStack
  },
  GamePlay: {
    screen: GamePlay
  }
},{
  initialRouteName: 'AuthStack'
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
