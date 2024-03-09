import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import userStore from '../app/store';

GoogleSignin.configure();
export const signInGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("user info store google sign in service");
    userStore.setState({userData: userInfo.user, loading:false,   authId: userInfo.user.id,});
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // user cancelled the login flow
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // play services not available or outdated
          break;
        default:
        // some other error happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
  }
  };

export const signOutGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      userStore.setState({ userData: []});
      console.log({ user: null });
    } catch (error) {
      console.error(error);
    }
};
