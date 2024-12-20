import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../ThemeContext'; // Adjust path as necessary

const fetchPosts = async (page, limit) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  return response.json();
};

const PostList = ({ navigation }) => { // Add navigation prop
  const { customTheme } = useTheme(); // Access the current theme
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadPosts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const newPosts = await fetchPosts(page, 10);
    setPosts((prev) => [...prev, ...newPosts]);
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const renderPost = ({ item }) => (
    <TouchableOpacity
      style={[styles.postItem, { backgroundColor: customTheme.colors.cardBackground }]} 
      onPress={() => navigation.navigate('PostDetails', { post: item })} // Navigate to "New" screen and pass the post
    >
      <Text style={[styles.postTitle, { color: customTheme.colors.text }]}>{item.title}</Text>
      <Text
        numberOfLines={2}
        style={[styles.postBody, { color: customTheme.colors.text }]}
      >
        {item.body}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: customTheme.colors.background }]}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color={customTheme.colors.primary} /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postItem: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
  },
});

export default PostList;
