import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {LOGIN, REGISTER} from '../../utils/Routes';
import MyColor from '../../theme/MyColor';

export default function SplashScreen() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: MyColor.primary}}>
      <View className="flex-1 flex justify-between my-4">
        <View className="mt-12">
          <Text className="text-white font-bold text-4xl text-center">
            Let's Get Started
          </Text>
          <Text className="text-gray-600 font-semibold text-2xl text-center mt-2">
            "My Travel Diary"
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/splash.png')}
            style={{width: 350, height: 350}}
          />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(REGISTER);
            }}
            className="py-3 bg-yellow-300 mx-7 rounded-xl">
            <Text className="text-xl font-bold text-center text-gray-500">
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center items-center">
            <Text className="text-white font-semibold text-base">
              Already have an account
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(LOGIN)}>
              <Text className="font-semibold text-lg underline  text-yellow-500"> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
