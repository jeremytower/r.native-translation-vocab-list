import { Text, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../assets/stylesheet";

const ListItem = (props) => {
  if (!props.item.editMode) {
    return (
      <TouchableOpacity onPress={() => props.tapListItem(props.item)}>
        <Text
          style={
            props.darkMode
              ? styles.darkModeTextColor
              : styles.lightModeTextcolor
          }
        >
          {(props.engMode ? props.item.eng : props.item.esp) +
            (props.showTrnsl
              ? " - " + (props.engMode ? props.item.esp : props.item.eng)
              : "")}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.itemEditMode}>
        <View style={styles.itemEditTextBoxes}>
          <View style={styles.itemEditTextBoxWrapper}>
            <TextInput
              style={styles.itemEditTextbox}
              defaultValue={
                props.engMode ? props.item.newEng : props.item.newEsp
              }
              onChangeText={(newText) =>
                props.engMode
                  ? (props.item.newEng = newText)
                  : (props.item.newEsp = newText)
              }
            />
          </View>
          <View style={styles.itemEditTextBoxWrapper}>
            <TextInput
              style={styles.itemEditTextbox}
              defaultValue={
                props.engMode ? props.item.newEsp : props.item.newEng
              }
              onChangeText={(newText) =>
                props.engMode
                  ? (props.item.newEsp = newText)
                  : (props.item.newEng = newText)
              }
            />
          </View>
        </View>
        <View style={styles.itemEditButtonBar}>
          <TouchableOpacity
            style={[styles.itemEditButton, styles.itemEditSaveButton]}
            onPress={() => props.saveListItem(props.item)}
          >
            <Icon name="save" size={props.editIconSize} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.itemEditButton, styles.itemEditDeleteButton]}
            onPress={() => props.deleteListItem(props.item)}
          >
            <Icon name="trash" size={props.editIconSize} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.itemEditButton, styles.itemEditCloseButton]}
            onPress={() => props.closeListItem(props.item)}
          >
            <Icon name="close" size={props.editIconSize} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default ListItem;
