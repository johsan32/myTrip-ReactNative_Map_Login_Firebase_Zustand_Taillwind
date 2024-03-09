import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import userStore from '../../app/store';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import BottomSheetModal from '../../components/bottomSheet';
import BottomSheetRefModal from '../../components/bottomSheetRef';
import MyColor from '../../theme/MyColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {databaseCheck} from '../../services/dataFirebase';

export const UserProfile = () => {
  const {userAuth, authId} = userStore(state => state);
  const [myPhoto, setMyPhoto] = useState(null);
  const bottomSheet = useRef();
  const bottomSheetRef = useRef(null);

  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setMyPhoto(`data:${image.mime};base64,${image.data}`);
      updateAuthPhoto(authId);
      databaseCheck(authId);
    });
  };
  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setMyPhoto(`data:${image.mime};base64,${image.data}`);
      updateAuthPhoto(authId);
      databaseCheck(authId);
    });
  };

  const updateAuthPhoto = authId => {
    database()
      .ref(`users/${authId}`)
      .update({
        photo: myPhoto,
      })
      .then(() => {
        console.log('Data updated.');
      });
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView className="w-full flex-1 bg-white">
      <View className="flex-2 items-center justify-end gap-8 mt-5">
        <View className="border rounded-full p-1 border-slate-300">
          {userAuth?.photo ? (
            <Image
              source={{uri: userAuth?.photo}}
              className="w-44 h-44 rounded-full"
              resizeMode="stretch"
            />
          ) : (
            <Image
              source={require('../../assets/images/userImage.jpeg')}
              className="w-44 h-44 rounded-full relative"
              resizeMode="contain"
            />
          )}
          <TouchableOpacity
            className="absolute  right-0 bottom-0"
            onPress={() =>
              Alert.alert('Photo Edit', 'Please select photo', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),

                  style: 'cancel',
                },
                {
                  text: 'Gallery',
                  onPress: () => handleGallery(),
                },
                {text: 'Camera', onPress: () => handleCamera()},
              ])
            }>
            <Image
              source={require('../../assets/images/camera.png')}
              className="w-12 h-12 rounded-full "
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-black text-3xl font-bold">
          {userAuth?.name}
          {userAuth?.surName}
        </Text>
        <View className="flex gap-3 items-start justify-start w-[85%]">
          <View className="flex-row gap-3 items-center">
            <Ionicons name="mail-outline" size={23} color={MyColor.primary} />
            <Text className="text-black text-lg">{userAuth?.email}</Text>
          </View>
          {userAuth?.phoneNumber && (
            <View className="flex-row gap-3 items-center">
              <Ionicons name="call-outline" size={22} color={MyColor.primary} />
              <Text className="text-black text-lg">
                {userAuth?.phoneNumber}
              </Text>
            </View>
          )}
          {userAuth?.description && (
            <View className="flex-row gap-3 items-center">
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={MyColor.primary}
              />
              <Text className="text-black text-lg font-light">
                "{userAuth?.description}"
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="flex-1 justify-end gap-8 mb-8">
        <TouchableOpacity
          className="flex-row items-center gap-2 px-8"
          onPress={() => bottomSheetRef.current.show()}>
          <Ionicons name="settings-outline" size={28} color="#000" />
          <Text className="text-black text-xl">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-2 px-8">
          <Ionicons name="help-buoy-outline" size={28} color="#000" />
          <Text className="text-black text-xl">Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center gap-2 px-8"
          onPress={() => bottomSheet.current.show()}>
          <MaterialIcons name="logout" size={28} color="#000" />
          <Text className="text-black text-xl">Logout</Text>
        </TouchableOpacity>
        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={200}
          onRequestClose={() => {
            bottomSheet.current.close();
          }}>
          <BottomSheetModal onPress={() => bottomSheet.current.close()} />
        </BottomSheet>
        <BottomSheet
          draggable={true}
          hasDraggableIcon
          ref={bottomSheetRef}
          height={420}>
          <BottomSheetRefModal onPress={() => bottomSheetRef.current.close()} />
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
