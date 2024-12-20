import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext'; // Import the custom theme context

const New = ({ route }) => {
  // Get the post passed from the navigation
  const { post } = route.params;
  const { customTheme } = useTheme(); // Access the current theme

  return (
    <ScrollView style={[styles.container, { backgroundColor: customTheme.colors.background }]}>
      <Text style={[styles.title, { color: customTheme.colors.text }]}>{post.title}</Text>
      <Text style={[styles.body, { color: customTheme.colors.text }]}>{post.body}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default New;
