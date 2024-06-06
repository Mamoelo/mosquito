import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; 

const TrafficAlertScreen = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const storedPosts = Platform.OS === 'web' ? localStorage.getItem('trafficPosts') : await AsyncStorage.getItem('trafficPosts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };
  

  const savePosts = async (updatedPosts) => {
    try {
      const postsString = JSON.stringify(updatedPosts);
      if (Platform.OS === 'web') {
        localStorage.setItem('trafficPosts', postsString);
      } else {
        await AsyncStorage.setItem('trafficPosts', postsString);
      }
    } catch (error) {
      console.error('Failed to save posts:', error);
    }
  };
  

  const handlePost = () => {
    if (newPostText.trim() !== '' || selectedMedia) {
      const newPost = { text: newPostText, media: selectedMedia, timestamp: new Date().toLocaleString() };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      setNewPostText('');
      setSelectedMedia(null);
    }
  };

  const handleDeletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      const uri = URL.createObjectURL(file);
      setSelectedMedia({ uri });
    }
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.cancelled) {
      const uri = Platform.OS === 'web' ? result.uri : result.uri;
      setSelectedMedia({ uri });
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a Traffic Alert</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your alert here..."
          value={newPostText}
          onChangeText={(text) => setNewPostText(text)}
          multiline
        />
        <View style={styles.attachButtons}>
          {Platform.OS === 'web' ? (
            <>
              <label htmlFor="file-input" style={styles.attachButton}>
                <Ionicons name="image-outline" size={24} color="white" />
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </>
          ) : (
            <TouchableOpacity style={styles.attachButton} onPress={handleImagePicker}>
              <Ionicons name="image-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {selectedMedia && <Image source={{ uri: selectedMedia.uri }} style={styles.selectedMedia} />}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
      <ScrollView style={styles.postsContainer}>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <Text style={styles.postText}>{post.text}</Text>
            {post.media && <Image source={{ uri: post.media.uri }} style={styles.postMedia} />}
            <Text style={styles.postTimestamp}>{post.timestamp}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePost(index)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0B1E3F', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ffffff', 
    fontSize: 16,
    color: '#333333',
  },
  attachButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  attachButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  postButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  postButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  postsContainer: {
    flex: 1,
  },
  post: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#ffffff', 
    marginBottom: 15,
    position: 'relative',
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  postMedia: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#999999',
  },
  selectedMedia: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },

  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  permissionText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TrafficAlertScreen;
