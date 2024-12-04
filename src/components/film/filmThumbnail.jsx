import React, { useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import ApiService from "../../services/ApiService";

const { width } = Dimensions.get("window")

export default function FilmThumbnail(props) {
  const [hover, setHover] = React.useState(false);
  const navigation = useNavigation();

  const movie = props.data;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FilmDetails', { id: movie.id })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{padding:2}}
    >
      <Image
        source={{ uri: ApiService.getPosterUrl(movie.poster_path, 300) }}
        style={imgStyle(hover)}
        alt={movie.title}
      />
    </TouchableOpacity>
  );
}
const W = (width/2)-20;
const imgStyle = (hover) => {
  return {
    width: W<200? W:200,
    aspectRatio: 2/3,
    flexShrink: 1
    // borderWidth: 2,
    // borderColor: hover ? "var(--highlight)" : "transparent",
    // transitionDuration: "200ms",
    // transitionTimingFunction: "ease-out",
    // zIndex: hover ? 2 : 1,
    //transform: hover ? "scale(1.1)" : "scale(1)",
  };
};
