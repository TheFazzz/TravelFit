import React, { Component, useRef } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import locationData from '../location/locationData';

class MapDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 33.88320261236168,
        longitude: -117.88759354786767,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,

      },
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    console.log('wowe')
    console.log( region )
    this.setState({ region })
  }

  onPanDrag(e) {
    console.log(e)
  }


  //TODO: use 'showsUserLocation' once we figure out geolocation stuff
  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        onRegionChange={this.onRegionChange}
        style={styles.map}
        onPanDrag={this.onPanDrag}
        initialRegion={this.state.region}
      >
        {locationData.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.gymName}
          />
        ))}
      </MapView>
    )
  }
}

export default MapDisplay

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
