import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import MovieList from "../../containers/movie-list/movie-list";
import { MaterialIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator()

export default function List() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Popular" component={MovieList} initialParams={{ listType: "popular" }}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="local-movies" size={size} color={color} />
                        ) 
                    }
                }></Tab.Screen>
            <Tab.Screen name="Fav" component={MovieList} initialParams={{ listType: "fav" }}
                options={
                    {
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="movie-filter" size={size} color={color} />
                        ) 
                    }
                }></Tab.Screen>
        </Tab.Navigator>
    )
}