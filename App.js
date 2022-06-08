import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()
import GenreList from './screens/Genre.screens/GenreList'
import CreateGenreScreen from './screens/Genre.screens/CreateGenreScreen'
import Inicio from './screens/InicioScreen';
import GenreDetailScreen from './screens/Genre.screens/GenreDetailScreen'
import FoodDetailScreen from './screens/Food.screens/FoodDetailScreen'
import CreateFoodScreen from './screens/Food.screens/CreateFoodScreeen';
import FoodList from './screens/Food.screens/FoodList';
import EventList from './screens/Event.screens/EventList';
import ApoinmentList from './screens/Apoinment.screens/ApoinmentList';
import CreateEventScreen from './screens/Event.screens/CreateEventScreen';
import EventDetailScreen from './screens/Event.screens/EventDetailScreen';
import ApoinmentDetailScreen from './screens/Apoinment.screens/ApoinmentDetailScreen';
import CreateReservaScreen from './screens/Apoinment.screens/CreateReservaScreen';
import QRScreen from './screens/QRScreen';
import CreateRestaurantScreen from './screens/Restaurant.screens/CreateRestaurantScreen';
import RestaurantList from './screens/Restaurant.screens/RestaurantList';
import RestaurantDetailScreen from './screens/Restaurant.screens/RestaurantDetailScreen';
import LoginSocioScreen from './screens/Login.screens/LoginSocioScreen';
import PrincipalSocioScreen from './screens/Partner/PrincipalSocioScreen';

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

      <Stack.Screen name="QRScreen"
        component={QRScreen}
        options={{ title: 'Codigo QR' }} />

      <Stack.Screen name="RestaurantList"
        component={RestaurantList}
        options={{ title: 'Restaurant List' }} />

      <Stack.Screen name="CreateRestaurantScreen"
        component={CreateRestaurantScreen}
        options={{ title: 'Create Restaurant' }} />

      <Stack.Screen name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={{ title: 'Detail Restaurant' }} />
      
      <Stack.Screen name="LoginSocioScreen"
        component={LoginSocioScreen}
        options={{ title: 'Partner Login' }} />

      <Stack.Screen name="PrincipalSocioScreen"
        component={PrincipalSocioScreen}
        options={{ title: 'Partner' }} />

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