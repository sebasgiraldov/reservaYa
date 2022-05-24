import React, { useEffect, useState } from 'react'
import { View, ScrollView, Button } from 'react-native'
import firebase from '../../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const ApoinmentList = (props) => {

  const [apoinments, setApoinments] = useState([]);

  useEffect(() => {
    firebase.db.collection("reservas").onSnapshot((querySnapshot) => {
      const apoinment = [];

      querySnapshot.docs.forEach((doc) => {
        const { nombreCliente, evento, cantidadBoletas  } = doc.data();
        apoinment.push({
          clave: doc.id,
          nombreCliente,
          evento,
          cantidadBoletas,
        });
      });
      setApoinments(apoinment)
    });
  }, []);

  return (
    <ScrollView>
      <View style={{padding: 5}}>
        <Button title="Create Apoinment"
          onPress={() => props.navigation.navigate('CreateReservaScreen')} />
      </View>
      {
        apoinments.map(apoinment => {
          return (
            <ListItem
              key={apoinment.clave} bottomDivider onPress={() => {
                props.navigation.navigate('ApoinmentDetailScreen', {
                  apoinmentClave: apoinment.clave
                })
              }}>
              <ListItem.Chevron />
              <Avatar source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQd-mtIqHkBg55zFD-c41alEkHV7hWs71xQ&usqp=CAU' }} rounded />
              <ListItem.Content>
                <ListItem.Title>Reserva</ListItem.Title>
                <ListItem.Subtitle>Nombre cliente: {apoinment.nombreCliente}</ListItem.Subtitle>
                <ListItem.Subtitle>Evento: {apoinment.evento}</ListItem.Subtitle>
                <ListItem.Subtitle>Cantidad boletas: {apoinment.cantidadBoletas}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
    </ScrollView>
  );
};

export default ApoinmentList