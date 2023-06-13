import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import database from "../../firebase-config"

const HistoryScreen = () => {

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const dbRef = ref(database, 'history');
      const unsubscribe = onValue(dbRef, (snapshot) => {
        const fetchedData = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          fetchedData.push(childData);
        });
  
        // Sort fetchedData by time of latest data
        fetchedData.sort((a, b) => b.timein - a.timein);
  
        setHistoryData(fetchedData);
        console.log(fetchedData);
      });
      return () => {
        unsubscribe();
      };
    };
  
    const unsubscribe = fetchData();
    return () => unsubscribe();
  }, []);
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {historyData.length > 0 ? (
        <View style={styles.table}>
          {/* Table header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>UID</Text>
            <Text style={styles.tableHeader}>IR</Text>
            <Text style={styles.tableHeader}>Time In</Text>
            <Text style={styles.tableHeader}>Time Out</Text>
          </View>

          {/* Table rows */}
          {historyData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.uid}</Text>
              <Text style={styles.tableCell}>{item.ir}</Text>
              <Text style={styles.tableCell}>{item.timein}</Text>
              <Text style={styles.tableCell}>{item.timeout}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    fontSize:12,
    fontFamily:'Poppins-Regular',
    borderColor: '#CCCCCC',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#5F84A1',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily:'Poppins-SemiBold'
  },
  table: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#DBECF4',
    marginBottom:20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#22313F',
  },
  tableHeader: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontFamily:'Poppins-SemiBold',
    textAlign: 'center',
    backgroundColor: '#22313F',
    color: '#FFFFFF',
  },
  tableCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },

});

export default HistoryScreen;
