import * as FileSystem from 'expo-file-system';

class UserService {
  constructor() {
    this.filePath = `${FileSystem.documentDirectory}/users.json`;
    this.initializeFile();
  }

  async initializeFile() {
    try {
      const fileInfo = await FileSystem.getInfoAsync(this.filePath);
      if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(
          this.filePath, 
          JSON.stringify({ users: [] })
        );
      }
    } catch (error) {
      console.error('Erro ao inicializar arquivo:', error);
    }
  }

  async getUsers() {
    try {
      const fileContent = await FileSystem.readAsStringAsync(this.filePath);
      return JSON.parse(fileContent).users;
    } catch (error) {
      console.error('Erro ao ler usuários:', error);
      return [];
    }
  }

  async saveUser(userData) {
    try {
      const users = await this.getUsers();
      
      if (users.some(user => user.email === userData.email)) {
        throw new Error('Email já cadastrado');
      }

      if (!this.validatePassword(userData.password)) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      users.push(userData);
      await FileSystem.writeAsStringAsync(
        this.filePath,
        JSON.stringify({ users }, null, 2)
      );
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  }

  async getUser(email) {
    const users = await this.getUsers();
    return users.find(user => user.email === email);
  }

  async updateUser(email, updates) {
    const users = await this.getUsers();
    const user = users.find(user => user.email === email);
    if (user) {
      Object.assign(user, updates);
      await FileSystem.writeAsStringAsync(
        this.filePath,
        JSON.stringify({ users }, null, 2)
      );
    }
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.com(\.[a-zA-Z]{2})?$/;
    return regex.test(email);
  }

  validateUsername(username) {
    return username.startsWith('@') && username.length > 1;
  }

  validateFullName(name) {
    return name.trim().split(' ').length >= 2;
  }

  validatePassword(password) {
    return password.length >= 6;
  }
}

export default new UserService();