import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Menu } from "react-native-paper";
import {GEO_API_KEY} from "@env"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


const SearchForm = () => {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [radiusVisible, setRadiusVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [radius, setRadius] = useState("");
  const [categoryToDisplay, setCategoryToDisplay] = useState("");
  const [radiusToDisplay, setRadiusToDisplay] = useState("");
  const [latLngOne, setLatlngOne] = useState({latitude: '', longitude: ''})
  const [latLngTwo, setLatlngTwo] = useState({latitude: '', longitude: ''})
  const [midpoint, setMidpoint] = useState({latitude: '', longitude: ''})



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

    console.log("Done.");
  };

  const openCategoryMenu = (e) => {
    e.preventDefault();
    setCategoriesVisible(true);
  };

  const openRadiusMenu = (e) => {
    e.preventDefault();
    setRadiusVisible(true);
  };

  const closeMenu = () => {
    setCategoriesVisible(false);
    setRadiusVisible(false);
  };

  const getCoordinates = () => {
    try {
      let one = `https://api.openrouteservice.org/geocode/search?api_key=${GEO_API_KEY}&text=${inputOne}`
    let two = `https://api.openrouteservice.org/geocode/search?api_key=${GEO_API_KEY}&text=${inputTwo}`
    const requestOne = axios.get(one)
    const requestTwo = axios.get(two)
    console.log(requestOne)
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0]
          const responseTwo = responses[1]
          setLatlngOne({
            latitude: responseOne.data.features[0].geometry.coordinates[1],
            longitude: responseOne.data.features[0].geometry.coordinates[0]
          })
          setLatlngTwo({
            latitude: responseTwo.data.features[0].geometry.coordinates[1],
            longitude: responseTwo.data.features[0].geometry.coordinates[0]
          })
          setMidpoint({
            latitude: (
              (responseOne.data.features[0].geometry.coordinates[1] +
                responseTwo.data.features[0].geometry.coordinates[1]) /
              2
            ).toFixed(8),
            longitude: (
              (responseOne.data.features[0].geometry.coordinates[0] +
                responseTwo.data.features[0].geometry.coordinates[0]) /
              2
            ).toFixed(8)
          })
        }),
        console.log(midpoint)
      )
    } catch (err) {
      console.log('There has been a problem: ' + err.message)
      throw err
    }
  }


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
            visible={categoriesVisible}
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
            <Menu.Item
              onPress={(e) => {
                setCategory("restaurants");
                setCategoryToDisplay("Restaurant");
                closeMenu();
              }}
              value="restaurants"
              title="Restaurant"
            />
            <Menu.Item
              onPress={() => {
                setCategory("pubs");
                setCategoryToDisplay("Pub");
                closeMenu();
              }}
              title="Pub"
            />
            <Menu.Item
              onPress={() => {
                setCategory("cafes");
                setCategoryToDisplay("Cafe");
                closeMenu();
              }}
              title="Cafe"
            />
            <Menu.Item
              onPress={() => {
                setCategory("movietheaters");
                setCategoryToDisplay("Cinema");
                closeMenu();
              }}
              title="Cinema"
            />
            <Menu.Item
              onPress={() => {
                setCategory("danceclubs,bars");
                setCategoryToDisplay("Nightclub/Bar");
                closeMenu();
              }}
              title="Nightclub/Bar"
            />
            <Menu.Item
              onPress={() => {
                setCategory("museums,galleries");
                setCategoryToDisplay("Museum/Art Gallery");
                closeMenu();
              }}
              title="Museum/Art Gallery"
            />
            <Menu.Item
              onPress={() => {
                setCategory("theater");
                setCategoryToDisplay("Restaurant");
                closeMenu();
              }}
              title="Theatre"
            />
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

        <View
          style={{
            paddingTop: 30,
            flexDirection: "column",
            justifyContent: "space-evenly",
            // width:
          }}
        >
          <Menu
            visible={radiusVisible}
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
            <Menu.Item
              onPress={(e) => {
                setRadius(Math.round(0.25 * 1609.344));
                setRadiusToDisplay("1/4 mile");
                closeMenu();
              }}
              value="quarter"
              title="1/4 mile"
            />
            <Menu.Item
              onPress={() => {
                setRadius(Math.round(0.5 * 1609.344));
                setRadiusToDisplay("1/2 mile");
                closeMenu();
              }}
              value="half"
              title="1/2 mile"
            />
            <Menu.Item
              onPress={() => {
                setRadius(Math.round(1609.344));
                setRadiusToDisplay("1 mile");
                closeMenu();
              }}
              value="one"
              title="1 mile"
            />
            <Menu.Item
              onPress={() => {
                setRadius(Math.round(3 * 1609.344));
                setRadiusToDisplay("3 miles");
                closeMenu();
              }}
              value="three"
              title="3 miles"
            />
            <Menu.Item
              onPress={() => {
                setRadius(Math.round(5 * 1609.344));
                setRadiusToDisplay("5 miles");
                closeMenu();
              }}
              value="five"
              title="5 miles"
            />
            <Menu.Item
              onPress={() => {
                setRadius(Math.round(10 * 1609.344));
                setRadiusToDisplay("10 miles");
                closeMenu();
              }}
              value="ten"
              title="10 miles"
            />
            <Menu.Item
              onPress={() => {
                setRadius(Math.round(20 * 1609.344));
                setRadiusToDisplay("20 miles");
                closeMenu();
              }}
              title="20 miles"
            />
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
        </View>
      </View>

      <View style={{ paddingTop: 30 }}>
        <Button
          labelStyle={{ fontSize: 15 }}
          icon="map-marker"
          mode="text"
          textColor="#FF62AD"
          onPress={() => getCoordinates()}
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
    height: Dimensions.get("window").height - 150,
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
