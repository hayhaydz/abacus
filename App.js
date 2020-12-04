import React, { useState, useEffect } from 'react';
import { 
StyleSheet, 
Text, 
View, 
SafeAreaView, 
ScrollView, 
Modal, 
TouchableOpacity,
Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import { Html5Entities } from 'html-entities';
import { Icon } from "react-native-elements";
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  Roboto_700Bold_Italic,
} from '@expo-google-fonts/roboto';

import UnitHandler from './components/UnitHandler/UnitHandler.js';
import Logo from './assets/logo.png';

const App = () => {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Roboto_700Bold_Italic,
  });

  const [ wholeValue, setWholeValue ] = useState(0);
  const [ romanValue, setRomanValue ] = useState("");
  const [ thousands, setThousands ] = useState([]);
  const [ hundreds, setHundreds ] = useState([]);
  const [ tens, setTens ] = useState([]);
  const [ ones, setOnes ] = useState([]);

  const [ modalVisible, setModalVisible ] = useState(false);

  const arabicArray = [5000, 4000, 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romanArray = ['V\&#773;', 'MV\&#773;', 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  const entities = new Html5Entities();

  useEffect(() => {
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
  });

  if(fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Modal
            animationType="fade"
            visible={modalVisible}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <Image source={Logo} style={styles.modalLogo} />
              <Text style={styles.modalHeading}>How to use the abacus</Text>
              <Text style={styles.modalText}>Using the plus (+) and minus (-) buttons underneath the  respected unit value will result in that value changing by one. This is visually demonstrated by a bead being added to it’s pole.</Text>
              <Text style={[styles.modalText, {marginBottom: 50}]}>Once a bead is added it’s roman numeral conversion will be displayed above. Add multiple beads to multiple units to see the roman numeral number increase.</Text>
              <Text style={styles.modalHeading}>Additional Information</Text>
              <Text style={[styles.modalText, {fontFamily: 'PlayfairDisplay_700Bold', marginBottom: 5}]}>Created By</Text>
              <Text style={styles.modalText}>Haydon Curteis-Lateo</Text>
              <Text style={[styles.modalText, {fontFamily: 'PlayfairDisplay_700Bold', marginBottom: 5}]}>Contact Information</Text>
              <Text style={styles.modalText}>haydon.curteis-lateo18@bathspa.ac.uk</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.modalClose}
              >
                <Icon name="cancel" type="material" size={32}></Icon>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.resultContainer}>
            {/* https://stackoverflow.com/questions/56558371/render-unicode-characters-in-react-native-using-variable/56560732 */}
            <Text style={styles.result}>{entities.decode(romanValue)}</Text>
          </View>
          <View style={styles.unitContainer}>
            <UnitHandler title="thousands" unit={thousands} setUnit={setThousands} wholeValue={wholeValue} setWholeValue={setWholeValue} colour="#DC1614"/>
            <UnitHandler title="hundreds" unit={hundreds} setUnit={setHundreds} wholeValue={wholeValue} setWholeValue={setWholeValue} colour="#0C8120" />
            <UnitHandler title="tens" unit={tens} setUnit={setTens} wholeValue={wholeValue} setWholeValue={setWholeValue} colour="#3C61ED" />
            <UnitHandler title="ones" unit={ones} setUnit={setOnes} wholeValue={wholeValue} setWholeValue={setWholeValue} colour="#FF6B00" />
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{padding: 15}}
            >
              <Icon name="info-circle" type="font-awesome-5" size={32} ></Icon>
            </TouchableOpacity>
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
    marginBottom: 25,
    paddingRight: 25,
  },
  result: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
  },
  unitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '90%',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.98)',
  },
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 1,
    padding: 15
  },
  modalLogo: {
    marginBottom: 50,
  },
  modalHeading: {
    fontFamily: 'Roboto_700Bold_Italic',
    fontSize: 32,
    maxWidth: '75%',
    marginBottom: 25,
    color: '#1C1C1C',
  },
  modalText: {
    fontFamily: 'PlayfairDisplay_400Regular',
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 15,
    color: '#252525',
  },
});
