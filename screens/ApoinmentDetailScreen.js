import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Alert } from 'react-native'
import { ActivityIndicator } from 'react-native';
import firebase from '../database/firebase'

const ApoinmentDetailScreen = (props) => {
    const initialState = {
        clave: "",
        nombreCliente: "",
        evento: "",
        cantidadBoletas: "",
    }
    const [apoitment, setApoitment] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const getApoitmentByClave = async (clave) => {
        const dbRef = firebase.db.collection("reservas").doc(clave);
        const doc = await dbRef.get();
        const apoitment = doc.data();
        setApoitment({
            ...apoitment,
            clave: doc.clave,
        });
        console.log(apoitment)
        setLoading(false);
    };

    useEffect(() => {
        getApoitmentByClave(props.route.params.apoitmentClave);
    }, []);

    const handleChangeText = (name, value) => {
        setApoitment({ ...apoitment, [name]: value })
    };


    const deleteApoitment = async () => {
        const dbRef = firebase.db.collection('reservas').doc(props.route.params.apoitmentClave);
        await dbRef.delete();
        props.navigation.navigate('ApoitmentList')
    }

    const updateApoitment = async () => {
        const dbRef = firebase.db.collection('reservas').doc(props.route.params.apoitmentClave);
        await dbRef.set({
            nombreCliente: apoitment.nombreCliente,
            evento: apoitment.evento,
            cantidadBoletas: apoitment.cantidadBoletas,
        })
        setApoitments(initialState)
        props.navigation.navigate('ApoitmentList')
    }

    const openConfirmationAlert = () => {
        Alert.alert('Remove the apoitment', 'Are you sure?', [
            { text: 'Yes', onPress: () => deleteApoitment() },
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
                <TextInput placeholder={"Nombre del cliente"}
                    value={apoitment.nombreCliente}
                    onChangeText={(value) => handleChangeText('nombreCliente', value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Evento"
                    value={apoitment.evento}
                    onChangeText={(value) => handleChangeText('evento', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Cantidad de boletas"
                    value={apoitment.cantidadBoletas}
                    onChangeText={(value) => handleChangeText('cantidadBoletas', value)} />
            </View>
            <View style={styles.inputGroup}>
                <Button color="#19AC52" title="Update apoitment"
                    onPress={() => updateApoitment()}></Button>
            </View>
            <View>
                <Button color="red" title="Delete apoitment"
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

export default ApoinmentDetailScreen