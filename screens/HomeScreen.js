import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Background from './Background';
import ExploreScreen from './ExploreScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [require('./city_background.png'), require('./city_background2.png'), require('./city_background3.png')];
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, 
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, 
          useNativeDriver: true,
        }).start();
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handleExplorePress = () => {
    navigation.navigate('Explore'); 
  };

  return (
    <Background image={images[currentImageIndex]}>
      <Text style={styles.title}>Welcome to Notify Me</Text>
      <Text style={styles.subtitle}>Stay Updated with Real-Time Alerts</Text>
      <TouchableOpacity style={styles.exploreButton} onPress={handleExplorePress}>
        <Text style={styles.buttonText}>Explore Now</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#2E86DE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default HomeScreen;
