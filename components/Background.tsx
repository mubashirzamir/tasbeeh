import {StyleSheet, View, Dimensions} from "react-native"
import {LinearGradient} from "expo-linear-gradient"

const {width, height} = Dimensions.get("window")

const Background = () => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={["black"]} style={styles.background}>
                {/* Prayer mat texture pattern */}
                <View style={styles.patternContainer}>
                    {Array(20)
                        .fill(0)
                        .map((_, i) => (
                            <View key={i} style={styles.patternRow}>
                                {Array(10)
                                    .fill(0)
                                    .map((_, j) => (
                                        <View key={j}/>
                                    ))}
                            </View>
                        ))}
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width,
        height,
        zIndex: -10,
    },
    background: {
        flex: 1,
    },
    patternContainer: {
        flex: 1,
        opacity: 0.1,
    },
    patternRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    patternSquare: {
        width: width / 10,
        height: width / 10,
    },
})

export default Background
