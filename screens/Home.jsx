import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext'; // Adjust the path as needed

const TaskManagementScreen = () => {
  const { customTheme } = useTheme(); // Access the current theme
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Failed to save tasks', error);
    }
  };

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now().toString(),
        text: taskInput,
        completed: false,
        deleted: false,
      };
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, deleted: true } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const restoreTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, deleted: false } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const renderTask = ({ item }) => (
    <View
      style={[
        styles.taskContainer,
        { backgroundColor: customTheme.colors.cardBackground },
        item.deleted ,
      ]}
    >
      {!item.deleted && (
        <TouchableOpacity
          onPress={() => toggleTaskCompletion(item.id)}
          style={[
            styles.checkbox,
            item.completed && { backgroundColor: '#28a745' },
          ]}
        />
      )}
      <Text
        style={[
          styles.taskText,
          { color: customTheme.colors.text },
          item.completed && { textDecorationLine: 'line-through', color: '#6c757d' },
        ]}
      >
        {item.text}
      </Text>
      {!item.deleted ? (
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={[styles.actionText, { color: customTheme.colors.primary }]}>
            Delete
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => restoreTask(item.id)}>
          <Text style={[styles.actionText, { color: customTheme.colors.primary }]}>
            Restore
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: customTheme.colors.background }]}>
      <Text style={[styles.header, { color: customTheme.colors.text }]}>
        Task Management
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: customTheme.colors.cardBackground,
              color: customTheme.colors.text,
            },
          ]}
          placeholder="Enter a task"
          placeholderTextColor={customTheme.colors.text}
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: customTheme.colors.primary }]}
          onPress={addTask}
        >
          <Text style={[styles.addButtonText, { color: customTheme.colors.text }]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.taskSectionContainer}>
        <Text style={[styles.sectionHeader, { color: customTheme.colors.text }]}>
          Active Tasks
        </Text>
        <FlatList
          data={tasks.filter((task) => !task.deleted)}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.taskSectionContainer}>
        <Text style={[styles.sectionHeader, { color: customTheme.colors.text }]}>
          Deleted Tasks
        </Text>
        <FlatList
          data={tasks.filter((task) => task.deleted)}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  addButtonText: {
    fontSize: 16,
  },
  taskSectionContainer: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ced4da',
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  actionText: {
    fontSize: 16,
  },
  separator: {
    height: 20,
  },
});

export default TaskManagementScreen;
