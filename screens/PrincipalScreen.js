import React from 'react'
import { View, Button, ScrollView, StyleSheet } from 'react-native'

/**
 * Ventana principal
 */
const PrincipalScreen = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Button title="Mostrar eventos"
                    onPress={() => props.navigation.navigate('EventListUsuario')}></Button>
            </View>
            <View style={styles.inputGroup}>
                <Button title="Mostrar restaurantes"
                    onPress={() => props.navigation.navigate('RestaurantListUsuario')}></Button>
            </View>
            <View style={styles.inputGroup}>
                <Button title="Ingresar como socio"
                    onPress={() => props.navigation.navigate('LoginSocioScreen')}></Button>
            </View>
            <View style={styles.inputGroup}>
                <Button title="pruebas"
                    onPress={() => props.navigation.navigate('Pruebas')}></Button>
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

export default PrincipalScreen