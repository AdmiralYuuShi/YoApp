import React, {Component} from 'react';
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  Left,
  Right,
  Body,
  Button,
  Title,
  Fab,
} from 'native-base';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Image, View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Chat from '../components/Chat';
import ContactsList from '../components/ContactsList';
import Board from '../components/Board';
import Maps from '../components/Maps';
import firebaseSDK from '../configs/firebase';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Alice',
      email: '',
      password: '',
      avatar: '',
      fab: false,
    };
  }

  handleLogout = () => {
    const success = _ => {
      alert('Loged out . . .');
      this.props.navigation.navigate('Login');
    };
    const failed = err => {
      alert(err);
    };
    firebaseSDK.logout(success, failed);
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
            <Title style={{fontWeight: 'bold'}}>YoApp!</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
            <Button transparent>
              <Menu>
                <MenuTrigger>
                  <Icon name="more-vertical" type="Feather" />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption
                    onSelect={() => this.props.navigation.navigate('MyProfile')}
                    text="My Profile"
                    style={{marginTop: 6}}
                  />
                  <MenuOption text="My Event" style={{marginVertical: 3}} />
                  <MenuOption text="Notification" style={{marginVertical: 3}} />
                  <MenuOption text="Setting" style={{marginBottom: 6}} />
                  <MenuOption
                    onSelect={this.handleLogout}
                    text="Logout"
                    style={{marginTop: 6}}
                  />
                </MenuOptions>
              </Menu>
            </Button>
          </Right>
        </Header>
        <Tabs style={{overflow: 'hidden'}}>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#fa163f'}}>
                <Text>Chat</Text>
              </TabHeading>
            }>
            <Chat />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#fa163f'}}>
                <Text>Contact</Text>
              </TabHeading>
            }>
            <ContactsList />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#fa163f'}}>
                <Text>Board</Text>
              </TabHeading>
            }>
            <Board />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#fa163f'}}>
                <Text>Event</Text>
              </TabHeading>
            }>
            <Maps />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default withNavigation(Main);
