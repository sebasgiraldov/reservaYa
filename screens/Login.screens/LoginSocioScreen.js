import React, { useState } from 'react'
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

  /**
   * Metodo para asignar los valores correspondientes al login
   * @param {*} name 
   * @param {*} value 
   */
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  };


  /**
   * Se realiza la consulta a la base de datos para verificar si el email y contraseña coinciden.
   */
  const iniciarSesion = async () => {
    if (state.email === '') {
      alert('Please provide a email')
    } else if (state.password === '') {
      alert('Please provide a password')
    } else {
      props.navigation.navigate('PrincipalSocioScreen');
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