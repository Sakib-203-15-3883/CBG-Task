import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView, // Import ScrollView
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../ThemeContext'; // Import the custom theme hook

const FormScreen = ({ navigation }) => {
  const { customTheme } = useTheme(); // Get the custom theme from the context

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Cleanup form state when component unmounts
    return () => {
      setImage(null);
      setName('');
      setEmail('');
      setNameError('');
      setEmailError('');
      setModalVisible(false);
    };
  }, []);

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const validateForm = () => {
    let isValid = true;
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm() || !image) {
      Alert.alert('Error', 'Please fill in all fields correctly');
      return;
    }

    // Show success message
    Alert.alert(
      'Success',
      'Form submitted successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            // Set modal visibility to true after the success message is dismissed
            setModalVisible(true);
          },
        },
      ],
      { cancelable: false }
    );

    // Redirect to home screen (if needed)
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: customTheme.colors.text }]}>Form</Text>

      {/* Image Picker */}
      <TouchableOpacity
        style={[styles.imagePicker, { backgroundColor: customTheme.colors.cardBackground }]}
        onPress={handleChooseImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={[styles.buttonText, { color: customTheme.colors.primary }]}>
            Choose Image
          </Text>
        )}
      </TouchableOpacity>

      {/* Name Input */}
      <View style={[styles.inputGroup, styles.marginVertical]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: customTheme.colors.cardBackground,
              color: customTheme.colors.text,
            },
          ]}
          placeholder="Enter your name"
          placeholderTextColor={customTheme.colors.text}
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      </View>

      {/* Email Input */}
      <View style={[styles.inputGroup, styles.marginVertical]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: customTheme.colors.cardBackground,
              color: customTheme.colors.text,
            },
          ]}
          placeholder="Enter your email"
          placeholderTextColor={customTheme.colors.text}
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: customTheme.colors.primary }]}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Modal to display submitted information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: customTheme.colors.cardBackground },
            ]}>
            <Text style={[styles.modalTitle, { color: customTheme.colors.text }]}>
              Submitted Information
            </Text>
            <Text style={{ color: customTheme.colors.text }}>Name: {name}</Text>
            <Text style={{ color: customTheme.colors.text }}>Email: {email}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false); // Close the modal
                navigation.navigate('Home'); // Navigate to the Home screen
              }}
              style={[styles.closeButton, { backgroundColor: customTheme.colors.primary }]}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  marginVertical: {
    marginVertical: 10, // Add vertical margin for spacing
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  imagePicker: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FormScreen;
