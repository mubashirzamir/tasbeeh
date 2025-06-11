import {StyleSheet, Text, View} from "react-native";

type BeadProps = {
    index: number;
};

const Bead = ({index}: BeadProps) => {
    return (
        <View style={styles.beadContainer}>
            <Text>Bead {index}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    beadContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A6E3E9",
        borderWidth: 1,
        borderColor: "#71C9CE",
    },
});

export default Bead;
