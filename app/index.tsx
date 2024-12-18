import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './(screens)/DetailScreen';
import HomeScreen from './(screens)/HomeScreen';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
