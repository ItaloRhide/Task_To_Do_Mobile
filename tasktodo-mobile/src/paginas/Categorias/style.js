import { StyleSheet } from 'react-native';

export default function createStyles(theme) {
  const { colors } = theme;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    primaryButton: {
      height: 46,
      borderRadius: 8,
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 12,
    },
    disabledButton: {
      opacity: 0.7,
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontWeight: '800',
      fontSize: 14,
    },
    listContent: {
      paddingBottom: 36,
    },
    counter: {
      minWidth: 58,
      minHeight: 44,
      borderRadius: 8,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
    },
    counterValue: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '900',
    },
    counterLabel: {
      color: colors.muted,
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    actionsRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 4,
    },
    outlineButton: {
      flex: 1,
      height: 38,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    outlineButtonText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: '800',
    },
    dangerButton: {
      borderColor: colors.danger,
    },
    dangerButtonText: {
      color: colors.danger,
      fontSize: 12,
      fontWeight: '800',
    },
    formHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      marginBottom: 12,
    },
    formTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    formTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '900',
    },
    clearButton: {
      height: 34,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingHorizontal: 10,
    },
    clearButtonText: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: '800',
    },
    fieldGroup: {
      marginBottom: 12,
    },
    label: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '800',
      marginBottom: 6,
    },
    input: {
      minHeight: 44,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceMuted,
      color: colors.text,
      fontSize: 14,
      paddingHorizontal: 12,
    },
    textArea: {
      minHeight: 82,
      paddingTop: 10,
      textAlignVertical: 'top',
    },
    feedbackBox: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.danger,
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      padding: 12,
      marginBottom: 12,
    },
    feedbackText: {
      flex: 1,
      color: colors.danger,
      fontSize: 12,
      fontWeight: '700',
      lineHeight: 17,
    },
    emptyBox: {
      minHeight: 140,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: 16,
    },
    emptyText: {
      color: colors.muted,
      fontSize: 13,
      fontWeight: '700',
      textAlign: 'center',
    },
  });
}
