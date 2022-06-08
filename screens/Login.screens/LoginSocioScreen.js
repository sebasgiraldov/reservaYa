import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, Text } from 'react-native'
import firebase from '../../database/firebase'


/**
 * Ventana para iniciar sesion como socio
 */
const LoginSocioScreen = (props) => {

  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    firebase.db.collection("socio").onSnapshot((querySnapshot) => {
      const socio = [];

      querySnapshot.docs.forEach((doc) => {
        const { email, password } = doc.data();
        socio.push({
          clave: doc.id,
          email,
          password,
        });
      });
      setUsuarios(socio);
    });
  }, []);

  /**
   * Metodo para validar las credenciales del socio
   * para iniciar sesion
   */
  const validarCredenciales = () => {
    var activo = false;
    usuarios.forEach((user) => {
      if (user.email === state.email) {
        if (user.password === state.password) {
          activo = true;
        }
      }
    });
    return activo;
  }

  /**
   * Metodo para asignar los valores correspondientes al login
   * @param {*} name 
   * @param {*} value 
   */
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  };


  /**
   * Se realiza verifica que los campos email y password no esten vacios
   * y se llama al metodo que valida las credenciales.
   */
  const iniciarSesion = async () => {
    var activo = validarCredenciales();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (state.email === '') {
      alert('Please provide a email')
    } else if (reg.test(state.email) === false) {
      alert("Email is Not Correct");
    } else if (state.password === '') {
      alert('Please provide a password')
    } else if(activo) {
      activo = false;
      props.navigation.navigate('Inicio');
    } else {
        alert('Credenciales incorrectas')
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text>Email</Text>
        <TextInput placeholder="Email"
          onChangeText={(value) => handleChangeText('email', value)} />
      </View>
      <View style={styles.inputGroup} >
        <Text>Password</Text>
        <TextInput placeholder="Password" secureTextEntry={true}
          onChangeText={(value) => handleChangeText('password', value)} />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Sign in"
          onPress={() => iniciarSesion()}></Button>
      </View>
      <View>
        <Text>Forgot Password?</Text>
      </View>
      <View>
        <Text>Don't have account? Create.</Text>
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

export default LoginSocioScreen