import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);

const STORAGE_TOKEN_KEY = 'auth_token';
const STORAGE_USER_KEY = 'auth_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(STORAGE_TOKEN_KEY);
        const storedUser = await SecureStore.getItemAsync(STORAGE_USER_KEY);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch {
        // SecureStore may fail on web; ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function signIn(newToken, newUser) {
    setToken(newToken);
    setUser(newUser);
    try {
      await SecureStore.setItemAsync(STORAGE_TOKEN_KEY, newToken);
      await SecureStore.setItemAsync(STORAGE_USER_KEY, JSON.stringify(newUser));
    } catch {
      // web fallback
    }
  }

  async function signOut() {
    setToken(null);
    setUser(null);
    try {
      await SecureStore.deleteItemAsync(STORAGE_TOKEN_KEY);
      await SecureStore.deleteItemAsync(STORAGE_USER_KEY);
    } catch {
      // web fallback
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
