import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import LogoBar from "../components/LogoBar";
import PlaceCard from "../components/place/PlaceCard";

const PlaceScreen = ({ route }) => {
  const { place } = route.params;
  return (
    <LinearGradient
      colors={["#f28773", "#ef797a", "#da4f86"]}
      style={styles.linearGradient}
    >
      {/* <LogoBar /> */}

      <PlaceCard place={place} />
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
export default PlaceScreen;
