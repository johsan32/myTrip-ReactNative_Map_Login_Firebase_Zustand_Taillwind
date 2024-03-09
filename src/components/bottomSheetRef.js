import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import userStore from '../app/store';
import {useNavigation} from '@react-navigation/native';

import database from '@react-native-firebase/database';
import {databaseCheck} from '../services/dataFirebase';

const BottomSheetRefModal = ({onPress}) => {
  const {userAuth, authId} = userStore(state => state);
  const [name, setName] = useState(userAuth?.name);
  const [phoneNumber, setPhoneNumber] = useState(userAuth?.phoneNumber);
  const [description, setDescription] = useState(userAuth?.description);

  const databaseUpdate = () => {
    database()
      .ref(`users/${authId}`)
      .update({
        description: description,
        phoneNumber: phoneNumber,
        name: name,
      })
      .then(() => databaseCheck(authId));
    onPress();
  };

  //console.log('shettref', authId);
  return (
    <View className="flex-1 items-center justify-between my-3 pt-5  gap-5 ">
      <View className="flex w-[80%] justify-center items-center">
        <Text className="flex text-start text-lg text-black w-full ml-3">
          Name
        </Text>
        <TextInput
          className="border px-5 w-full rounded-lg border-gray-400"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View className="flex w-[80%] justify-center items-center">
        <Text className="flex text-start text-lg text-black w-full ml-3">
          Phone Number
        </Text>
        <TextInput
          className="border px-5 w-full rounded-lg border-gray-400"
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={text => setPhoneNumber(text)}
        />
      </View>
      <View className="flex w-[80%] justify-center items-center">
        <Text className="flex text-start text-lg text-black w-full ml-3">
          Description
        </Text>
        <TextInput
          className="border px-5 w-full rounded-lg border-gray-400"
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>
      <TouchableOpacity
        className="py-2 w-[90%] bg-yellow-300  rounded-xl"
        onPress={databaseUpdate}>
        <Text className="text-xl font-bold text-center text-gray-500">
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetRefModal;
