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
    searchRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 12,
    },
    addButton: {
      width: 46,
      height: 46,
      borderRadius: 8,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      height: 46,
      borderRadius: 8,
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 8,
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
    iconBadge: {
      width: 44,
      height: 44,
      borderRadius: 8,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    metaBox: {
      borderRadius: 8,
      backgroundColor: colors.surfaceMuted,
      padding: 12,
      marginTop: 2,
    },
    metaTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '800',
      marginBottom: 4,
    },
    metaText: {
      color: colors.muted,
      fontSize: 12,
      lineHeight: 17,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
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
      marginBottom: 10,
    },
    label: {
      color: colors.text,
      fontSize: 12,
      fontWeight: '800',
      marginBottom: 5,
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
    inputDisabled: {
      opacity: 0.6,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
    },
    halfField: {
      flex: 1,
      marginBottom: 10,
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
    addressDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
  });
}
