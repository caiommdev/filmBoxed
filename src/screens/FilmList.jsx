import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import ColourPalet from "../AppColours/ColourPalete";
import FetchData from "../components/fetchData/FetchData";
import FilmThumbnail from "../components/film/filmThumbnail";
import ControlBar from "../components/controlBar/ControlBar";
import TextButton from "../components/inputs/textButton/TextButton";
import FilterModal from "../components/filterModal/FilterModal";
import ApiService from "../services/ApiService";

const { width } = Dimensions.get("window")

export default function FilmList({ route }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const searchQuery = route.params?.searchQuery;
  const searchResults = route.params?.searchResults;
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (searchResults) {
      setMovies(searchResults);
    }
  }, [searchResults]);

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

  const handleApplyFilters = async (filters) => {
    setActiveFilters(filters);
    setMovies([]);
    setPage(1);
    setLoading(true);
    
    try {
      const results = await ApiService.getFilteredMovies(filters);
      if (results.results.length === 0) {
        setNoResults(true);
      } else {
        setMovies(results.results);
        setTotalPages(results.total_pages);
        setNoResults(false);
      }
    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
    }
    setLoading(false);
  };

  return (
    <ScrollView 
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {searchQuery ? 'Resultados da Pesquisa' : 'All Movies'}
          </Text>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
          >
            <MaterialIcons name="filter-list" size={24} color={ColourPalet.text} />
          </TouchableOpacity>
        </View>

        {noResults ? (
          <Text style={styles.noResults}>
            Nenhum filme encontrado com os filtros selecionados
          </Text>
        ) : (
          <FetchData
            setData={(response) => {
              setMovies(prev => [...prev, ...response.results]);
              setTotalPages(response.total_pages);
              setLoading(false);
            }}
            loading={loading}
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
        )}

        <FilterModal
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          onApplyFilters={handleApplyFilters}
        />
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: "center",
    width: width
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  filterButton: {
    padding: 10,
  },
  noResults: {
    color: ColourPalet.text,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
