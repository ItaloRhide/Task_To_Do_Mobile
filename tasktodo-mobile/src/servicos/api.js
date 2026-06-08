import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_PORT = 8080;
const API_DEBUG = process.env.EXPO_PUBLIC_API_DEBUG !== 'false';

function getDevServerHost() {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest?.debuggerHost ||
    Constants.manifest2?.extra?.expoClient?.hostUri;

  return hostUri?.split(':')[0];
}

function normalizeBaseURL(url) {
  return url?.replace(/\/+$/, '');
}

function getConfiguredApiURL() {
  return (
    process.env.EXPO_PUBLIC_API_URL ||
    Constants.expoConfig?.extra?.apiUrl ||
    Constants.manifest?.extra?.apiUrl ||
    Constants.manifest2?.extra?.expoClient?.extra?.apiUrl
  );
}

function getWebHost() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.location.hostname;
}

function getApiBaseURL() {
  const configuredUrl = getConfiguredApiURL();

  if (configuredUrl) {
    return normalizeBaseURL(configuredUrl);
  }

  if (Platform.OS === 'web') {
    const host = getWebHost() || 'localhost';
    return `http://${host}:${API_PORT}/api`;
  }

  const host = getDevServerHost();

  if (host) {
    return `http://${host}:${API_PORT}/api`;
  }

  if (__DEV__) {
    return `http://localhost:${API_PORT}/api`;
  }

  throw new Error(
    'EXPO_PUBLIC_API_URL nao configurada. Informe o endereco da API antes de gerar a build do Expo.',
  );
}

function joinURL(baseURL, path) {
  if (!path) {
    return baseURL;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${baseURL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

function getElapsedTime(config) {
  const startedAt = config?.metadata?.startedAt;

  if (!startedAt) {
    return null;
  }

  return `${Date.now() - startedAt}ms`;
}

function buildHttpErrorMessage(error, fullURL) {
  const data = error?.response?.data;

  if (data?.fields) {
    return Object.values(data.fields).join('\n');
  }

  if (data?.message) {
    return `${data.message}\nStatus: ${error.response.status}\nURL: ${fullURL}`;
  }

  return `A API respondeu com erro HTTP ${error.response.status}.\nURL: ${fullURL}`;
}

function buildNetworkErrorMessage(error, fullURL) {
  if (error?.code === 'ECONNABORTED') {
    return `Tempo limite ao chamar a API.\nURL: ${fullURL}\nBase configurada: ${apiBaseURL}`;
  }

  if (error?.request && !error?.response) {
    return [
      'A API nao respondeu a chamada do app.',
      `URL: ${fullURL}`,
      `Base configurada: ${apiBaseURL}`,
      `Erro original: ${error.message || 'Network Error'}`,
      'Confira se o backend esta ativo, se o celular esta na mesma rede e se o firewall permite a porta 8080.',
    ].join('\n');
  }

  return `Erro ao preparar chamada da API.\nURL: ${fullURL}\nDetalhe: ${error?.message || 'erro desconhecido'}`;
}

function logApiRequest(config, fullURL) {
  if (!API_DEBUG) {
    return;
  }

  console.log(`[API] -> ${String(config.method || 'GET').toUpperCase()} ${fullURL}`);
}

function logApiResponse(response, fullURL) {
  if (!API_DEBUG) {
    return;
  }

  const elapsed = getElapsedTime(response.config);
  console.log(
    `[API] <- ${response.status} ${String(response.config.method || 'GET').toUpperCase()} ${fullURL}${elapsed ? ` (${elapsed})` : ''}`,
  );
}

function logApiError(error, fullURL) {
  if (!API_DEBUG) {
    return;
  }

  const config = error?.config || {};
  const elapsed = getElapsedTime(config);

  console.error('[API] Erro na chamada', {
    method: String(config.method || 'GET').toUpperCase(),
    url: fullURL,
    baseURL: config.baseURL,
    status: error?.response?.status,
    code: error?.code,
    message: error?.message,
    elapsed,
    responseData: error?.response?.data,
  });
}

export const apiBaseURL = getApiBaseURL();

const api = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const fullURL = joinURL(config.baseURL || apiBaseURL, config.url);
  config.metadata = { startedAt: Date.now(), fullURL };
  logApiRequest(config, fullURL);
  return config;
});

api.interceptors.response.use(
  (response) => {
    const fullURL = response.config?.metadata?.fullURL || joinURL(response.config?.baseURL || apiBaseURL, response.config?.url);
    logApiResponse(response, fullURL);
    return response;
  },
  (error) => {
    const config = error?.config || {};
    const fullURL = config.metadata?.fullURL || joinURL(config.baseURL || apiBaseURL, config.url);

    error.userMessage = error.response
      ? buildHttpErrorMessage(error, fullURL)
      : buildNetworkErrorMessage(error, fullURL);
    error.debugInfo = {
      method: String(config.method || 'GET').toUpperCase(),
      url: fullURL,
      baseURL: config.baseURL || apiBaseURL,
      status: error?.response?.status,
      code: error?.code,
      message: error?.message,
      responseData: error?.response?.data,
    };

    logApiError(error, fullURL);
    return Promise.reject(error);
  },
);

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // SecureStore may fail on web
  }
  return config;
});

export default api;
