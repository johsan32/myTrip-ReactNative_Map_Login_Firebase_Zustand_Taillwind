import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import userStore from '../app/store';
import {useNavigation} from '@react-navigation/native';
import {SPLASH} from '../utils/Routes';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

const BottomSheetModal = ({onPress}) => {
  const navigation = useNavigation();
  const {userData, userMail} = userStore(state => state);

  const handleSignOut = async () => {
    if (userData) {
      try {
        await GoogleSignin.signOut();
        userStore.setState({userData: []});
      } catch (error) {
        console.error(error);
      }
    }
    if (userMail) {
      auth()
        .signOut()
        .then(() => console.log('bottom sheet comp'));
    }
    onPress();
    navigation.navigate(SPLASH);
    userStore.setState({userData: null, userMail: null, loading: false});
  };

  return (
    <View className="flex-1 items-center justify-center  gap-5 ">
      <TouchableOpacity
        className="py-2 w-[90%] bg-yellow-300  rounded-xl"
        onPress={handleSignOut}>
        <Text className="text-xl font-bold text-center text-gray-500">
          Log Out
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-2 w-[90%] bg-slate-500  rounded-xl"
        onPress={onPress}>
        <Text className="text-xl font-bold text-center text-white">Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetModal;
