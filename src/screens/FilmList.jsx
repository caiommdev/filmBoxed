import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from "react-native";

import ColourPalet from "../AppColours/ColourPalete";
import FetchData from "../components/fetchData/FetchData";
import FilmThumbnail from "../components/film/filmThumbnail";

export default function FilmList(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const loadMoreMovies = () => {
    if (!loading && page < totalPages) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom) {
      loadMoreMovies();
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      <View style={styles.page}>
        <Text style={styles.title}>All Movies</Text>
        <FetchData
          setData={(response) => {
            setMovies(prev => [...prev, ...response.results]);
            setTotalPages(response.total_pages);
            setLoading(false);
          }}
          loading={loading}  // Passamos o estado de loading como prop
          queryParams={{
            include_adult: false,
            sort_by: "popularity.desc",
            language: "en_US",
            include_video: false,
            page: page,
          }}
          route={"3/discover/movie"}
          page={page}
        >
          <View style={styles.film}>
            {movies?.map((movie, i) => (
              <FilmThumbnail data={movie} key={"film-info" + i} />
            ))}
          </View>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={ColourPalet.text} />
              <Text style={styles.loadingText}>Carregando mais filmes...</Text>
            </View>
          )}
        </FetchData>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: ColourPalet.primary,
    color: ColourPalet.text,
  },
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
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    minHeight: 100,
  },
  loadingText: {
    color: ColourPalet.text,
    marginTop: 10,
  },
  title: {
    color: ColourPalet.text,
    fontSize: 20,
    marginVertical: 10,
  }
});
