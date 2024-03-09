import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LOGIN, ONBOARDING, REGISTER, SPLASH, TAB} from '../utils/Routes';
import SplashScreen from '../screens/splash';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import MyTab from './myTab';
import MyColor from '../theme/MyColor';

import Onboarding from '../screens/onBoarding';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ONBOARDING}
      screenOptions={{
        headerShown: false,
        statusBarColor: MyColor.primary,
      }}>
      <Stack.Screen name={ONBOARDING} component={Onboarding} />
      <Stack.Screen name={SPLASH} component={SplashScreen} />
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name={REGISTER} component={RegisterScreen} />
      <Stack.Screen name={TAB} component={MyTab} />
    </Stack.Navigator>
  );
};

export default MyStack;
