import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import database from '@react-native-firebase/database';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyColor from '../theme/MyColor';
import userStore from '../app/store';
import BottomTripList from './bottomTripList';

const TripCard = ({item}) => {
  const {tripData, authId} = userStore(state => state);
  const bottomTripList = useRef();
  const getStatusIcon = status => {
    switch (status) {
      case 'travel':
        return require('../assets/icons/travel.png');
      case 'shopping':
        return require('../assets/icons/shopping.png');
      case 'food':
        return require('../assets/icons/food.png');
      default:
        return require('../assets/icons/hostel.png');
    }
  };
  const handleDelete = async item => {
    const newTripList = tripData?.filter(i => i.id !== item.id);
    console.log('newTripList');
    userStore.setState({tripData: newTripList});
    await database().ref(`users/${authId}/trip/${item.id}`).remove();
  };

  return (
    <TouchableOpacity
      onPress={() => bottomTripList.current.show()}
      className="flex-row items-center justify-between h-[80px] m-2 border p-2 rounded-lg shadow-2xl border-cyan-300 bg-slate-200">
      <Image
        source={getStatusIcon(item.status)}
        style={{width: 50, height: 50}}
      />
      <View className="flex-row items-center justify-between flex-1 mx-2">
        <View className="py-2 w-[70%] ">
          <Text className="text-black text-lg capitalize">
            {item?.tripName?.length > 15
              ? item?.tripName?.substring(0, 15) + '...'
              : item?.tripName}
          </Text>
          <Text className="text-gray text-xs capitalize">
            {item?.decsription?.length > 40
              ? item?.decsription?.substring(0, 40) + '...'
              : item?.decsription}
          </Text>
        </View>
        <Text className="text-black text-xs w-[25%] text-right capitalize">
          {item?.status}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item)}>
        <Icon name="delete-empty-outline" size={32} color={MyColor.red} />
      </TouchableOpacity>
      <BottomSheet
        hasDraggableIcon
        ref={bottomTripList}
        height={600}
        onRequestClose={() => {
          bottomTripList.current.close();
        }}>
        <BottomTripList
          onPress={() => bottomTripList.current.close()}
          item={item}
        />
      </BottomSheet>
    </TouchableOpacity>
  );
};

export default TripCard;
