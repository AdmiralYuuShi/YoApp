import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Header, Body, Button, Title, Left, Right, Icon} from 'native-base';
import {
  Image,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import firebaseSDK from '../configs/firebase';

export default class Chat extends React.Component {
  state = {
    messages: [],
    user: {},
  };

  get user() {
    return {
      _id: firebaseSDK.uid,
      name: firebaseSDK.name,
      cuid: this.props.navigation.state.params.cuid,
    };
  }

  componentDidMount() {
    firebaseSDK.get(
      message =>
        this.setState(previous => ({
          messages: GiftedChat.append(previous.messages, message),
        })),
      this.props.navigation.state.params.cuid,
    );
  }

  componentWillUnmount() {
    firebaseSDK.off();
  }

  render() {
    console.log(this.state.messages);
    return (
      <>
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
            <Title style={{fontWeight: 'bold'}}>
              {this.props.navigation.state.params.name}
            </Title>
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
        <GiftedChat
          messages={this.state.messages}
          user={this.user}
          onSend={firebaseSDK.send}
        />
      </>
    );
  }
}
