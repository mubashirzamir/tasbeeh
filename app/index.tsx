"use client"

import {StyleSheet, View} from "react-native";
import Tasbeeh from "@/components/tasbeeh/Tasbeeh";
import TimeSelector from "@/components/tasbeeh/TimeSelector";

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TimeSelector limit={24} defaultOffsetHour={11}/>
            </View>
            <View style={styles.column}>
                <Tasbeeh/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        height: "100vh", // Needed for web layout
    },
    column: {
        flex: 1, // Each column takes 50% of the width
        padding: 10,
    },
});
