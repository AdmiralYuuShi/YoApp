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
} from 'native-base';
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
    };
  }

  componentDidMount() {
    firebaseSDK.getChatHistory(this.setHistory);
  }

  componentWillUnmount() {
    this.setState({history: []});
  }

  setHistory = history => {
    this.setState({history});
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    firebaseSDK.getChatHistory(this.setHistory);
    this.setState({refreshing: false});
  };

  render() {
    console.log('Historiaaaaaa' + JSON.stringify(this.state.history));
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
                    <ListItem avatar>
                      <Left>
                        <Thumbnail
                          source={{uri: avatar}}
                          style={{width: 50, height: 50}}
                        />
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
      </>
    );
  }
}

export default withNavigation(Chat);
