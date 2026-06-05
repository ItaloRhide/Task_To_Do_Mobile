import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

const items = [
  { route: 'Tarefas', label: 'Tarefas', icon: 'list-ul' },
  { route: 'Categorias', label: 'Categorias', icon: 'tags' },
  { route: 'Fornecedores', label: 'Fornecedores', icon: 'truck' },
];

export default function QuickNav({ navigation, active, theme }) {
  return (
    <View style={styles.navRow}>
      {items.map((item) => {
        const isActive = active === item.route;

        return (
          <TouchableOpacity
            key={item.route}
            style={[
              styles.navButton,
              {
                backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
                borderColor: isActive ? theme.colors.primary : theme.colors.border,
              },
            ]}
            onPress={() => {
              if (!isActive) navigation.navigate(item.route);
            }}
            activeOpacity={0.75}
          >
            <FontAwesome
              name={item.icon}
              size={13}
              color={isActive ? '#FFFFFF' : theme.colors.primary}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.navText,
                { color: isActive ? '#FFFFFF' : theme.colors.primary },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
