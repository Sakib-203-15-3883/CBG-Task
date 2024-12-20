import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const HomeScreen = () => {
  const { customTheme, changeTheme, themeMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: customTheme.colors.background }]}>
      <Text style={[styles.text, { color: customTheme.colors.text }]}>
        Current Theme Mode: {themeMode}
      </Text>
      <TouchableOpacity
        onPress={() => changeTheme('device')}
        style={[styles.button, { backgroundColor: customTheme.colors.card }]}>
        <Text style={{ color: customTheme.colors.text }}>Device Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeTheme('dark')}
        style={[styles.button, { backgroundColor: customTheme.colors.card }]}>
        <Text style={{ color: customTheme.colors.text }}>Dark Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeTheme('light')}
        style={[styles.button, { backgroundColor: customTheme.colors.card }]}>
        <Text style={{ color: customTheme.colors.text }}>Light Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;
