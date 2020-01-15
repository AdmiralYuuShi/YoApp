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
  Picker,
  Fab,
} from 'native-base';
import {Image, View} from 'react-native';
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
// import Tab3 from './tabThree';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fab: false,
    };
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#fa163f'}}>
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
              <Icon name="more" />
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
            <Text>Tab Chat!</Text>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#fa163f'}}>
                <Text>Board</Text>
              </TabHeading>
            }>
            <Text>Tab 2</Text>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#fa163f'}}>
                <Text>Event</Text>
              </TabHeading>
            }>
            <Text>Tab 3</Text>
          </Tab>
        </Tabs>
        <View style={{flex: 1}}>
          <Fab
            active={this.state.fab}
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: '#fa163f'}}
            position="bottomRight"
            onPress={() => this.setState({fab: !this.state.active})}>
            <Image
              style={{width: 40, height: 40}}
              source={require('../public/images/logo/yoapp_logo_rounded.png')}
            />
            <Button style={{backgroundColor: '#34A34F'}}>
              <Icon type="FontAwesome" name="user-circle-o" />
            </Button>
            <Button style={{backgroundColor: '#3B5998'}}>
              <Icon type="FontAwesome5" name="bell" />
            </Button>
            <Button disabled style={{backgroundColor: '#DD5144'}}>
              <Icon type="Entypo" name="chat" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}
