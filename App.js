import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { dropDatabase, loadDatabase } from './src/db/db';
import Detail from './src/screen/detail/detail';
import List from './src/screen/list/list';

const Stack = createStackNavigator()

export default function App() {

  useEffect(() => {
      loadDatabase()
        .then(() => {
          console.log("Database loaded !")
        })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='List' component={List} options={{
          headerShown: false
        }}></Stack.Screen>
        <Stack.Screen name='Detail' component={Detail}></Stack.Screen>
      </Stack.Navigator>
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
