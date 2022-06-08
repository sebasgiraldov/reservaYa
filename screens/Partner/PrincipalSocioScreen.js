import React, { useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, Text } from 'react-native'

/**
 * Ventana principal cuando se inicia sesión como socio
 */
const PrincipalSocioScreen = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Button title="Crear evento"
                    onPress={() => props.navigation.navigate('CreateEventScreen')}></Button>
            </View>
            <View style={styles.inputGroup}>
                <Button title="Crear restaurante"
                    onPress={() => props.navigation.navigate('CreateRestaurantScreen')}></Button>
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

export default PrincipalSocioScreen