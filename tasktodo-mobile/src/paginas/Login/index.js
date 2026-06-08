import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '../../contextos/AuthContext';
import { getTheme } from '../../tema/colors';
import api, { apiBaseURL } from '../../servicos/api';
import extractErrorMessage from '../../servicos/errorMessage';
import createStyles from './style';

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email.trim()) {
      setError('Informe seu email');
      return;
    }
    if (!password) {
      setError('Informe sua senha');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.post('/auth/login', {
        email: email.trim(),
        password,
      });

      const { token, email: userEmail, nome } = response.data;
      await signIn(token, { email: userEmail, nome });
    } catch (err) {
      const msg = extractErrorMessage(err);
      setError(msg || 'Nao foi possivel fazer login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoSection}>
            <View style={[styles.logoCircle, { backgroundColor: theme.colors.primarySoft }]}>
              <FontAwesome name="tasks" size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.appName, { color: theme.colors.text }]}>Task To Do</Text>
            <Text style={[styles.appSubtitle, { color: theme.colors.muted }]}>
              Faca login para continuar
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Acessar</Text>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.colors.muted }]}>Email</Text>
              <View style={[styles.inputRow, { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.border }]}>
                <FontAwesome name="envelope" size={14} color={theme.colors.muted} />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Seu email cadastrado"
                  placeholderTextColor={theme.colors.muted}
                  value={email}
                  onChangeText={(value) => { setEmail(value); setError(''); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.colors.muted }]}>Senha</Text>
              <View style={[styles.inputRow, { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.border }]}>
                <FontAwesome name="lock" size={14} color={theme.colors.muted} />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Sua senha"
                  placeholderTextColor={theme.colors.muted}
                  value={password}
                  onChangeText={(value) => { setPassword(value); setError(''); }}
                  secureTextEntry
                />
              </View>
            </View>

            {error ? (
              <View style={[styles.errorBox, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}>
                <FontAwesome name="exclamation-circle" size={13} color="#DC2626" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: theme.colors.primary }, loading && styles.disabledButton]}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <FontAwesome name="sign-in" size={15} color="#FFFFFF" />
              )}
              <Text style={styles.loginButtonText}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.hint, { color: theme.colors.muted }]}>
              Apenas emails cadastrados podem acessar o sistema.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.themeToggle}
            onPress={() => setDarkMode((v) => !v)}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={darkMode ? 'sun-o' : 'moon-o'}
              size={14}
              color={theme.colors.muted}
            />
            <Text style={[styles.themeToggleText, { color: theme.colors.muted }]}>
              {darkMode ? 'Modo claro' : 'Modo escuro'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
