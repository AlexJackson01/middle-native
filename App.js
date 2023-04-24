import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from 'react-native-paper';

import SearchScreen from "./screens/SearchScreen";


export default App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <PaperProvider>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
