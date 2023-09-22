import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function MovieListItem({ id, title, image, rating, onItemPressed}) {

    return (
        <Pressable onPress={() => onItemPressed(id)}>
            <View style={styles.container}>
                <Image style={styles.image} source={{
                    uri: image
                }}></Image>
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.rating}>Rating : {rating}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 300,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    image: {
        flex: 1
    },
    info: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        flex: 1
    },
    title: {
        textAlign: "center",
        fontSize: 20
    }
})