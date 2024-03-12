import React, { Component, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Link } from 'expo-router';
import mapstyle from './mapstyle';

import MapHUD from './mapHUD';

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
      focusedMarker: null,
      userLocation: null,
      currentLocation: null,
      panDrag: null,
    };
    this.mapRef = React.createRef()
    this.markerRefs = {};
    this.panDrag = null
    this.onRegionChange = this.onRegionChange.bind(this);
    this.animateToRegion = this.animateToRegion.bind(this);
    this.onPanDrag = this.onPanDrag.bind(this)
  }

  onRegionChange(region) {
    this.setState({ region })
  }

  onPanDrag(e) {
    this.setState({ panDrag: e })
  }

  loadData() {
    this.props.loadData()
  }

  animateToRegion(region, markerId) {
    this.mapRef.current.animateToRegion({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }, 1000);
    this.setState({ focusedMarker: markerId })
  }

  setCurrentMarker(currentLocation) {
    // this.setState({ currentLocation })
  }

  render() {

    return (
      <View>
        <View style={{ zIndex: -1 }}>
          <MapView
            ref={this.mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            onPanDrag={(e) => {
              e.persist()
              this.setState({ panDrag: e})
            }}
            initialRegion={this.state.region}
            scrollEnabled={true}
            customMapStyle={mapstyle}
            region={this.state.region}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {this.props.allLocations ? this.props.allLocations.map((marker, index) => (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.gym_name}
                ref={(ref) => { this.markerRefs[index] = ref; }}
                onPress={() => {
                  this.animateToRegion(marker.coordinate)
                  this.setState({ currentLocation: {...marker, time: Date.now()} })
                }}
              >
                <Callout>
                  <Text>{marker.gym_name}</Text>
                </Callout>
              </Marker>
            )) : <></>}
          </MapView>
        </View>
        <MapHUD
          setGymId={this.props.setGymId}
          animateToRegion={this.animateToRegion}
          focusedMarker={this.focusedMarker}
          allLocations={this.props.allLocations}
          currentMarker={this.state.currentLocation}
          onPanDrag={this.state.panDrag}
        />
      </View>
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

