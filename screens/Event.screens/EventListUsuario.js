import React, { useEffect, useState } from 'react'
import { View, ScrollView, Button } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const EventListUsuario = (props) => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    firebase.db.collection("evento").onSnapshot((querySnapshot) => {
      const event = [];

      querySnapshot.docs.forEach((doc) => {
        const { cantidad_de_entradas, direccion, genero, nombre, organizador, valor } = doc.data();
        event.push({
          clave: doc.id,
          cantidad_de_entradas,
          direccion,
          genero,
          nombre,
          organizador,
          valor,
        });
      });

      setEvents(event)
    });
  }, []);

  return (
    <ScrollView>
      <View style={{padding: 5}}>
        <Button title="Crear Reserva"
          onPress={() => props.navigation.navigate('CreateReservaScreen')} />
      </View>
      {
        events.map(event => {
          return (
            <ListItem key={event.clave}>
              <ListItem.Chevron />
              <Avatar source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3771/3771178.png' }} size="small" rounded />
              <ListItem.Content>
                <ListItem.Title>{event.nombre}</ListItem.Title>
                <ListItem.Subtitle>{event.organizador}</ListItem.Subtitle>
                <ListItem.Subtitle>{event.genero}</ListItem.Subtitle>
                <ListItem.Subtitle>{event.direccion}</ListItem.Subtitle>
                <ListItem.Subtitle>{event.valor}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
    </ScrollView>
  );
};

export default EventListUsuario