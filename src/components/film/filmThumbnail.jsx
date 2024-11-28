import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import ApiService from "../../services/ApiService";

export default function FilmThumbnail(props) {
  const [hover, setHover] = React.useState(false);
  const navigate = useNavigation();

  const movie = props.data;

  return (
    <TouchableOpacity
      onPress={() => navigate("/movie/" + movie.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        source={{ uri: ApiService.getPosterUrl(movie.poster_path, 300) }}
        style={imgStyle(hover)}
        alt={movie.title}
      />
    </TouchableOpacity>
  );
}

const imgStyle = (hover) => {
  return {
    width: 200,
    height: 300,
    borderWidth: 2,
    borderColor: hover ? "var(--highlight)" : "transparent",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-out",
    zIndex: hover ? 2 : 1,
    //transform: hover ? "scale(1.1)" : "scale(1)",
  };
};
