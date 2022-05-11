import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const ApoinmentList = (props) => {

  const [apoinments, setApoinments] = useState([]);

  useEffect(() => {
    firebase.db.collection("reservas").onSnapshot((querySnapshot) => {
      const apoinments = [];

      querySnapshot.docs.forEach((doc) => {
        const { nombreEvento, idEvento, valorReserva, genero,  organizadorEvento, estadoQR } = doc.data();
        apoinments.push({
          clave: doc.id,
          nombreEvento,
          idEvento,
          valorReserva,
          genero,
          organizadorEvento,
          estadoQR,
        });
      });

      setApoinments(apoinments)
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
                <ListItem.Title>Reserva {apoinment.idEvento}</ListItem.Title>
                <ListItem.Subtitle>Genero: {apoinment.genero}</ListItem.Subtitle>
                <ListItem.Subtitle>Nombre: {apoinment.nombreEvento}</ListItem.Subtitle>
                <ListItem.Subtitle>Organizador: {apoinment.organizadorEvento}</ListItem.Subtitle>
                <ListItem.Subtitle>Valor: ${apoinment.valorReserva}</ListItem.Subtitle>
                <ListItem.Subtitle>Estado QR: {apoinment.estadoQR}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
    </ScrollView>
  );
};

export default ApoinmentList