import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Validação do email e senha
    const emailValid = email.includes("@");
    const passwordValid = password.length >= 3;

    if (emailValid && passwordValid) {
      onLogin(email); // Passa o email para a função onLogin
    } else {
      Alert.alert(
        "Erro",
        "Por favor, insira um e-mail válido e uma senha com pelo menos 3 caracteres."
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.signin}>
        <Text style={styles.signinHeading}>Login</Text>
        <TextInput
          style={styles.control}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus
        />
        <TextInput
          style={styles.control}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signin: {
    maxWidth: 380,
    padding: 15,
    margin: "0 auto",
    backgroundColor: "#primary",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  signinHeading: {
    marginBottom: 30,
  },
  control: {
    width: "100%",
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
});

export default Login;
