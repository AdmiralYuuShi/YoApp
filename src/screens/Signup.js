import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageEditor,
  Image,
  Dimensions,
} from 'react-native';
import {withNavigation, ScrollView} from 'react-navigation';
import {Item, Form, Label, Input, Button} from 'native-base';
import firebaseSDK from '../configs/firebase';

class Signup extends React.Component {
  state = {
    name: undefined,
    email: undefined,
    password: undefined,
  };

  onPressCreate = async () => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      avatar: this.state.avatar,
    };

    firebaseSDK.createAccount(user, this.signupSuccess, this.signupFailed);
  };

  signupSuccess = name => {
    console.log('sign up successful, navigate to login.');
    alert('Sign Up successful, wellcome to YoApp, ' + name);
    this.props.navigation.navigate('Login');
  };

  signupFailed = err => {
    alert('Sign up failure. \n' + err + '\nPlease tried again.');
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
              <Text style={styles.description}>We're happy you join us!</Text>
            </View>
            <View
              style={{flex: 9, backgroundColor: '#fff', alignItems: 'center'}}>
              <View style={{flex: 4, marginTop: 20, width: 280}}>
                <Form>
                  <Item>
                    <Input
                      placeholder="Full Name"
                      onChangeText={value => this.setState({name: value})}
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="Email"
                      onChangeText={value => this.setState({email: value})}
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="password"
                      onChangeText={value => this.setState({password: value})}
                    />
                  </Item>
                  <Button
                    block
                    style={{backgroundColor: '#30A24B', marginTop: 20}}
                    onPress={this.onPressCreate}>
                    <Text
                      style={{fontWeight: 'bold', color: '#FFF', fontSize: 18}}>
                      Sign Up
                    </Text>
                  </Button>
                  <Text style={{fontSize: 9}}>
                    * By signing up, you agree to the{' '}
                    <Text style={{color: '#fa163f'}}>Terms of Service</Text> and{' '}
                    <Text style={{color: '#fa163f'}}>Privacy Policity</Text>.
                  </Text>
                </Form>
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
                  onPress={() => this.props.navigation.navigate('Login')}
                  block
                  style={{backgroundColor: '#fa163f', marginTop: 20}}>
                  <Text
                    style={{fontWeight: 'bold', color: '#FFF', fontSize: 18}}>
                    Log In
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

export default withNavigation(Signup);

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
