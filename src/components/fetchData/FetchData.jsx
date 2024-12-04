import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import ColourPalet from "../../AppColours/ColourPalete";
import ApiService from "../../services/ApiService";

export default function FetchData(props) {
  const [initialLoading, setInitialLoading] = useState(true);

  const query = {
    ...props.queryParams,
    ...ApiService.getDefaultQueryParams(),
  };

  useEffect(() => {
    if (props.page === 1) {
      setInitialLoading(true);
    }
    
    ApiService.get(props.route, query).then((response) => {
      props.setData(response);
      setInitialLoading(false);
    });
  }, [props.page]);

  if (initialLoading && props.page === 1) {
    return (
      <View style={styles.initialLoading}>
        <ActivityIndicator size="large" color={ColourPalet.text} />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  return props.children;
}

const styles = StyleSheet.create({
  initialLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  loadingText: {
    color: ColourPalet.text,
    marginTop: 10,
  }
});

