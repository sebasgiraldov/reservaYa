import React, { useEffect } from 'react'
import { View, Button, TextInput, ScrollView, Text } from 'react-native'
import firebase from '../database/firebase'


/**
 * Realizar pruebas
 */
const Pruebas = (props) => {

    useEffect(() => {
        /**
         * Prueba coleccion existente
         * Traer datos de la coleccion "restaurantes"
         * Debe retornar la lista de restaurantes
         */
        firebase.db.collection("restaurantes").onSnapshot((querySnapshot) => {
            const restaurante = [];
            querySnapshot.docs.forEach((doc) => {
                const { nombre, direccion } = doc.data();
                restaurante.push({
                    clave: doc.id,
                    nombre,
                    direccion,
                });
            });
            console.log("Lista de todos los restaurantes: ", restaurante);
        });

        /**
         * Prueba coleccion no existente
         * Traer los datos de una coleccion que no existe "restaurante" 
         * Debe retornar []
         */
        firebase.db.collection("restaurante").onSnapshot((querySnapshot) => {
            const restaurant = [];
            querySnapshot.docs.forEach((doc) => {
                const { nombre, direccion } = doc.data();
                restaurant.push({
                    clave: doc.id,
                    nombre,
                    direccion,
                });
            });
            console.log("Datos de una coleccion que no existe: [] = ",restaurant);
        });

        /**
         * Prueba restaurante existente
         * Traer los datos de un restaurante en especifico segun el id 
         * Debe retornar {nombre: "Gran china", direccion: "Av santander", clave: "1rpbdr0GJvp7CWoDn0df"}
         */
        firebase.db.collection("restaurantes").onSnapshot((querySnapshot) => {
            const restarantePorId = [];
            querySnapshot.docs.forEach((doc) => {
                const { nombre, direccion } = doc.data();
                if (doc.id === "1rpbdr0GJvp7CWoDn0df") {
                    restarantePorId.push({
                        clave: doc.id,
                        nombre,
                        direccion,
                    });
                }
            });
            console.log("[{nombre: Gran china, direccion: Av santander, clave: 1rpbdr0GJvp7CWoDn0df}] = ",restarantePorId);
        });

        /**
         * Prueba restaurante no existente
         * Traer los datos de un restaurante en especifico que no existe segun el id 
         * Debe retornar []
         */
        firebase.db.collection("restaurantes").onSnapshot((querySnapshot) => {
            const restaranteNoExiste = [];
            querySnapshot.docs.forEach((doc) => {
                const { nombre, direccion } = doc.data();
                if (doc.id === "1rpbdr0GJvp7CWoDn0d") {
                    restaranteNoExiste.push({
                        clave: doc.id,
                        nombre,
                        direccion,
                    });
                }
            });
            console.log("Restaurante no existente: [] = ",restaranteNoExiste);
        });

    }, []);


    const Regresar = async () => {
        props.navigation.navigate('PrincipalScreen');
    };

    return (
        <ScrollView>
            <View>
                <Text>Revise la consola</Text>
            </View>
            <View>
                <Button title="Volver"
                    onPress={() => Regresar()}></Button>
            </View>
        </ScrollView>
    )
}

export default Pruebas