"use client"

import {useEffect, useState} from "react"
import {SafeAreaView, StyleSheet} from "react-native"
import Background from "@/components/Background"
import Tasbeeh from "@/components/Tasbeeh";

export default function App() {
    const [count, setCount] = useState(0)
    const [target, setTarget] = useState(33)

    // Reset count when target is reached
    useEffect(() => {
        if (count >= target) {
            // Wait a moment before resetting to show the achievement
            setTimeout(() => {
                setCount(0)
            }, 1500)
        }
    }, [count, target])

    return (
        <>
            <Background/>
            <SafeAreaView style={styles.container}>
                <Tasbeeh
                    count={count}
                    setCount={setCount}
                    totalBeads={7} // Visible beads in view
                    target={target}
                />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "transparent", // Changed to transparent to show background
    },
    header: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        color: "#5d4037", // Warm brown
        marginBottom: 8,
    },
    counter: {
        fontSize: 22,
        fontWeight: "500",
        color: "#8d6e63", // Lighter brown
    },
})
