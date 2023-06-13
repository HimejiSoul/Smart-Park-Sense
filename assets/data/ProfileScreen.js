import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#5F84A1'} barStyle={'dark-content'} />      
      <Text style={styles.text1}>Akun</Text>
      
      <View style={[styles.row, { marginTop: 0 }]}>
        <Text style={styles.columnLabel}>ID</Text>
        <Text style={styles.columnData}>1103204085</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.row}>
        <Text style={styles.columnLabel}>Email</Text>
        <Text style={styles.columnData}>fauzan122@gmail.com</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.row}>
        <Text style={styles.columnLabel}>Password</Text>
        <Text style={styles.columnData}>************</Text>
      </View>
      <View style={styles.line}></View>

      <View style={styles.row}>
        <Text style={styles.logout} onPress={handleLogout}>Keluar Akun</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  rectangle: {
    width: '100%',
    alignSelf: 'stretch',
    height: 120,
    backgroundColor: '#5F84A1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    borderBottomEndRadius:32,
    borderBottomStartRadius:32,
  },
  logoutButton: {
    backgroundColor: '#5F84A1',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  boldText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color:'#FFFFFF'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  text1: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#22313F',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  columnLabel: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color:'#000000'
  },
  line: {
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
    width: '90%',
  },
  columnData: {
    flex: 1.5,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#22313F',
    marginRight:48,
  },
  logout:{
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color:'#8C0000',
  },
});

export default ProfileScreen;
