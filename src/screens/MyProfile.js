import React, {Component} from 'react';
import {
  Container,
  Header,
  Text,
  Body,
  Button,
  Title,
  Form,
  Item,
  Label,
  Input,
  Left,
  Right,
  Icon,
} from 'native-base';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Image, View, ToastAndroid, Alert} from 'react-native';
import {withNavigation} from 'react-navigation';
import firebaseSDK from '../configs/firebase';
import ImagePicker from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      birthday: '',
      email: '',
      gender: '',
      location: '',
      status: '',
      photo: '',
      avatar: null,
    };
  }

  componentDidMount() {
    firebaseSDK.getUserDataLogedIn(this.setData);
  }

  handleChoosePhoto = async () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.uri) {
        console.log(response);
        if (
          response.type === 'image/jpg' ||
          response.type === 'image/jpeg' ||
          response.type === 'image/png'
        ) {
          if (response.fileSize <= 6000000) {
            this.setState({photo: response});
            this.handleUpdatePhoto(response);
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Maximum File size is 6 MB',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              20,
            );
          }
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Profile Picture must be JPG or PNG',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            20,
          );
        }
        this.props.navigation.navigate('tab');
      }
    });
  };

  handleUpdatePhoto = async response => {
    let uri = await fetch(response.uri);
    let blob = await uri.blob();
    firebaseSDK.setAvatar(blob);
  };

  setData = data => {
    console.log(data);
    this.setState({
      name: data.name,
      address: data.address,
      birthday: data.birthday,
      email: data.email,
      gender: data.gender,
      location: data.location,
      status: data.status,
      avatar: data.avatar,
    });
  };

  handleDelete = _ => {
    Alert.alert(
      'Delete Account?',
      'All your data will be deleted. Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: this.deleteNow},
      ],
      {cancelable: false},
    );
  };

  deleteNow = async () => {
    await firebaseSDK.deleteAccount();
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor="#fa163f"
          style={{backgroundColor: '#fa163f'}}>
          <Left>
            <Button transparent>
              <Image
                style={{width: 35, height: 35}}
                source={require('../public/images/logo/yoapp_logo_rounded.png')}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{fontWeight: 'bold'}}>My Profile</Title>
          </Body>
          <Right>
            <Button transparent>
              <Menu>
                <MenuTrigger>
                  <Icon
                    style={{paddingVertical: 10, paddingLeft: 10}}
                    name="more-vertical"
                    type="Feather"
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption
                    onSelect={this.handleDelete}
                    text="Delete Account"
                    style={{margin: 5}}
                  />
                </MenuOptions>
              </Menu>
            </Button>
          </Right>
        </Header>
        <View style={{flex: 1, alignItems: 'center', paddingVertical: 30}}>
          <TouchableOpacity onPress={this.handleChoosePhoto}>
            <Image
              style={{
                width: 180,
                height: 180,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: '#fff',
              }}
              source={
                this.state.avatar
                  ? {
                      uri: this.state.avatar,
                    }
                  : require('../public/images/logo/yoapp_logo.png')
              }
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 10,
              color: '#fa163f',
            }}>
            {this.state.name}
          </Text>
          <Form style={{marginRight: 20, marginTop: 20}}>
            <Item stackedLabel disabled>
              <Label style={{marginLeft: 5}}>Address</Label>
              <Input disabled value={this.state.address} />
            </Item>
            <Item stackedLabel disabled>
              <Label style={{marginLeft: 5}}>Birthday</Label>
              <Input disabled value={this.state.birthday} />
            </Item>
            <Item stackedLabel disabled>
              <Label style={{marginLeft: 5}}>Gender</Label>
              <Input disabled value={this.state.gender} />
            </Item>
          </Form>
        </View>
      </Container>
    );
  }
}

export default withNavigation(MyProfile);
