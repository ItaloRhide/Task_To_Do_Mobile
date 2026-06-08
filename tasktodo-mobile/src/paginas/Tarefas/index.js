import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import AlertModal from '../../componentes/AlertModal';
import AppHeader from '../../componentes/AppHeader';
import QuickNav from '../../componentes/QuickNav';
import SectionCard from '../../componentes/SectionCard';
import api from '../../servicos/api';
import extractErrorMessage from '../../servicos/errorMessage';
import createStyles from './style';

const filters = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'completed', label: 'Concluidas' },
];

function prioridadeLabel(prioridade) {
  const labels = {
    1: 'Muito baixa',
    2: 'Baixa',
    3: 'Media',
    4: 'Alta',
    5: 'Critica',
  };

  return labels[prioridade] || 'Sem prioridade';
}

export default function Tarefas({ navigation, theme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [allTasks, setAllTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alertState, setAlertState] = useState({ visible: false, title: '', message: '', type: 'alert', onConfirm: null });

  const carregarTarefas = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const response = await api.get('/tasks');
      setAllTasks(response.data);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [carregarTarefas]),
  );

  const tarefas = useMemo(() => {
    return allTasks.filter((task) => {
      const matchesSearch = task.titulo?.toLowerCase().includes(search.trim().toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'pending' && !task.concluida) ||
        (filter === 'completed' && task.concluida);

      return matchesSearch && matchesFilter;
    });
  }, [allTasks, filter, search]);

  async function concluirTarefa(id) {
    try {
      setError('');
      await api.put(`/tasks/${id}/concluir`);
      await carregarTarefas();
    } catch (err) {
      setAlertState({
        visible: true,
        type: 'alert',
        title: 'Erro ao concluir',
        message: 'Nao foi possivel concluir a tarefa. Tente novamente.',
      });
    }
  }

  function confirmarExclusao(task) {
    setAlertState({
      visible: true,
      type: 'confirm',
      title: 'Excluir tarefa',
      message: `Deseja excluir ${task.titulo}? Esta acao nao pode ser desfeita.`,
      onConfirm: () => excluirTarefa(task.id),
    });
  }

  async function excluirTarefa(id) {
    try {
      setError('');
      await api.delete(`/tasks/${id}`);
      await carregarTarefas();
    } catch (err) {
      setAlertState({
        visible: true,
        type: 'alert',
        title: 'Erro ao excluir',
        message: 'Nao foi possivel excluir a tarefa. Tente novamente.',
      });
    }
  }

  const pendentes = allTasks.filter((task) => !task.concluida).length;
  const concluidas = allTasks.filter((task) => task.concluida).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        theme={theme}
        title="Task To Do"
        subtitle="Organize tarefas, categorias e fornecedores"
      />
      <QuickNav navigation={navigation} active="Tarefas" theme={theme} />

      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={14} color={theme.colors.muted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por titulo..."
              placeholderTextColor={theme.colors.muted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('FormularioTarefa')}
            activeOpacity={0.8}
          >
            <FontAwesome name="plus" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          {filters.map((item) => {
            const selected = filter === item.key;

            return (
              <TouchableOpacity
                key={item.key}
                style={[styles.filterButton, selected && styles.filterButtonActive]}
                onPress={() => setFilter(item.key)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterText, selected && styles.filterTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {error ? (
          <View style={styles.feedbackBox}>
            <FontAwesome name="exclamation-circle" size={14} color={theme.colors.danger} />
            <Text style={styles.feedbackText}>{error}</Text>
          </View>
        ) : null}

        <FlatList
          data={tarefas}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          refreshing={loading}
          onRefresh={carregarTarefas}
          ListHeaderComponent={
            <View style={styles.summaryRow}>
              <View style={[styles.statCard, { backgroundColor: theme.colors.primarySoft }]}>
                <Text style={[styles.statValue, { color: theme.colors.primary }]}>{pendentes}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.primary }]}>Pendentes</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1 }]}>
                <Text style={[styles.statValue, { color: theme.colors.success }]}>{concluidas}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.success }]}>Concluidas</Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              {loading ? (
                <ActivityIndicator color={theme.colors.primary} />
              ) : (
                <>
                  <FontAwesome name="inbox" size={42} color={theme.colors.primarySoft} />
                  <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
                </>
              )}
            </View>
          }
          renderItem={({ item }) => (
            <SectionCard
              theme={theme}
              title={item.titulo}
              subtitle={item.descricao}
              right={
                <View style={[styles.statusPill, item.concluida && styles.statusPillDone]}>
                  <Text style={[styles.statusText, item.concluida && styles.statusTextDone]}>
                    {item.concluida ? 'Feita' : 'Aberta'}
                  </Text>
                </View>
              }
            >
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>Vence: {item.dataVencimento}</Text>
                <Text style={styles.metaText}>Prioridade: {prioridadeLabel(item.prioridade)}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.categoryText}>{item.categoria?.nome || 'Sem categoria'}</Text>
                <Text style={styles.metaText}>
                  {item.fornecedores?.length
                    ? item.fornecedores.map((fornecedor) => fornecedor.nome).join(', ')
                    : 'Sem fornecedor'}
                </Text>
              </View>

              <View style={styles.actionsRow}>
                {!item.concluida && (
                  <TouchableOpacity
                    style={styles.outlineButton}
                    onPress={() => concluirTarefa(item.id)}
                    activeOpacity={0.8}
                  >
                    <FontAwesome name="check" size={13} color={theme.colors.primary} />
                    <Text style={styles.outlineButtonText}>Concluir</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.outlineButton}
                  onPress={() => navigation.navigate('FormularioTarefa', { id: item.id })}
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
