import React, { Component, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Link } from 'expo-router';

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
    };
    this.mapRef = React.createRef()
    this.markerRefs = {};
    this.onRegionChange = this.onRegionChange.bind(this);
    this.animateToRegion = this.animateToRegion.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region })
  }

  onPanDrag(e) {

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

  render() {
    return (
      <View>
        <View style={{ zIndex: -1 }}>
          <MapView
            ref={this.mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            onPanDrag={this.onPanDrag}
            initialRegion={this.state.region}
            scrollEnabled={true}
            customMapStyle={mapstyle}
            region={this.state.region}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {this.props.allLocations.map((marker, index) => (
              <Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.gym_name}
                ref={(ref) => { this.markerRefs[index] = ref; }}
                onPress={() => {
                  this.animateToRegion(marker.coordinate)
                  this.setState({ currentLocation: marker })
                }}
              >
                <Callout>
                  <Text>{marker.gym_name}</Text>
                  <Link href={{
                    pathname: '/home/gymPage/[id]',
                    params: { id: marker.id }
                  }}>More Info</Link>
                </Callout>
              </Marker>
            ))}
            <MapHUD
              animateToRegion={this.animateToRegion}
              allLocations={this.props.allLocations}
              data={this.state.currentLocation}
            />
          </MapView>
        </View>
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

let mapstyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]