import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Alert } from 'react-native'
import { ActivityIndicator } from 'react-native';
import firebase from '../database/firebase'
import QRCode from "react-qr-code";

const ApoinmentDetailScreen = (props) => {
    const initialState = {
        clave: '',
        nombreCliente: '',
        evento: '',
        cantidadBoletas: '',
        qr: '',
    }
    console.log(props)
    const [apoinment, setApoinment] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const getApoitmentByClave = async (clave) => {
        const dbRef = firebase.db.collection("reservas").doc(clave);
        const doc = await dbRef.get();
        const apoinment = doc.data();
        setApoinment({
            ...apoinment,
            clave: doc.clave,
        });
        setLoading(false);
    };

    useEffect(() => {
        getApoitmentByClave(props.route.params.apoinmentClave);
    }, []);

    const handleChangeText = (name, value) => {
        setApoinment({ ...apoinment, [name]: value })
    };


    const deleteApoinment = async () => {
        const dbRef = firebase.db.collection('reservas').doc(props.route.params.apoinmentClave);
        await dbRef.delete();
        props.navigation.navigate('ApoinmentList')
    }

    const updateApoinment = async () => {
        const dbRef = firebase.db.collection('reservas').doc(props.route.params.apoinmentClave);
        await dbRef.set({
            nombreCliente: apoinment.nombreCliente,
            evento: apoinment.evento,
            cantidadBoletas: apoinment.cantidadBoletas,
            qr: apoinment.qr,
        })
        setApoinment(initialState)
        props.navigation.navigate('ApoinmentList')
    }

    const openConfirmationAlert = () => {
        Alert.alert('Remove the apoinment', 'Are you sure?', [
            { text: 'Yes', onPress: () => deleteApoinment() },
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
                <TextInput placeholder="nombreCliente"
                    value={apoinment.nombreCliente}
                    onChangeText={(value) => handleChangeText('nombreCliente', value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Evento"
                    value={apoinment.evento}
                    onChangeText={(value) => handleChangeText('evento', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Cantidad de boletas"
                    value={apoinment.cantidadBoletas}
                    onChangeText={(value) => handleChangeText('cantidadBoletas', value)} />
            </View>
            <QRCode value={apoinment.qr} size='300'/>
            <View style={styles.inputGroup}>
                <Button color="#19AC52" title="Update apoinment"
                    onPress={() => updateApoinment()}></Button>
            </View>
            <View>
                <Button color="red" title="Delete apoinment"
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