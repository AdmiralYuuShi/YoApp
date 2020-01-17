import firebase from 'firebase';
import uuid from 'uuid/v4';
// import RNFetchBlob from 'react-native-fetch-blob';

// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyCqplrXxVCNSUK3Mn9meUMHlkg0TG5n2ZE',
        authDomain: 'chatapp-b87b7.firebaseapp.com',
        databaseURL: 'https://chatapp-b87b7.firebaseio.com',
        projectId: 'chatapp-b87b7',
        storageBucket: 'chatapp-b87b7.appspot.com',
        messagingSenderId: '1080194255668',
        appId: '1:1080194255668:web:54c91d7160372743f23361',
        measurementId: 'G-S4WK4Z573D',
      });
    }
  }

  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  logout = (success, failed) => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        success();
      })
      .catch(function(error) {
        failed(error);
      });
  };

  getUserDataLogedIn = async setData => {
    const userLog = firebase.auth().currentUser;

    firebase
      .database()
      .ref('/users/' + userLog.uid)
      .once('value')
      .then(function(snapshot) {
        const userdata = {
          uid: userLog.uid,
          name: (snapshot.val() && snapshot.val().name) || 'Not yet filled',
          address:
            (snapshot.val() && snapshot.val().address) || 'Not yet filled',
          birthday:
            (snapshot.val() && snapshot.val().birthday) || 'Not yet filled',
          email: (snapshot.val() && snapshot.val().email) || 'Not yet filled',
          gender: (snapshot.val() && snapshot.val().gender) || 'Not yet filled',
          location:
            (snapshot.val() && snapshot.val().location) || 'Not yet filled',
          status: (snapshot.val() && snapshot.val().status) || 'Not yet filled',
          avatar: (snapshot.val() && snapshot.val().avatar) || null,
        };
        setData(userdata);
      });
  };

  addContact = async email => {
    // Create a query against the collection
    const userLog = firebase.auth().currentUser;
    firebase
      .database()
      .ref('/users/')
      .orderByChild('email')
      .equalTo(email)
      .on('child_added', function(snapshot) {
        const contactUid = snapshot.key;
        const name = snapshot.val().name;
        if (contactUid) {
          firebase
            .database()
            .ref('users/' + userLog.uid + '/contacts/' + contactUid)
            .set(
              {
                email: email,
                name: name,
                uid: contactUid,
              },
              function(error) {
                if (error) {
                  alert(error);
                } else {
                  alert('Success added "' + name + '" to your contact list');
                }
              },
            );
        } else {
          alert('Cant found that Email on YoApps');
        }
      });
  };

  getContactsList = async contactsList => {
    const userLog = firebase.auth().currentUser;
    firebase
      .database()
      .ref('/users/' + userLog.uid + '/contacts/')
      .once('value', contacts => {
        const records = [];
        console.log(contacts);
        contacts.forEach(contact => {
          const childData = contact.val();
          records.push(childData);
        });
        contactsList(records);
      });
  };

  deleteAccount = async success => {
    const userLog = firebase.auth().currentUser;
    await firebase
      .database()
      .ref('/users/' + userLog.uid)
      .set(null)
      .then(res => {
        userLog
          .delete()
          .then(function() {
            alert('Your account deleted');
          })
          .catch(function(error) {
            console.log(error);
            alert(error);
          });
      });
  };

  createAccount = async (user, success_callback, failed_callback) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        const userLog = firebase.auth().currentUser;
        if (userLog) {
          userLog
            .updateProfile({
              displayName: user.name,
            })
            .then(function() {
              firebase
                .database()
                .ref('users/' + userLog.uid)
                .set(
                  {
                    name: user.name,
                    email: user.email,
                    birthday: '',
                    gender: '',
                    address: '',
                    location: '',
                    status: '',
                  },
                  function(error) {
                    if (error) {
                      failed_callback(error.message);
                    } else {
                      success_callback(user.name);
                    }
                  },
                );
            })
            .catch(function(error) {
              failed_callback(error.message);
            });
        } else {
          console.log('no user singed in');
          failed_callback('Cant update user');
        }
      })
      .catch(error => {
        console.log(error.message);
        failed_callback(error.message);
      });
  };

  setAvatar = async blob => {
    var metadata = {
      contentType: 'image/jpeg',
    };

    var storageRef = firebase.storage().ref('/users/');
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('avatar/' + uuid()).put(blob, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log('unauth');
            break;

          case 'storage/canceled':
            // User canceled the upload
            console.log('cancel');
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log('unknow');
            break;
        }
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          const userLog = firebase.auth().currentUser;
          firebase
            .database()
            .ref('users/' + userLog.uid)
            .update(
              {
                avatar: downloadURL,
              },
              function(error) {
                if (error) {
                  alert(error);
                } else {
                  alert('Success update avatar');
                }
              },
            );
        });
      },
    );
  };

  send = messages => {
    const uid = firebase.auth().currentUser.uid;
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      const id = item.user.cuid;
      let messageId = uid + '_' + id;
      const searchMessage = id + '_' + uid;
      firebase
        .database()
        .ref('/messages/' + searchMessage)
        .orderByKey()
        .equalTo(searchMessage)
        .once('value', function(snapshot) {
          if (snapshot.key) {
            messageId = snapshot.key;
          }
        });
      firebase
        .database()
        .ref('messages/' + messageId + '/')
        .push(message);
    });
  };

  parse = message => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback, id) => {
    const uid = firebase.auth().currentUser.uid;
    let messageId = uid + '_' + id;
    const searchMessage = id + '_' + uid;
    firebase
      .database()
      .ref('/messages/' + searchMessage)
      .orderByKey()
      .equalTo(searchMessage)
      .once('value', function(snapshot) {
        if (snapshot.key) {
          messageId = snapshot.key;
        }
      });
    console.log(searchMessage);
    firebase
      .database()
      .ref('messages/' + messageId)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off() {
    firebase
      .database()
      .ref('messages/')
      .off();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get name() {
    return firebase.auth().currentUser.displayName;
  }
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
