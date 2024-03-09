import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {windowWidth} from '../utils/Dimensions';
import { getStatusIcon } from '../constant/status';

const BottomTripList = ({item, onPress}) => {
  const mapRef = useRef(null);

  return (
    <View className="flex items-center gap-5 ">
      <View
        style={styles.container}
        className="flex-1 justify-between items-center">
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: item?.coordinateLat,
            longitude: item?.coordinateLong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {item?.coordinateLat && (
            <Marker
              draggable
              coordinate={{
                latitude: item?.coordinateLat,
                longitude: item?.coordinateLong,
                latitudeDelta: 0.2922,
                longitudeDelta: 0.4421,
              }}
              title="selected location">
              <Image
                source={getStatusIcon(item?.status)}
                style={{width: 50, height: 50}}
                resizeMode="stretch"
              />
            </Marker>
          )}
        </MapView>
        <View className="justify-end flex-1 w-[90%] pb-5 items-center">
          <View className="flex w-full p-3 px-5 items-start mb-5 bg-slate-400 rounded-xl">
            <Text className="text-lg text-white text-center capitalize w-full">
              {item?.status}
            </Text>
            <View className="flex-row w-full items-center">
              <Text className="text-md  text-white font-normal w-[80px] justify-start">
                Name:
              </Text>
              <Text className="text-xl font-bold text-white">
               
                {item?.tripName}
              </Text>
            </View>
            <View className="flex-row w-full items-center justify-start">
              <Text className="text-md text-white font-normal w-[85px]">
                Description:
              </Text>
              <Text className="text-md text-white">
                {item?.decsription}
              </Text>
            </View>
            <View className="flex-row w-full items-center justify-start">
              <Text className="text-md text-white font-normal w-[85px]">
                Date:
              </Text>
              <Text className="text-lg text-white">
                {item.addTime}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className=" py-2 w-full bg-slate-500   rounded-xl"
            onPress={onPress}>
            <Text className="text-xl font-bold text-center text-white">
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomTripList;
const styles = StyleSheet.create({});
