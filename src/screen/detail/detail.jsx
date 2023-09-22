import { useEffect, useState } from "react";
import { Button, Image, Linking, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import axios from "axios"
import { checkIfMovieIsFav, deleteMovie, insertMovie } from "../../db/db";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"

export default function Detail({ route }) {

    const { id } = route.params

    const [movie, setMovie] = useState(null)
    const [isFav, setIsFav] = useState(false)

    useEffect(() => {
        checkIfMovieIsFav(id)
            .then((data) => {
                if (data.rows._array.length > 0) {
                    setIsFav(true)
                }
            })
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2d736b2712a1889b09a7959c2d18559f&language=fr-FR`)
            .then(
                ({data}) => {
                    setMovie(data)
                }
            )
    }, [])

    const manageFav = () => {
        if (!isFav) {
            console.log(movie.poster_path)
            insertMovie(movie.id, movie.title, movie.vote_average, movie.poster_path)
                .then(() => {
                    console.log("Movie inserted")
                })
        }
        else {
            deleteMovie(movie.id)
                .then(() => {
                    console.log("Movie deleted")
                })
        }
        setIsFav(p => !p)
    }

    const handleTrailer = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=2d736b2712a1889b09a7959c2d18559f&language=en-US`)
            .then(
                ({data}) => {
                    Linking.canOpenURL("https://www.youtube.com/watch?v=" + data.results[0].key)
                        .then((canOpen) => {
                            if (canOpen) {
                                Linking.openURL("https://www.youtube.com/watch?v=" + data.results[0].key)
                            }
                        })

                }
            )
    }

    return (
        <>
            {movie && (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.topContainer}>
                            <Image style={styles.image} source={{
                                uri: IMAGE_URL + movie.backdrop_path
                            }}></Image>
                            <Text style={styles.title}>{movie.title}</Text>
                            <View style={styles.info}>
                                <Text>{movie.release_date}</Text>
                                
                                <View style={styles.infoItem}>
                                    <Text>{movie.genres.map(g => g.name).join(",")}</Text>
                                </View>

                                <Text>{movie.vote_average}</Text>
                            </View>
                            <Text style={styles.overview}>{movie.overview}</Text>
                        </View>
                        <View style={styles.bottomContainer}>
                            <Button title="Trailer" onPress={handleTrailer}></Button>
                            <View style={styles.favContainer}>
                                <Text>Fav : </Text>
                                <Switch value={isFav} onValueChange={p => manageFav()}></Switch>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    topContainer: {

    },
    image: {
        height: 250
    },
    title: {
        fontSize: 25,
        margin: 5
    },
    info: {
        flexDirection: "row",
        margin: 5
    },
    infoItem: {
        flex: 1,
        marginLeft: 10
    },
    overview: {
        margin: 5
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    favContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})