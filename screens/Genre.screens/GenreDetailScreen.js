import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Alert, ActivityIndicator } from 'react-native'
import firebase from '../../database/firebase'

const GenreDetailScreen = (props) => {
  const initialState = {
    clave: "",
    name: "",
    id: "",
  }
  const [genre, setGenre] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const getGenreByClave = async (clave) => {
    const dbRef = firebase.db.collection("genres").doc(clave);
    const doc = await dbRef.get();
    const genres = doc.data();
    setGenre({
      ...genres,
      clave: doc.clave,
    });
    console.log(genres);
    setLoading(false);
  };

  useEffect(() => {
    getGenreByClave(props.route.params.genreClave);
  }, []);

  const handleChangeText = (name, value) => {
    setGenre({ ...genre, [name]: value })
  };

  const deletGenre = async () => {
    const dbRef = firebase.db.collection('genres').doc(props.route.params.genreClave);
    await dbRef.delete();
    props.navigation.navigate('GenreList')
  }

  const updateGenre = async () => {
    const dbRef = firebase.db.collection('genres').doc(props.route.params.genreClave);
    await dbRef.set({
      name: genre.name,
      id: genre.id,
    })
    setGenre(initialState)
    props.navigation.navigate('GenreList')
  }

  const openConfirmationAlert = () => {
    Alert.alert('Remove the genre', 'Are you sure?', [
      { text: 'Yes', onPress: () => deletGenre() },
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
        <TextInput placeholder="Name genre"
          value={genre.name}
          onChangeText={(value) => handleChangeText('name', value)} />
      </View>
      <View style={styles.inputGroup} >
        <TextInput placeholder="ID"
          value={genre.id}
          onChangeText={(value) => handleChangeText('id', value)} />
      </View>
      <View style={styles.inputGroup}>
        <Button color="#19AC52" title="Update genre"
          onPress={() => updateGenre()}></Button>
      </View>
      <View>
        <Button color="red" title="Delet genre"
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

export default GenreDetailScreen