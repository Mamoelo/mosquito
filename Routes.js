import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ExploreScreen from './screens/ExploreScreen';
import TrafficAlertsScreen from './alerts/TrafficAlertScreen';
import CrimeAlertScreen from './alerts/CrimeAlertScreen';
import FoodAlertScreen from './alerts/FoodAlertScreen';
import ClothesAlertScreen from './alerts/ClothesAlertScreen';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="TrafficAlertScreen" component={TrafficAlertsScreen} />
        <Stack.Screen name="CrimeAlertScreen" component={CrimeAlertScreen} />
        <Stack.Screen name="FoodAlertScreen" component={FoodAlertScreen} />
        <Stack.Screen name="ClothesAlertScreen" component={ClothesAlertScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
