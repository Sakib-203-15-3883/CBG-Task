import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './ThemeContext';
import HomeScreen from './HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './Navigations/MainNavigator';
const Stack = createNativeStackNavigator();

const App = () => {
  const { customTheme } = useTheme();

  return <MainNavigator />;
};

export default () => (
  <GestureHandlerRootView>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </GestureHandlerRootView>

);
