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
  cnpj: '',
};

function formatCnpj(cnpj) {
  if (!cnpj || cnpj.length !== 14) return cnpj;

  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
}

function onlyDigits(value) {
  return value.replace(/\D/g, '');
}

export default function Fornecedores({ navigation, theme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [fornecedores, setFornecedores] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [alertState, setAlertState] = useState({ visible: false, title: '', message: '', type: 'alert', onConfirm: null });

  const isEditing = Boolean(editingId);

  const carregarFornecedores = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const response = await api.get('/fornecedores');
      setFornecedores(response.data);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarFornecedores();
  }, [carregarFornecedores]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: field === 'cnpj' ? onlyDigits(value).slice(0, 14) : value,
    }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function startEditing(fornecedor) {
    setEditingId(fornecedor.id);
    setForm({
      nome: fornecedor.nome || '',
      cnpj: fornecedor.cnpj || '',
    });
  }

  async function salvarFornecedor() {
    const payload = {
      nome: form.nome.trim(),
      cnpj: onlyDigits(form.cnpj),
    };

    if (!payload.nome || payload.cnpj.length !== 14) {
      Alert.alert('Dados invalidos', 'Informe o nome e um CNPJ com 14 digitos.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      if (isEditing) {
        await api.put(`/fornecedores/${editingId}`, payload);
      } else {
        await api.post('/fornecedores', payload);
      }

      resetForm();
      await carregarFornecedores();
    } catch (err) {
      Alert.alert('Erro ao salvar', 'Nao foi possivel salvar o fornecedor. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  function confirmarExclusao(fornecedor) {
    setAlertState({
      visible: true,
      type: 'confirm',
      title: 'Excluir fornecedor',
      message: `Deseja excluir ${fornecedor.nome}? Esta acao nao pode ser desfeita.`,
      onConfirm: () => excluirFornecedor(fornecedor.id),
    });
  }

  async function excluirFornecedor(id) {
    try {
      setError('');
      await api.delete(`/fornecedores/${id}`);

      if (editingId === id) {
        resetForm();
      }

      await carregarFornecedores();
    } catch (err) {
      setAlertState({
        visible: true,
        title: 'Erro ao excluir',
        message: 'Nao foi possivel excluir o fornecedor. Tente novamente.',
      });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        theme={theme}
        title="Fornecedores"
        subtitle="Cadastre fornecedores vinculaveis as tarefas"
      />
      <QuickNav navigation={navigation} active="Fornecedores" theme={theme} />

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
                {isEditing ? 'Editar fornecedor' : 'Novo fornecedor'}
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
              placeholder="Nome do fornecedor"
              placeholderTextColor={theme.colors.muted}
              value={form.nome}
              onChangeText={(value) => updateField('nome', value)}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>CNPJ</Text>
            <TextInput
              style={styles.input}
              placeholder="00000000000000"
              placeholderTextColor={theme.colors.muted}
              value={formatCnpj(form.cnpj)}
              onChangeText={(value) => updateField('cnpj', value)}
              keyboardType="number-pad"
              maxLength={18}
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, saving && styles.disabledButton]}
            onPress={salvarFornecedor}
            activeOpacity={0.8}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <FontAwesome name="check" size={14} color="#FFFFFF" />
            )}
            <Text style={styles.primaryButtonText}>
              {isEditing ? 'Atualizar fornecedor' : 'Salvar fornecedor'}
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
          data={fornecedores}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={carregarFornecedores}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              {loading ? (
                <ActivityIndicator color={theme.colors.primary} />
              ) : (
                <>
                  <FontAwesome name="truck" size={38} color={theme.colors.primarySoft} />
                  <Text style={styles.emptyText}>Nenhum fornecedor cadastrado.</Text>
                </>
              )}
            </View>
          }
          renderItem={({ item }) => (
            <SectionCard
              theme={theme}
              title={item.nome}
              subtitle={formatCnpj(item.cnpj)}
              right={
                <View style={styles.iconBadge}>
                  <FontAwesome name="truck" size={18} color={theme.colors.primary} />
                </View>
              }
            >
              <View style={styles.metaBox}>
                <Text style={styles.metaTitle}>Tarefas vinculadas</Text>
                <Text style={styles.metaText}>
                  {item.tasks?.length ? item.tasks.map((task) => task.titulo).join(', ') : 'Nenhuma tarefa vinculada'}
                </Text>
              </View>

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
