import { Assessment as AssessmentIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

// Componente para um único comentário
const Comment = ({ user, date, text }) => (
  <View style={styles.comment}>
    <Text style={styles.commentUser}>{user}</Text>
    <Text style={styles.commentDate}><i>{date}</i></Text>
    <Text>{text}</Text>
  </View>
);

// Componente para exibir comentários de um filme
const MovieComments = ({ comments }) => (
  <View style={styles.comments}>
    {comments.map((comment, index) => (
      <Comment key={index} {...comment} />
    ))}
  </View>
);

// Componente Principal
const MovieAssessment = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Dados mockados
  const movies = [
    { id: 1, title: "Filme A" },
    { id: 2, title: "Filme B" },
    { id: 3, title: "Filme C" },
  ];

  const movieComments = {
    1: [
      { user: "Usuário1", date: "2023-10-01", text: "Incrível! Adorei!" },
      { user: "Usuário2", date: "2023-10-02", text: "Muito bom, recomendo." },
    ],
    2: [
      { user: "Usuário3", date: "2023-10-03", text: "Gostei, mas achei um pouco longo." },
    ],
    3: [],
  };

  // Função para selecionar filme
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setComments(movieComments[movie.id] || []);
  };

  // Função para adicionar um novo comentário
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newComments = [
      ...comments,
      {
        user: "Você",
        date: new Date().toLocaleDateString(),
        text: newComment,
      },
    ];

    setComments(newComments);
    setNewComment("");
  };

  return (
    <View>
      <Text style={styles.heading}>Avaliações de Filmes</Text>
      <View style={styles.movieList}>
        {movies.map((movie) => (
          <Button key={movie.id} title={movie.title} onPress={() => handleMovieSelect(movie)} />
        ))}
      </View>
      {selectedMovie && (
        <View style={styles.selectedMovie}>
          <Text style={styles.movieTitle}>{selectedMovie.title}</Text>
          <MovieComments comments={comments} />
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Deixe seu comentário..."
            style={styles.textInput}
          />
          <Button title="Adicionar Comentário" onPress={handleAddComment} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentDate: {
    fontStyle: 'italic',
  },
  comments: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieList: {
    marginBottom: 20,
  },
  selectedMovie: {
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default MovieAssessment;
