import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';



export default function App() {
  const [wordList, setWordList] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [engText, setEngText] = useState('');
  const [espText, setEspText] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [engMode, setEngMode] = useState(false);
  const [showTrnsl, setShowTrnsl] = useState(true);
  const [uploadString, setUploadString] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const editIconSize = 20;

  function sortList(list){
    list.sort((a, b) => {
      let aFld = engMode ? a.eng.toLowerCase() : a.esp.toLowerCase(),
          bFld = engMode ? b.eng.toLowerCase() : b.esp.toLowerCase();
      
      if(engMode) {
        if(aFld.substring(0, 3) === "to ") {
          aFld = aFld.slice(2).trim();
        }
        if(bFld.substring(0, 3) === "to ") {
          bFld = bFld.slice(2).trim();
        }
      }

      if ( aFld < bFld) {
          return -1;
      }
      if (aFld > bFld) {
          return 1;
      }
      return 0;
    });
  }

  const _loadItems = async () => {
    try{
      const keydata = await AsyncStorage.getAllKeys();
      const storedData = await AsyncStorage.multiGet(keydata);
      const loadedWordList = [];
      storedData.forEach(storedItem => {
        const loadedWordItem = {
          esp: storedItem[0],
          eng: storedItem[1],
          newEsp: storedItem[0],
          newEng: storedItem[1],
          editMode: false
        };
        loadedWordList.push(loadedWordItem);
      });

      if(loadedWordList.length < 1){
        const sampleWordItem = {
          eng: "tap in-line to edit",
          esp: "Sample word",
          newEng: "tap in-line to edit",
          newEsp: "Sample word",
          editMode: false
        };
        loadedWordList.push(sampleWordItem);
        setShowAdd(true);
      }
      sortList(loadedWordList);
      setWordList(loadedWordList);
      
    }
    catch (error) {
    }
  }
  const _storeItem = async (item) => {
    try {
      await AsyncStorage.setItem(item.esp, item.eng);
    }
    catch (error) {
    }
  }
  const _deleteItem = async (item) => {
    try {
      await AsyncStorage.removeItem(item.esp);
    }
    catch (error) {
    }
  }
  const _updateItem = async (item) => {
    try {
      await AsyncStorage.removeItem(item.esp);
      await AsyncStorage.setItem(item.newEsp, item.newEng);
    }
    catch (error) {
    }
  }
  const _saveImport = async (insertList) => {
    try {
      await AsyncStorage.multiSet(insertList, _loadItems);
    }
    catch (error) {
    }
  }
  const _deleteAllData = async () => {
    try {
      await AsyncStorage.clear(_loadItems);
    }
    catch (error) {
    }
  }
  
  useEffect(() => {
    //_loadItems(); no longer need to load on start because setting the state of engMode on open provides first loaditems call    
  }, []);

  useEffect(() => {
    _loadItems();   
  }, [engMode]);

  function validEntry(){
    const engTextTrimmed= engText.trim(),
          espTextTrimmed= espText.trim();
    if(engTextTrimmed && espTextTrimmed){ 
      const dup = wordList.some(value => value.eng === engTextTrimmed && value.esp === espTextTrimmed);
      if(!dup){return true;}
    }
    return false;
  }

  function addButtonClick(){
    setShowAdd(!showAdd);
    setShowImport(false);
  }

  function langButtonClick(){
    setEngMode(!engMode);
    setShowAdd(false);
    setShowImport(false);
  }

  function importButtonClick(){
    setShowImport(!showImport);
    setShowAdd(false);
  }

  function darkModeButtonClick(){
    setDarkMode(!darkMode);
  }
  
  function onAddWordClick(){
    addWord();
  }
  
  function importItems(){
    var cleanUploadString = uploadString.replace('\n', '').trim();
    if(cleanUploadString.slice(-1) == ','){cleanUploadString = cleanUploadString.slice(0, -1);}
    const itemsArr = cleanUploadString.split(',');
    const insertList = [];
    try{
      itemsArr.forEach(item => {
        const splitItem = item.split('-');
        const cleanedSplitItem = [];
        cleanedSplitItem.push(splitItem[0].replace('\n', '').trim());
        cleanedSplitItem.push(splitItem[1].replace('\n', '').trim());
        insertList.push(cleanedSplitItem);
      });
    }
    catch(error){
      Alert.alert(
        "Import error",
        "Import string was not in correct format",
        [
          { text: "OK"}
        ]
      );
      setUploadString("");
    }
    _saveImport(insertList);
    setShowImport(false);
  }

  function exportItems(){
    var newUploadString = '';
    wordList.forEach(item => {
      newUploadString = newUploadString + item.esp + ' - ' + item.eng + ',\n';
    });
    newUploadString = newUploadString.slice(0, -2); //get rid of last ,\n
    setUploadString(newUploadString);
  }

  function deleteAll(){
    Alert.alert("Permanently delete all data?", "I reccommend generating an import string and saving in your notepad first",
    [{
      text: "Delete all",
      onPress: () => {_deleteAllData();},
    },
    {
      text: "Cancel",  
    }]
    );
    
  }

  function addWord(){
    if(validEntry()){
      const trimmedEng = engText.trim(), trimmedEsp = espText.trim();
      const newItem = {eng: trimmedEng, esp: trimmedEsp, newEng: trimmedEng, newEsp: trimmedEsp, editMode: false};
      const newList = wordList.slice();
      newList.push(newItem);
      sortList(newList);
      setWordList(newList);
      setEspText('');
      setEngText('');
      _storeItem(newItem);
      setShowAdd(false);
    }
  }
  function tapListItem(item){
    if(!item.editMode){
      const newList = wordList.slice().filter(word => !(word.eng === item.eng && word.esp === item.esp));
      item.editMode = true;
      newList.push(item);
      sortList(newList);
      setWordList(newList);
    }
  }
  function saveListItem(item){
    if(item.editMode){
      const newList = wordList.slice().filter(word => !(word.eng === item.eng && word.esp === item.esp));
      const newItem = item;
      newItem.editMode = false, newItem.eng = newItem.newEng, newItem.esp = newItem.newEsp;
      newList.push(newItem);
      sortList(newList);
      setWordList(newList);
      _updateItem(item);
    }
  }
  function deleteListItem(item){
    if(item.editMode){
      const newList = wordList.slice().filter(word => !(word.eng === item.eng && word.esp === item.esp));
      sortList(newList);
      setWordList(newList);
      _deleteItem(item);
    }
  }
  function closeListItem(item){
    if(item.editMode){
      const newList = wordList.slice().filter(word => !(word.eng === item.eng && word.esp === item.esp));
      item.editMode = false;
      newList.push(item);
      sortList(newList);
      setWordList(newList);
    }
  }
  function addFromFilter(){
    setShowAdd(true);
    if(engMode){setEngText(filterString);}
    else{setEspText(filterString);}
    setFilterString("");
  }
  return (
    
    <View style={[styles.container, darkMode ? styles.darkBackground : styles.lightBackground]}> 
    <StatusBar style={ darkMode ? "light" : "dark"} />
    <Text style={[styles.numWords, darkMode ? styles.darkModeTextColor : styles.lightModeTextcolor]}>
        Words: {wordList.length}
      </Text>
      <ButtonBar showAdd={showAdd} showImport={showImport} engMode={engMode} showTrnsl={showTrnsl} 
        setShowAdd={setShowAdd} setShowImport={setShowImport} setEngMode={setEngMode} setShowTrnsl={setShowTrnsl} 
        addButtonClick={addButtonClick}  langButtonClick={langButtonClick} importButtonClick={importButtonClick} deleteAll={deleteAll} 
        darkMode={darkMode} darkModeButtonClick={darkModeButtonClick}  />
      
      <AddSection showAdd={showAdd} engText={engText} espText={espText} darkMode={darkMode}
        setEngText={setEngText} setEspText={setEspText} onAddWordClick={onAddWordClick} />
      <ImportSection showImport={showImport} uploadString={uploadString} 
        importItems={importItems} exportItems={exportItems} setUploadString={setUploadString}/>
      <View style={styles.filterBar}>
        <TextInput style={styles.filterBox} 
          defaultValue={filterString} onChangeText={newText => setFilterString(newText)} placeholder='filter...'
            placeholderTextColor="gray" />
            
        <TouchableOpacity style={[styles.filterClear, styles.filterButton]} onPress={()=> setFilterString("")}>
                <EntypoIcon
                  name='erase' 
                  size={17}
                  color='black'/>
              </TouchableOpacity>
        <TouchableOpacity style={[styles.filterAdd, styles.filterButton]} onPress={()=> addFromFilter()}>
                <EntypoIcon
                  name='add-to-list' 
                  size={17}
                  color='black'/>
              </TouchableOpacity>
        
      </View>
      <View style={styles.listSection}>
        <FlatList data={wordList.filter(word => word.eng.toLowerCase().includes(filterString.toLocaleLowerCase()) 
                                        || word.esp.toLowerCase().includes(filterString.toLocaleLowerCase()))}
          renderItem={({item}) => 
            <ListItem engMode={engMode} showTrnsl={showTrnsl} item={item} editIconSize={editIconSize} darkMode={darkMode}
            tapListItem={tapListItem} saveListItem={saveListItem} closeListItem={closeListItem} deleteListItem={deleteListItem}  />
          }
          initialNumToRender={30}
          maxToRenderPerBatch={10} 
          updateCellsBatchingPeriod={50}
          windowSize={5}
        />
      </View>
    </View>
  );
}

function ListItem(props){
  if(!props.item.editMode){
    return(
      <TouchableOpacity onPress={() => props.tapListItem(props.item)}>
        <Text style={props.darkMode ? styles.darkModeTextColor : styles.lightModeTextcolor}>
          { (props.engMode ? props.item.eng : props.item.esp)  + (props.showTrnsl ? " - " + (props.engMode? props.item.esp : props.item.eng) : '') }
        </Text>
      </TouchableOpacity>
    );
  }
  else{
    return(
        <View style={styles.itemEditMode}>
          <View style={styles.itemEditTextBoxWrapper}>
            <TextInput
                style={styles.itemEditTextbox}
                defaultValue = {props.engMode ? props.item.newEng : props.item.newEsp}
                onChangeText={newText => (props.engMode ? props.item.newEng = newText : props.item.newEsp = newText)}
              />
          </View>
          <View style={styles.itemEditTextBoxWrapper}>
            <TextInput
              style={styles.itemEditTextbox}
              defaultValue = {props.engMode ? props.item.newEsp : props.item.newEng}
              onChangeText={newText => (props.engMode ? props.item.newEsp = newText : props.item.newEng = newText)}
            />
          </View>
          <View style={styles.editItemButtonBar}>
            <TouchableOpacity style={[styles.editItemButton, styles.editItemSaveButton]} onPress={()=>props.saveListItem(props.item)}>
              <Icon
                name='save' 
                size={props.editIconSize}
                color='black'/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.editItemButton, styles.editItemDeleteButton]} onPress={()=>props.deleteListItem(props.item)}>
            <Icon
                name='trash' 
                size={props.editIconSize}
                color='black'/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.editItemButton, styles.editItemCloseButton]} onPress={()=>props.closeListItem(props.item)}>
            <Icon
                name='close' 
                size={props.editIconSize}
                color='black'/>
            </TouchableOpacity>
          </View>
      </View> 
    );
  }
}

function ButtonBar(props) {
  return(
    <View style={styles.buttonBarWrapper} >
      <TouchableOpacity style={[styles.topButton, props.showAdd ? styles.showAddButtonOpen: styles.showAddButtonClosed]} 
        onPress={() => props.addButtonClick()}>
        <Icon
          name={props.showAdd ? 'close' : 'plus'}
          size={15}
          color={'white'}/>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.topButton, styles.langButton]} 
        onPress={() => props.langButtonClick()} >
        <AntDesign
          name={props.engMode ? 'shrink' : 'arrowsalt'}
          size={15}
          color={'white'}/>
      </TouchableOpacity>

      <TouchableOpacity style={{...styles.topButton, backgroundColor: props.showTrnsl ? '#E34B4D' : '#32BF80' }} 
        onPress={() => props.setShowTrnsl(!props.showTrnsl)} >
        <IonIcon
          name={props.showTrnsl ? 'eye-off' : 'eye'}
          size={15}
          color={'white'}/>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.topButton, props.showImport ? styles.showImportButtonOpen: styles.showImportButtonClosed]} 
        onPress={() => props.importButtonClick()}>
        <Icon
          name={props.showImport ? 'close' : 'file-text'}
          size={15}
          color={'white'}/>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.topButton, styles.killButton]} 
        onPress={() => props.deleteAll()} >
        <MaterialIcons
          name={'local-fire-department'}
          size={20}
          color={'#D42222'}/>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.topButton, props.darkMode ? styles.lightModeButton : styles.darkModeButton]} 
        onPress={() => props.darkModeButtonClick()} >
        <MaterialCommunityIcons
          name={'theme-light-dark'}
          size={20}
          color={props.darkMode ? '#1f1f1f' : '#fff'}/>
      </TouchableOpacity>
    </View>
  );
}

function AddSection(props) {
  if(props.showAdd){
    return(
      <> 
        <View style={styles.inputGroup}>
          <Text style={[styles.headerText, props.darkMode? styles.darkModeTextColor : styles.lightModeTextcolor]}>English:</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={newText => props.setEngText(newText)}
            value = {props.engText}
          />
        </View>
  
        <View style={styles.inputGroup}>
          <Text style={[styles.headerText, props.darkMode? styles.darkModeTextColor : styles.lightModeTextcolor]}>Spanish:</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={newText => props.setEspText(newText)}
            value = {props.espText}
          />
        </View>
        
        <View style={styles.addButton}>
          <Button onPress={() => props.onAddWordClick()} 
            title="Add Word"
            color="#50A3DE" />
        </View>
      </>
    );
  }
  else{return(<></>);}
}
function ImportSection(props) {
  if(props.showImport){
    return(
      <>
      <View style={styles.importTextboxWrapper}>
        <TextInput
                style={[styles.textBox, styles.importTextBox]}
                defaultValue = {props.uploadString}
                onChangeText={newText => props.setUploadString(newText)}
                multiline={true}
                numberOfLines={10}
              />
        </View>
        <Text style={styles.importExampleText}>Format: Lang2Word1 - Lang1Word1, Lang2Word2 - Lang1Word2 etc...</Text>
        <View style={styles.importButtons}>
          <View style={styles.importButton}>
            <Button onPress={() => props.exportItems()} 
              title="Generate string"
              color="#50A3DE" />
          
          </View>
          <View style={styles.importButton}>
            <Button onPress={() => props.importItems()} 
              title="Import string"
              color="#50A3DE" />
          </View>
        </View>
        </>
    );
  }
  else{return(<></>);}
}
const editHeight = 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingLeft: 30,
  },
  darkBackground: {
    backgroundColor: '#1f1f1f'
  },
  lightBackground: {
    backgroundColor: '#fff'
  },
  darkModeTextColor: {
    color: 'white'
  },
  lightModeTextcolor: {
    color: 'black'
  },
  buttonBarWrapper: {
    justifyContent: 'flex-start',
    height: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
  },
  topButton: {
    width: 40,
    borderRadius: 4,
    marginRight: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBar: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 30,
    marginBottom: 10
  },
  filterBox: {
    borderColor: 'gray',
    borderWidth: .4,
    width: '70%',
    borderRadius: 5,
    marginBottom: 10,
    color: 'gray',
    paddingLeft: 5,
    backgroundColor: 'white',
    marginRight: 15
  },
  filterButton: {
    backgroundColor: '#D6D6D6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: 4,
    marginRight: 15,
  },
  filterAdd: {
  },
  filterClear: {
  },
  listSection: {
    maxHeight: 670,
    width: '100%',
  },
  showAddButtonOpen: {
    backgroundColor: '#6E6E6E',
  },
  showAddButtonClosed: {
    backgroundColor: '#50A3DE',
  },
  showImportButtonOpen: {
    backgroundColor: '#6E6E6E',
  },
  showImportButtonClosed: {
    backgroundColor: '#50A3DE',
  },
  langButton: {
    backgroundColor: '#E37932',
  },
  killButton: {
    backgroundColor: '#4d4d4d'
  },
  darkModeButton: {
    backgroundColor: '#4d4d4d'
  },
  lightModeButton: {
    backgroundColor: '#D6D6D6'
  },
  showTrnslButton: {
    width: 80,
    marginRight: 10,
  },
  textBox: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 50,
    paddingLeft: 5,
    backgroundColor: 'white',
    color: 'black'
  },
  itemEditMode: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: editHeight,
    marginBottom: 5,
  },
  itemEditTextbox: {
    height: editHeight,
    borderColor: 'gray',
    color: 'gray',
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: .4,
    borderBottomWidth: .4,
    marginRight: 10,
    height: 30,
    width: 100,
    textAlign: 'center',
  },
  itemEditTextBoxWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editItemButtonBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: editHeight
  },
  editItemButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: editHeight,
    width: editHeight,
    borderRadius: 4,
    marginRight: 10,
  },
  editItemSaveButton:{
    backgroundColor: '#50A3DE',
  },
  editItemCloseButton: {
    backgroundColor: '#D6D6D6',
  },
  editItemDeleteButton: {
    backgroundColor: '#E34B4D',
  },
  debugText:{
    color: 'green'
  },
  addButton: {
    width: '90%',
    marginBottom: 20,
  },
  margins: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    alignItems: 'flex-start'
  },
  inputGroup: {
    width: '90%',
    marginBottom: 20,
  },
  importTextBox: {
    width: '100%',
    height: 300,
    textAlignVertical: 'top',
  },
  importTextboxWrapper: {
    width: '90%',
    marginBottom: 5
  },
  importExampleText: {
    fontSize: 10,
    marginBottom: 5,
    color: 'gray'
  },
  importButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  importButton: {
    width: '40%',
    marginRight: 10,
  }
});
