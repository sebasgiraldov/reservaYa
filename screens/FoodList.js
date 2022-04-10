import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const FoodList = (props) => {

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    firebase.db.collection("foods").onSnapshot((querySnapshot) => {
      const foods = [];

      querySnapshot.docs.forEach((doc) => {
        const { name, identificador } = doc.data();
        foods.push({
          clave: doc.id,
          name,
          identificador,
        });
      });

      setFoods(foods)
    });
  }, []);

  return (
    <ScrollView>
      <View style={{padding: 5}}>
        <Button title="Create Food"
          onPress={() => props.navigation.navigate('CreateFoodScreen')} />
      </View>
      {
        foods.map(food => {
          return (
            <ListItem
              key={food.clave} bottomDivider onPress={() => {
                props.navigation.navigate('FoodDetailScreen', {
                  foodClave: food.clave
                })
              }}>
              <ListItem.Chevron />
              <Avatar source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQd-mtIqHkBg55zFD-c41alEkHV7hWs71xQ&usqp=CAU' }} rounded />
              <ListItem.Content>
                <ListItem.Title>{food.name}</ListItem.Title>
                <ListItem.Subtitle>{food.identificador}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
    </ScrollView>
  );
};

export default FoodList