import { Text, TextInput, View, Button } from "react-native";
import React from "react";
import { styles } from "../assets/stylesheet";

const ImportSection = (props) => {
  if (props.showImport) {
    return (
      <>
        <View style={styles.importTextboxWrapper}>
          <TextInput
            style={[styles.textBox, styles.importTextBox]}
            defaultValue={props.uploadString}
            onChangeText={(newText) => props.setUploadString(newText)}
            multiline={true}
            numberOfLines={10}
          />
        </View>
        <Text style={styles.importExampleText}>
          Format: Lang2Word1 - Lang1Word1, Lang2Word2 - Lang1Word2 etc...
        </Text>
        <View style={styles.importButtons}>
          <View style={styles.importButton}>
            <Button
              onPress={() => props.exportItems()}
              title="Generate string"
              color="#50A3DE"
            />
          </View>
          <View style={styles.importButton}>
            <Button
              onPress={() => props.importItems()}
              title="Import string"
              color="#50A3DE"
            />
          </View>
        </View>
      </>
    );
  } else {
    return <></>;
  }
};

export default ImportSection;
