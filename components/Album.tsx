import * as React from "react";
import { View, StyleSheet } from "react-native";

import {
  Album,
  HEADER_DELTA,
  MAX_HEADER_HEIGHT,
  MIN_HEADER_HEIGHT,
} from "./Model";
import Header from "./Header";
import Content from "./Content";
import Cover from "./Cover";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface AlbumProps {
  album: Album;
}

export default ({ album }: AlbumProps) => {
  const { artist } = album;
  const scrollOffset = useSharedValue(0);

  const animatedShuffleButton = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, HEADER_DELTA],
            [0, -HEADER_DELTA],
            {
              extrapolateRight: Extrapolate.CLAMP,
            }
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Cover {...{ scrollOffset, album }} />
      <Content {...{ scrollOffset, album }} />
      <Header {...{ scrollOffset, artist }} />
      <Animated.View
        style={[
          {
            position: "absolute",
            top: MAX_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
            left: 0,
            right: 0,
          },
          animatedShuffleButton,
        ]}
      >
        <ShufflePlay />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
