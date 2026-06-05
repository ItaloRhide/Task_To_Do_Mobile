import React, { useMemo, useState } from 'react';
import {
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

import SectionCard from '../../componentes/SectionCard';
import { categoriasMock, fornecedoresMock } from '../../dados/mockData';
import createStyles from './style';

export default function FormularioTarefa({ navigation, route, theme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isEditing = Boolean(route.params?.id);
  const [categoriaId, setCategoriaId] = useState(categoriasMock[0].id);
  const [prioridade, setPrioridade] = useState(3);
  const [fornecedorId, setFornecedorId] = useState(fornecedoresMock[0].id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.titleRow}>
            <View style={styles.titleIcon}>
              <FontAwesome name={isEditing ? 'pencil' : 'plus'} size={18} color={theme.colors.primary} />
            </View>
            <View>
              <Text style={styles.pageTitle}>{isEditing ? 'Editar tarefa' : 'Nova tarefa'}</Text>
              <Text style={styles.pageSubtitle}>Base visual preparada para integrar com a API.</Text>
            </View>
          </View>

          <SectionCard theme={theme}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Titulo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Estudar React Native"
                placeholderTextColor={theme.colors.muted}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Descricao</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Detalhes da tarefa"
                placeholderTextColor={theme.colors.muted}
                multiline
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Data de vencimento</Text>
              <TextInput
                style={styles.input}
                placeholder="2026-06-15"
                placeholderTextColor={theme.colors.muted}
              />
            </View>

            <Text style={styles.label}>Categoria</Text>
            <View style={styles.optionGrid}>
              {categoriasMock.map((categoria) => (
                <TouchableOpacity
                  key={categoria.id}
                  style={[styles.optionButton, categoriaId === categoria.id && styles.optionButtonActive]}
                  onPress={() => setCategoriaId(categoria.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.optionText, categoriaId === categoria.id && styles.optionTextActive]}>
                    {categoria.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Prioridade</Text>
            <View style={styles.priorityRow}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[styles.priorityButton, prioridade === value && styles.priorityButtonActive]}
                  onPress={() => setPrioridade(value)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.priorityText, prioridade === value && styles.priorityTextActive]}>
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Fornecedor</Text>
            <View style={styles.optionGrid}>
              {fornecedoresMock.map((fornecedor) => (
                <TouchableOpacity
                  key={fornecedor.id}
                  style={[styles.optionButton, fornecedorId === fornecedor.id && styles.optionButtonActive]}
                  onPress={() => setFornecedorId(fornecedor.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.optionText, fornecedorId === fornecedor.id && styles.optionTextActive]}>
                    {fornecedor.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </SectionCard>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <FontAwesome name="arrow-left" size={14} color={theme.colors.muted} />
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
              <FontAwesome name="check" size={14} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
