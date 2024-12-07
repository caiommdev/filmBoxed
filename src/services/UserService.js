import * as FileSystem from 'expo-file-system';
import usersData from '../data/users.json';

class UserService {
  constructor() {
    this.users = usersData.users;
    this.filePath = FileSystem.documentDirectory + 'users.json';
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.com(\.[a-zA-Z]{2})?$/;
    return regex.test(email);
  }

  validateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return age >= 18;
  }

  validateUsername(username) {
    return username.startsWith('@') && username.length > 1;
  }

  validateFullName(name) {
    return name.trim().split(' ').length >= 2;
  }

  async saveUser(userData) {
    this.users.push(userData);
    await FileSystem.writeAsStringAsync(
      this.filePath,
      JSON.stringify({ users: this.users })
    );
  }

  async getUser(email) {
    return this.users.find(user => user.email === email);
  }
}

export default new UserService();