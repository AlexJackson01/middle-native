import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from 'react-native-paper';

import SearchScreen from "./screens/SearchScreen";
import NearbyPlacesScreen from "./screens/NearbyPlacesScreen";


export default App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <PaperProvider>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Nearby" component={NearbyPlacesScreen} options={{ headerTitle: "Nearby Places", headerStyle: {backgroundColor: '#f28773'}, headerTintColor: '#fff', headerBackVisible: false, headerTitleAlign: 'center'}} />
      </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
