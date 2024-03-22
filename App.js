import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import Course from './course';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Limkokwing University Prospectus</Text>
      </View>

      <ScrollView >
      <View style={styles.courseContainer}>
        <Image source={require("./architecture.png")} style={styles.profilePicture} />
        <Course title="ARCHITECTURE" description="Learn about building design and construction." />
      </View>

      <View style={styles.courseContainer}>
      <Image source={require("./IT.png")} style={styles.profilePicture} />
      <Course title="INFOMATION TECHNOLOGY" description=" Using computers and digital technologies to manage and process data efficiently." />
      </View>

      <View style={styles.courseContainer}>
      <Image source={require("./Jornalisim.png")} style={styles.profilePicture} />
      <Course title="Journalism" description="Gathering, reporting, and presenting news and information through various media channels." />
      </View>
      
      <View style={styles.courseContainer}>
      <Image source={require("./BM.png")} style={styles.profilePicture} />
      <Course title="BUSINESS MANAGEMENT" description=" Planning, organizing, and leading business activities to achieve goals effectively." />
      </View>

       <View style={styles.courseContainer}>
      <Image source={require("./film.png")} style={styles.profilePicture} />
      <Course title="FILM" description="Creating motion pictures for entertainment, education, and cultural expression." />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    backgroundColor: 'black', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight:50,
    paddingLeft:50,
    marginBottom: 40,
    marginTop: 20,
  
    borderRadius: 5,
    borderWidth: 1,
  },
  headerText: {
    color: 'white', 
    fontSize: 20,
    fontWeight: 'bold',
  },
  courseContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 16,
    flexDirection: 'row',
    padding: 15,
  },
  profilePicture: {
    width: 110,
    height: 110,
    borderRadius: 700,
    marginRight: 10,
  },
});
