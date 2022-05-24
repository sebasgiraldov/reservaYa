import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import firebase from "../../database/firebase";
import RNPickerSelect from "react-native-picker-select"

/**
 * Ventana para crear un nuevo Restaurante
 */
const CreateRestaurantScreen = () => {

  const [state, setState] = useState({
    nombre: '',
    direccion: '',
    aforo: '',
    tipo_comida: '',
    valor_por_persona: ''
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <RNPickerSelect
          onValueChange={(value) => handleChangeText('tipo_comida', value)}
          items={foods}
          pickerProps={{ style: { overflow: 'hidden' } }}
        />

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

export default CreateRestaurantScreen;