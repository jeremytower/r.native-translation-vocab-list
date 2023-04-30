import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EntypoIcon from "react-native-vector-icons/Entypo";
import ButtonBar from "./Components/ButtonBar";
import AddSection from "./Components/AddSection";
import ImportSection from "./Components/ImportSection";
import ListItem from "./Components/ListItem";
import { styles } from "./assets/stylesheet";

export default function App() {
  const [wordList, setWordList] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [engText, setEngText] = useState("");
  const [espText, setEspText] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [engMode, setEngMode] = useState(false);
  const [showTrnsl, setShowTrnsl] = useState(true);
  const [uploadString, setUploadString] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const editIconSize = 20;

  function sortList(list) {
    list.sort((a, b) => {
      let aFld = engMode ? a.eng.toLowerCase() : a.esp.toLowerCase(),
        bFld = engMode ? b.eng.toLowerCase() : b.esp.toLowerCase();

      if (engMode) {
        if (aFld.substring(0, 3) === "to ") {
          aFld = aFld.slice(2).trim();
        }
        if (bFld.substring(0, 3) === "to ") {
          bFld = bFld.slice(2).trim();
        }
      }

      if (aFld < bFld) {
        return -1;
      }
      if (aFld > bFld) {
        return 1;
      }
      return 0;
    });
  }

  const _loadItems = async () => {
    try {
      const keydata = await AsyncStorage.getAllKeys();
      const storedData = await AsyncStorage.multiGet(keydata);
      const loadedWordList = [];
      storedData.forEach((storedItem) => {
        const loadedWordItem = {
          esp: storedItem[0],
          eng: storedItem[1],
          newEsp: storedItem[0],
          newEng: storedItem[1],
          editMode: false,
        };
        loadedWordList.push(loadedWordItem);
      });

      if (loadedWordList.length < 1) {
        const sampleWordItem = {
          eng: "tap in-line to edit",
          esp: "Sample word",
          newEng: "tap in-line to edit",
          newEsp: "Sample word",
          editMode: false,
        };
        loadedWordList.push(sampleWordItem);
        setShowAdd(true);
      }
      sortList(loadedWordList);
      setWordList(loadedWordList);
    } catch (error) {}
  };
  const _storeItem = async (item) => {
    try {
      await AsyncStorage.setItem(item.esp, item.eng);
    } catch (error) {}
  };
  const _deleteItem = async (item) => {
    try {
      await AsyncStorage.removeItem(item.esp);
    } catch (error) {}
  };
  const _updateItem = async (item) => {
    try {
      await AsyncStorage.removeItem(item.esp);
      await AsyncStorage.setItem(item.newEsp, item.newEng);
    } catch (error) {}
  };
  const _saveImport = async (insertList) => {
    try {
      await AsyncStorage.multiSet(insertList, _loadItems);
    } catch (error) {}
  };
  const _deleteAllData = async () => {
    try {
      await AsyncStorage.clear(_loadItems);
    } catch (error) {}
  };

  useEffect(() => {
    //_loadItems(); no longer need to load on start because setting the state of engMode on open provides first loaditems call
  }, []);

  useEffect(() => {
    _loadItems();
  }, [engMode]);

  function validEntry() {
    const engTextTrimmed = engText.trim(),
      espTextTrimmed = espText.trim();
    if (engTextTrimmed && espTextTrimmed) {
      const dup = wordList.some(
        (value) => value.eng === engTextTrimmed && value.esp === espTextTrimmed
      );
      if (!dup) {
        return true;
      }
    }
    return false;
  }

  function addButtonClick() {
    setShowAdd(!showAdd);
    setShowImport(false);
  }

  function langButtonClick() {
    setEngMode(!engMode);
    setShowAdd(false);
    setShowImport(false);
  }

  function importButtonClick() {
    setShowImport(!showImport);
    setShowAdd(false);
  }

  function darkModeButtonClick() {
    setDarkMode(!darkMode);
  }

  function onAddWordClick() {
    addWord();
  }

  function importItems() {
    var cleanUploadString = uploadString.replace("\n", "").trim();
    if (cleanUploadString.slice(-1) == ",") {
      cleanUploadString = cleanUploadString.slice(0, -1);
    }
    const itemsArr = cleanUploadString.split(",");
    const insertList = [];
    try {
      itemsArr.forEach((item) => {
        const splitItem = item.split("-");
        const cleanedSplitItem = [];
        cleanedSplitItem.push(splitItem[0].replace("\n", "").trim());
        cleanedSplitItem.push(splitItem[1].replace("\n", "").trim());
        insertList.push(cleanedSplitItem);
      });
    } catch (error) {
      Alert.alert("Import error", "Import string was not in correct format", [
        { text: "OK" },
      ]);
      setUploadString("");
    }
    _saveImport(insertList);
    setShowImport(false);
  }

  function exportItems() {
    var newUploadString = "";
    wordList.forEach((item) => {
      newUploadString = newUploadString + item.esp + " - " + item.eng + ",\n";
    });
    newUploadString = newUploadString.slice(0, -2); //get rid of last ,\n
    setUploadString(newUploadString);
  }

  function deleteAll() {
    Alert.alert(
      "Permanently delete all data?",
      "I reccommend generating an import string and saving in your notepad first",
      [
        {
          text: "Delete all",
          onPress: () => {
            _deleteAllData();
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  }

  function addWord() {
    if (validEntry()) {
      const trimmedEng = engText.trim(),
        trimmedEsp = espText.trim();
      const newItem = {
        eng: trimmedEng,
        esp: trimmedEsp,
        newEng: trimmedEng,
        newEsp: trimmedEsp,
        editMode: false,
      };
      const newList = wordList.slice();
      newList.push(newItem);
      sortList(newList);
      setWordList(newList);
      setEspText("");
      setEngText("");
      _storeItem(newItem);
      setShowAdd(false);
    }
  }
  function tapListItem(item) {
    if (!item.editMode) {
      const newList = wordList
        .slice()
        .filter((word) => !(word.eng === item.eng && word.esp === item.esp));
      item.editMode = true;
      newList.push(item);
      sortList(newList);
      setWordList(newList);
    }
  }
  function saveListItem(item) {
    if (item.editMode) {
      const newList = wordList
        .slice()
        .filter((word) => !(word.eng === item.eng && word.esp === item.esp));
      const newItem = item;
      (newItem.editMode = false),
        (newItem.eng = newItem.newEng),
        (newItem.esp = newItem.newEsp);
      newList.push(newItem);
      sortList(newList);
      setWordList(newList);
      _updateItem(item);
    }
  }
  function deleteListItem(item) {
    if (item.editMode) {
      const newList = wordList
        .slice()
        .filter((word) => !(word.eng === item.eng && word.esp === item.esp));
      sortList(newList);
      setWordList(newList);
      _deleteItem(item);
    }
  }
  function closeListItem(item) {
    if (item.editMode) {
      const newList = wordList
        .slice()
        .filter((word) => !(word.eng === item.eng && word.esp === item.esp));
      item.editMode = false;
      newList.push(item);
      sortList(newList);
      setWordList(newList);
    }
  }
  function addFromFilter() {
    setShowAdd(true);
    if (engMode) {
      setEngText(filterString);
    } else {
      setEspText(filterString);
    }
    setFilterString("");
  }
  return (
    <View
      style={[
        styles.container,
        darkMode ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Text
        style={[
          styles.numWords,
          darkMode ? styles.darkModeTextColor : styles.lightModeTextcolor,
        ]}
      >
        Words: {wordList.length}
      </Text>
      <ButtonBar
        showAdd={showAdd}
        showImport={showImport}
        engMode={engMode}
        showTrnsl={showTrnsl}
        setShowAdd={setShowAdd}
        setShowImport={setShowImport}
        setEngMode={setEngMode}
        setShowTrnsl={setShowTrnsl}
        addButtonClick={addButtonClick}
        langButtonClick={langButtonClick}
        importButtonClick={importButtonClick}
        deleteAll={deleteAll}
        darkMode={darkMode}
        darkModeButtonClick={darkModeButtonClick}
      />

      <AddSection
        showAdd={showAdd}
        engText={engText}
        espText={espText}
        darkMode={darkMode}
        setEngText={setEngText}
        setEspText={setEspText}
        onAddWordClick={onAddWordClick}
      />
      <ImportSection
        showImport={showImport}
        uploadString={uploadString}
        importItems={importItems}
        exportItems={exportItems}
        setUploadString={setUploadString}
      />
      <View style={styles.filterBar}>
        <TextInput
          style={styles.filterBox}
          defaultValue={filterString}
          onChangeText={(newText) => setFilterString(newText)}
          placeholder="filter..."
          placeholderTextColor="gray"
        />
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterClear, styles.filterButton]}
            onPress={() => setFilterString("")}
          >
            <EntypoIcon name="erase" size={17} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterAdd, styles.filterButton]}
            onPress={() => addFromFilter()}
          >
            <EntypoIcon name="add-to-list" size={17} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listSection}>
        <FlatList
          data={wordList.filter(
            (word) =>
              word.eng
                .toLowerCase()
                .includes(filterString.toLocaleLowerCase()) ||
              word.esp.toLowerCase().includes(filterString.toLocaleLowerCase())
          )}
          renderItem={({ item }) => (
            <ListItem
              engMode={engMode}
              showTrnsl={showTrnsl}
              item={item}
              editIconSize={editIconSize}
              darkMode={darkMode}
              tapListItem={tapListItem}
              saveListItem={saveListItem}
              closeListItem={closeListItem}
              deleteListItem={deleteListItem}
            />
          )}
          initialNumToRender={30}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={5}
        />
      </View>
    </View>
  );
}
