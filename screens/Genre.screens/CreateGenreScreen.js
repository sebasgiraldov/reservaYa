import React, { useState } from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import firebase from '../../database/firebase'

const CreateGenreScreen = (props) => {

  const [state, setState] = useState({
    name:'',
    id:''
  })

  const handleChangeText = (name, value) =>{
    setState({...state,[name]: value})
  };

  const saveNewGenre = async () =>{
    if(state.name === ''){
      alert('Please provide a name of genre')
    }else if (state.id === ''){
      alert('Please provide a id of genre')
    }else{
      await firebase.db.collection('genres').add({
        name: state.name,
        id: state.id
      })
      props.navigation.navigate('GenreList');
    }
    
    
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Name genre" 
        onChangeText={(value) => handleChangeText('name', value)}/>
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="ID" 
        onChangeText={(value) => handleChangeText('id', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save genre"
        onPress={() => saveNewGenre()}></Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:35
  },

  inputGroup:{
    flex:1,
    padding:0,
    marginBottom:15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  }
})

export default CreateGenreScreen