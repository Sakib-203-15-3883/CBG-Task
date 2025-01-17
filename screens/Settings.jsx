import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const Settings = () => {
  const { customTheme, changeTheme, themeMode } = useTheme();
  const [focusedButton, setFocusedButton] = useState(null);

  const handlePress = (mode) => {
    setFocusedButton(mode);
    changeTheme(mode);
  };

  return (
    <View style={[styles.container, { backgroundColor: customTheme.colors.background }]}>
      <Text style={[styles.title, { color: customTheme.colors.text }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: customTheme.colors.text }]}>
        Current Theme Mode: <Text style={styles.boldText}>{themeMode}</Text>
      </Text>
      <View style={styles.buttonContainer}>
        {['device', 'dark', 'light'].map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => handlePress(mode)}
            style={[
              styles.button,
              {
                backgroundColor:
                  focusedButton === mode
                    ? customTheme.colors.buttonFocused
                    : customTheme.colors.card,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: customTheme.colors.text }]}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Theme
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Settings;
