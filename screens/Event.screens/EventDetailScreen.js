import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator } from 'react-native'
import firebase from '../../database/firebase'

const EventDetailScreen = (props) => {
  const initialState = {
    clave: "",
    cantidad_de_entradas:"",
    direccion:"",
    genero:"",
    nombre:"",
    organizador:"",
    valor:"",
  }
  const [event, setEvents] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const getEventByClave = async (clave) => {
    const dbRef = firebase.db.collection("evento").doc(clave);
    const doc = await dbRef.get();
    const events = doc.data();
    setEvents({
      ...events,
      clave: doc.clave,
    });
    setLoading(false);
  };

  useEffect(() => {
    getEventByClave(props.route.params.eventClave);
  }, []);

  const handleChangeText = (name, value) => {
    setEvents({ ...event, [name]: value })
  };

  
  const deleteEvent = async () => {
    const dbRef = firebase.db.collection('evento').doc(props.route.params.eventClave);
    await dbRef.delete();
    props.navigation.navigate('EventList')
  }

  const updateEvent = async () => {
    const dbRef = firebase.db.collection('evento').doc(props.route.params.eventClave);
    await dbRef.set({
      cantidad_de_entradas: event.cantidad_de_entradas,
      direccion: event.direccion,
      genero: event.genero,
      nombre: event.nombre,
      organizador: event.organizador,
      valor: event.valor,
    })
    setEvents(initialState)
    props.navigation.navigate('EventList')
  }

  const openConfirmationAlert = () => {
    Alert.alert('Remove the event', 'Are you sure?', [
      { text: 'Yes', onPress: () => deleteEvent() },
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
        <TextInput placeholder="Number of tickets"
          value={event.cantidad_de_entradas}
          onChangeText={(value) => handleChangeText('cantidad_de_entradas', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Address"
          value={event.direccion}
          onChangeText={(value) => handleChangeText('direccion', value)} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Gender"
          value={event.genero}
          onChangeText={(value) => handleChangeText('genero', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Name"
          value={event.nombre}
          onChangeText={(value) => handleChangeText('nombre', value)} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Organizer"
          value={event.organizador}
          onChangeText={(value) => handleChangeText('organizador', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Value"
          value={event.valor}
          onChangeText={(value) => handleChangeText('valor', value)} />
      </View>
      <View style={styles.inputGroup}>
        <Button color="#19AC52" title="Update event"
          onPress={() => updateEvent()}></Button>
      </View>
      <View>
        <Button color="red" title="Delete event"
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

export default EventDetailScreen