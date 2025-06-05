"use client"

import React, { useRef } from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import Animated, { useSharedValue, withSpring, runOnJS } from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Bead from "./Bead"

const { height } = Dimensions.get("window")
const BEAD_SIZE = 200

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
}

interface TasbeehProps {
  count: number
  setCount: (count: number) => void
  totalBeads: number
  target: number
}

const Tasbeeh: React.FC<TasbeehProps> = ({ count, setCount, totalBeads, target }) => {
  const translateY = useSharedValue(0)
  const lastY = useSharedValue(0)
  const beadRefs = useRef<Animated.SharedValue<number>[]>(
      Array(totalBeads)
          .fill(0)
          .map(() => useSharedValue(0)),
  )

  const incrementCounter = () => {
    // triggerHaptic()
    setCount((prev) => prev + 1)
  }

  // Define gesture using Gesture Handler 2
  const pan = Gesture.Pan()
      .onChange(() => {
        runOnJS(console.log)("onChange")
      })
      .onStart(() => {
        runOnJS(console.log)("onStart")
      })
      .onUpdate((event) => {
        runOnJS(console.log)("onUpdate")

        const deltaY = event.translationY * 0.5
        translateY.value = deltaY

        for (let i = 0; i < beadRefs.current.length; i++) {
          const distance = Math.abs(i - Math.floor(totalBeads / 2))

          beadRefs.current[i].value = withSpring(
              translateY.value * (1 - distance * 0.2),
              {
                ...SPRING_CONFIG,
                mass: 0.8 + distance * 0.1,
              }
          )
        }

        if (Math.abs(translateY.value - lastY.value) > BEAD_SIZE) {
          if (translateY.value > lastY.value) {
            runOnJS(incrementCounter)()
          }
          lastY.value = translateY.value
        }
      })
      .onEnd(() => {
        runOnJS(console.log)("onEnd")

        translateY.value = withSpring(0, SPRING_CONFIG)

        for (let i = 0; i < beadRefs.current.length; i++) {
          beadRefs.current[i].value = withSpring(0, SPRING_CONFIG)
        }
      })

  const renderBeads = () => {
    const beads = []
    const middleIndex = Math.floor(totalBeads / 2)

    for (let i = 0; i < totalBeads; i++) {
      const isActive = i === middleIndex
      beads.push(
          <Bead key={i} index={i} isActive={isActive} animatedValue={beadRefs.current[i]} totalBeads={totalBeads} />
      )
    }

    return beads
  }

  return (
      <View style={styles.container}>
        <View style={styles.stringLine} />
        <GestureDetector touchAction={"pan-down"} gesture={pan}>
          <Animated.View style={styles.beadsContainer}>
            {renderBeads()}
          </Animated.View>
        </GestureDetector>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  beadsContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  stringLine: {
    position: "absolute",
    width: 10,
    height: height,
    backgroundColor: "#ffffff",
    zIndex: -1,
  },
})

export default Tasbeeh
