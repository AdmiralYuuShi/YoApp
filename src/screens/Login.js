/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {Item, Form, Label, Input, Button, Icon} from 'native-base';
import firebaseSDK from '../configs/firebase';
import {withNavigation, ScrollView} from 'react-navigation';
import firebase from 'firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailReq: false,
      notEmail: false,
      passReq: false,
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.props.navigation.navigate('Main');
    }
  }

  onPressLogin = async () => {
    this.setState({emailReq: false});
    this.setState({notEmail: false});
    this.setState({passReq: false});
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.email.length === 0) {
      this.setState({emailReq: true});
    } else {
      if (!emailRegex.test(this.state.email)) {
        this.setState({notEmail: true});
      } else {
        if (this.state.password.length < 3) {
          this.setState({passReq: true});
        } else {
          firebaseSDK.login(user, this.loginSuccess, this.loginFailed);
        }
      }
    }
  };

  loginSuccess = () => {
    firebaseSDK.setUserLocation();
    console.log('login successful, navigate to chat.');
    this.props.navigation.navigate('Main');
  };

  loginFailed = () => {
    alert('Login failure. Please tried again.');
  };

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, height: Dimensions.get('window').height}}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require('../public/images/logo/yoapp_logo_rounded.png')}
            />
          </View>
          <View style={{flex: 2}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.description}>
                Yo! This is <Text style={{color: '#fa163f'}}>YoApp!</Text>
              </Text>
              <Text style={styles.description}>Let's have a nice chat!</Text>
            </View>
            <View
              style={{flex: 9, backgroundColor: '#fff', alignItems: 'center'}}>
              <View style={{flex: 3, marginTop: 20, width: 280}}>
                <Form>
                  <Item>
                    <Input
                      placeholder="Email"
                      onChangeText={value => this.setState({email: value})}
                    />
                  </Item>
                  {this.state.emailReq && (
                    <Text style={{color: 'red', marginLeft: 20, fontSize: 12}}>
                      Email is required!
                    </Text>
                  )}
                  {this.state.notEmail && (
                    <Text style={{color: 'red', marginLeft: 20, fontSize: 12}}>
                      Email is not valid!
                    </Text>
                  )}
                  <Item>
                    <Input
                      placeholder="Password"
                      secureTextEntry={true}
                      onChangeText={value => this.setState({password: value})}
                    />
                  </Item>
                  {this.state.passReq && (
                    <Text style={{color: 'red', marginLeft: 20, fontSize: 12}}>
                      Password must have atleast 3 character!
                    </Text>
                  )}
                  <Button
                    block
                    style={{backgroundColor: '#fa163f', marginTop: 20}}
                    onPress={this.onPressLogin}>
                    <Text
                      style={{fontWeight: 'bold', color: '#FFF', fontSize: 18}}>
                      Log In
                    </Text>
                  </Button>
                </Form>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fa163f',
                    marginTop: 20,
                    alignSelf: 'center',
                  }}>
                  Forgot Password?
                </Text>
              </View>
              <View style={{flex: 2, width: 280}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#A2A2A2',
                      height: 1,
                      flex: 1,
                      alignSelf: 'center',
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: 'center',
                      paddingHorizontal: 5,
                      color: '#A2A2A2',
                    }}>
                    OR
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#A2A2A2',
                      height: 1,
                      flex: 1,
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <Button
                  onPress={() => this.props.navigation.navigate('Signup')}
                  block
                  style={{backgroundColor: '#30A24B', marginTop: 20}}>
                  <Text
                    style={{fontWeight: 'bold', color: '#FFF', fontSize: 18}}>
                    Sign Up
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Login);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#fa163f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  description: {
    color: '#48494D',
    fontSize: 12,
  },
});
