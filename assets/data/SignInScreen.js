import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Perform login action
    // ...
  
    // Delay clearing input fields by 1 second
    setTimeout(() => {
      setUsername('');
      setPassword('');
    }, 1000);
  
    // Navigate to HomeScreen
    navigation.navigate('HomeScreen');
  };
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#97BAE0" barStyle="dark-content" />
      <Image source={require('../images/logo.png')} style={styles.logo}/>
      <View style={[styles.rectangle, { marginTop: 175 }]}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={[styles.buttonContainer, { alignSelf: 'center' }]} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.title1}>Versi 1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#97BAE0',
  },
  logo:{
    width:150,
    height:150,
  },
  rectangle: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'stretch',
    height: '100%',
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#000000',
    fontSize: 26,
    fontFamily: 'Poppins-Medium',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  title1: {
    color: '#CCCCCC',
    fontSize: 9,
    fontFamily: 'Poppins-Medium',
    marginBottom: 20,
    marginTop: 160,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 40,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  textLink: {
    marginTop: 0,
    color: '#787878',
    fontFamily: 'Poppins-Regular',
  },
  daftarText: {
    color: '#000000',
    fontFamily: 'Poppins-Medium',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 48,
    borderRadius: 12,
    backgroundColor: '#22313F',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
});

export default SignInScreen;
