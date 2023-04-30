import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../assets/stylesheet";

const ButtonBar = (props) => {
  return (
    <View style={styles.buttonBarWrapper}>
      <TouchableOpacity
        style={[
          styles.topButton,
          props.showAdd ? styles.showAddButtonOpen : styles.showAddButtonClosed,
        ]}
        onPress={() => props.addButtonClick()}
      >
        <Icon
          name={props.showAdd ? "close" : "plus"}
          size={15}
          color={"white"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.topButton, styles.langButton]}
        onPress={() => props.langButtonClick()}
      >
        <AntDesign
          name={props.engMode ? "shrink" : "arrowsalt"}
          size={15}
          color={"white"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.topButton,
          backgroundColor: props.showTrnsl ? "#E34B4D" : "#32BF80",
        }}
        onPress={() => props.setShowTrnsl(!props.showTrnsl)}
      >
        <IonIcon
          name={props.showTrnsl ? "eye-off" : "eye"}
          size={15}
          color={"white"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.topButton,
          props.showImport
            ? styles.showImportButtonOpen
            : styles.showImportButtonClosed,
        ]}
        onPress={() => props.importButtonClick()}
      >
        <Icon
          name={props.showImport ? "close" : "file-text"}
          size={15}
          color={"white"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.topButton, styles.killButton]}
        onPress={() => props.deleteAll()}
      >
        <MaterialIcons
          name={"local-fire-department"}
          size={20}
          color={"#D42222"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.topButton,
          props.darkMode ? styles.lightModeButton : styles.darkModeButton,
        ]}
        onPress={() => props.darkModeButtonClick()}
      >
        <MaterialCommunityIcons
          name={"theme-light-dark"}
          size={20}
          color={props.darkMode ? "#1f1f1f" : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonBar;
