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
  Content,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Image, View, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
// import Tab3 from './tabThree';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fab: false,
    };
  }

  render() {
    return (
      <>
        <ScrollView>
          <Container>
            <Content>
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail
                      source={require('../public/images/logo/yoapp_logo_rounded.png')}
                    />
                  </Left>
                  <Body>
                    <TouchableOpacity>
                      <>
                        <Text>Kumar Pratik</Text>
                        <Text note>
                          Doing what you like will always keep you happy . .
                        </Text>
                      </>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        </ScrollView>
        <View>
          <Fab position="bottomRight" style={{backgroundColor: '#fa163f'}}>
            <Image
              style={{width: 40, height: 40}}
              source={require('../public/images/logo/yoapp_logo_rounded.png')}
            />
          </Fab>
        </View>
      </>
    );
  }
}

export default withNavigation(Chat);
