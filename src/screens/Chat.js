import React from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  ChatInputBox,
} from 'react-native-gifted-chat';
import {Header, Body, Button, Title, Left, Right, Icon} from 'native-base';
import {Image, View} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import firebase from 'firebase';
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
      avatar: firebaseSDK.avatar,
      cuid: this.props.navigation.state.params.cuid,
      cname: this.props.navigation.state.params.name,
      cavatar: this.props.navigation.state.params.avatar,
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

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            borderWidth: 0.6,
            borderColor: '#fa163f',
          },
          right: {
            backgroundColor: '#fa163f',
          },
        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{paddingHorizontal: 20, borderTopRightRadius: 50, borderBottomRightRadius: 50, height: 45, marginBottom: -1, marginRight: -4, backgroundColor: '#fa163f'}}>
          <Icon
            type="MaterialCommunityIcons"
            name="send"
            style={{color: '#fff', fontSize: 40, marginTop: 2}}
          />
        </View>
      </Send>
    );
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 30,
          borderColor: '#fa163f',
          marginHorizontal: 5,
          marginBottom: 1,
        }}
      />
    );
  }

  render() {
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
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          renderInputToolbar={this.renderInputToolbar}
        />
      </>
    );
  }
}
