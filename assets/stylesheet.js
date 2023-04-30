import { StyleSheet } from "react-native";

const editHeight = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  darkBackground: {
    backgroundColor: "#1f1f1f",
  },
  lightBackground: {
    backgroundColor: "#fff",
  },
  darkModeTextColor: {
    color: "white",
  },
  lightModeTextcolor: {
    color: "black",
  },
  buttonBarWrapper: {
    justifyContent: "flex-start",
    height: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
  },
  topButton: {
    width: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  filterBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: 30,
    marginBottom: 10,
  },
  filterBox: {
    borderColor: "gray",
    borderWidth: 0.4,
    borderRadius: 5,
    marginBottom: 10,
    flexGrow: 5,
    flexShrink: 5,
    color: "gray",
    paddingLeft: 5,
    backgroundColor: "white",
    marginRight: 15,
  },
  filterButtons: {
    flexDirection: "row",
    flexBasis: 70,
  },
  filterButton: {
    backgroundColor: "#D6D6D6",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    borderRadius: 4,
    marginRight: 10,
  },
  filterAdd: {},
  filterClear: {},
  listSection: {
    maxHeight: 670,
    width: "100%",
  },
  showAddButtonOpen: {
    backgroundColor: "#6E6E6E",
  },
  showAddButtonClosed: {
    backgroundColor: "#50A3DE",
  },
  showImportButtonOpen: {
    backgroundColor: "#6E6E6E",
  },
  showImportButtonClosed: {
    backgroundColor: "#50A3DE",
  },
  langButton: {
    backgroundColor: "#E37932",
  },
  killButton: {
    backgroundColor: "#4d4d4d",
  },
  darkModeButton: {
    backgroundColor: "#4d4d4d",
  },
  lightModeButton: {
    backgroundColor: "#D6D6D6",
  },
  showTrnslButton: {
    width: 80,
    marginRight: 10,
  },
  textBox: {
    borderColor: "gray",
    borderWidth: 1,
    height: 50,
    paddingLeft: 5,
    backgroundColor: "white",
    color: "black",
  },
  itemEditMode: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: editHeight,
    marginBottom: 5,
  },
  itemEditTextBoxes: {
    flexGrow: 3,
    flexShrink: 3,
    flexDirection: "row",
  },
  itemEditTextBoxWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "center",
  },

  itemEditTextbox: {
    height: editHeight,
    borderColor: "gray",
    color: "gray",
    backgroundColor: "white",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    textAlign: "center",
    marginRight: 10,
  },
  itemEditButtonBar: {
    flexDirection: "row",
    height: editHeight,
    flexBasis: 150,
  },
  itemEditButton: {
    alignItems: "center",
    justifyContent: "center",
    height: editHeight,
    flexBasis: editHeight,
    flexShrink: 1,
    borderRadius: 4,
    marginLeft: 10,
  },
  itemEditSaveButton: {
    backgroundColor: "#50A3DE",
  },
  itemEditCloseButton: {
    backgroundColor: "#D6D6D6",
  },
  itemEditDeleteButton: {
    backgroundColor: "#E34B4D",
  },
  debugText: {
    color: "green",
  },
  addButton: {
    width: "100%",
    marginBottom: 20,
  },
  margins: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    alignItems: "flex-start",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 20,
  },
  importTextBox: {
    width: "100%",
    height: 300,
    textAlignVertical: "top",
  },
  importTextboxWrapper: {
    width: "100%",
    marginBottom: 5,
  },
  importExampleText: {
    fontSize: 10,
    marginBottom: 5,
    color: "gray",
  },
  importButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
  importButton: { marginRight: 10 },
});
export { styles };
