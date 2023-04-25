import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Title,
} from "react-native-paper";
import { YELP_API_KEY } from "@env";
import { useEffect, useState } from "react";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating-widget";

const NearbyList = ({ midpoint, category, radius }) => {
  const [nearby, setNearby] = useState([]);
  const [resultsMessage, setResultsMessage] = useState("");

  const getNearby = () => {
    axios
      .get(`https://api.yelp.com/v3/businesses/search`, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
        params: {
          latitude: midpoint.latitude,
          longitude: midpoint.longitude,
        },
      })
      .then((res) => {
        console.log(res);
        setNearby(res.data.businesses);
        //   console.log(res.data.businesses)
      })
      .catch((err) => {
        console.log("error");
      });

    console.log(nearby);

    if (nearby.length === 0) {
      setResultsMessage("No results found. Please widen your search.");
    }
  };

  const sharePlace = async place => {
    try {
      await Share.share({
        message: `Let's meet in the middle! What do you think of ${place.name}: ${place.url}`
      })
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getNearby();
  }, [midpoint]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.nearbyTitle}>Nearby Places</Text> */}

      <View style={styles.container}>
        <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
          {nearby.length > 1 ?
            (nearby.map((place, i) => (
              <View key={i}>
                <Card style={styles.card}>
                  <Card.Content
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Title style={styles.cardText}>{place.name}</Title>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: -20,
                        right: 0,
                        // marginTop: 10,
                      }}
                    >
                      <Button textColor="#FF62AD" onPress={() => viewMore(place)}>
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
                        rating={place.rating}
                        disabled
                        onChange={() => setRating(place.rating)}
                        starSize={15}
                        color="#FF62AD"
                      />
                    </View>
                    <Paragraph style={styles.cardAddress}>
                      {place.location.address1
                        ? `${place.location.address1}, ${place.location.city}, ${place.location.zip_code}`
                        : `${place.location.city}, ${place.location.zip_code}`}
                    </Paragraph>
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
                          <Button textColor="white">
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
                        <Button
                          textColor="white"
                          onPress={() => sharePlace(place)}
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
                        <Button textColor="white">
                          <Ionicons
                            name="calendar-outline"
                            size={22}
                            color="#FF62AD"
                          />
                        </Button>
                      </TouchableOpacity>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            ))) : (
                <>
                  <ActivityIndicator animating={true} color="#fff" />
                </>
            )}
        </ScrollView>
      </View>
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
    textAlign: 'center'
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
    // marginTop: 20
  }
});
export default NearbyList;
