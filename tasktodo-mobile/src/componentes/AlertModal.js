import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { alertStyles } from './styles';

export default function AlertModal({
  visible,
  theme,
  title,
  message,
  type = 'alert',
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  onDismiss,
}) {
  if (!visible) return null;

  const isConfirm = type === 'confirm';
  const handleCancel = onCancel || onDismiss;

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={handleCancel}>
      <View style={alertStyles.overlay}>
        <View
          style={[
            alertStyles.dialog,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={alertStyles.header}>
            <View style={[alertStyles.iconBox, isConfirm ? alertStyles.iconBoxWarning : alertStyles.iconBoxDanger]}>
              <FontAwesome
                name={isConfirm ? 'question-circle' : 'exclamation-triangle'}
                size={18}
                color={isConfirm ? '#D97706' : '#DC2626'}
              />
            </View>
            <Text style={[alertStyles.title, { color: theme.colors.text }]}>{title}</Text>
          </View>

          <Text style={[alertStyles.message, { color: theme.colors.muted }]}>{message}</Text>

          <View style={alertStyles.actionsRow}>
            {isConfirm ? (
              <>
                <TouchableOpacity
                  style={[
                    alertStyles.dismissButton,
                    { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border },
                  ]}
                  onPress={handleCancel}
                  activeOpacity={0.8}
                >
                  <Text style={[alertStyles.dismissText, { color: theme.colors.muted }]}>
                    {cancelLabel || 'Cancelar'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    alertStyles.dismissButton,
                    { backgroundColor: theme.colors.danger },
                  ]}
                  onPress={onConfirm}
                  activeOpacity={0.8}
                >
                  <FontAwesome name="trash" size={12} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={[alertStyles.dismissText, { color: '#FFFFFF' }]}>
                    {confirmLabel || 'Excluir'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[
                  alertStyles.dismissButton,
                  { backgroundColor: theme.colors.danger },
                ]}
                onPress={onDismiss}
                activeOpacity={0.8}
              >
                <Text style={[alertStyles.dismissText, { color: '#FFFFFF' }]}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
