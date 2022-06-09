import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, Text } from 'react-native'

/**
 * Ventana principal cuando se inicia sesión como socio
 */
const PrincipalSocioScreen = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonLog}>
                <Button title="Sign out" color="#f194ff"
                    onPress={() => props.navigation.navigate('PrincipalScreen')}></Button>
            </View>
            <View style={styles.inputGroup}>
                <Button title="Crear evento"
                    onPress={() => props.navigation.navigate('EventList')}></Button>
            </View>
            <View style={styles.inputGroup}>
                <Button title="Crear restaurante"
                    onPress={() => props.navigation.navigate('RestaurantList')}></Button>
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
    },
    buttonLog: {
        flex: 1,
        padding: 0,
        marginBottom: 50,
        flexDirection: 'row',
        alignSelf: "flex-end",
    }
})

export default PrincipalSocioScreen