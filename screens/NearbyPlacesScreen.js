import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import Map from "../components/nearby/Map";
import LogoBar from "../components/LogoBar";
import { useState } from "react";
import NearbyList from "../components/nearby/NearbyList";

const NearbyPlacesScreen = ({ route }) => {
  const { category, radius, inputOne, inputTwo } = route.params;

  const [midpoint, setMidpoint] = useState("");

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
      />

      <NearbyList midpoint={midpoint} category={category} radius={radius} />
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
