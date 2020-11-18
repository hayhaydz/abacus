import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';

const App = () => {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });

  if(fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>9234</Text>
        </View>
        <View style={styles.unitContainer}>
          
        </View>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return <AppLoading />;
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    margin: 16,
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FBFBFB',
    maxHeight: 73,
    minWidth: '100%',
    borderColor: '#F4F4F4',
    borderWidth: 3
  },
  result: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    letterSpacing: 30
  },
  unitContainer: {

  },
});
