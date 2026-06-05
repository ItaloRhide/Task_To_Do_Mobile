import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

export default function SectionCard({ theme, title, subtitle, right, children }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      {(title || subtitle || right) && (
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderText}>
            {title && <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{title}</Text>}
            {subtitle && <Text style={[styles.cardSubtitle, { color: theme.colors.muted }]}>{subtitle}</Text>}
          </View>
          {right}
        </View>
      )}
      {children}
    </View>
  );
}
