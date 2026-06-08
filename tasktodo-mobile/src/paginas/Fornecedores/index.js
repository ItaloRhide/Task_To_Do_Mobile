import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
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
  logradouro: '',
  bairro: '',
  cidade: '',
  uf: '',
  cep: '',
};

function formatCnpj(value) {
  if (!value) return '';
  const digits = onlyDigits(value);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function formatCep(value) {
  if (!value) return '';
  const digits = onlyDigits(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
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
  const [showForm, setShowForm] = useState(false);
  const [buscandoCnpj, setBuscandoCnpj] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [error, setError] = useState('');
  const [alertState, setAlertState] = useState({ visible: false, title: '', message: '', type: 'alert', onConfirm: null });

  const cnpjTimeoutRef = useRef(null);
  const cepTimeoutRef = useRef(null);

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
      [field]: field === 'cnpj' ? onlyDigits(value).slice(0, 14) : field === 'cep' ? onlyDigits(value).slice(0, 8) : value,
    }));
  }

  useEffect(() => {
    if (cnpjTimeoutRef.current) clearTimeout(cnpjTimeoutRef.current);
    if (form.cnpj.length === 14 && !isEditing) {
      cnpjTimeoutRef.current = setTimeout(() => consultarCnpj(form.cnpj), 600);
    }
    return () => {
      if (cnpjTimeoutRef.current) clearTimeout(cnpjTimeoutRef.current);
    };
  }, [form.cnpj, isEditing]);

  useEffect(() => {
    if (cepTimeoutRef.current) clearTimeout(cepTimeoutRef.current);
    if (form.cep.length === 8) {
      cepTimeoutRef.current = setTimeout(() => buscarCep(form.cep), 600);
    }
    return () => {
      if (cepTimeoutRef.current) clearTimeout(cepTimeoutRef.current);
    };
  }, [form.cep]);

  async function consultarCnpj(cnpj) {
    try {
      setBuscandoCnpj(true);
      const response = await api.get(`/fornecedores/consulta-cnpj/${cnpj}`);
      const data = response.data;
      setForm((current) => ({
        ...current,
        nome: current.nome || data.nome || '',
        logradouro: current.logradouro || data.logradouro || '',
        bairro: current.bairro || data.bairro || '',
        cidade: current.cidade || data.cidade || '',
        uf: current.uf || data.uf || '',
        cep: current.cep || onlyDigits(data.cep || ''),
      }));
    } catch (err) {
      // apenas log, sem alerta para o usuario
      console.log('CNPJ nao encontrado:', cnpj);
    } finally {
      setBuscandoCnpj(false);
    }
  }

  async function buscarCep(cep) {
    try {
      setBuscandoCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setForm((current) => ({
          ...current,
          logradouro: current.logradouro || data.logradouro || '',
          bairro: current.bairro || data.bairro || '',
          cidade: current.cidade || data.localidade || '',
          uf: current.uf || data.uf || '',
        }));
      }
    } catch (err) {
      console.log('CEP nao encontrado:', cep);
    } finally {
      setBuscandoCep(false);
    }
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  }

  function startEditing(fornecedor) {
    setEditingId(fornecedor.id);
    setShowForm(true);
    setForm({
      nome: fornecedor.nome || '',
      cnpj: fornecedor.cnpj || '',
      logradouro: fornecedor.logradouro || '',
      bairro: fornecedor.bairro || '',
      cidade: fornecedor.cidade || '',
      uf: fornecedor.uf || '',
      cep: fornecedor.cep || '',
    });
  }

  async function salvarFornecedor() {
    const payload = {
      nome: form.nome.trim(),
      cnpj: onlyDigits(form.cnpj),
      logradouro: form.logradouro.trim(),
      bairro: form.bairro.trim(),
      cidade: form.cidade.trim(),
      uf: form.uf.trim().toUpperCase(),
      cep: onlyDigits(form.cep),
    };

    if (!payload.nome || payload.cnpj.length !== 14) {
      setAlertState({
        visible: true,
        title: 'Dados invalidos',
        message: 'Informe o nome e um CNPJ com 14 digitos.',
      });
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
      setAlertState({
        visible: true,
        title: 'Erro ao salvar',
        message: 'Nao foi possivel salvar o fornecedor. Tente novamente.',
      });
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

  const enderecoPreenchido = form.logradouro || form.bairro || form.cidade || form.uf || form.cep;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        theme={theme}
        title="Fornecedores"
        subtitle="Cadastre fornecedores vinculaveis as tarefas"
      />
      <QuickNav navigation={navigation} active="Fornecedores" theme={theme} />

      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={{ flex: 1 }} />
          {!showForm && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => { resetForm(); setShowForm(true); }}
            activeOpacity={0.8}
          >
            <FontAwesome name="plus" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          )}
        </View>

        {showForm ? (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
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

                  <TouchableOpacity style={styles.clearButton} onPress={resetForm} activeOpacity={0.8}>
                    <FontAwesome name="times" size={13} color={theme.colors.muted} />
                    <Text style={styles.clearButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Nome</Text>
                  <TextInput
                    style={[styles.input, buscandoCnpj && styles.inputDisabled]}
                    placeholder="Nome do fornecedor"
                    placeholderTextColor={theme.colors.muted}
                    value={form.nome}
                    onChangeText={(value) => updateField('nome', value)}
                    editable={!buscandoCnpj}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>CNPJ</Text>
                  <View style={styles.row}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="00.000.000/0000-00"
                      placeholderTextColor={theme.colors.muted}
                      value={formatCnpj(form.cnpj)}
                      onChangeText={(value) => updateField('cnpj', value)}
                      keyboardType="number-pad"
                      maxLength={18}
                    />
                    {buscandoCnpj && (
                      <View style={{ justifyContent: 'center', paddingLeft: 8 }}>
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.addressDivider} />

                <Text style={[styles.label, { marginBottom: 10 }]}>Endereco</Text>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>CEP</Text>
                  <View style={styles.row}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="00000-000"
                      placeholderTextColor={theme.colors.muted}
                      value={formatCep(form.cep)}
                      onChangeText={(value) => updateField('cep', value)}
                      keyboardType="number-pad"
                      maxLength={9}
                    />
                    {buscandoCep && (
                      <View style={{ justifyContent: 'center', paddingLeft: 8 }}>
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Logradouro</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Rua, avenida, etc."
                    placeholderTextColor={theme.colors.muted}
                    value={form.logradouro}
                    onChangeText={(value) => updateField('logradouro', value)}
                  />
                </View>

                <View style={styles.row}>
                  <View style={styles.halfField}>
                    <Text style={styles.label}>Bairro</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Bairro"
                      placeholderTextColor={theme.colors.muted}
                      value={form.bairro}
                      onChangeText={(value) => updateField('bairro', value)}
                    />
                  </View>
                  <View style={styles.halfField}>
                    <Text style={styles.label}>Cidade</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Cidade"
                      placeholderTextColor={theme.colors.muted}
                      value={form.cidade}
                      onChangeText={(value) => updateField('cidade', value)}
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.halfField}>
                    <Text style={styles.label}>UF</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="UF"
                      placeholderTextColor={theme.colors.muted}
                      value={form.uf}
                      onChangeText={(value) => updateField('uf', value.toUpperCase().slice(0, 2))}
                      maxLength={2}
                      autoCapitalize="characters"
                    />
                  </View>
                  <View style={styles.halfField}>
                    {enderecoPreenchido ? (
                      <TouchableOpacity
                        style={[styles.outlineButton, { marginTop: 22, borderColor: theme.colors.muted }]}
                        onPress={() => setForm((c) => ({ ...c, logradouro: '', bairro: '', cidade: '', uf: '', cep: '' }))}
                        activeOpacity={0.8}
                      >
                        <FontAwesome name="times" size={12} color={theme.colors.muted} />
                        <Text style={{ color: theme.colors.muted, fontSize: 12, fontWeight: '800' }}>Limpar</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
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
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <>
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
              renderItem={({ item }) => {
                const addressParts = [item.logradouro, item.bairro, item.cidade, item.uf].filter(Boolean);
                const addressStr = addressParts.length ? addressParts.join(', ') : null;

                return (
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
                    {addressStr && (
                      <View style={[styles.metaBox, { marginBottom: addressParts.length ? 8 : 0 }]}>
                        <Text style={styles.metaTitle}>Endereco</Text>
                        <Text style={styles.metaText}>{addressStr}</Text>
                      </View>
                    )}

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
                );
              }}
            />
          </>
        )}
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
