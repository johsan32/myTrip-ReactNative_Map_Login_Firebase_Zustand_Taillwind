import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyColor from '../../theme/MyColor';
import BottomAddTrip from '../../components/bottomAddTrip';

const HomeScreen = () => {
  const mapRef = useRef(null);
  const [selectMarker, setSelectMarker] = useState(null);
  const bottomAddTrip = useRef();
  const handleMarkerPress = e => {
    const location = e?.nativeEvent.coordinate;
    setSelectMarker(location);
  };

  const [zoom, setZoom] = useState(14);
  const MAX_ZOOM_LEVEL = 20;
  const MIN_ZOOM_LEVEL = 3;
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 41.0541648,
    longitude: 28.9764438,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
  });
  const getLatLongDelta = (zoomLevel, latitude) => {
    const latDelta = 0.0922 * Math.pow(2, 14 - zoomLevel);
    const longDelta = latDelta * Math.cos((latitude * Math.PI) / 180);
    return [longDelta, latDelta];
  };
  const handleZoom = (isZoomIn = false) => {
    let currentZoomLevel = zoom;
    if (!isZoomIn && currentZoomLevel === MAX_ZOOM_LEVEL) {
      currentZoomLevel -= 1;
    } else if (isZoomIn && currentZoomLevel === MIN_ZOOM_LEVEL) {
      currentZoomLevel += 1;
    }
    if (
      currentZoomLevel >= MAX_ZOOM_LEVEL ||
      currentZoomLevel <= MIN_ZOOM_LEVEL
    ) {
      return;
    }

    currentZoomLevel = isZoomIn ? currentZoomLevel + 1 : currentZoomLevel - 1;
    const zoomedInRegion = {
      ...selectedRegion,
      latitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[1],
      longitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude,
      )[0],
    };

    setSelectedRegion(zoomedInRegion);
    setZoom(currentZoomLevel);
    mapRef?.current?.animateToRegion(zoomedInRegion, 100);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={selectedRegion}
        onRegionChangeComplete={region => {
          setSelectedRegion(region);
        }}
        onPress={handleMarkerPress}>
        {selectMarker && (
          <Marker draggable coordinate={selectMarker} title="selected location">
            <Image
              source={require('../../assets/icons/marker.png')}
              style={{width: 50, height: 50}}
              resizeMode="stretch"
            />
            <Callout
              style={styles.callout}
              onPress={() => bottomAddTrip.current.show()}>
              <View style={styles.button}>
                <Text className="w-full text-center text-black">Add Trip</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      <View style={styles.zoomView}>
        <TouchableOpacity
          style={styles.zoom}
          onPress={() => handleZoom(true)}
          disabled={zoom === MAX_ZOOM_LEVEL}>
          <Icon
            name={'plus'}
            size={22}
            color={MyColor.white}
            style={{opacity: zoom === MAX_ZOOM_LEVEL ? 0.2 : 1}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoom}
          onPress={() => handleZoom()}
          disabled={zoom === MIN_ZOOM_LEVEL}>
          <Icon
            name={'minus'}
            size={25}
            color={MyColor.white}
            style={{opacity: zoom === MIN_ZOOM_LEVEL ? 0.2 : 1}}
          />
        </TouchableOpacity>
      </View>
      <BottomSheet
        draggable={true}
        hasDraggableIcon
        ref={bottomAddTrip}
        height={500}>
        <BottomAddTrip
          selectMarker={selectMarker}
          setSelectMarker={setSelectMarker}
          onPress={() => bottomAddTrip.current.close()}
        />
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
