import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { GEO_API_KEY } from "@env";
import axios from "axios";

const Map = ({
  inputOne,
  inputTwo,
  category,
  radius,
  midpoint,
  setMidpoint,
  markers,
}) => {
  const [userPoints, setUserPoints] = useState("");

  useEffect(() => {
    getCoordinates();
    console.log(markers);
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

    // console.log(requestOne)
    console.log(GEO_API_KEY);

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

  return (
    <View>
      {/* <Text>{markers[0].latitude}</Text> */}
      {midpoint && (
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
              pinColor="#F28773"
              description={`Point ${point.number}`}
              onCalloutPress={() => markerClick()}
            >
              <Callout style={styles.customView}>
                <View style={styles.calloutText}>
                  <Text>This is point {point.number}</Text>
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
                onCalloutPress={() => markerClick()}
              >
                <Callout style={styles.customView}>
                  <View style={styles.calloutText}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeDetails}>{place.address}</Text>
                    <Text style={styles.placeDetails}>{place.rating}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
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
});
export default Map;
