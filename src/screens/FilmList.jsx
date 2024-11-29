import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FetchData from "../components/fetchData/FetchData";
import FilmThumbnail from "../components/film/filmThumbnail";
import ControlBar from "../components/controlBar/ControlBar";
import TextButton from "../components/inputs/textButton/TextButton";

export default function FilmList(props) {
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
      <Text>All Movies</Text>
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
          {movies?.map((movie, i) => (
            <FilmThumbnail data={movie} key={"film-info" + i} />
          ))}
        </View>
      </FetchData>

      <ControlBar>
        <TextButton highlight onPress={() => setPage(page - 1)}>
          «
        </TextButton>
        <Text>{page}/{totalPages}</Text>
        <TextButton highlight onPress={() => setPage(page + 1)}>
          »
        </TextButton>
      </ControlBar>
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
    flex: 1,
  },
  film: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
