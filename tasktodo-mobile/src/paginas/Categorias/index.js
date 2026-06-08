import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import AlertModal from '../../componentes/AlertModal';
import AppHeader from '../../componentes/AppHeader';
import QuickNav from '../../componentes/QuickNav';
import SectionCard from '../../componentes/SectionCard';
import api from '../../servicos/api';
import extractErrorMessage from '../../servicos/errorMessage';
import createStyles from './style';

const initialForm = {
  nome: '',
  descricao: '',
};

export default function Categorias({ navigation, theme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [categorias, setCategorias] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [alertState, setAlertState] = useState({ visible: false, title: '', message: '', type: 'alert', onConfirm: null });

  const isEditing = Boolean(editingId);

  const carregarCategorias = useCallback(async () => {
    try {
      setError('');
      setLoading(true);

      const [categoriasResponse, tarefasResponse] = await Promise.all([
        api.get('/categorias'),
        api.get('/tasks'),
      ]);

      setCategorias(categoriasResponse.data);
      setTarefas(tarefasResponse.data);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarCategorias();
  }, [carregarCategorias]);

  function totalPorCategoria(id) {
    return tarefas.filter((task) => task.categoria?.id === id).length;
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function startEditing(categoria) {
    setEditingId(categoria.id);
    setForm({
      nome: categoria.nome || '',
      descricao: categoria.descricao || '',
    });
  }

  async function salvarCategoria() {
    const payload = {
      nome: form.nome.trim(),
      descricao: form.descricao.trim(),
    };

    if (!payload.nome) {
      Alert.alert('Dados invalidos', 'Informe o nome da categoria.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      if (isEditing) {
        await api.put(`/categorias/${editingId}`, payload);
      } else {
        await api.post('/categorias', payload);
      }

      resetForm();
      await carregarCategorias();
    } catch (err) {
      Alert.alert('Erro ao salvar', 'Nao foi possivel salvar a categoria. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  function confirmarExclusao(categoria) {
    setAlertState({
      visible: true,
      type: 'confirm',
      title: 'Excluir categoria',
      message: `Deseja excluir ${categoria.nome}? Esta acao nao pode ser desfeita.`,
      onConfirm: () => excluirCategoria(categoria.id),
    });
  }

  async function excluirCategoria(id) {
    try {
      setError('');
      await api.delete(`/categorias/${id}`);

      if (editingId === id) {
        resetForm();
      }

      await carregarCategorias();
    } catch (err) {
      setAlertState({
        visible: true,
        title: 'Erro ao excluir',
        message: 'Nao foi possivel excluir a categoria. Tente novamente.',
      });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        theme={theme}
        title="Categorias"
        subtitle="Agrupe as tarefas por area ou contexto"
      />
      <QuickNav navigation={navigation} active="Categorias" theme={theme} />

      <View style={styles.container}>
        <SectionCard theme={theme}>
          <View style={styles.formHeader}>
            <View style={styles.formTitleRow}>
              <FontAwesome
                name={isEditing ? 'pencil' : 'plus'}
                size={16}
                color={theme.colors.primary}
              />
              <Text style={styles.formTitle}>
                {isEditing ? 'Editar categoria' : 'Nova categoria'}
              </Text>
            </View>

            {isEditing && (
              <TouchableOpacity style={styles.clearButton} onPress={resetForm} activeOpacity={0.8}>
                <FontAwesome name="times" size={13} color={theme.colors.muted} />
                <Text style={styles.clearButtonText}>Cancelar</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da categoria"
              placeholderTextColor={theme.colors.muted}
              value={form.nome}
              onChangeText={(value) => updateField('nome', value)}
              maxLength={100}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Descricao</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descricao opcional"
              placeholderTextColor={theme.colors.muted}
              value={form.descricao}
              onChangeText={(value) => updateField('descricao', value)}
              maxLength={255}
              multiline
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, saving && styles.disabledButton]}
            onPress={salvarCategoria}
            activeOpacity={0.8}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <FontAwesome name="check" size={14} color="#FFFFFF" />
            )}
            <Text style={styles.primaryButtonText}>
              {isEditing ? 'Atualizar categoria' : 'Salvar categoria'}
            </Text>
          </TouchableOpacity>
        </SectionCard>

        {error ? (
          <View style={styles.feedbackBox}>
            <FontAwesome name="exclamation-circle" size={14} color={theme.colors.danger} />
            <Text style={styles.feedbackText}>{error}</Text>
          </View>
        ) : null}

        <FlatList
          data={categorias}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={carregarCategorias}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              {loading ? (
                <ActivityIndicator color={theme.colors.primary} />
              ) : (
                <>
                  <FontAwesome name="folder-open" size={38} color={theme.colors.primarySoft} />
                  <Text style={styles.emptyText}>Nenhuma categoria cadastrada.</Text>
                </>
              )}
            </View>
          }
          renderItem={({ item }) => (
            <SectionCard
              theme={theme}
              title={item.nome}
              subtitle={item.descricao || 'Sem descricao'}
              right={
                <View style={styles.counter}>
                  <Text style={styles.counterValue}>{totalPorCategoria(item.id)}</Text>
                  <Text style={styles.counterLabel}>tasks</Text>
                </View>
              }
            >
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.outlineButton}
                  onPress={() => startEditing(item)}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="pencil" size={13} color={theme.colors.primary} />
                  <Text style={styles.outlineButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.outlineButton, styles.dangerButton]}
                  onPress={() => confirmarExclusao(item)}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="trash" size={13} color={theme.colors.danger} />
                  <Text style={styles.dangerButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </SectionCard>
          )}
        />
      </View>

      <AlertModal
        visible={alertState.visible}
        theme={theme}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onConfirm={alertState.onConfirm}
        onDismiss={() => setAlertState({ visible: false, title: '', message: '', type: 'alert', onConfirm: null })}
      />
    </SafeAreaView>
  );
}
