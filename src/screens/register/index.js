import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {signInGoogle} from '../../services/googleAuth';
import {signUpMail} from '../../services/mailAuth';
import {useNavigation} from '@react-navigation/native';
import userStore from '../../app/store';
import Icon from 'react-native-vector-icons/AntDesign';
import MyColor from '../../theme/MyColor';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import { TAB } from '../../utils/Routes';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {userData} = userStore(state => state);
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleMailSignUp = async values => {
    console.log(values);
    if (values.password === values.confirmPassword) {
      signUpMail(values);
          showMessage({
        type: 'danger',
        message: 'Passwords do not match!',
      });
      navigation.navigate(TAB);
    } else {
      showMessage({
        type: 'danger',
        message: 'Passwords do not match!',
      });
    }
  };
  const handleGoogleSignIn = async () => {
    await signInGoogle();
    if (userData?.email) {
      navigation.navigate(TAB);
    } else {
      Alert.alert('Please try again.');
    }
  };

  return (
    <View
      className="flex-1 bg-white justify-between "
      style={{backgroundColor: MyColor.primary}}>
      <FlashMessage position="top" />
      <View className="flex">
        <View className="flex-row justify-start py-3 pb-8">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-xl rounded-bl-xl ml-4">
            <Icon name="arrowleft" size={26} color={MyColor.white} />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/register.png')}
            style={{width: '80%', height: 190}}
            resizeMode="contain"
          />
        </View>
      </View>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View
          style={{
            gap: 10,
          }}>
          <Text className="text-md text-slate-800">E-mail adress</Text>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'This is required!',
              },
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address!',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className="border rounded-lg p-3 border-zinc-400 bg-gray-100"
                keyboardType="email-address"
                placeholder="E-mail"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-red-700 text-sm">
              {errors?.email?.message}
            </Text>
          )}
          <Text className="text-md text-slate-800">Password</Text>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'This is required!'},
              maxLength: {
                value: 12,
                message: 'Password must be maximum 20 characters!',
              },
              minLength: {
                value: 6,
                message: 'Password must be minimum 6 characters!',
              },
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
                className="border rounded-lg p-3 border-zinc-400 bg-gray-100"
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className="text-red-700 text-sm">
              {errors?.password?.message}
            </Text>
          )}
          <Text className="text-md text-slate-800">Password Again</Text>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'This field is required!'},
              validate: {
                matchesPassword: value =>
                  value === getValues('password') || 'Passwords do not match!',
              },
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
                className="border rounded-lg p-3 border-zinc-400 bg-gray-100"
                placeholder="Password again"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text className="text-red-700 text-sm">
              {errors?.confirmPassword?.message}
            </Text>
          )}
        </View>
        <View className="flex-1 justify-end pb-5 w-full rounded-lg items-center gap-5">
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl w-full"
            onPress={handleSubmit(handleMailSignUp)}>
            <Text className="text-lg  font-semibold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-1 bg-cyan-600 rounded-lg w-full flex-row justify-start items-center"
            onPress={handleGoogleSignIn}>
            <Image
              source={require('../../assets/icons/google.png')}
              className="w-10 h-10 ml-3 bg-white rounded-md"
            />
            <Text className="text-lg  font-bold ml-16 text-white w-full">
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
