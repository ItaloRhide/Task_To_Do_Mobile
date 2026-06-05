import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import AppHeader from '../../componentes/AppHeader';
import QuickNav from '../../componentes/QuickNav';
import SectionCard from '../../componentes/SectionCard';
import { fornecedoresMock } from '../../dados/mockData';
import createStyles from './style';

function formatCnpj(cnpj) {
  if (!cnpj || cnpj.length !== 14) return cnpj;

  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
}

export default function Fornecedores({ navigation, theme }) {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        theme={theme}
        title="Fornecedores"
        subtitle="Cadastre fornecedores vinculaveis as tarefas"
      />
      <QuickNav navigation={navigation} active="Fornecedores" theme={theme} />

      <View style={styles.container}>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <FontAwesome name="plus" size={14} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Novo fornecedor</Text>
        </TouchableOpacity>

        <FlatList
          data={fornecedoresMock}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
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
                <TouchableOpacity style={styles.outlineButton} activeOpacity={0.8}>
                  <FontAwesome name="eye" size={13} color={theme.colors.primary} />
                  <Text style={styles.outlineButtonText}>Detalhes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outlineButton} activeOpacity={0.8}>
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
