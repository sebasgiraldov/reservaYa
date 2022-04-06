import React, { useEffect, useState} from 'react'
import {View, Text, ScrollView, Button} from 'react-native'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements' 

const GenreList = (props) => {
  
  const [genres, setGenres] = useState([]);

  useEffect(() =>{
      firebase.db.collection("genres").onSnapshot((querySnapshot) => {
        const genres = [];

      querySnapshot.docs.forEach((doc) =>{
        const {name, id} = doc.data();
        genres.push({
          clave: doc.id,
          name, 
          id,
        });
      });

      setGenres(genres)
    });
  }, []);

  return (
    <ScrollView>
      <Button title="Create Genre" 
      onPress = {() => props.navigation.navigate('CreateGenreScreen')} />
    
    {
      genres.map(genre => {
        return(
          <ListItem
          key={genre.clave} bottomDivider onPress={() => 
          {props.navigation.navigate('',{
            genreClave: genre.clave
          })
        }}>
            <ListItem.Chevron/>
            <Avatar source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQd-mtIqHkBg55zFD-c41alEkHV7hWs71xQ&usqp=CAU'}} rounded/>
            <ListItem.Content>
              <ListItem.Title>{genre.name}</ListItem.Title>
              <ListItem.Subtitle>{genre.id}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
      })
    }
    </ScrollView>
  );
};

export default GenreList