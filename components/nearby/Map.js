import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GEO_API_KEY, MAPS_API_KEY } from "@env";
import axios from "axios";
import { Button, SegmentedButtons } from "react-native-paper";

const Map = ({
  inputOne,
  inputTwo,
  midpoint,
  setMidpoint,
  markers,
  setMarkerIndex,
  navigation
}) => {
  const [userPoints, setUserPoints] = useState("");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState([]);
  const [mode, setMode] = useState("");
  const [duration, setDuration] = useState('')
  const [showMode, setShowMode] = useState(false)

  useEffect(() => {
    getCoordinates();
  }, []);

  const getCoordinates = async () => {
    const [requestOne, requestTwo] = await Promise.all([
      axios.get(
        `https://api.openrouteservice.org/geocode/search?api_key=${GEO_API_KEY}&text=${inputOne}`
      ),
      axios.get(
        `https://api.openrouteservice.org/geocode/search?api_key=${GEO_API_KEY}&text=${inputTwo}`
      ),
    ]);

    setUserPoints([
      {
        number: 1,
        latitude: requestOne.data.features[0].geometry.coordinates[1],
        longitude: requestOne.data.features[0].geometry.coordinates[0],
      },
      {
        number: 2,
        latitude: requestTwo.data.features[0].geometry.coordinates[1],
        longitude: requestTwo.data.features[0].geometry.coordinates[0],
      },
    ]);

    setMidpoint({
      latitude: (
        (requestOne.data.features[0].geometry.coordinates[1] +
          requestTwo.data.features[0].geometry.coordinates[1]) /
        2
      ).toFixed(8),
      longitude: (
        (requestOne.data.features[0].geometry.coordinates[0] +
          requestTwo.data.features[0].geometry.coordinates[0]) /
        2
      ).toFixed(8),
    });
  };

  const markerIndex = (place, i) => {
    setMarkerIndex(i);
  };

  const handleDestination = (place) => {
    setDestination({
      latitude: place.coords.latitude,
      longitude: place.coords.longitude
    })
    setShowMode(true)
    console.log(directions);
  };

  return (
    <View>
      {/* <Text>{markers[0].latitude}</Text> */}
      {midpoint && (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: Number(midpoint.latitude),
              longitude: Number(midpoint.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(midpoint.latitude),
                longitude: Number(midpoint.longitude),
              }}
              pinColor="#E24491"
              description="Point 1"
              onCalloutPress={() => markerClick()}
            >
              <Callout style={styles.customView}>
                <View style={styles.calloutText}>
                  <Text>This is your midpoint</Text>
                </View>
              </Callout>
            </Marker>

            {userPoints.map((point, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: Number(point.latitude),
                  longitude: Number(point.longitude),
                }}
                pinColor="#E24491"
                description={`Point ${point.number}`}
                onCalloutPress={() => setOrigin({
                  latitude: point.latitude,
                  longitude: point.longitude
                })}
              >
                <Callout style={styles.customView}>
                  <View style={styles.calloutText}>
                    <Text>This is point {point.number}</Text>
                    <TouchableOpacity>
                      <Text style={{textDecorationLine: 'underline', textAlign: 'center'}}>Set as origin</Text>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
            ))}

            {markers.length > 0 &&
              markers.map((place, i) => (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: place.coords.latitude,
                    longitude: place.coords.longitude,
                  }}
                  pinColor="#F28773"
                  onPress={() => markerIndex(place, i)}
                  onCalloutPress={() => handleDestination(place)}
                >
                  <Callout style={styles.customView}>
                    <View style={styles.calloutText}>
                      <Text style={styles.placeName}>{place.name}</Text>
                      <Text style={styles.placeDetails}>{place.address}</Text>
                      <Text style={styles.placeDetails}>{place.rating}</Text>
                      <TouchableOpacity>
                      <Text style={{textDecorationLine: 'underline', textAlign: 'center'}}>Set as destination</Text>
                    </TouchableOpacity>
                    </View>
                  </Callout>
                </Marker>
              ))}

            {destination && <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={MAPS_API_KEY}
              mode={mode ? mode : 'TRANSIT'}
              strokeWidth={3}
              strokeColor="#E24491"
              tappable={true}
              resetOnChange={true}
              optimizeWaypoints={true}
              onReady={(result) => {
                console.log(`Maps here: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                setDirections(result.legs[0].steps);
                setDuration(result.duration)
              }}
              onPress={() => navigation.navigate('Directions', {
                directions: directions,
                duration: duration
              })}
            />}
          </MapView>

          <Text>{origin && origin.latitude}</Text>

          {showMode && <SegmentedButtons
            value={mode}
            onValueChange={setMode}
            style={styles.modeButtons}
            backgroundColor='#fff'
            uncheckedColor='#fff'
            checkedColor='#f28773'
            buttons={[
              {
                value: "WALKING",
                label: "Walking",
                icon: 'walk',
                checkedColor: '#E24491',
                uncheckedColor: '#000'
              },
              {
                value: "TRANSIT",
                label: "Transit",
                icon: 'train-variant',
                checkedColor: '#E24491',
                uncheckedColor: '#000'
              },
              { value: "DRIVING", label: "Driving", icon: 'car', checkedColor: '#E24491', backgroundColor: '#fff', color: '#fff', uncheckedColor: '#000' },
            ]}
          />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("window").height - 175,
    width: Dimensions.get("window").width,
    marginBottom: 20,
  },
  placeName: {
    textAlign: "center",
  },
  placeDetails: {
    textAlign: "center",
  },
  modeButtons: {
    color: '#fff',
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginTop: -70,
  },
  customView: {
    marginBottom: 10,
    height: 100,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  calloutText: {
    textAlign: 'center',
    fontSize: 20
  },
  originButton: {
    borderColor: '#fff',
    height: 10
  }
});
export default Map;
