import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'
import RNPickerSelect from "react-native-picker-select"

const CreateReservaScreen = (props) => {

  const [state, setState] = useState({
    nombreEvento: '',
    organizadorEvento: '',
    valorReserva: '',
  })
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    firebase.db.collection("genres").onSnapshot((querySnapshot) => {
      const genres = [];

      querySnapshot.docs.forEach((doc) => {
        const { name, id } = doc.data();
        genres.push({
          clave: doc.id,
          name,
          id,
        });
      });

      setGenres(genres)
      console.log(genres)
    });
  }, []);

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  };

  const saveNewReserva = async () => {
    if (state.nombreEvento === '') {
      alert('Please provide the name of the event')
    } else if (state.organizadorEvento === '') {
      alert('Please provide an organizator of the event')
    } else if (state.valorReserva === '') {
      alert('Please provide a value of the apoitment')
    } else {
      await firebase.db.collection('reservas').add({
        nombreEvento: state.nombreEvento,
        organizadorEvento: state.organizadorEvento,
        valorReserva: state.valorReserva,
      })
      props.navigation.navigate('ApoinmentList');
    }

  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Regueton", value: "Regueton" },
            { label: "Vallenato", value: "Vallenato" },
            { label: "Salsa", value: "Salsa" },
            { label: "Rock", value: "Rock" },
            { label: "Metal", value: "Metal" },
            { label: "Crossover", value: "CCrossover" },
          ]}
        />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Nombre del evento"
          onChangeText={(value) => handleChangeText('nombreEvento', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Organizador del evento"
          onChangeText={(value) => handleChangeText('organizadorEvento', value)} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Valor de la reserva"
          onChangeText={(value) => handleChangeText('valorReserva', value)} />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save event"
          onPress={() => saveNewEvent()}></Button>
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