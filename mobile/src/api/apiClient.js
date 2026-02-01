import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getBaseURL = () => {
  const envUrl =
    process.env.EXPO_PUBLIC_API_URL ||
    Constants.expoConfig?.extra?.apiUrl ||
    Constants.manifest?.extra?.apiUrl ||
    Constants.manifest2?.extra?.expoClient?.extra?.apiUrl;

  if (envUrl) {
    console.log('Using API URL from env/extra:', envUrl);
    return envUrl;
  }

  if (Platform.OS === 'web') {
    return 'http://localhost:3000/api';
  }

  if (__DEV__) {
export default api;
      Constants.expoConfig?.hostUri ||
      Constants.expoConfig?.debuggerHost ||
      Constants.manifest?.debuggerHost ||
      Constants.manifest2?.extra?.expoClient?.hostUri;
    const host = hostUri?.split(':')[0]?.split('/')[0];
    if (!host) {
      return 'http://10.0.2.2:3000/api';
    }

    const url = `http://${host}:3000/api`;
    console.log('--- FINANSE OSOBISTE CONNECTION ---');
    console.log('Connecting to:', url);
    return url;
  }

  return 'https://твоя-апи.pl/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Token set for Finanse osobiste');
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('Token removed');
  }
};

export default api;
