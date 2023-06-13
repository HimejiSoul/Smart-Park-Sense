import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';
import { ref, onValue } from 'firebase/database';
import database from "../../firebase-config";

const HomeScreen = () => {
  const [IR1Filled, setIR1Filled] = useState();
  const [IR2Filled, setIR2Filled] = useState();
  const [IR3Filled, setIR3Filled] = useState();

  useEffect(() => {
    const slotpPakirRef = ref(database, 'slot-parkir/');
    onValue(slotpPakirRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setIR1Filled(data.ir1);
      setIR2Filled(data.ir2);
      setIR3Filled(data.ir3);
    });
  }, []);

  const getIRColor = (filled) => {
    return filled === 'kosong' ? '#038634' : '#4F1717';
  };

  return (
    <>
      <StatusBar backgroundColor={'#5F84A1'} barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={[styles.subtitle, { marginTop: 16 }]}>
            Tampilan Realtime Slot Parkir
          </Text>
          <View style={styles.rowContainer2}>
            <View
              style={[
                styles.rectangleIR,
                { backgroundColor: getIRColor(IR1Filled) },
              ]}
            >
              <Text style={styles.irText}>IR1</Text>
            </View>
            <View
              style={[
                styles.rectangleIR,
                { backgroundColor: getIRColor(IR2Filled) },
              ]}
            >
              <Text style={styles.irText}>IR2</Text>
            </View>
          </View>
          <View
            style={[
              styles.rectangleIR,
              { backgroundColor: getIRColor(IR3Filled) },
              { marginTop: 48 },
            ]}
          >
            <Text style={styles.irText}>IR3</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../images/home.png');
          } else if (route.name === 'History') {
            iconSource = require('../images/history.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../images/profile.png');
          }

          return (
            <Image
              source={iconSource}
              style={[styles.icon, { tintColor: color }]}
            />
          );
        },
        activeTintColor: '#22313F',
        inactiveTintColor: '#FFFFFF',
        activeBackgroundColor: '#22313F',
        inactiveBackgroundColor: '#22313F',
        style: {
          backgroundColor: '#22313F',
        },
        tabStyle: {
          backgroundColor: '#5F84A1',
          height: 65,
          alignSelf: 'flex-end',
        },
        labelStyle: {
          bottom: '10%',
          fontFamily: 'Poppins-Medium',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#22313F',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 10,
    top: 10,
  },
  rectangleIR: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F1717',
    borderRadius: 24,
    marginLeft: 20,
    marginRight: 20,
  },
  irText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 20,
  },
  rowContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default HomeTabNavigator;
