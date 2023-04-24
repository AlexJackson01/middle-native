import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Menu } from "react-native-paper";

const SearchForm = () => {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [radiusVisible, setRadiusVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryToDisplay, setCategoryToDisplay] = useState("");

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

  const closeMenu = () => {
    setCategoriesVisible(false);
    setRadiusVisible(false);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={{ marginTop: 20 }}>
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

      <View
        style={{
          paddingTop: 30,
          flexDirection: "row",
          justifyContent: "center",
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
      </View>

      <View style={styles.userSelection}>
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
    justifyContent: "space-evenly",
  },
});
export default SearchForm;
