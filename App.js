import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';

import UnitHandler from './components/UnitHandler/UnitHandler.js';

const App = () => {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });

  let [ wholeValue, setWholeValue ] = useState(0);
  let [ thousands, setThousands ] = useState([]);
  let [ hundreds, setHundreds ] = useState([]);
  let [ tens, setTens ] = useState([]);
  let [ ones, setOnes ] = useState([]);

  if(fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.resultContainer}>
            <Text style={styles.result}>{wholeValue}</Text>
          </View>
          <View style={styles.unitContainer}>
            <UnitHandler title="thousands" unit={thousands} setUnit={setThousands} wholeValue={wholeValue} setWholeValue={setWholeValue}/>
            <UnitHandler title="hundreds" unit={hundreds} setUnit={setHundreds} wholeValue={wholeValue} setWholeValue={setWholeValue}/>
            <UnitHandler title="tens" unit={tens} setUnit={setTens} wholeValue={wholeValue} setWholeValue={setWholeValue}/>
            <UnitHandler title="ones" unit={ones} setUnit={setOnes} wholeValue={wholeValue} setWholeValue={setWholeValue}/>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
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
    minHeight: 73,
    minWidth: '100%',
    borderColor: '#F4F4F4',
    borderWidth: 3,
    marginBottom: 25
  },
  result: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    letterSpacing: 30,
  },
  unitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%'
  },
});
