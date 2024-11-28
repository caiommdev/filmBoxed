import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ApiService from "../../services/ApiService";

// Recebe como props:
// path (caminho)
// setData (função que será chamada quando recebermos a resposta)
// queryParams (Parametros da rota)
// style (estiliza o componente enquanto ainda está carregando)
export default function FetchData(props) {
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  const query = {
    ...props.queryParams,
    ...ApiService.getDefaultQueryParams(),
  };

  useEffect(() => {
    ApiService.get(props.route, query).then((r) => {
      props.setData(r);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <View style={props.style}><Text>Loading...</Text></View>; // Exibe uma mensagem de carregamento
  }

  return props.children;
}

