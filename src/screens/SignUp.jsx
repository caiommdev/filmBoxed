import { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ColourPalet from '../AppColours/ColourPalete';
import UserService from '../services/UserService';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext';

export default function SignUp() {
  const navigation = useNavigation();
  //const { handleLogin } = useRoute().params;
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '@',
    password: ''
  });

  const handleSubmit = async () => {
    try {
      if (!UserService.validateFullName(formData.fullName)) {
        Alert.alert('Erro', 'Digite seu nome e sobrenome');
        return;
      }
      if (!UserService.validateEmail(formData.email)) {
        Alert.alert('Erro', 'Email deve seguir o formato: exemplo@dominio.com ou exemplo@dominio.com.br');
        return;
      }
      if (!UserService.validateUsername(formData.username)) {
        Alert.alert('Erro', 'Username deve começar com @ e ter mais de 1 caractere');
        return;
      }
      if (!UserService.validatePassword(formData.password)) {
        Alert.alert('Erro', 'Senha deve ter pelo menos 6 caracteres');
        return;
      }

      const user = { ...formData, image: null };
      await UserService.saveUser(user);
      await handleLogin(user); //aguardo o login para redirecionar o usuário
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('FilmList')
        }
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao criar conta');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialIcons name="arrow-back" size={28} color={ColourPalet.highlight} />
        </TouchableOpacity>

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
                placeholder="@seu.username"
                placeholderTextColor={ColourPalet.dim}
                value={formData.username}
                onChangeText={(text) => setFormData({...formData, username: text})}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={ColourPalet.dim}
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
            >
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color={ColourPalet.dim} />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>
            </View>
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
    color: ColourPalet.text,
    fontSize: 16,
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
  },
  dateButton: {
    justifyContent: 'center',
  },
  placeholderText: {
    color: ColourPalet.dim,
  },
  inputText: {
    color: ColourPalet.text,
  },
  placeholder: {
    color: ColourPalet.dim,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});