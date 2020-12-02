import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import { Html5Entities } from 'html-entities';
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
  let [ romanValue, setRomanValue ] = useState("");
  let [ thousands, setThousands ] = useState([]);
  let [ hundreds, setHundreds ] = useState([]);
  let [ tens, setTens ] = useState([]);
  let [ ones, setOnes ] = useState([]);

  const arabicArray = [5000, 4000, 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romanArray = ['V\&#773;', 'MV\&#773', 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  const entities = new Html5Entities();

  useEffect(() => {
    console.log(wholeValue);
    // https://www.freecodecamp.org/news/roman-numeral-converter-interactive-roman-numerals-chart/
    let arabic = wholeValue;
    let roman = '';

    if(wholeValue == 0) {
      setRomanValue('Nulla');
    } else {
      for(let i=0;i<arabicArray.length;i++) {
        while(arabicArray[i] <= arabic) {
          roman += romanArray[i];
          arabic -= arabicArray[i];
        }
      }

      setRomanValue(roman);
    }
    console.log(romanValue);
  });

  if(fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.resultContainer}>
            {/* https://stackoverflow.com/questions/56558371/render-unicode-characters-in-react-native-using-variable/56560732 */}
            <Text style={styles.result}>{entities.decode(romanValue)}</Text>
          </View>
          <View style={styles.unitContainer}>
            <UnitHandler title="thousands" unit={thousands} setUnit={setThousands} wholeValue={wholeValue} setWholeValue={setWholeValue} colour="#DC1614"/>
            <UnitHandler title="hundreds" unit={hundreds} setUnit={setHundreds} wholeValue={wholeValue} setWholeValue={setWholeValue} colour="#0C8120" />
            <UnitHandler title="tens" unit={tens} setUnit={setTens} wholeValue={wholeValue} setWholeValue={setWholeValue} colour="#3C61ED" />
            <UnitHandler title="ones" unit={ones} setUnit={setOnes} wholeValue={wholeValue} setWholeValue={setWholeValue} colour="#FF6B00" />
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
    // letterSpacing: 30,
  },
  unitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%'
  },
});
