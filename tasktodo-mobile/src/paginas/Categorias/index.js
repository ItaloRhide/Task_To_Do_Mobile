import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import AppHeader from '../../componentes/AppHeader';
import QuickNav from '../../componentes/QuickNav';
import SectionCard from '../../componentes/SectionCard';
import { categoriasMock, tarefasMock } from '../../dados/mockData';
import createStyles from './style';

export default function Categorias({ navigation, theme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  function totalPorCategoria(id) {
    return tarefasMock.filter((task) => task.categoria?.id === id).length;
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
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <FontAwesome name="plus" size={14} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Nova categoria</Text>
        </TouchableOpacity>

        <FlatList
          data={categoriasMock}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <SectionCard
              theme={theme}
              title={item.nome}
              subtitle={item.descricao}
              right={
                <View style={styles.counter}>
                  <Text style={styles.counterValue}>{totalPorCategoria(item.id)}</Text>
                  <Text style={styles.counterLabel}>tasks</Text>
                </View>
              }
            >
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.outlineButton} activeOpacity={0.8}>
                  <FontAwesome name="pencil" size={13} color={theme.colors.primary} />
                  <Text style={styles.outlineButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.outlineButton, styles.dangerButton]} activeOpacity={0.8}>
                  <FontAwesome name="trash" size={13} color={theme.colors.danger} />
                  <Text style={styles.dangerButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </SectionCard>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
