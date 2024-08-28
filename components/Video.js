import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Video } from "expo-av";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

// const localVideos = [
//   {
//     id: "1",
//     uri: require("../assets/WhatsApp Video 2024-08-22 at 18.34.06_3abebd13.mp4"),
//   },
//   {
//     id: "2",
//     uri: require("../assets/WhatsApp Video 2024-08-22 at 18.34.06_3abebd13.mp4"),
//   },
// ];

const TikTokClone = () => {
  const flatListRef = useRef(null);
  const videoRefs = useRef({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pausedStates, setPausedStates] = useState({});

  const renderItem = ({ item, index }) => (
    <View style={styles.container}>
      <Video
        ref={(ref) => (videoRefs.current[index] = ref)}
        source={item.uri}
        style={styles.video}
        resizeMode="contain"
        shouldPlay={
          currentIndex === index &&
          !pausedStates[index] &&
          !videoRefs.current[index]?.isPlaying
        }
        isLooping
      />

      <TouchableOpacity
        style={styles.pauseButton}
        onPress={() => togglePause(index)}
      >
        <Text style={styles.pauseButtonText}>
          {pausedStates[index] ? "Play" : "Pause"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);

      Object.keys(videoRefs.current).forEach((key) => {
        const index = parseInt(key);
        if (index !== newIndex) {
          videoRefs.current[key].pauseAsync();
          setPausedStates((prev) => ({ ...prev, [index]: true }));
        } else {
          setPausedStates((prev) => ({ ...prev, [index]: false }));
        }
      });
    }
  });

  const togglePause = (index) => {
    setPausedStates((prev) => {
      const newState = { ...prev, [index]: !prev[index] };
      if (newState[index]) {
        videoRefs.current[index].pauseAsync();
      } else {
        videoRefs.current[index].playAsync();
      }
      return newState;
    });
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <FlatList
      ref={flatListRef}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={height}
      snapToAlignment="center"
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  pauseButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  pauseButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TikTokClone;
