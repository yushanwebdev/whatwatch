import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Album, HEADER_DELTA, MAX_HEADER_HEIGHT } from "./Model";

interface CoverProps {
  album: Album;
  scrollOffset: SharedValue<number>;
}

export default ({ album: { cover }, scrollOffset }: CoverProps) => {
  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollOffset.value,
            [-MAX_HEADER_HEIGHT, 0],
            [4, 1],
            {
              extrapolateRight: Extrapolate.CLAMP,
            }
          ),
        },
      ],
    };
  });

  const animatedBlackBgStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [-64, 0, HEADER_DELTA],
        [0, 0.2, 1]
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedViewStyles]}>
      <Image style={styles.image} source={cover} />
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
          },
          animatedBlackBgStyles,
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
