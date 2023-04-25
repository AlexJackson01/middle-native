import { StyleSheet, View } from "react-native";
import LogoBar from "../components/LogoBar";
import { LinearGradient } from "expo-linear-gradient";
import SearchForm from "../components/search/SearchForm";
import { SafeAreaView } from "react-native-safe-area-context";

export default SearchScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#f28773", "#ef797a", "#da4f86"]}
      style={styles.linearGradient}
    >
      <LogoBar />

      <SearchForm navigation={navigation} />
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
