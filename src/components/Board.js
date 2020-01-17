import React, {Component} from 'react';
import {
  Container,
  Text,
  Content,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Button,
  Icon,
} from 'native-base';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Image, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
// import Tab3 from './tabThree';
class Board extends Component {
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

  render() {
    return (
      <ScrollView>
        <Container>
          <Content>
            <Card
              style={{flex: 0, marginRight: 10, marginLeft: 10, marginTop: 10}}>
              <CardItem>
                <Left>
                  <Thumbnail
                    source={require('../public/images/logo/yoapp_logo_rounded.png')}
                  />
                  <Body>
                    <Text>YoApp</Text>
                    <Text note>January 16, 2020</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={require('../public/images/logo/yoapp_logo.png')}
                    style={{
                      height: 200,
                      width: 200,
                      flex: 1,
                      alignSelf: 'center',
                    }}
                  />
                  <Text>
                    Hey! you know we have a nice app here. Its called YoApp!
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent textStyle={{color: '#87838B'}}>
                    <Icon type="AntDesign" name="like1" />
                    <Text>1,926</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default withNavigation(Board);
