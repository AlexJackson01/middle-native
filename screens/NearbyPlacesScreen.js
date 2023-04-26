import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import Map from "../components/nearby/Map";
import LogoBar from "../components/LogoBar";
import { useState } from "react";
import NearbyList from "../components/nearby/NearbyList";
import { SafeAreaView } from "react-native-safe-area-context";

const NearbyPlacesScreen = ({ route, navigation }) => {
  const { category, radius, inputOne, inputTwo } = route.params;

  const [midpoint, setMidpoint] = useState("");
  const [markers, setMarkers] = useState([]);
  const [markerIndex, setMarkerIndex] = useState(0)
  

  return (
    <LinearGradient
      colors={["#f28773", "#ef797a", "#da4f86"]}
      style={styles.linearGradient}
    >
      <LogoBar />
      <Map
        inputOne={inputOne}
        inputTwo={inputTwo}
        midpoint={midpoint}
        setMidpoint={setMidpoint}
        markers={markers}
        setMarkerIndex={setMarkerIndex}
        navigation={navigation}
      />

      <NearbyList
        midpoint={midpoint}
        category={category}
        radius={radius}
        markers={markers}
        setMarkers={setMarkers}
        navigation={navigation}
        markerIndex={markerIndex}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default NearbyPlacesScreen;
