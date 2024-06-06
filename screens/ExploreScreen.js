import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const images = {
  traffic: [
    require('../assets/images/traffic1.png'),
    require('../assets/images/traffic2.png'),
    require('../assets/images/traffic3.png'),
    require('../assets/images/traffic4.png'),
    require('../assets/images/traffic5.png'),
  ],
  crime: [
    require('../assets/images/crime1.png'),
    require('../assets/images/crime2.png'),
    require('../assets/images/crime3.png'),
    require('../assets/images/crime4.png'),
    require('../assets/images/crime5.png'),
  ],
  food: [
    require('../assets/images/food1.png'),
    require('../assets/images/food2.png'),
    require('../assets/images/food3.png'),
    require('../assets/images/food4.png'),
    require('../assets/images/food5.png'),
  ],
  clothes: [
    require('../assets/images/clothes1.png'),
    require('../assets/images/clothes2.png'),
    require('../assets/images/clothes3.png'),
    require('../assets/images/clothes4.png'),
    require('../assets/images/clothes5.png'),
  ],
};

const ExploreScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const renderImage = (category) => {
    switch (category) {
      case 'traffic':
        return (
          <TouchableOpacity onPress={() => handleImagePress(category)}>
            <View style={styles.imageContainer}>
              <ImageBackground source={images[category][currentImageIndex]} style={styles.image}>
                <View style={styles.blurOverlay} />
                <Text style={styles.categoryText}>{category}</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        );
      case 'crime':
        return (
          <TouchableOpacity onPress={() => handleImagePress(category)}>
            <View style={styles.imageContainer}>
              <ImageBackground source={images[category][currentImageIndex]} style={styles.image}>
                <View style={styles.blurOverlay} />
                <Text style={styles.categoryText}>{category}</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        );
      case 'food':
        return (
          <TouchableOpacity onPress={() => handleImagePress(category)}>
            <View style={styles.imageContainer}>
              <ImageBackground source={images[category][currentImageIndex]} style={styles.image}>
                <View style={styles.blurOverlay} />
                <Text style={styles.categoryText}>{category}</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        );
      case 'clothes':
        return (
          <TouchableOpacity onPress={() => handleImagePress(category)}>
            <View style={styles.imageContainer}>
              <ImageBackground source={images[category][currentImageIndex]} style={styles.image}>
                <View style={styles.blurOverlay} />
                <Text style={styles.categoryText}>{category}</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };
  
  const handleImagePress = (category) => {
    switch (category) {
      case 'traffic':
        navigation.navigate('TrafficAlertScreen');
        break;
      case 'crime':
        navigation.navigate('CrimeAlertScreen');
        break;
      case 'food':
        navigation.navigate('FoodAlertScreen');
        break;
      case 'clothes':
        navigation.navigate('ClothesAlertScreen');
        break;
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: '#FFFFFF' }]}>Maseru City Alerts</Text>

      <ScrollView style={styles.dialogContainer}>
        <View style={styles.dialogBox}>
          {renderImage('traffic')}
        </View>
        <View style={styles.dialogBox}>
          {renderImage('crime')}
        </View>
        <View style={styles.dialogBox}>
          {renderImage('food')}
        </View>
        <View style={styles.dialogBox}>
          {renderImage('clothes')}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dialogContainer: {
    marginBottom: 20,
  },
  dialogBox: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    position: 'absolute',
    textAlign: 'center',
    bottom: 10,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default ExploreScreen;

