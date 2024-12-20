import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Home from './Home';
import Post from './Post';
import Form from './Form';
import { useTheme } from '../ThemeContext'; // Import the custom hook to access the theme

const Tab = createBottomTabNavigator();

// Get screen dimensions to dynamically adjust styles
const { width, height } = Dimensions.get('window');

const CBG = () => {
  const { customTheme } = useTheme(); // Get the current theme

  const isSmallScreen = width < 375; // For smaller devices 

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          
          borderTopWidth: 0,
          paddingBottom: 5,
          height: isSmallScreen ? 75 : 90, // Adjust height for small screens
        },
        tabBarActiveTintColor: customTheme.colors.tabIconSelected,
        tabBarInactiveTintColor: customTheme.colors.tabIconDefault,
        tabBarLabelStyle: {
          fontSize: isSmallScreen ? 10 : 12, // Adjust label font size for small screens
          fontWeight: 'bold',
          marginTop: isSmallScreen ? 5 : 7, // Adjust margin for smaller screens
        },
        tabBarIconStyle: {
          padding: isSmallScreen ? 2 : 5,// Adjust padding for small screens
          marginTop: isSmallScreen ? 15 : 17, 
        
        },
        tabBarIndicatorStyle: {
          backgroundColor: customTheme.colors.tabIconSelected,
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
              <Text style={[styles.iconText, { color: customTheme.colors.text }]}>🏠</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
              <Text style={[styles.iconText, { color: customTheme.colors.text }]}>✍️</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Form"
        component={Form}
        options={{
          tabBarLabel: 'Form',
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
              <Text style={[styles.iconText, { color: customTheme.colors.text }]}>📝</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CBG;

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7, // Optional: Adjust margin for aesthetics
  },
  iconText: {
    fontSize: 20, // Icon size
  },
});
