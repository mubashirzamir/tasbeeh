"use client"

import {ScrollView, StyleSheet, View} from "react-native";
import Beads from "@/components/tasbeeh/beads/Beads";

type TasbeehProps = {}

const defaultOffset = 0

const Tasbeeh = () => {
    const onScroll = () => {
        console.log('onScroll')
    }

    return (
        <View style={styles.scrollContainer}>
            <ScrollView
                contentOffset={{
                    x: 0,
                    y: defaultOffset,
                }}
                scrollEventThrottle={16}
                onScroll={onScroll}
                showsVerticalScrollIndicator={true}
            >
                <Beads amount={100}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        width: "50%",
        height: "100vh",
    }
});

export default Tasbeeh
