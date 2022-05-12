import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'
import RNPickerSelect from "react-native-picker-select"

const CreateReservaScreen = (props) => {

  const [state, setState] = useState({
    nombreCliente: '',
    evento: '',
    cantidadBoletas: '',
  });

  const [eventos, setEventos] = useState([]);
  const [gen, setGen] = useState([]);

  useEffect(() => {
    firebase.db.collection("evento").onSnapshot((querySnapshot) => {
      const eventos = [];

      querySnapshot.docs.forEach((doc) => {
        const { nombre, valor } = doc.data();
        eventos.push({
          clave: doc.id,
          nombre,
          valor,
        });
      });

      setEventos(eventos)
      const gen1 = []

      eventos.forEach((g, i) => {
        let item = {
          label:'',
          value:''
        }
        item.label = g.nombre;
        item.value = g.nombre;

        gen1[i] = (item);
      });
      setGen(...gen,gen1);
    });
  }, []);

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  };

  const saveNewReserva = async () => {
    if (state.nombreCliente === '') {
      alert('Please provide the name of the client')
    } else if (state.evento === '') {
      alert('Please provide the namer of the event')
    } else if (state.cantidadBoletas === '') {
      alert('Please provide a value of the tickets')
    } else {
      await firebase.db.collection('reservas').add({
        nombreCliente: state.nombreCliente,
        evento: state.evento,
        cantidadBoletas: state.cantidadBoletas,
      })
      props.navigation.navigate('ApoinmentList');
    }

  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <RNPickerSelect
          onValueChange={(value) => handleChangeText('evento', value)}
          items={gen}
        />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Nombre del cliente"
          onChangeText={(value) => handleChangeText('nombreCliente', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Cantidad de boletas:"
          onChangeText={(value) => handleChangeText('cantidadBoletas', value)} />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save reserva"
          onPress={() => saveNewReserva()}></Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },

  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  }
})

export default CreateReservaScreen