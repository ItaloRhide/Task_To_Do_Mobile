import React, { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tarefas from './src/paginas/Tarefas';
import FormularioTarefa from './src/paginas/FormularioTarefa';
import Categorias from './src/paginas/Categorias';
import Fornecedores from './src/paginas/Fornecedores';
import { getTheme } from './src/tema/colors';

const Stack = createStackNavigator();

export default function App() {
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
      <TouchableOpacity
        onPress={() => setDarkMode((value) => !value)}
        style={{ paddingHorizontal: 18, paddingVertical: 8 }}
        activeOpacity={0.75}
      >
        <FontAwesome
          name={darkMode ? 'sun-o' : 'moon-o'}
          size={18}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    ),
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <Stack.Navigator initialRouteName="Tarefas" screenOptions={screenOptions}>
        <Stack.Screen
          name="Tarefas"
          options={{ title: 'Task To Do' }}
        >
          {(props) => <Tarefas {...props} theme={theme} />}
        </Stack.Screen>

        <Stack.Screen
          name="FormularioTarefa"
          options={{ title: 'Nova Tarefa' }}
        >
          {(props) => <FormularioTarefa {...props} theme={theme} />}
        </Stack.Screen>

        <Stack.Screen
          name="Categorias"
          options={{ title: 'Categorias' }}
        >
          {(props) => <Categorias {...props} theme={theme} />}
        </Stack.Screen>

        <Stack.Screen
          name="Fornecedores"
          options={{ title: 'Fornecedores' }}
        >
          {(props) => <Fornecedores {...props} theme={theme} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
