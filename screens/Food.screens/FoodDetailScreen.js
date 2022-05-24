import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator } from 'react-native'
import firebase from '../../database/firebase'

const FoodDetailScreen = (props) => {
  const initialState = {
    clave: "",
    name: "",
    identificador: "",
  }
  const [food, setFoods] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const getFoodByClave = async (clave) => {
    const dbRef = firebase.db.collection("foods").doc(clave);
    const doc = await dbRef.get();
    const foods = doc.data();
    setFoods({
      ...foods,
      clave: doc.clave,
    });
    setLoading(false);
  };

  useEffect(() => {
    getFoodByClave(props.route.params.foodClave);
  }, []);

  const handleChangeText = (name, value) => {
    setFoods({ ...food, [name]: value })
  };

  const deleteFood = async () => {
    const dbRef = firebase.db.collection('foods').doc(props.route.params.foodClave);
    await dbRef.delete();
    props.navigation.navigate('FoodList')
  }

  const updateFood = async () => {
    const dbRef = firebase.db.collection('foods').doc(props.route.params.foodClave);
    await dbRef.set({
      name: food.name,
      identificador: food.identificador,
    })
    setFoods(initialState)
    props.navigation.navigate('FoodList')
  }

  const openConfirmationAlert = () => {
    Alert.alert('Remove the food', 'Are you sure?', [
      { text: 'Yes', onPress: () => deleteFood()},
      { text: 'No', onPress: () => console.log('Canceled') },
    ])
  }


  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Name food"
          value={food.name}
          onChangeText={(value) => handleChangeText('name', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="ID"
          value={food.identificador}
          onChangeText={(value) => handleChangeText('identificador', value)} />
      </View>
      <View style={styles.inputGroup}>
        <Button color="#19AC52" title="Update food"
          onPress={() => updateFood()}></Button>
      </View>
      <View>
        <Button color="red" title="Delet food"
          onPress={() => openConfirmationAlert()}></Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  }
});

export default FoodDetailScreen