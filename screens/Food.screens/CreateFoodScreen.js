import React, { useState } from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import firebase from '../../database/firebase'

const CreateFoodScreen = (props) => {

  const [state, setState] = useState({
    name:'',
    identificador:''
  })

  const handleChangeText = (name, value) =>{
    setState({...state,[name]: value})
  };

  const saveNewFood = async () =>{
    if(state.name === ''){
      alert('Please provide a name of food')
    }else if (state.identificador === ''){
      alert('Please provide a identificador of food')
    }else{
      await firebase.db.collection('foods').add({
        name: state.name,
        identificador: state.identificador
      })
      props.navigation.navigate('FoodList');
    }
    
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Name food" 
        onChangeText={(value) => handleChangeText('name', value)}/>
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="ID" 
        onChangeText={(value) => handleChangeText('identificador', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save food"
        onPress={() => saveNewFood()}></Button>
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

export default CreateFoodScreen