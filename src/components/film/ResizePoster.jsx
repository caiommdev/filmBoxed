import React, { useEffect, useState } from "react";
import { Text} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function ResizePoster(props) {
  const MinSize = props.min? props.min :200
  const MaxSize = props.max? props.max :500
  const multiplier = props.multiplier? props.multiplier : 1 

  const ImgScale= useSharedValue(MinSize*multiplier)
  
  const resizeHandler = Gesture.Tap().numberOfTaps(2).onStart(()=>{
    if (ImgScale.value == MinSize * multiplier){
      ImgScale.value = MaxSize * multiplier
    }
    else{
      ImgScale.value = MinSize * multiplier
    }
  })

  const ImgStyle = useAnimatedStyle(()=>{
    return{
      flex: 1,
      width: withSpring(ImgScale.value),
      aspectRatio: 2/3,
      // zIndex: ImgScale.value==MinSize? 1: 10
    }
  })
  
  if (props.uri == undefined) {
    return <Text>.</Text>;
  }
  return (
    <GestureDetector gesture={resizeHandler}>
      <Animated.Image
        source={{ uri: props.uri }}
        style={ImgStyle}
        resize={"contain"}
        alt={props.alt}
        />
    </GestureDetector>
    
  );
}

