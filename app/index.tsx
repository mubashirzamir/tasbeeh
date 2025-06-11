"use client"

import {StyleSheet, View} from "react-native";
import Tasbeeh from "@/components/tasbeeh/Tasbeeh";

export default function App() {
    return (
        <View style={styles.container}>
            <Tasbeeh/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
