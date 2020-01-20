import React, {Component} from 'react';
import {
  Container,
  Text,
  Content,
  ListItem,
  List,
  Fab,
  Button,
  Card,
  CardItem,
  Body,
  Icon,
} from 'native-base';
import {Image, View, TextInput} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import firebaseSDK from '../configs/firebase';

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      email: '',
      contacts: [],
    };
  }

  componentDidMount() {
    this.getContactsList();
  }

  setContactsList = contacts => {
    this.setState({contacts: contacts});
  };

  addContact = _ => {
    firebaseSDK.addContact(this.state.email, this.getContactsList);
  };

  getContactsList = () => {
    firebaseSDK.getContactsList(this.setContactsList);
  };

  render() {
    return (
      <>
        <ScrollView>
          <Container>
            <Content>
              <List>
                {this.state.contacts.map(contact => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Chat', {
                          name: contact.name,
                          cuid: contact.uid,
                          avatar: contact.avatar,
                        })
                      }>
                      <ListItem>
                        <Text>{contact.name}</Text>
                      </ListItem>
                    </TouchableOpacity>
                  );
                })}
              </List>
            </Content>
          </Container>
        </ScrollView>
        <View>
          <Fab
            position="bottomRight"
            style={{backgroundColor: '#fa163f'}}
            onPress={() => this.setState({modalVisible: true})}>
            <Icon type="FontAwesome5" name="plus" />
          </Fab>
        </View>
        <View style={{flex: 1}}>
          <Modal
            testID={'modal'}
            isVisible={this.state.modalVisible}
            onSwipeComplete={() => this.setState({modalVisible: false})}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={{justifyContent: 'flex-end', marginHorizontal: 10}}>
            <Card>
              <CardItem>
                <Body style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold', margin: 10}}>
                    Add Contact
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
                    placeholder="Type Email Here . . ."
                    onChangeText={value => this.setState({email: value})}
                  />
                  <Button
                    onPress={this.addContact}
                    rounded
                    style={{
                      backgroundColor: '#fa163f',
                      marginTop: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text> Add </Text>
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

export default withNavigation(ContactsList);
