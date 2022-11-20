import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { HEADER_DELTA, MIN_HEADER_HEIGHT } from "./Model";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface HeaderProps {
  artist: string;
  scrollOffset: SharedValue<number>;
}

export default ({ artist, scrollOffset }: HeaderProps) => {
  const animatedHeaderStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [HEADER_DELTA - 20, HEADER_DELTA],
        [0, 1]
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedHeaderStyles]}>
      <Text style={styles.title}>{artist}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});
