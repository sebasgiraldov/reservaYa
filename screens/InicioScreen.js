import React, { useEffect, useState} from 'react'
import {View, Text, ScrollView, Button, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const Inicio = (props) => {
  
  useEffect(() =>{
      
  }, []);

  return (
    <ScrollView>
        <view> 
            <img style={{widht: 200, height: 200, marginLeft: 100, marginTop: 10}} src='https://cdn-icons-png.flaticon.com/512/2907/2907150.png' />

            <Icon.Button name="musical-notes" backgroundColor="#87cefa" onPress = {() => props.navigation.navigate('GenreList')}>
                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
                List of Genres
                </Text>
            </Icon.Button>
            </view>
            <view>
            <Icon.Button name="fast-food" backgroundColor="#778899" onPress = {() => props.navigation.navigate('CreateGenreScreen')}>
                <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
                List of Foods
                </Text>
            </Icon.Button>
            </view>
    </ScrollView>
  );
};



export default Inicio