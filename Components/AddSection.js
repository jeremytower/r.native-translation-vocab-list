import { Text, TextInput, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../assets/stylesheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

const AddSection = (props) => {
  if (props.showAdd) {
    return (
      <>
        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.headerText,
              props.darkMode
                ? styles.darkModeTextColor
                : styles.lightModeTextcolor,
            ]}
          >
            Spanish:
          </Text>
          <View style={[styles.flexParent, styles.addSectionTextSearchGroup]}>
            <TextInput
              style={[styles.textBox, styles.addSectionTextBox]}
              onChangeText={(newText) => props.setEspText(newText)}
              value={props.espText}
            />
            <TouchableOpacity
              style={[
                styles.addSectionTranslateButton,
                props.darkMode ? styles.lightModeButton : styles.darkModeButton,
              ]}
              onPress={() => props.translateEspText()}
            >
              <MaterialCommunityIcons
                name={"google-translate"}
                size={20}
                color={props.darkMode ? "#1f1f1f" : "#fff"}
              />
              <IonIcon
                name={"arrow-down"}
                size={20}
                color={props.darkMode ? "#1f1f1f" : "#fff"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.headerText,
              props.darkMode
                ? styles.darkModeTextColor
                : styles.lightModeTextcolor,
            ]}
          >
            English:
          </Text>
          <View style={[styles.flexParent, styles.addSectionTextSearchGroup]}>
            <TextInput
              style={[styles.textBox, styles.addSectionTextBox]}
              onChangeText={(newText) => props.setEngText(newText)}
              value={props.engText}
            />
            <TouchableOpacity
              style={[
                styles.addSectionTranslateButton,
                props.darkMode ? styles.lightModeButton : styles.darkModeButton,
              ]}
              onPress={() => props.translateEngText()}
            >
              <MaterialCommunityIcons
                name={"google-translate"}
                size={20}
                color={props.darkMode ? "#1f1f1f" : "#fff"}
              />
              <IonIcon
                name={"arrow-up"}
                size={20}
                color={props.darkMode ? "#1f1f1f" : "#fff"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.addButton}>
          <Button
            onPress={() => props.onAddWordClick()}
            title="Add Word"
            color="#50A3DE"
          />
        </View>
      </>
    );
  } else {
    return <></>;
  }
};

export default AddSection;
