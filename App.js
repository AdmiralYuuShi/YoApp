import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {MenuProvider} from 'react-native-popup-menu';
// screens
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Main from './src/screens/Main';
import MyProfile from './src/screens/MyProfile';
import SplashScreen from './src/screens/SplashScreen';
console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    Main: {
      screen: Main,
    },
    MyProfile: {
      screen: MyProfile,
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
    return (
      <MenuProvider>
        <StatusBar backgroundColor="#fa163f" barStyle="light-content" />
        <AppContainer />
      </MenuProvider>
    );
  }
}
