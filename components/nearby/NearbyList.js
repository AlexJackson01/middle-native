import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  FlatList,
  Dimensions,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Title,
} from "react-native-paper";
import { YELP_API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating-widget";
import * as Calendar from "expo-calendar";

const NearbyList = ({
  midpoint,
  category,
  radius,
  setMarkers,
  markers,
  navigation,
  markerIndex,
}) => {
  const [nearby, setNearby] = useState([]);
  const [resultsMessage, setResultsMessage] = useState("");
  const [listCoords, setListCoords] = useState([]);
  const ref = useRef(null);

  const getNearby = () => {
    axios
      .get(
        `https://api.yelp.com/v3/businesses/search?latitude=${midpoint.latitude}&longitude=${midpoint.longitude}&categories=${category}&radius=${radius}`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setNearby(res.data.businesses);
      })
      .catch((err) => {
        console.log("error");
      });

    console.log(nearby);

    if (nearby.length === 0) {
      setResultsMessage("No results found. Please widen your search.");
    }
  };

  const sharePlace = async (place) => {
    try {
      await Share.share({
        message: `Let's meet in the middle! What do you think of ${place.name}: ${place.url}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const addToCalendar = async (place) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      console.log("Here are all your calendars:");
      console.log({ calendars });
    }

    const eventDetails = {
      title: "Meet in the Middle",
      location: `${place.name}, ${place.location.address1}, ${place.location.city}, ${place.location.zip_code}`,
      startDate: new Date(),
      endDate: new Date(),
    };

    const eventIdInCalendar = await Calendar.createEventAsync(
      "1",
      eventDetails
    );
    Calendar.openEventInCalendar(eventIdInCalendar);
  };

  const getMarkers = () => {
    let markerPoints = [];
    if (nearby.length > 0) {
      nearby.forEach((place) =>
        markerPoints.push({
          name: place.name,
          coords: {
            latitude: place.coordinates.latitude,
            longitude: place.coordinates.longitude,
          },
          address: `${place.location.address1}, ${place.location.city}, ${place.location.zip_code}`,
          rating: place.rating,
        })
      );
    }
    setMarkers(markerPoints);
    console.log(markers);
  };

  useEffect(() => {
    getNearby();
  }, [midpoint]);

  useEffect(() => {
    getMarkers();
  }, [nearby]);

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: markerIndex,
      });
    }, 1000);
  }, [markerIndex]);

  const renderNearby = (place) => {
    return (
      <View>
        <Card style={styles.card}>
          <Card.Content
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Title style={styles.cardText}>{place.item.name}</Title>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: -20,
                right: 0,
                // marginTop: 10,
              }}
            >
              <Button
                textColor="#FF62AD"
                onPress={() =>
                  navigation.navigate("Place", {
                    place: place.item,
                  })
                }
              >
                View
              </Button>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <StarRating
                rating={place.item.rating}
                disabled
                onChange={() => setRating(place.item.rating)}
                starSize={15}
                color="#FF62AD"
              />
            </View>
            <Paragraph style={styles.cardAddress}>
              {place.item.location.address1
                ? `${place.item.location.address1}, ${place.item.location.city}, ${place.item.location.zip_code}`
                : `${place.item.location.city}, ${place.item.location.zip_code}`}
            </Paragraph>
            <View style={styles.icons}>
              <TouchableOpacity>
                {place.item.favourite ? (
                  <Button textColor="#FF62AD">
                    <Ionicons
                      style={{ marginRight: 30 }}
                      name="heart"
                      size={22}
                      color="#FF62AD"
                    />
                  </Button>
                ) : (
                  <Button textColor="white">
                    <Ionicons
                      style={{ marginRight: 30 }}
                      name="heart-outline"
                      size={22}
                      color="#FF62AD"
                      onPress={() => {
                        addFavourite(place.item);
                        likePlace(place.item);
                      }}
                    />
                  </Button>
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Button
                  textColor="white"
                  onPress={() => sharePlace(place.item)}
                >
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="share-social-outline"
                    size={22}
                    color="#FF62AD"
                  />
                </Button>
              </TouchableOpacity>
              <TouchableOpacity>
                <Button
                  textColor="white"
                  onPress={() => addToCalendar(place.item)}
                >
                  <Ionicons name="calendar-outline" size={22} color="#FF62AD" />
                </Button>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.nearbyTitle}>Nearby Places</Text> */}

      {markers.length === 0 && (
        <ActivityIndicator
          style={styles.spinner}
          animating={true}
          color="#fff"
          size="large"
        />
      )}

      <View style={styles.container}>
        <FlatList
          ref={ref}
          data={nearby}
          renderItem={(item) => renderNearby(item)}
          horizontal={true}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>

      {nearby.length < 1 && <ActivityIndicator size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  nearbyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
    // paddingBottom: 10,
    textAlign: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 5,
    marginTop: 20,
    width: 350,
    height: 230,
    marginBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: "#fff",
  },
  cardAddress: {
    textAlign: "center",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    // marginTop: 20
  },
  spinner: {
    marginTop: 200,
    // justifyContent: 'center'
  },
});
export default NearbyList;
