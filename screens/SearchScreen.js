import { StyleSheet, View } from "react-native";
import LogoBar from "../components/LogoBar";
import { LinearGradient } from "expo-linear-gradient";
import SearchForm from "../components/search/SearchForm";

export default SearchScreen = () => {
  return (
    <LinearGradient
      colors={["#f28773", "#ef797a", "#da4f86"]}
      style={styles.linearGradient}
    >
      <LogoBar />

      <SearchForm />
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
