import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, TextInput, Button, Text } from "react-native";
import firebase from "../../database/firebase";
import RNPickerSelect from "react-native-picker-select"

/**
 * Ventana para crear un nuevo Restaurante
 */
const CreateRestaurantScreen = (props) => {

  const [state, setState] = useState({
    nombre: '',
    direccion: '',
    aforo: '',
    tipoComida: '',
    valorPorPersona: ''
  })
  const [foods, setFoods] = useState([]);

  /**
   * Se realiza la consulta a la base de datos para adquirir los tipos de comida.
   */
  useEffect(() => {
    firebase.db.collection("foods").onSnapshot((querySnapshot) => {
      const typefoods = [];

      querySnapshot.docs.forEach((doc) => {
        const { name, id } = doc.data();
        typefoods.push({
          clave: doc.id,
          name,
          id,
        });
      });

      const food = [];

      typefoods.forEach((f, i) => {
        let item = {
          label: '',
          value: ''
        }
        item.label = f.name;
        item.value = f.name;

        food[i] = item;
      });
      setFoods(...foods, food)
    })
  }, []);

  /**
   * Metodo para asignar los valores correspondientes al Restaurante
   * @param {*} name 
   * @param {*} value 
   */
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  };

  /**
   * Metodo para guardar y validar los campos
   */
  const saveNewRestaurant = async () => {
    if (state.nombre === '') {
      alert('Please provide the name of the restaurant')
    } else if (state.direccion === '') {
      alert('Please provide the address of the restaurant')
    } else if (parseInt(state.valorPorPersona) < 0) {
      alert('El valor debe ser mayor o igual a $0')
    } else if (parseInt(state.aforo) <= 0) {
      alert('El aforo debe ser mayor a 0')
    } else {
      await firebase.db.collection('restaurantes').add({
        nombre: state.nombre,
        direccion: state.direccion,
        valorPorPersona: state.valorPorPersona,
        tipoComida: state.tipoComida,
        aforo: state.aforo,
      })
      props.navigation.navigate('RestaurantList');
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup} >
        <Text>Nombre del restaurante</Text>
        <TextInput placeholder="Digite el nombre"
          onChangeText={(value) => handleChangeText('nombre', value)} />
      </View>
      <View style={styles.inputGroup} >
        <Text>Dirección del restaurante</Text>
        <TextInput placeholder="Digite la dirección"
          onChangeText={(value) => handleChangeText('direccion', value)} />
      </View>
      <View style={styles.inputGroup}>
        <Text>Seleccione el tipo de comida</Text>
        <RNPickerSelect
          onValueChange={(value) => handleChangeText('tipoComida', value)}
          items={foods}
          pickerProps={{ style: { overflow: 'hidden' } }}
        />
      </View>
      <View style={styles.inputGroup} >
        <Text>Aforo del restaurante</Text>
        <TextInput placeholder="Digite el aforo"
          onChangeText={(value) => handleChangeText('aforo', value)} />
      </View>
      <View style={styles.inputGroup} >
        <Text>Valor de la reserva por persona</Text>
        <TextInput placeholder="Digite el valor"
          onChangeText={(value) => handleChangeText('valorPorPersona', value)} />
      </View>
      <Button title="Save restaurant"
        onPress={() => saveNewRestaurant()}></Button>
    </ScrollView >
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

export default CreateRestaurantScreen;