import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import ColourPalet from '../AppColours/ColourPalete';
import UserService from '../services/UserService';

export default function SignUp({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    birthDate: new Date(),
    username: '@'
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.com(\.[a-zA-Z]{2})?$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!UserService.validateFullName(formData.fullName)) {
      Alert.alert('Erro', 'Digite seu nome e sobrenome');
      return;
    }
    if (!validateEmail(formData.email)) {
      Alert.alert('Erro', 'Email deve seguir o formato: exemplo@dominio.com ou exemplo@dominio.com.br');
      return;
    }
    if (!UserService.validateAge(formData.birthDate)) {
      Alert.alert('Erro', 'Você precisa ter mais de 18 anos');
      return;
    }
    if (!UserService.validateUsername(formData.username)) {
      Alert.alert('Erro', 'Username inválido');
      return;
    }

    try {
      await UserService.saveUser(formData);
      navigation.navigate('FilmList');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar usuário');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Criar Conta</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome e Sobrenome"
            placeholderTextColor={ColourPalet.dim}
            value={formData.fullName}
            onChangeText={(text) => setFormData({...formData, fullName: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            placeholderTextColor={ColourPalet.dim}
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            placeholderTextColor={ColourPalet.dim}
            value={formData.birthDate instanceof Date 
              ? formData.birthDate.toLocaleDateString('pt-BR')
              : ''
            }
            onFocus={() => setShowDatePicker(true)}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="@seu.username"
            placeholderTextColor={ColourPalet.dim}
            value={formData.username}
            onChangeText={(text) => setFormData({...formData, username: text})}
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={formData.birthDate}
            mode="date"
            display="spinner"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setFormData({...formData, birthDate: date});
            }}
          />
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: ColourPalet.primary,
    justifyContent: 'center'
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: ColourPalet.highlight,
    marginBottom: 40,
    textAlign: 'center'
  },
  input: {
    backgroundColor: ColourPalet.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: ColourPalet.text
  },
  dateText: {
    color: ColourPalet.text
  },
  button: {
    backgroundColor: ColourPalet.highlight,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: ColourPalet.text,
    fontSize: 18,
    fontWeight: 'bold'
  }
});