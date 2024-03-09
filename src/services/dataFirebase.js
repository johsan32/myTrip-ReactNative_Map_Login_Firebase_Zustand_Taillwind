import database from '@react-native-firebase/database';
import userStore from '../app/store';

export const databaseCheck = id => {
  database()
    .ref(`users/${id}`)
    .once('value')
    .then(snapshot => {
     // console.log('data firebase:', snapshot.val());
      userStore.setState({userAuth: snapshot.val()});
    });
};
export const databaseTripRemove = async (authId, id) => {
  console.log('tamalandı', id);

  console.log('tamalandı', authId);
  if (authId) {
    await database().ref(`/users/${authId}/trip/${id}`).remove();
    console.log('tamalandı2');
    databaseCheck(authId);
  }
};
