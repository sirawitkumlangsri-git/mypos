// store/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const user = ref({
    id: null,
    uuid: '',
    email: '',
    firstname: '',
    lastname: '',
    role: '',
  });

  const router = useRouter();

  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      isAuthenticated.value = true;
      user.value = JSON.parse(savedUser);
    }
  };

  const login = (userData) => {
    isAuthenticated.value = true;
    user.value = {
      email: userData.user.email,
      id: userData.user.id,
      firstname: userData.user.firstname,
      lastname: userData.user.lastname,
      role: userData.user.role,
      uuid: userData.user.uuid
    };
    localStorage.setItem('user', JSON.stringify(user.value));
    localStorage.setItem('token', userData.token);

    if (userData.user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/pos');
    }
  };

  const logout = () => {
    isAuthenticated.value = false;
    user.value = {
      id: null,
      email: '',
      firstname: '',
      lastname: '',
      role: '',
      uuid: '',
    };
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/user');
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    initializeAuth,
  };
});