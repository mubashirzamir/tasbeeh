import type React from "react"
import {Dimensions, StyleSheet} from "react-native"
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated"
import {LinearGradient} from "expo-linear-gradient"

const {width} = Dimensions.get("window")
const BEAD_SIZE = 100
const ACTIVE_BEAD_SIZE = 125

interface BeadProps {
    index: number
    isActive: boolean
    animatedValue: Animated.SharedValue<number>
    totalBeads: number
}

const Bead: React.FC<BeadProps> = ({index, isActive, animatedValue, totalBeads}) => {
    // Calculate the middle index
    const middleIndex = Math.floor(totalBeads / 2)
    const distanceFromMiddle = Math.abs(index - middleIndex)

    // Create animated styles for the bead
    const animatedStyle = useAnimatedStyle(() => {
        // Scale based on whether it's active
        const scale = isActive
            ? interpolate(animatedValue.value, [-50, 0, 50], [0.95, 1, 0.95], Extrapolate.CLAMP)
            : interpolate(animatedValue.value, [-50, 0, 50], [0.9, 1, 0.9], Extrapolate.CLAMP)

        // Translate Y based on the animated value and position in the chain
        const translateY = animatedValue.value + (index - middleIndex) * (BEAD_SIZE + 10)

        // Shadow opacity changes with movement to simulate lighting
        const shadowOpacity = interpolate(animatedValue.value, [-50, 0, 50], [0.2, 0.4, 0.2], Extrapolate.CLAMP)

        return {
            transform: [{translateY}, {scale}],
            shadowOpacity,
        }
    })

    // Different wood textures for variety
    const getBeadColors = () => {
        const woodTypes = [
            ["#8B4513", "#A0522D", "#CD853F"], // Standard wood
            ["#5D4037", "#795548", "#A1887F"], // Dark wood
            ["#D2B48C", "#DEB887", "#F5DEB3"], // Light wood
        ]

        // Use index to select wood type, but make active bead special
        const colorIndex = isActive ? 0 : index % woodTypes.length
        return ["#d29af3", "#1a8383", "#1a8383"]
    }

    const beadColors = getBeadColors()
    const beadSize = isActive ? ACTIVE_BEAD_SIZE : BEAD_SIZE

    return (
        <Animated.View
            style={[
                styles.beadContainer,
                animatedStyle,
                {
                    width: beadSize,
                    height: beadSize,
                    borderRadius: beadSize / 2,
                    zIndex: isActive ? 10 : 10 - distanceFromMiddle,
                },
            ]}
        >
            <LinearGradient colors={beadColors} style={styles.bead} start={{x: 0.1, y: 0.2}} end={{x: 0.9, y: 0.8}}>
                <Animated.View style={styles.beadHole}/>
            </LinearGradient>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    beadContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 6,
        elevation: 8,
    },
    bead: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: "#1a9db3",
    },
    beadHole: {
        width: "20%",
        height: "20%",
        borderRadius: 100,
        backgroundColor: "#1a8383",
    },
})

export default Bead
