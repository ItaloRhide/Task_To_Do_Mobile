import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import AppHeader from '../../componentes/AppHeader';
import QuickNav from '../../componentes/QuickNav';
import SectionCard from '../../componentes/SectionCard';
import { prioridadeLabel, tarefasMock } from '../../dados/mockData';
import createStyles from './style';

const filters = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'completed', label: 'Concluidas' },
];

export default function Tarefas({ navigation, theme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const tarefas = useMemo(() => {
    return tarefasMock.filter((task) => {
      const matchesSearch = task.titulo.toLowerCase().includes(search.trim().toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'pending' && !task.concluida) ||
        (filter === 'completed' && task.concluida);

      return matchesSearch && matchesFilter;
    });
  }, [filter, search]);

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

        <FlatList
          data={tarefas}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.summaryRow}>
              <SectionCard
                theme={theme}
                title={`${tarefasMock.filter((task) => !task.concluida).length}`}
                subtitle="Pendentes"
              />
              <SectionCard
                theme={theme}
                title={`${tarefasMock.filter((task) => task.concluida).length}`}
                subtitle="Concluidas"
              />
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <FontAwesome name="inbox" size={42} color={theme.colors.primarySoft} />
              <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
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
                <TouchableOpacity
                  style={styles.outlineButton}
                  onPress={() => navigation.navigate('FormularioTarefa', { id: item.id })}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="pencil" size={13} color={theme.colors.primary} />
                  <Text style={styles.outlineButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </SectionCard>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
