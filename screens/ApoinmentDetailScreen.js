import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Alert } from 'react-native'
import { ActivityIndicator } from 'react-native';
import firebase from '../database/firebase'

const ApoitmentDetailScreen = (props) => {
    const initialState = {
        clave: "",
        idUsuario: "",
        idEvento: "",
        genero: "",
        nombreEvento: "",
        organizadorEvento: "",
        valorReserva: "",
        qr: "",
        estadoQR: "",
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
            idUsuario: apoitment.idUsuario,
            idEvento: apoitment.idEvento,
            genero: apoitment.genero,
            nombreEvento: apoitment.nombreEvento,
            organizadorEvento: apoitment.organizadorEvento,
            valorReserva: apoitment.valorReserva,
            qr: "",
            estadoQR: "Activo",
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
                <TextInput placeholder="Id Evento"
                    value={apoitment.idEvento}
                    onChangeText={(value) => handleChangeText('idEvento', value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Id Usuario"
                    value={apoitment.idUsuario}
                    onChangeText={(value) => handleChangeText('idUsuario', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Genero"
                    value={apoitment.genero}
                    onChangeText={(value) => handleChangeText('genero', value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Nombre del evento"
                    value={apoitment.nombreEvento}
                    onChangeText={(value) => handleChangeText('nombreEvento', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Organizador del Evento"
                    value={apoitment.organizadorEvento}
                    onChangeText={(value) => handleChangeText('organizadorEvento', value)} />
            </View>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Valor de la reserva"
                    value={apoitment.valorReserva}
                    onChangeText={(value) => handleChangeText('valorReserva', value)} />
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

export default ApoitmentDetailScreen