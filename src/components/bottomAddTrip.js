import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import userStore from '../app/store';
import database from '@react-native-firebase/database';
import MyColor from '../theme/MyColor';
import {status} from '../constant/status';
import {Controller, useForm} from 'react-hook-form';


const BottomAddTrip = ({onPress, selectMarker, setSelectMarker}) => {
  const {authId} = userStore(state => state);
  const navigation = useNavigation();
  const [statusSelect, setStatusSelect] = useState({});
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      tripName: '',
      decsription: '',
      status: '',
    },
  });

  const handleAddTrip = formData => {
    const newTripData = {
      tripName: formData.tripName,
      status: formData.status,
      decsription: formData.decsription,
      addTime: new Date().toLocaleDateString(),
      coordinateLat: selectMarker?.latitude,
      coordinateLong: selectMarker?.longitude,
    };
    database()
      .ref(`users/${authId}/trip`)
      .push(newTripData)
      .then(() => {
        console.log('Data added successfully.');
        return database().ref(`users/${authId}/trip`).once('value');
      })
      .then(snapshot => {
        const data = snapshot.val() || {};
        const dataArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        userStore.setState({ tripData: dataArray });
        onPress();
        setStatusSelect('');
        setSelectMarker(null);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  return (
   <View>
    <Text>
    </Text>
   </View>
  );
};

export default BottomAddTrip;

