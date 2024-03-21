import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
     <View style={styles.details}>
    <View style={styles.picture}>
    <Image source={require("./me.png")}
      style={styles.profilePicture}/>
    </View>
      <Text>Student Details</Text>
      <Text>Student name: Jackson Tlali</Text>
      <Text>Student number: 901016472</Text>
      <Text>Current Semester of study: 2</Text>
      <Text>            </Text>
      <Text>SEMESTER GRADES</Text>
      <Text>CALCULUS: B</Text>
      <Text>Web-Design: A+</Text>
      <Text>Algebra: B+</Text>
     </View>
      <StatusBar style="auto" />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    paddingRight: 50,
    paddingTop:60,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'left',
   
  },
  picture: {
    alignItems: 'left', 
    padding: 5,
  },

  details: {
   
    padding: 20,
    borderRadius: 10,
    alignItems: 'left', 
  },
  profilePicture:{
    width: 130,
    height: 130,
    borderRadius: 60,
    marginRight: 10,
  }
});