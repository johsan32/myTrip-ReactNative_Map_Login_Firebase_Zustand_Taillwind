import React from 'react';
import {
  View,
  FlatList,
  Text,
} from 'react-native';
import userStore from '../../app/store';
import TripCard from '../../components/tripCard';
import EmptyList from '../../components/emptyList';

const TripListScreen = () => {
  const {tripData} = userStore(state => state);

  return (
    <View className="flex-1 bg-white pt-2">
      <Text className="text-black w-full text-center text-xl font-bold">
        My Travel List
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList />}
        data={tripData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TripCard item={item} />
        )}
      />
    </View>
  );
};

export default TripListScreen;
