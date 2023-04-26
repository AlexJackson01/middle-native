import { YELP_API_KEY } from "@env";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Divider } from "react-native-paper";
import * as Calendar from "expo-calendar";

const PlaceCard = ({ place }) => {
  const [reviews, setReviews] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [eventTitle, setEventTitle] = useState("");

  const getPhotos = async () => {
    const res = await axios
      .get(`https://api.yelp.com/v3/businesses/${place.id}`, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
    console.log(res.data.photos);
    setPhotos(res.data.photos);
  };

  const getReviews = async () => {
    const res = await axios
      .get(`https://api.yelp.com/v3/businesses/${place.id}/reviews`, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        // ADD THIS THROW error
        throw error;
      });
    console.log(res.data.reviews);
    setReviews(res.data.reviews);
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

  useEffect(() => {
    getPhotos();
    getReviews();
  }, [place]);

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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.heading}>{place.name}</Text>

          <Text style={styles.cardAddress}>
            {place.location.address1
              ? `${place.location.address1}, ${place.location.city}, ${place.location.zip_code}`
              : `${place.location.city}, ${place.location.zip_code}`}
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <StarRating
              rating={place.rating}
              disabled
              onChange={() => setRating(place.rating)}
              starSize={15}
              color="#FF62AD"
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontStyle: "italic",
              marginBottom: 10,
              marginTop: -5,
            }}
          >
            from {place.review_count} users
          </Text>
          <ScrollView
            horizontal={true}
            persistentScrollbar={true}
            showsHorizontalScrollIndicator={true}
          >
            {photos.map((photo, index) => (
              <View
                key={index}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Image
                  style={{ height: 250, width: 250, marginRight: 20 }}
                  source={{ uri: photo }}
                />
              </View>
            ))}
          </ScrollView>
          <Text style={styles.link} onPress={() => Linking.openURL(place.url)}>
            View on Yelp
          </Text>
          <View style={styles.icons}>
            <TouchableOpacity>
              {place.favourite ? (
                <Button textColor="#FF62AD">
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="heart"
                    size={22}
                    color="#FF62AD"
                  />
                </Button>
              ) : (
                <Button textColor="#FF62AD">
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="heart-outline"
                    size={22}
                    color="#FF62AD"
                    onPress={() => {
                      addFavourite(place);
                      likePlace(place);
                    }}
                  />
                </Button>
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Button textColor="#FF62AD" onPress={() => sharePlace(place)}>
                <Ionicons
                  style={{ marginRight: 30 }}
                  name="share-social-outline"
                  size={22}
                  color="#FF62AD"
                />
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button textColor="#FF62AD" onPress={() => addToCalendar(place)}>
                <Ionicons name="calendar-outline" size={22} color="#FF62AD" />
              </Button>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.heading}>Reviews</Text>
          {reviews.map((review, index) => (
            <View
              key={index}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <Text style={{ textAlign: "center" }}>{review.user.name}</Text>
              <Text style={{ textAlign: "center" }}>{review.time_created}</Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <StarRating
                  rating={review.rating}
                  disabled
                  onChange={() => setRating(place.rating)}
                  starSize={10}
                  color="#FF62AD"
                />
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Divider />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FF62AD",
  },
  container: {
    marginBottom: 50,
    padding: 20,
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
  stars: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardAddress: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
  },
  link: {
    marginTop: 20,
    color: "#FF62AD",
    textDecorationLine: "underline",
  },
  reviewText: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    textAlign: "center",
  },
  icons: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  searchInput: {
    margin: 20,
    paddingLeft: 10,
    borderColor: "#FF62AD",
    borderWidth: 1,
    height: 40,
    fontSize: 15,
    borderRadius: 20,
  },
  dropdown: {
    margin: 20,
    height: 50,
    borderColor: "#FF62AD",
    backgroundColor: "#FFEEF6",
    borderWidth: 0.5,
    // borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "relative",
    backgroundColor: "#FFFCEF",
    width: "35%",
    left: 30,
    top: 28,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
export default PlaceCard;
