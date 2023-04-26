import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Menu } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchForm = ({ navigation }) => {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [openCategories, setOpenCategories] = useState(false);
  const [openRadius, setOpenRadius] = useState(false);
  const [category, setCategory] = useState("");
  const [radius, setRadius] = useState("");
  const [userPoints, setUserPoints] = useState([]);
  const [categoryToDisplay, setCategoryToDisplay] = useState("");
  const [radiusToDisplay, setRadiusToDisplay] = useState("");
  const [midpoint, setMidpoint] = useState("");
  const [categoryMenu, setCategoryMenu] = useState([
    { name: "restaurants", label: "Restaurant" },
    { name: "pubs", label: "Pub" },
    { name: "cafes", label: "Cafe" },
    { name: "movietheaters", label: "Cinema" },
    { name: "danceclubs,bars", label: "Nightclub/Bar" },
    { name: "museums,galleries", label: "Museum/Art Gallery" },
    { name: "theater", label: "Theatre" },
  ]);
  const [radiusMenu, setRadiusMenu] = useState([
    { value: 0.25 * 1609.344, name: "quarter", label: "1/4 mile" },
    { value: 0.5 * 1609.344, name: "half", label: "1/2 mile" },
    { value: 1 * 1609.344, name: "one", label: "1 mile" },
    { value: 3 * 1609.344, name: "three", label: "3 miles" },
    { value: 5 * 1609.344, name: "five", label: "5 miles" },
    { value: 10 * 1609.344, name: "ten", label: "10 miles" },
    { value: 20 * 1609.344, name: "twenty", label: "20 miles" },
  ]);

  const saveInputOne = async (inputOne) => {
    try {
      await AsyncStorage.setItem("@inputOne", inputOne);
    } catch (e) {
      console.log("Error saving data" + e);
    }
  };

  const saveInputTwo = async (inputTwo) => {
    try {
      await AsyncStorage.setItem("@inputTwo", inputTwo);
    } catch (e) {
      console.log("Error saving data" + e);
    }
  };

  const clearInputs = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    setInputOne("");
    setInputTwo("");

    // console.log("Done.");
  };

  const openCategoryMenu = (e) => {
    e.preventDefault();
    setOpenCategories(true);
  };

  const openRadiusMenu = (e) => {
    e.preventDefault();
    setOpenRadius(true);
  };

  const closeMenu = () => {
    setOpenCategories(false);
    setOpenRadius(false);
  };


  return (
    <View style={styles.searchContainer}>
      <View style={{ marginTop: 50, padding: 20 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Point 1"
          label="Point 1"
          mode="flat"
          value={inputOne}
          onChangeText={(inputOne) => {
            setInputOne(inputOne);
            saveInputOne(inputOne);
          }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Point 2"
          label="Point 2"
          mode="flat"
          value={inputTwo}
          onChangeText={(inputTwo) => {
            setInputTwo(inputTwo);
            saveInputTwo(inputTwo);
          }}
        />
      </View>

      <Button
        style={{ marginTop: -5 }}
        labelStyle={{ fontSize: 12 }}
        textColor="#FF62AD"
        onPress={() => clearInputs()}
      >
        Clear
      </Button>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View
          style={{
            paddingTop: 30,
            flexDirection: "column",
            justifyContent: "space-evenly",
            // width:
          }}
        >
          <Menu
            visible={openCategories}
            onDismiss={closeMenu}
            contentStyle={{
              backgroundColor: "#fff",
            }}
            anchor={
              <Button
                labelStyle={{ fontSize: 15 }}
                textColor="#FF62AD"
                onPress={(e) => openCategoryMenu(e)}
              >
                Select a category
              </Button>
            }
          >
            {categoryMenu.map((category, i) => (
              <Menu.Item
                key={i}
                onPress={(e) => {
                  setCategory(category.name);
                  setCategoryToDisplay(category.name);
                  closeMenu();
                }}
                value={category.name}
                title={category.label}
              />
            ))}
          </Menu>

          {category && (
            <View>
              <Text style={styles.categoryText}>
                Category: {categoryToDisplay}
              </Text>
              <Button
                labelStyle={{ fontSize: 12 }}
                textColor="#FF62AD"
                onPress={() => setCategory("")}
              >
                Clear
              </Button>
            </View>
          )}
        </View>

        {/* <View
          style={{
            paddingTop: 30,
            flexDirection: "column",
            justifyContent: "space-evenly",
            // width:
          }}
        >
          <Menu
            visible={openRadius}
            onDismiss={closeMenu}
            contentStyle={{
              backgroundColor: "#FFF",
            }}
            anchor={
              <Button
                labelStyle={{ fontSize: 15 }}
                textColor="#FF62AD"
                onPress={(e) => openRadiusMenu(e)}
              >
                Select a radius
              </Button>
            }
          >
            {radiusMenu.map((radius, i) => (
              <Menu.Item
                key={i}
                onPress={(e) => {
                  setRadius(radius.value);
                  setRadiusToDisplay(radius.label);
                  closeMenu();
                }}
                value={radius.name}
                title={radius.label}
              />
            ))}
          </Menu>

          {radius && (
            <View>
              <Text style={styles.categoryText}>Radius: {radiusToDisplay}</Text>
              <Button
                labelStyle={{ fontSize: 12 }}
                textColor="#FF62AD"
                onPress={() => setRadius("")}
              >
                Clear
              </Button>
            </View>
          )}
        </View> */}
      </View>

      <View style={{ paddingTop: 30 }}>
        <Button
          labelStyle={{ fontSize: 15 }}
          icon="map-marker"
          mode="text"
          textColor="#FF62AD"
          onPress={() => navigation.navigate('Nearby', {
            inputOne: inputOne,
            inputTwo: inputTwo,
            category: category,
            radius: radius
          })}
        >
          SEARCH
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 250,
    marginBottom: 100,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: "#fff",
  },
  searchInput: {
    margin: 20,
    paddingLeft: 10,
    borderColor: "#FF62AD",
    borderWidth: 1,
    height: 40,
    fontSize: 15,
    // borderRadius: 20
  },
  categoryText: {
    fontStyle: "italic",
    fontSize: 12,
    textAlign: "center",
  },
  userSelection: {
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default SearchForm;
