import { View, Text, StyleSheet } from "react-native";

        
const NearbyList = () => {
    return (
        <View>
             <Text style={styles.nearbyTitle}>Nearby Places</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    nearbyTitle: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    }
})
export default NearbyList;