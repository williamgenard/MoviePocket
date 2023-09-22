import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button, FlatList, StyleSheet, Text, View } from "react-native"
import { getMovies } from "../../db/db"
import MovieListItem from "./movie-list-item"

const URL = "https://api.themoviedb.org/3/movie/popular?api_key=2d736b2712a1889b09a7959c2d18559f&language=fr-FR&page=__page__"
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"

export default function MovieList({ route, navigation }) {
    const { listType } = route.params

    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)

    const isFocus = useIsFocused()

    useEffect(() => {
        if (listType === "popular") {
            axios.get(URL.replace("__page__", page))
                .then(
                    ({data}) => {
                        console.log(data.results)
                        if (movies.length < page * 20) {
                            setMovies(p => [...p, ...data.results])
                        }
                    }
                )
                .catch((e) => {
                    console.log({...e})
                })
        }
        else {
            getMovies()
                .then(
                    (data) => {
                        console.log(data)
                        setMovies(data.rows._array.map(movie => ({
                            id: movie.id,
                            title: movie.title,
                            poster_path: movie.image,
                            vote_average: movie.rating
                        })))
                    }
                )
                .catch((e) => {
                    console.log(e)
                })
        }
    }, [listType, page, isFocus])

    const handleItemPress = (id) => {
        navigation.navigate("Detail", {
            id
        })
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={movies}
                renderItem={ ({item}) => <MovieListItem 
                        id={item.id} 
                        title={item.title} 
                        image={IMAGE_URL + item.poster_path} 
                        rating={item.vote_average}
                        onItemPressed={handleItemPress}></MovieListItem>}
                keyExtractor={ item => item.id }
                onEndReached={(listType === "popular") ? () => setPage(p => p+1) : null}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})