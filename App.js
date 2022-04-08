import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

  const Stack = createStackNavigator()
import GenreList from './screens/GenreList'
import CreateGenreScreen from './screens/CreateGenreScreen'
import Inicio from './screens/InicioScreen';


function MyStack(){
  return(
    <Stack.Navigator>

      <Stack.Screen name="Inicio" 
      component={Inicio} 
      options={{title: 'Inicio'}}/>
      
      <Stack.Screen name="GenreList" 
      component={GenreList} 
      options={{title: 'Genres List'}}/>

      <Stack.Screen name="CreateGenreScreen" 
      component={CreateGenreScreen} 
      options={{title: 'Create a new genre'}}/>

    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});