import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase/Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message'; 
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false); 
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email.trim()) {
      showNotification('error', 'Error', 'Please enter a valid email address.');
      return;
    }
    if (!validateEmail(email)) {
      showNotification('error', 'Error', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      showNotification('error', 'Error', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addUserToFirestore(user.uid, { email: user.email }); 

      setSignUpSuccess(true); 
      showNotification('success', 'Success', 'You have successfully signed up!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showNotification('error', 'Error', 'Email address is already in use');
      } else {
        console.error('Sign Up Error:', error);
        showNotification('error', 'Error', error.message);
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const addUserToFirestore = async (userId, userData) => {
    try {
   
      const firestore = getFirestore();
      
      await setDoc(doc(firestore, 'users', userId), userData);
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
      throw error;
    }
  };
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showNotification = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: 'bottom', 
      visibilityTime: 3000, 
      autoHide: true 
    });
  };

  return (
    <ImageBackground source={require('./city_background2.png')} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.appTitle}>Notify Me</Text>
        {signUpSuccess ? (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Sign up successful!</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Login now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ffffff"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signUpText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    color: '#FFFFFF',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#2E86DE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signUpText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  successMessage: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  loginLink: {
    fontSize: 16,
    color: '#2E86DE',
  },
});

export default SignUpScreen;

