import auth from '@react-native-firebase/auth';
import userStore from '../app/store';
import {showMessage} from 'react-native-flash-message';

export const signInMail = values => {
  auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(userCredential => {
      showMessage({
        type: 'success',
        message: 'Success Sign in!',
      });
      userStore.setState({
        userMail: userCredential.user,
        loading: false,
        authId: userCredential.user.uid,
      });
    })
    .catch(error => {
      showMessage({
        type: 'danger',
        message: error.message,
      });
    });
};

export const signUpMail = values => {
  auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(userCredential => {
      showMessage({
        type: 'success',
        message: 'Success created user!',
      });
      userStore.setState({userMail: userCredential.user, loading: false,   authId: userCredential.user.uid,});
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        showMessage({
          type: 'danger',
          message: 'That email address is already in use!',
        });
      }
      if (error.code === 'auth/invalid-email') {
        showMessage({
          type: 'danger',
          message: 'That email address is invalid!',
        });
      }
      console.error(error);
    });
};
