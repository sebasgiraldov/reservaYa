import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()
import GenreList from './screens/GenreList'
import CreateGenreScreen from './screens/CreateGenreScreen'
import Inicio from './screens/InicioScreen';
import GenreDetailScreen from './screens/GenreDetailScreen'
import FoodDetailScreen from './screens/FoodDetailScreen'
import CreateFoodScreen from './screens/CreateFoodScreeen';
import FoodList from './screens/FoodList';
import EventList from './screens/EventList';
import ApoinmentList from './screens/ApoinmentList';
import CreateEventScreen from './screens/CreateEventScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import ApoinmentDetailScreen from './screens/ApoinmentDetailScreen';
import CreateReservaScreen from './screens/CreateReservaScreen';

function MyStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Inicio"
        component={Inicio}
        options={{ title: 'Admin' }} />

      <Stack.Screen name="GenreList"
        component={GenreList}
        options={{ title: 'Genres List' }} />

      <Stack.Screen name="CreateGenreScreen"
        component={CreateGenreScreen}
        options={{ title: 'Create a new genre' }} />

      <Stack.Screen name="GenreDetailScreen"
        component={GenreDetailScreen}
        options={{ title: 'Detail Genre' }} />

      <Stack.Screen name="CreateFoodScreen"
        component={CreateFoodScreen}
        options={{ title: 'Create a new food' }} />

      <Stack.Screen name="FoodDetailScreen"
        component={FoodDetailScreen}
        options={{ title: 'Detail Food' }} />

      <Stack.Screen name="FoodList"
        component={FoodList}
        options={{ title: 'Food List' }} />

      <Stack.Screen name="EventList"
        component={EventList}
        options={{ title: 'Event List' }} />

      <Stack.Screen name="ApoinmentList"
        component={ApoinmentList}
        options={{ title: 'Apoinment List' }} />

      <Stack.Screen name="CreateEventScreen"
        component={CreateEventScreen}
        options={{ title: 'Create a new event' }} />

      <Stack.Screen name="EventDetailScreen"
        component={EventDetailScreen}
        options={{ title: 'Detail Event' }} />

      <Stack.Screen name="ApoinmentDetailScreen"
        component={ApoinmentDetailScreen}
        options={{ title: 'Detail List' }} />

      <Stack.Screen name="CreateReservaScreen"
        component={CreateReservaScreen}
        options={{ title: 'Create Reserva' }} />

    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
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