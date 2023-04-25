import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import { YELP_API_KEY } from "@env";
import { useEffect, useState } from "react";
import axios from "axios";




        
const NearbyList = ({midpoint, category, radius}) => {

    const [nearby, setNearby] = useState([])

    const getNearby = () => {
 
        axios.get(`https://api.yelp.com/v3/businesses/search`, {
            headers: {
              Authorization: `Bearer ${YELP_API_KEY}`
          },
            params: {
            latitude: midpoint.latitude,
            longitude: midpoint.longitude
          }
          })
          .then((res) => {
            console.log(res)
            setNearby(res.data.businesses)
        //   console.log(res.data.businesses)
          })
          .catch((err) => {
          console.log ('error')
          })

        console.log(nearby)
    
        if (nearby.length === 0) {
          setResultsMessage('No results found. Please widen your search.')
        }
      }

      useEffect(() => {
        getNearby()
      }, [midpoint]);





    return (
        <View>
             <Text style={styles.nearbyTitle}>Nearby Places</Text>
             {/* <ActivityIndicator animating={true} color="#fff" /> */}
             <Text>{radius}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    nearbyTitle: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 20
    }
})
export default NearbyList;