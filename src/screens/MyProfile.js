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
  Card,
  CardItem,
} from 'native-base';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Image, View, ToastAndroid, Alert, TextInput} from 'react-native';
import {withNavigation} from 'react-navigation';
import firebaseSDK from '../configs/firebase';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
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
      addressModal: false,
      birthdayModal: false,
      genderModel: false,
    };
  }

  componentDidMount() {
    firebaseSDK.getUserDataLogedIn(this.setData);
  }

  changeUserData = _ => {
    firebaseSDK.changeUserData(
      this.state.address,
      this.state.birthday,
      this.state.gender,
    );
    this.setState({addressModal: false});
    this.setState({birthdayModal: false});
    this.setState({genderModal: false});
  };

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
      <>
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
              <TouchableOpacity
                onPress={() => this.setState({addressModal: true})}>
                <Item stackedLabel disabled>
                  <Label style={{marginLeft: 5}}>Address</Label>
                  <Input disabled value={this.state.address} />
                </Item>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({birthdayModal: true})}>
                <Item stackedLabel disabled>
                  <Label style={{marginLeft: 5}}>Birthday</Label>
                  <Input disabled value={this.state.birthday} />
                </Item>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({genderModal: true})}>
                <Item stackedLabel disabled>
                  <Label style={{marginLeft: 5}}>Gender</Label>
                  <Input disabled value={this.state.gender} />
                </Item>
              </TouchableOpacity>
            </Form>
          </View>
        </Container>
        <View style={{flex: 1}}>
          <Modal
            testID={'modal'}
            isVisible={this.state.addressModal}
            onSwipeComplete={() => this.setState({addressModal: false})}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={{justifyContent: 'flex-end', marginHorizontal: 10}}>
            <Card>
              <CardItem>
                <Body style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold', margin: 10}}>
                    Change Address
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 10,
                      alignSelf: 'stretch',
                      textAlign: 'center',
                    }}
                    placeholder="Type Address Here . . ."
                    value={this.state.address}
                    onChangeText={value => this.setState({address: value})}
                  />
                  <Button
                    onPress={this.changeUserData}
                    rounded
                    style={{
                      backgroundColor: '#fa163f',
                      marginTop: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text> Save </Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Modal>
        </View>
        <View style={{flex: 1}}>
          <Modal
            testID={'modal'}
            isVisible={this.state.birthdayModal}
            onSwipeComplete={() => this.setState({birthdayModal: false})}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={{justifyContent: 'flex-end', marginHorizontal: 10}}>
            <Card>
              <CardItem>
                <Body style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold', margin: 10}}>
                    Change Birthday
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 10,
                      alignSelf: 'stretch',
                      textAlign: 'center',
                    }}
                    placeholder="YYYY-MM-DD"
                    value={this.state.birthday}
                    onChangeText={value => this.setState({birthday: value})}
                  />
                  <Button
                    onPress={this.changeUserData}
                    rounded
                    style={{
                      backgroundColor: '#fa163f',
                      marginTop: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text> Save </Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Modal>
        </View>
        <View style={{flex: 1}}>
          <Modal
            testID={'modal'}
            isVisible={this.state.genderModal}
            onSwipeComplete={() => this.setState({genderModal: false})}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={{justifyContent: 'flex-end', marginHorizontal: 10}}>
            <Card>
              <CardItem>
                <Body style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold', margin: 10}}>
                    Change Gender
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 10,
                      alignSelf: 'stretch',
                      textAlign: 'center',
                    }}
                    placeholder="Gender"
                    value={this.state.gender}
                    onChangeText={value => this.setState({gender: value})}
                  />
                  <Button
                    onPress={this.changeUserData}
                    rounded
                    style={{
                      backgroundColor: '#fa163f',
                      marginTop: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text> Save </Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Modal>
        </View>
      </>
    );
  }
}

export default withNavigation(MyProfile);
