import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import New from '../screens/New';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider, useTheme} from '../ThemeContext';
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const {customTheme} = useTheme();
  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen name="PostDetails" component={New} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
