import { Text, TextInput, View, Button } from "react-native";
import React from "react";
import { styles } from "../assets/stylesheet";

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
            English:
          </Text>
          <TextInput
            style={styles.textBox}
            onChangeText={(newText) => props.setEngText(newText)}
            value={props.engText}
          />
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
            Spanish:
          </Text>
          <TextInput
            style={styles.textBox}
            onChangeText={(newText) => props.setEspText(newText)}
            value={props.espText}
          />
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
