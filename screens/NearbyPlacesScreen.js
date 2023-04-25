import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import Map from "../components/nearby/Map";
import LogoBar from "../components/LogoBar";

const NearbyPlacesScreen = ({ route }) => {
  const { midpoint, latLngOne, latLngTwo, category, radius } = route.params;
  return (
    <LinearGradient
      colors={["#f28773", "#ef797a", "#da4f86"]}
      style={styles.linearGradient}
    >
      <LogoBar />
      <Map
        midpoint={midpoint}
        latLngOne={latLngOne}
        latLngTwo={latLngTwo}
        category={category}
        radius={radius}
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
