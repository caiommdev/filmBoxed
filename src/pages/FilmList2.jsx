import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FetchData from "../components/fetchData/FetchData";
import FilmCard from "../components/filmCard/FilmCard";

export default function FilmList2(props) {
  const [movies, setMovies] = useState([]);
  const [page, _setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const setPage = (p) => {
    if (p > 0 && p < totalPages) {
      _setPage(p);
    }
  };

  return (
    <View style={styles.page} key={page}>
      <Text>Filmes 2</Text>
      <FetchData
        setData={(dt) => {
          setMovies(dt.results);
          setPage(dt.page);
          setTotalPages(dt.total_pages);
        }}
        queryParams={{
          include_adult: false,
          sort_by: "popularity.desc",
          language: "en_US",
          include_video: false,
          page: page,
        }}
        route={"3/discover/movie"}
      >
        <View style={styles.film}>
          {movies.map((movie, i) => (
            <FilmCard data={movie} key={"flim-info" + i} />
          ))}
        </View>
      </FetchData>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "2vh",
    alignItems: "center",
    justifyContent: "center",
  },
  film: {
    display: "flex",
    flexFlow: "row wrap",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

