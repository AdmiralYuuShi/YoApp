import React, {useEffect} from 'react';
import {View, Image, Text, ImageBackground, Dimensions} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import firebase from 'firebase';

const SplashScreen = () => {
  const {navigate} = useNavigation();
  const user = firebase.auth().currentUser;
  let goTo = user === null ? 'Login' : 'Main';
  useEffect(() => {
    setTimeout(() => {
      navigate(goTo);
    }, 3000);
  });
  return (
    <View
      style={{
        backgroundColor: '#fa163f',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}>
      <Image
        style={{width: 300, height: 300}}
        source={require('../public/images/logo/yoapp_logo_rounded.png')}
      />
    </View>
  );
};

export default SplashScreen;
