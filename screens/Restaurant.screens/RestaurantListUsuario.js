import React, { useEffect, useState } from 'react'
import { View, ScrollView, Button } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

/**
 * Ventana para listar todos los Restaurantes para mostrar a los usuarios
 */
const RestaurantListUsuario = (props) => {

/**
 * Lista que contendra todos los restaurantes que estan en la base de datos
 */
  const [restaurants, setRestaurants] = useState([]);

  /** 
   * Relizamos la conexión a la base de datos y llenamos la lista de restaurantes
  */
  useEffect(() => {
    firebase.db.collection("restaurantes").onSnapshot((querySnapshot) => {
      const restaurant = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, direccion, aforo, tipoComida, valorPorPersona } = doc.data();
        restaurant.push({
          clave: doc.id,
          nombre,
          direccion,
          aforo, 
          tipoComida, 
          valorPorPersona
        });
      });
      setRestaurants(restaurant)
    });
  }, []);

/** 
 * Retorna la vista recorriendo y mostrando la lista de todos los restaurantes
*/
  return (
    <ScrollView>
      <View style={{padding: 5}}>
        <Button title="Crear Reserva"
          onPress={() => props.navigation.navigate('CreateReservaScreen')} />
      </View>
      {
        restaurants.map(restaurant => {
          return (
            <ListItem key={restaurant.clave}>
              <ListItem.Chevron />
              <Avatar source={{ uri: 'https://es.seaicons.com/wp-content/uploads/2015/11/Restaurant-icon.png' }} rounded />
              <ListItem.Content>
                <ListItem.Title>Nombre: {restaurant.nombre}</ListItem.Title>
                <ListItem.Subtitle>Dirección: {restaurant.direccion}</ListItem.Subtitle>
                <ListItem.Subtitle>Tipo de comida: {restaurant.tipoComida}</ListItem.Subtitle>
                <ListItem.Subtitle>Precio reserva: ${restaurant.valorPorPersona}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
    </ScrollView>
  );
};

export default RestaurantListUsuario