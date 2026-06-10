import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

import SectionCard from '../../componentes/SectionCard';
import api from '../../servicos/api';
import extractErrorMessage from '../../servicos/errorMessage';
import createStyles from './style';

const initialForm = {
  titulo: '',
  descricao: '',
  dataVencimento: '',
  concluida: false,
  imagem: '',
};

function formatDateToIso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseIsoToDate(iso) {
  if (!iso) return new Date();
  const [y, m, d] = iso.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d));
}

function isValidIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export default function FormularioTarefa({ navigation, route, theme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);
  const taskId = route.params?.id;
  const isEditing = Boolean(taskId);
  const [form, setForm] = useState(initialForm);
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [categoriaId, setCategoriaId] = useState(null);
  const [fornecedorIds, setFornecedorIds] = useState([]);
  const [prioridade, setPrioridade] = useState(3);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const carregarDados = useCallback(async () => {
    try {
      setError('');
      setLoading(true);

      const requests = [
        api.get('/categorias'),
        api.get('/fornecedores'),
      ];

      if (isEditing) {
        requests.push(api.get(`/tasks/${taskId}`));
      }

      const [categoriasResponse, fornecedoresResponse, taskResponse] = await Promise.all(requests);
      const categoriasData = categoriasResponse.data;
      const fornecedoresData = fornecedoresResponse.data;

      setCategorias(categoriasData);
      setFornecedores(fornecedoresData);

      if (taskResponse?.data) {
        const task = taskResponse.data;

        setForm({
          titulo: task.titulo || '',
          descricao: task.descricao || '',
          dataVencimento: task.dataVencimento || '',
          concluida: Boolean(task.concluida),
          imagem: task.imagem || '',
        });
        setPrioridade(task.prioridade || 3);
        setCategoriaId(task.categoria?.id || categoriasData[0]?.id || null);
        setFornecedorIds((task.fornecedores || []).map((fornecedor) => fornecedor.id));
      } else {
        setCategoriaId(categoriasData[0]?.id || null);
      }
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [isEditing, taskId]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleFornecedor(id) {
    setFornecedorIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  }

  async function selecionarImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      updateField('imagem', `data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  }

  async function tirarFoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissao negada', 'Precisamos da permissao da camera para tirar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      updateField('imagem', `data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  }

  function removerImagem() {
    updateField('imagem', '');
  }

  async function salvarTarefa() {
    const payload = {
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim(),
      dataVencimento: form.dataVencimento.trim(),
      prioridade,
      concluida: form.concluida,
      imagem: form.imagem || null,
      categoria: categoriaId ? { id: categoriaId } : null,
      fornecedores: fornecedorIds.map((id) => ({ id })),
    };

    if (!payload.titulo || !payload.dataVencimento || !payload.categoria) {
      Alert.alert('Dados invalidos', 'Informe titulo, data de vencimento e categoria.');
      return;
    }

    if (!isValidIsoDate(payload.dataVencimento)) {
      Alert.alert('Data invalida', 'Use o formato AAAA-MM-DD, por exemplo 2026-06-15.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      if (isEditing) {
        await api.put(`/tasks/${taskId}`, payload);
      } else {
        await api.post('/tasks', payload);
      }

      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro ao salvar', 'Nao foi possivel salvar a tarefa. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

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
              <Text style={styles.pageSubtitle}>Preencha os dados para salvar na API.</Text>
            </View>
          </View>

          {error ? (
            <View style={styles.feedbackBox}>
              <FontAwesome name="exclamation-circle" size={14} color={theme.colors.danger} />
              <Text style={styles.feedbackText}>{error}</Text>
            </View>
          ) : null}

          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator color={theme.colors.primary} />
              <Text style={styles.loadingText}>Carregando dados...</Text>
            </View>
          ) : (
            <SectionCard theme={theme}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Titulo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Estudar React Native"
                  placeholderTextColor={theme.colors.muted}
                  value={form.titulo}
                  onChangeText={(value) => updateField('titulo', value)}
                  maxLength={100}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Descricao</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Detalhes da tarefa"
                  placeholderTextColor={theme.colors.muted}
                  value={form.descricao}
                  onChangeText={(value) => updateField('descricao', value)}
                  maxLength={500}
                  multiline
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Data de vencimento</Text>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="calendar" size={14} color={theme.colors.muted} />
                  <Text style={[styles.dateText, form.dataVencimento ? {} : styles.datePlaceholder]}>
                    {form.dataVencimento || 'Selecionar data'}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={parseIsoToDate(form.dataVencimento)}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (event.type === 'set' && selectedDate) {
                        updateField('dataVencimento', formatDateToIso(selectedDate));
                      }
                    }}
                  />
                )}
              </View>

              <Text style={styles.label}>Categoria</Text>
              <View style={styles.optionGrid}>
                {categorias.length ? (
                  categorias.map((categoria) => (
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
                  ))
                ) : (
                  <Text style={styles.helperText}>Cadastre uma categoria antes de criar tarefas.</Text>
                )}
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

              <Text style={styles.label}>Foto</Text>
              {form.imagem ? (
                <View style={styles.imagePreviewBox}>
                  <Image source={{ uri: form.imagem }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.imageRemoveButton} onPress={removerImagem} activeOpacity={0.8}>
                    <FontAwesome name="times" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imageActionsRow}>
                  <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem} activeOpacity={0.8}>
                    <FontAwesome name="image" size={14} color={theme.colors.primary} />
                    <Text style={styles.imageButtonText}>Galeria</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imageButton} onPress={tirarFoto} activeOpacity={0.8}>
                    <FontAwesome name="camera" size={14} color={theme.colors.primary} />
                    <Text style={styles.imageButtonText}>Camera</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.label}>Fornecedores</Text>
              <View style={styles.optionGrid}>
                {fornecedores.length ? (
                  fornecedores.map((fornecedor) => {
                    const selected = fornecedorIds.includes(fornecedor.id);

                    return (
                      <TouchableOpacity
                        key={fornecedor.id}
                        style={[styles.optionButton, selected && styles.optionButtonActive]}
                        onPress={() => toggleFornecedor(fornecedor.id)}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.optionText, selected && styles.optionTextActive]}>
                          {fornecedor.nome}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text style={styles.helperText}>Nenhum fornecedor cadastrado.</Text>
                )}
              </View>

              {isEditing && (
                <>
                  <Text style={styles.label}>Status</Text>
                  <TouchableOpacity
                    style={[styles.optionButton, form.concluida && styles.optionButtonActive]}
                    onPress={() => updateField('concluida', !form.concluida)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.optionText, form.concluida && styles.optionTextActive]}>
                      {form.concluida ? 'Tarefa concluida' : 'Tarefa aberta'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </SectionCard>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <FontAwesome name="arrow-left" size={14} color={theme.colors.muted} />
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryButton, (saving || loading) && styles.disabledButton]}
              onPress={salvarTarefa}
              activeOpacity={0.8}
              disabled={saving || loading}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <FontAwesome name="check" size={14} color="#FFFFFF" />
              )}
              <Text style={styles.primaryButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
