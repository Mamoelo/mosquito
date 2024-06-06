import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const Background = ({ image, children }) => {
  return (
    <ImageBackground source={image} style={styles.imageBackground} resizeMode="cover">
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

export default Background;
