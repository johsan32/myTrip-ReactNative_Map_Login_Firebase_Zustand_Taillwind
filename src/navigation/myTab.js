import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HOME, PROFILE, TRIPLIST} from '../utils/Routes';
import HomeScreen from '../screens/home';
import MyColor from '../theme/MyColor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userStore from '../app/store';
import Loading from '../components/loading';
import database from '@react-native-firebase/database';
import {databaseCheck} from '../services/dataFirebase';
import TripListScreen from '../screens/tripList';
import {UserProfile} from '../screens/profile';

const Tab = createBottomTabNavigator();

const MyTab = ({focused}) => {
  const {userData, userMail, loading, authId} = userStore(state => state);

  const databaseAdd = () => {
    if (userData || userMail) {
      database()
        .ref(`users/${authId}`)
        .once('value')
        .then(snapshot => {
          if (!snapshot.exists()) {
            database()
              .ref(`users/${authId}`)
              .set({
                name: userData?.name || userMail?.displayName,
                surName: userData?.familyName,
                phoneNumber: userMail?.phoneNumber,
                email: userData?.email || userMail?.email,
                photo: userData?.photo || userMail?.photoURL,
              })
              .then(() => console.log('Data set.'));
          }
        });
    }
  };

  useEffect(() => {
    databaseAdd();
    databaseCheck(authId);
  }, [authId]);
  useEffect(() => {
    databaseCheck(authId);
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <Tab.Navigator
      initialRouteName={HOME}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: focused ? 20 : 13,
          paddingBottom: 5,
        },
        tabBarStyle: {
          paddingVertical: 5,
          height: 70,
          backgroundColor: MyColor.primary,
        },

        tabBarStyle: {
          paddingVertical: 5,
          height: 60,
          backgroundColor: MyColor.primary,
        },
        tabBarIcon: ({focused, color, size}) => (
          <TabIcon
            focused={focused}
            color={color}
            name={route?.name}
            route={route}
          />
        ),
        tabBarInactiveTintColor: MyColor.secondary,
        tabBarActiveTintColor: MyColor.white,
      })}>
      <Tab.Screen
        name={TRIPLIST}
        component={TripListScreen}
        options={{
          tabBarLabel: 'Trip List',

          tabBarIcon: ({color, focused}) => (
            <Icon
              name="map-marker-star-outline"
              size={32}
              color={color}
              style={{opacity: focused ? 1 : 0.3}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIconStyle: {
            width: 70,
            position: 'absolute',
            bottom: 20,
            borderWidth: 7,
            borderColor: MyColor.white,
            height: 70,
            backgroundColor: MyColor.primary,
            borderRadius: 100,
          },

          tabBarIcon: ({color, focused}) => (
            <Icon
              name="map-search-outline"
              size={32}
              color={color}
              style={{opacity: focused ? 1 : 0.3}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={PROFILE}
        component={UserProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="account"
              size={32}
              color={color}
              style={{opacity: focused ? 1 : 0.3}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTab;
