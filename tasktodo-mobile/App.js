import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider, useAuth } from './src/contextos/AuthContext';
import Tarefas from './src/paginas/Tarefas';
import FormularioTarefa from './src/paginas/FormularioTarefa';
import Categorias from './src/paginas/Categorias';
import Fornecedores from './src/paginas/Fornecedores';
import Login from './src/paginas/Login';
import { getTheme } from './src/tema/colors';

const Stack = createStackNavigator();

function MainStack({ theme, darkMode, setDarkMode }) {
  const { signOut } = useAuth();

  function handleLogout() {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: signOut },
    ]);
  }

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.surface,
      borderBottomColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
    },
    headerTintColor: theme.colors.primary,
    headerTitleStyle: {
      fontWeight: '700',
    },
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => setDarkMode((value) => !value)}
          style={{ paddingHorizontal: 10, paddingVertical: 8 }}
          activeOpacity={0.75}
        >
          <FontAwesome
            name={darkMode ? 'sun-o' : 'moon-o'}
            size={18}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ paddingHorizontal: 14, paddingVertical: 8 }}
          activeOpacity={0.75}
        >
          <FontAwesome
            name="sign-out"
            size={17}
            color={theme.colors.danger}
          />
        </TouchableOpacity>
      </View>
    ),
  };

  return (
    <Stack.Navigator initialRouteName="Tarefas" screenOptions={screenOptions}>
      <Stack.Screen name="Tarefas" options={{ title: 'Task To Do' }}>
        {(props) => <Tarefas {...props} theme={theme} />}
      </Stack.Screen>
      <Stack.Screen name="FormularioTarefa" options={{ title: 'Nova Tarefa' }}>
        {(props) => <FormularioTarefa {...props} theme={theme} />}
      </Stack.Screen>
      <Stack.Screen name="Categorias" options={{ title: 'Categorias' }}>
        {(props) => <Categorias {...props} theme={theme} />}
      </Stack.Screen>
      <Stack.Screen name="Fornecedores" options={{ title: 'Fornecedores' }}>
        {(props) => <Fornecedores {...props} theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AppContent() {
  const { token, loading } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      primary: theme.colors.primary,
      border: theme.colors.border,
    },
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      {token ? (
        <MainStack theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />
      ) : (
        <Login />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
