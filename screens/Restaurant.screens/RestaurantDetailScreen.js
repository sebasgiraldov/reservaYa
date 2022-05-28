import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator } from 'react-native'
import firebase from '../../database/firebase'

const RestaurantDetailScreen = (props) => {
  const initialState = {
    clave: "",
    nombre: "",
    direccion: "",
    aforo:"",
    tipoComida:"",
    valorPorPersona:"",
}
  const [restaurant, setRestaurants] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const getRestaurantByClave = async (clave) => {
    const dbRef = firebase.db.collection("restaurantes").doc(clave);
    const doc = await dbRef.get();
    const restaurants = doc.data();
    setRestaurants({
      ...restaurants,
      clave: doc.clave,
    });
    setLoading(false);
  };

  useEffect(() => {
    getRestaurantByClave(props.route.params.restaurantClave);
  }, []);

  const handleChangeText = (name, value) => {
    setRestaurants({ ...restaurant, [name]: value })
  };

  

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
        <TextInput placeholder="Name"
          value={restaurant.nombre}
          onChangeText={(value) => handleChangeText('nombre', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Address"
          value={restaurant.direccion}
          onChangeText={(value) => handleChangeText('direccion', value)} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Capacity"
          value={restaurant.genero}
          onChangeText={(value) => handleChangeText('aforo', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Food Type"
          value={restaurant.nombre}
          onChangeText={(value) => handleChangeText('tipoComida', value)} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="cost person"
          value={restaurant.organizador}
          onChangeText={(value) => handleChangeText('valorPorPersona', value)} />
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

export default RestaurantDetailScreen