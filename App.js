import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// screens
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Main from './src/screens/Main';

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
    },
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    Chat: {
      screen: Chat,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

// wrap all component with redux Provider and the store
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
