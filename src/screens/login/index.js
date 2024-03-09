import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {REGISTER, TAB} from '../../utils/Routes';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Controller, useForm} from 'react-hook-form';
import userStore from '../../app/store';
import {signInGoogle} from '../../services/googleAuth';
import {signInMail} from '../../services/mailAuth';
import MyColor from '../../theme/MyColor';
import Icon from 'react-native-vector-icons/AntDesign';


export default function LoginScreen() {
  const {userData,userMail} = userStore(state => state);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleMailSignIn = values => {
    signInMail(values);
    if (userMail?.email) {
      navigation.navigate(TAB);
    }
  };
  const handleGoogleSignIn = () => {
    signInGoogle()
    if(userData?.email){
      navigation.navigate(TAB)
    }   
  };
 
  return (
    <View
      className="flex-1 bg-white justify-between "
      style={{backgroundColor: MyColor.primary}}>
      <FlashMessage position="top" />
      <View className="flex">
        <View className="flex-row justify-start my-3 mb-8">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-xl rounded-bl-xl ml-4">
            <Icon name="arrowleft" size={26} color={MyColor.white} />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mb-5">
          <Image
            source={require('../../assets/images/login.png')}
            style={{width: 200, height: 200}}
          />
        </View>
      </View>
      <View
        className="flex bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View className="form space-y-2">
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
              name="password"
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
                  onChangeText={onChange}
                  secureTextEntry
                  onBlur={onBlur}
                  value={value}
                />
              )}
              
            />
            {errors.password && (
              <Text className="text-red-700 text-sm">
                {errors?.password?.message}
              </Text>
            )}
          </View>
          <TouchableOpacity className="flex items-end md-5 mb-4">
            <Text className="text-gray-700 text-xs">Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <View className="flex justify-center w-full rounded-lg items-center gap-5">
          <TouchableOpacity
            // disabled={email&& password ? false: true}
            className="py-3 bg-yellow-400 rounded-xl w-full"
            onPress={handleSubmit(handleMailSignIn)}>
            <Text className="text-lg  font-semibold text-center text-gray-700">
              Login
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
        <View className="flex-row justify-center mb-3 mt-8">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(REGISTER)}>
            <Text className="font-semibold  text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

