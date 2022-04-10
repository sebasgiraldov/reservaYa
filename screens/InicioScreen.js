import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native'
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const Inicio = (props) => {

  useEffect(() => {

  }, []);

  return (
    <ScrollView>
      <Image style={{ width: 200, height: 200, marginLeft: 100, marginTop: 10 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2907/2907150.png' }}/>
      <View style={{padding: 5}}>
        <Icon.Button name="musical-notes" backgroundColor="#87cefa" onPress={() => props.navigation.navigate('GenreList')}>
          {/* <Text style={{ fontFamily: 'Arial', fontSize: 15 }}> */}
          <Text >
            List of Genres
          </Text>
        </Icon.Button>
      </View>
      <View style={{padding: 5}}>
        <Icon.Button name="fast-food" backgroundColor="#778899" onPress={() => props.navigation.navigate('FoodList')}>
          {/* <Text style={{ fontFamily: 'Arial', fontSize: 15 }}> */}
          <Text >
            List of Foods
          </Text>
        </Icon.Button>
      </View>
    </ScrollView>
  );
};



export default Inicio