import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const UnitHandler = ({ title, unit, setUnit, wholeValue, setWholeValue, colour }) => {
  const plusValue = () => {
    if (unit.length < 9) {
      let unitC = unit;
      unitC.push(0);
      setUnit([...unitC]);

      switch (title) {
        case "thousands":
          setWholeValue(wholeValue + 1000);
          break;
        case "hundreds":
          setWholeValue(wholeValue + 100);
          break;
        case "tens":
          setWholeValue(wholeValue + 10);
          break;
        case "ones":
          setWholeValue(wholeValue + 1);
          break;
      }
    }
  };

  const minusValue = () => {
    if (unit.length > 0) {
      let unitC = unit;
      unitC.pop();
      setUnit([...unitC]);

      switch (title) {
        case "thousands":
          setWholeValue(wholeValue - 1000);
          break;
        case "hundreds":
          setWholeValue(wholeValue - 100);
          break;
        case "tens":
          setWholeValue(wholeValue - 10);
          break;
        case "ones":
          setWholeValue(wholeValue - 1);
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.beadsContainer}>
        <View style={styles.beads}>
          {unit.map((value, index) => {
            return <View style={[styles.bead, {backgroundColor: colour}]} key={index}></View>;
          })}
        </View>
        <View style={styles.beadsPole}>
          <Text style={styles.fillerText}>Filler text</Text>
        </View>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.control} onPress={minusValue}>
          <Icon name="remove" type="material" color="#515151" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.control, styles.controlAdd]}
          onPress={plusValue}
        >
          <Icon name="add" type="material" color="#515151" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UnitHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minWidth: "100%",
    maxHeight: 125,
    marginBottom: 50,
  },
  text: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 16,
  },
  beadsContainer: {
    marginTop: 5,
    marginBottom: 50
  },
  beads: {
    position: "absolute",
    top: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
  },
  bead: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#1E1E1E",
  },
  beadsPole: {
    position: "absolute",
    top: 15,
    zIndex: -1,
    minWidth: "100%",
    maxHeight: 7,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
  },
  fillerText: {
    opacity: 0,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100%",
  },
  control: {
    minWidth: "48%",
    backgroundColor: "#FBFBFB",
    paddingTop: 10,
    paddingBottom: 10,
  },
  controlAdd: {
    marginRight: 10,
  },
});
