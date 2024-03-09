import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../utils/Dimensions';

const EmptyList = () => {
  return (
    <View className="flex-1 w-full h-full items-center justify-center">
      <Image
        source={require('../assets/images/empty.png')}
        style={{width: windowWidth * 0.9, height: windowHeight * 0.5}}
        resizeMode="contain"
      />
      <Text className="text-xl text-black font-bold">Empty List</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
