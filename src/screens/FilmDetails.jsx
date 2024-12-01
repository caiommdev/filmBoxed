import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import ColourPalet from "../AppColours/ColourPalete";
import FetchData from "../components/fetchData/FetchData";
import FilmInfo from "../components/film/FilmInfo";
import Assessment from "../components/assessment/Assessment";
//import { assessments } from '../data/assessmentData.js';


const assessments = [
  {
    user: 'João',
    photo: 'https://example.com/joao-avatar.jpg',
    rating: 8,
    comment: 'Ótimo filme, recomendo!',
  },
  {
    user: 'Maria',
    photo: 'https://example.com/maria-avatar.jpg',
    rating: 6,
    comment: 'Achei mediano, mas divertido.',
  },
  {
    user: 'Carlos',
    photo: 'https://example.com/carlos-avatar.jpg',
    rating: 9,
    comment: 'Incrível! A cinematografia e os efeitos visuais são de outro nível.',
  },
  {
    user: 'Ana',
    photo: 'https://example.com/ana-avatar.jpg',
    rating: 7,
    comment: 'Boa história, mas poderia ser um pouco mais curta.',
  },
  {
    user: 'Pedro',
    photo: 'https://example.com/pedro-avatar.jpg',
    rating: 5,
    comment: 'Não gostei tanto, achei o enredo confuso e os personagens pouco desenvolvidos.',
  },
  {
    user: 'Luiza',
    photo: 'https://example.com/luiza-avatar.jpg',
    rating: 10,
    comment: 'Melhor filme que já assisti! Emocionante do início ao fim.',
  },
  {
    user: 'Fernanda',
    photo: 'https://example.com/fernanda-avatar.jpg',
    rating: 8,
    comment: 'A trilha sonora é espetacular, vale a pena assistir!',
  },
  {
    user: 'Ricardo',
    photo: 'https://example.com/ricardo-avatar.jpg',
    rating: 4,
    comment: 'Esperava mais, o ritmo do filme foi muito lento pra mim.',
  },
  {
    user: 'Beatriz',
    photo: 'https://example.com/beatriz-avatar.jpg',
    rating: 7,
    comment: 'Gostei, mas senti que faltou algo para ser incrível.',
  },
  {
    user: 'Lucas',
    photo: 'https://example.com/lucas-avatar.jpg',
    rating: 9,
    comment: 'Surpreendente! Um dos melhores filmes do ano, com certeza.',
  }
];


export default function FilmDetails(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [movie, setMovie] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText} onPress={() => navigation.goBack()}>Voltar</Text>
        <Text style={styles.headerText}>Movie</Text>
      </View>
      <FetchData
        setData={(dt) => {
          setMovie(dt);
        }}
        route={"3/movie/" + id}
      >
        <FilmInfo data={movie} />
      </FetchData>
    
      <Assessment assessments={assessments}/>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: ColourPalet.primary,
    color: ColourPalet.text,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "start",
  },
  headerText: {
    color: ColourPalet.text,
  }
});
