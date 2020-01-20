import React, {Component} from 'react';
import {
  Container,
  Text,
  Left,
  Right,
  Body,
  Fab,
  Content,
  List,
  ListItem,
  Thumbnail,
  Icon,
  Card,
  CardItem,
  Button,
} from 'native-base';
import Modal from 'react-native-modal';
import {
  Image,
  View,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import firebaseSDK from '../configs/firebase';
import firebase from 'firebase';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fab: false,
      history: [],
      refreshing: false,
      detailContact: false,
      detailContactData: {},
      name: '',
    };
  }

  componentDidMount() {
    firebaseSDK.getChatHistory(this.setHistory);
  }

  componentWillUnmount() {
    this.setState({history: []});
  }

  setHistory = history => {
    this.setState({history: []});
    this.setState({history});
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    firebaseSDK.getChatHistory(this.setHistory);
    this.setState({refreshing: false});
  };

  getDetailContact = id => {
    firebaseSDK.getDetailContact(id, this.setDetailContact);
  };

  setDetailContact = data => {
    this.setState({detailContactData: data, detailContact: true});
  };

  render() {
    console.log('Historiaaaaaa' + JSON.stringify(this.state.history));
    console.log(
      'Detail Contact ===== ' + JSON.stringify(this.state.detailContactData),
    );
    return (
      <>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <Container>
            <Content>
              <List>
                {this.state.history.map(data => {
                  console.log('================' + JSON.stringify(data));
                  const timestamp = data.timestamp;
                  const date = new Date(timestamp);
                  const hours = date.getHours();
                  const minutes = '0' + date.getMinutes();
                  const formatedDate = hours + '.' + minutes.substr(-2);
                  let name = data.user.cname;
                  let id = data.user.cuid;
                  let avatar = data.user.cavatar;
                  if (data.user.cuid === firebase.auth().currentUser.uid) {
                    name = data.user.name;
                    id = data.user._id;
                    avatar = data.user.avatar;
                  }
                  console.log(avatar);
                  return (
                    <>
                      <ListItem avatar>
                        <Left>
                          <TouchableOpacity
                            onPress={() => this.getDetailContact(id)}>
                            <Thumbnail
                              source={{uri: avatar}}
                              style={{width: 50, height: 50}}
                            />
                          </TouchableOpacity>
                        </Left>
                        <Body>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('Chat', {
                                name: name,
                                cuid: id,
                                avatar: avatar,
                              })
                            }>
                            <>
                              <Text>{name}</Text>
                              <Text note numberOfLines={1}>
                                {data.text}
                              </Text>
                            </>
                          </TouchableOpacity>
                        </Body>
                        <Right>
                          <Text note>{formatedDate}</Text>
                        </Right>
                      </ListItem>
                    </>
                  );
                })}
              </List>
            </Content>
          </Container>
        </ScrollView>
        <View>
          <Fab position="bottomRight" style={{backgroundColor: '#fa163f'}}>
            <Icon type="Entypo" name="new-message" />
          </Fab>
        </View>
        <View style={{flex: 1}}>
          <Modal
            testID={'modal'}
            isVisible={this.state.detailContact}
            onSwipeComplete={() => this.setState({detailContact: false})}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={{
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <Card>
              <CardItem>
                <Body style={{alignItems: 'center'}}>
                  <Image
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: 100,
                      borderWidth: 5,
                      borderColor: '#E5EAF0',
                    }}
                    source={
                      this.state.detailContactData.avatar
                        ? {
                            uri: this.state.detailContactData.avatar,
                          }
                        : require('../public/images/logo/yoapp_logo.png')
                    }
                  />
                  <Text style={{fontWeight: 'bold', margin: 10}}>
                    {this.state.detailContactData.name}
                  </Text>
                  <Text>{this.state.detailContactData.email}</Text>
                  {this.state.detailContactData.address !==
                    'Not yet filled' && (
                    <Text>{this.state.detailContactData.address}</Text>
                  )}
                  {this.state.detailContactData.gender !== 'Not yet filled' && (
                    <Text>{this.state.detailContactData.gender}</Text>
                  )}
                  {this.state.detailContactData.birthday !==
                    'Not yet filled' && (
                    <Text>{this.state.detailContactData.birthday}</Text>
                  )}
                  <Button
                    onPress={() => this.setState({detailContact: false})}
                    rounded
                    style={{
                      backgroundColor: '#fa163f',
                      marginTop: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text> Close </Text>
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

export default withNavigation(Chat);
