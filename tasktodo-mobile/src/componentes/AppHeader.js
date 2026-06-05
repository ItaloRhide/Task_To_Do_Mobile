import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

export default function AppHeader({ theme, title, subtitle }) {
  return (
    <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
      <View style={[styles.logo, { backgroundColor: theme.colors.primarySoft }]}>
        <FontAwesome name="check-square-o" size={22} color={theme.colors.primary} />
      </View>
      <View style={styles.headerText}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.muted }]}>{subtitle}</Text>
      </View>
    </View>
  );
}
