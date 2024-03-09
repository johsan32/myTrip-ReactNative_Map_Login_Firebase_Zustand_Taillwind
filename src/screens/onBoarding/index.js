import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MyColor from '../../theme/MyColor';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {SPLASH} from '../../utils/Routes';

const Onboarding = () => {
  const navigation = useNavigation();
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef(PagerView);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const handleNextPage = () => {
    if (pagerRef.current) {
      pagerRef.current.setPage(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagerRef.current) {
      pagerRef.current.setPage(pageIndex - 1);
    }
  };

  useEffect(() => {
    pagerRef.current?.setPage(pageIndex);
    setActiveDotIndex(pageIndex);
  }, [pageIndex]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: MyColor.primary}}>
      <PagerView
        style={styles.container}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
        <View key="1" style={styles.onboardingPage}>
          <Image
            source={require('../../assets/images/auth.png')}
            style={{width: windowWidth * 0.95, height: windowWidth * 0.4}}
            resizeMode="contain"
          />
          <Text className="mx-5 text-lg text-justify text-white">
            "Firebase Authentication provides backend services & easy-to-use
            SDKs to authenticate users to your app. It supports authentication
            using passwords, phone numbers, popular federated identity providers
            like Google, Facebook and Twitter, and more."
          </Text>
        </View>
        <View key="2" style={styles.onboardingPage}>
          <Image
            source={require('../../assets/images/email.png')}
            style={{width: windowWidth * 0.95, height: windowWidth * 0.4}}
            resizeMode="contain"
          />
          <Text className="mx-5 text-lg text-justify text-white">
            "Email/password sign in is a common method for user sign in on
            applications. This requires the user to provide an email address and
            secure password. "
          </Text>
        </View>
        <View key="3" style={styles.onboardingPage}>
          <Image
            source={require('../../assets/images/google-signin.png')}
            style={{width: windowWidth * 0.9, height: windowWidth * 0.4}}
            resizeMode="contain"
          />
          <Text className="mx-5 text-lg text-justify text-white">
            "You can make the most of all the Google services you use by signing
            in to your Google Account. Your account helps you do more by
            personalizing your Google experience and giving you easy access to
            your most important information from anywhere."
          </Text>
        </View>
        <View key="4" style={styles.onboardingPage}>
          <Lottie
            style={{width:windowWidth*0.8, height: 200}}
            source={require('../../assets/animations/welcome.json')}
            autoPlay
            loop
          />
          <Text className="mx-5 text-xl text-center text-white">
            Firebase Auth React Native project. 
            {'\n\n'}
            Email and Google signin
            authentication. 
            {'\n\n'}
            Profile detail and profile update project.
          </Text>
        </View>
      </PagerView>
      <View style={styles.buttonContainer}>
        {[0, 1, 2, 3].map(index => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, activeDotIndex === index && styles.activeDot]}
            onPress={e => setPageIndex(index)}
          />
        ))}
      </View>
      <View className="absolute items-center justify-between px-4 bottom-1 mb-2 flex-row w-full ">
        <TouchableOpacity onPress={handlePrevPage} disabled={pageIndex === 0}>
          <Icon
            name="left"
            size={28}
            color={pageIndex === 0 ? MyColor.primary : MyColor.white}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextPage} disabled={pageIndex === 3}>
          <Icon
            name="right"
            size={28}
            color={pageIndex === 3 ? MyColor.primary : MyColor.white}
          />
          {pageIndex === 3 && (
            <TouchableOpacity
              onPress={() => navigation.navigate(SPLASH)}
              className="bg-white rounded-md px-2 py-2 w-16 right-0 absolute bottom-0">
              <Text className="px-2 text-md text-center font-bold text-black">Skip</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: MyColor.primary,
  },
  onboardingPage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: MyColor.secondary,
  },
  activeDot: {
    backgroundColor: MyColor.white,
  },
});

export default Onboarding;
