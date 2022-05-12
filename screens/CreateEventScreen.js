import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from '../database/firebase'
import RNPickerSelect from "react-native-picker-select"

const CreateEventScreen = (props) => {

  const [state, setState] = useState({
    cantidad_de_entradas: '',
    direccion: '',
    genero: '',
    nombre: '',
    organizador: '',
    valor: ''
  })
  const [genres, setGenres] = useState([]);
  const [gen, setGen] = useState([]);

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
      setGenres(genres);
      
      const gen1 = []

      genres.forEach((g, i) => {
        let item = {
          label:'',
          value:''
        }
        item.label = g.name;
        item.value = g.name;

        gen1[i] = (item);
      });
      setGen(...gen,gen1);

    });
  }, []);

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  };

  const saveNewEvent = async () => {
    if (state.cantidad_de_entradas === '') {
      alert('Please provide the number of tickets to the event')
    } else if (state.direccion === '') {
      alert('Please provide an address to the event')
    } else if (state.genero === '') {
      alert('Please provide a gender to the event')
    } else if (state.nombre === '') {
      alert('Please provide a name to the event')
    } else if (state.organizador === '') {
      alert('Please provide an organizer to the event')
    } else if (state.valor === '') {
      alert('Please provide a value to the event')
    } else {
      await firebase.db.collection('evento').add({
        cantidad_de_entradas: state.cantidad_de_entradas,
        direccion: state.direccion,
        genero: state.genero,
        nombre: state.nombre,
        organizador: state.organizador,
        valor: state.valor,
      })
      props.navigation.navigate('EventList');
    }

  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Number of tickets"
          onChangeText={(value) => handleChangeText('cantidad_de_entradas', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Address"
          onChangeText={(value) => handleChangeText('direccion', value)} />
      </View>
      <View style={styles.inputGroup}>
        <RNPickerSelect
                 onValueChange={(value) => handleChangeText('genero', value)}
                //  items={[
                //      { label: "Regueton", value: "Regueton" },
                //      { label: "Vallenato", value: "Vallenato" },
                //      { label: "Salsa", value: "Salsa" },
                //      { label: "Rock", value: "Rock" },
                //      { label: "Metal", value: "Metal" },
                //      { label: "Crossover", value: "CCrossover" },
                //  ]}
                items = {gen}
             />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="Name"
          onChangeText={(value) => handleChangeText('nombre', value)} />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Organizer"
          onChangeText={(value) => handleChangeText('organizador', value)} />
      </View>
      <View style={styles.inputGroup} >


        <TextInput placeholder="Value"
          onChangeText={(value) => handleChangeText('valor', value)} />
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

export default CreateEventScreen