import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';

class Maps extends Component {
  state = {
    latitude: '-6.2263249',
    longitude: '106.8543346',
  };
  componentDidMount() {
    geolocation.getCurrentPosition(geo => {
      console.log(geo);
      this.setState({
        latitude: geo.coords.latitude,
        longitude: geo.coords.longitude,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title={'title'}
            description={'description'}
          />
        </MapView>
      </View>
    );
  }
}

export default Maps;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
