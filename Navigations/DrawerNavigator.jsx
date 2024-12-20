import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../ThemeContext';

import CBG from '../screens/CBG';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { customTheme } = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[styles.drawerContent, { backgroundColor: customTheme.colors.drawerBackground }]}
    >
     

      {/* Drawer Items */}
      <View style={styles.drawerItemContainer}>
        <DrawerItem
          label="CBG"
          icon={({ color, size }) => <Icon name="home" color={color} size={size} />}
          onPress={() => props.navigation.navigate('CBG')}
          labelStyle={{ color: customTheme.colors.drawerItemText }}
          style={[
            styles.drawerItem,
            props.state.index === 0 && { backgroundColor: customTheme.colors.drawerActiveItem },
          ]}
        />
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => <Icon name="cog" color={color} size={size} />}
          onPress={() => props.navigation.navigate('Settings')}
          labelStyle={{ color: customTheme.colors.drawerItemText }}
          style={[
            styles.drawerItem,
            props.state.index === 1 && { backgroundColor: customTheme.colors.drawerActiveItem },
          ]}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const { customTheme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: customTheme.colors.background,
        },
        headerTintColor: customTheme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: customTheme.colors.text,
        },
      }}
    >
      <Drawer.Screen
        name="CBG"
        component={CBG}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          title: 'CBG',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
          title: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  drawerContent: {
    flexGrow: 1,
  },
  drawerHeader: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItemContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  drawerItem: {
    marginBottom: 15, // Adds vertical spacing between items
    borderRadius: 8,
    overflow: 'hidden',
  },
});
