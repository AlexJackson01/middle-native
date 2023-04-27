import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Text, ScrollView } from "react-native";
import HTMLView from "react-native-htmlview";

const DirectionsCard = ({ directions, duration }) => {
  const [HTMLDirections, setHTMLDirections] = useState(null);

  useEffect(() => {
    console.log(directions);

    let steps = [];

    for (let step of directions) {
      const stripped = step.html_instructions.replace(/(<([^>]+)>)/gi, "");
      steps.push(stripped);
    }
    setHTMLDirections(steps);
    console.log(HTMLDirections);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.duration}>Total: {Math.round(duration)} mins</Text>
      <ScrollView>
        {HTMLDirections &&
          HTMLDirections.map((step, i) => (
            <View key={i} style={styles.steps}>
              <Text style={styles.steps}>
                {i + 1}: {step}
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: 90,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 8,
    //   boxShadow: '1px 1px 0px #C7D0D8, 2px 2px 0px #C7D0D8, 3px 3px 0px #C7D0D8, 4px 4px 0px #C7D0D8, 5px 5px 0px #C7D0D8, 6px 6px 0px #C7D0D8, 7px 7px 0px #C7D0D8',
  },
  duration: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 20,
  },
  steps: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
export default DirectionsCard;
