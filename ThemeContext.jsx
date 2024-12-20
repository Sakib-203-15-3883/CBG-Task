import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
    card: '#f8f9fa',
    border: '#e0e0e0', // border color for bottom tabs
    primary: '#6200ee', // primary color (used in bottom tab)
    tabBackground: '#ffffff', // background for bottom tab
    tabIconDefault: '#888888', // default icon color
    tabIconSelected: '#6200ee', // selected icon color

    // New colors for cards
    cardBackground: '#f5f5f5', // light background for app cards

    // Colors for drawer
    drawerBackground: '#ffffff', // background color for the drawer
    drawerItemText: '#000000', // text color for drawer items
    drawerActiveItem: '#ACC8E5', // active drawer item background
    drawerInactiveItem: '#f0f0f0', // inactive drawer item background
    drawerActiveText: '#ffffff', // active drawer item text color
    drawerInactiveText: '#888888', // inactive drawer item text color

    // New button colors
    buttonFocused: '#d1e7ff', // Highlight color for focused button
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: '#FFFFFF',
    card: '#1f1f1f',
    border: '#333333', // border color for bottom tabs
    primary: '#bb86fc', // primary color (used in bottom tab)
    tabBackground: '#1f1f1f', // background for bottom tab
    tabIconDefault: '#888888', // default icon color
    tabIconSelected: '#bb86fc', // selected icon color

    // New colors for cards
    cardBackground: '#2c2c2c', // dark background for app cards

    // Colors for drawer
    drawerBackground: '#1f1f1f', // background color for the drawer
    drawerItemText: '#ffffff', // text color for drawer items
    drawerActiveItem: '#bb86fc', // active drawer item background
    drawerInactiveItem: '#333333', // inactive drawer item background
    drawerActiveText: '#121212', // active drawer item text color
    drawerInactiveText: '#aaaaaa', // inactive drawer item text color

    // New button colors
    buttonFocused: '#37474f', // Highlight color for focused button
  },
};

// Create Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme(); // Detect system theme
  const [themeMode, setThemeMode] = useState('device'); // 'device', 'dark', 'light'
  const [customTheme, setCustomTheme] = useState(
    systemTheme === 'dark' ? CustomDarkTheme : LightTheme
  );

  useEffect(() => {
    const loadStoredTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('themeMode');
      if (storedTheme) {
        setThemeMode(storedTheme);
        updateTheme(storedTheme, systemTheme);
      } else {
        setThemeMode('device');
        updateTheme('device', systemTheme);
      }
    };
    loadStoredTheme();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'device') {
        updateTheme('device', colorScheme);
      }
    });

    return () => listener.remove();
  }, [themeMode, systemTheme]);

  const updateTheme = (mode, systemTheme) => {
    if (mode === 'device') {
      setCustomTheme(systemTheme === 'dark' ? CustomDarkTheme : LightTheme);
    } else if (mode === 'dark') {
      setCustomTheme(CustomDarkTheme);
    } else {
      setCustomTheme(LightTheme);
    }
  };

  const changeTheme = async (mode) => {
    setThemeMode(mode);
    await AsyncStorage.setItem('themeMode', mode);
    updateTheme(mode, systemTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, customTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to use ThemeContext
export const useTheme = () => useContext(ThemeContext);
