import firebase from 'firebase';
import uuid from 'uuid/v4';

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

  createAccount = async (user, success_callback, failed_callback) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        var userLog = firebase.auth().currentUser;
        if (userLog) {
          userLog
            .updateProfile({
              displayName: user.name,
            })
            .then(function() {
              success_callback(user.name);
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

  uploadImage = async uri => {
    console.log('got image to upload. uri:' + uri);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref('avatar')
        .child(uuid());
      const task = ref.put(blob);

      return new Promise((resolve, reject) => {
        task.on('state_changed', () => {}, reject, () =>
          resolve(task.snapshot.downloadURL),
        );
      });
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message);
    }
  };

  updateAvatar = url => {
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({avatar: url}).then(
        function() {
          console.log('Updated avatar successfully. url:' + url);
          alert('Avatar image is saved successfully.');
        },
        function(error) {
          console.warn('Error update avatar.');
          alert('Error update avatar. Error:' + error.message);
        },
      );
    } else {
      console.log("can't update avatar, user is not login.");
      alert('Unable to update avatar. You must login first.');
    }
  };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
