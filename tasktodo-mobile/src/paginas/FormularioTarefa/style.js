import { StyleSheet } from 'react-native';

export default function createStyles(theme) {
  const { colors } = theme;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 36,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    titleIcon: {
      width: 44,
      height: 44,
      borderRadius: 8,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pageTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '800',
    },
    pageSubtitle: {
      color: colors.muted,
      fontSize: 12,
      marginTop: 2,
    },
    fieldGroup: {
      marginBottom: 14,
    },
    label: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: '800',
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    input: {
      minHeight: 48,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceMuted,
      color: colors.text,
      paddingHorizontal: 14,
      fontSize: 14,
    },
    textArea: {
      minHeight: 96,
      paddingTop: 12,
      textAlignVertical: 'top',
    },
    optionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 14,
    },
    optionButton: {
      minHeight: 38,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceMuted,
      justifyContent: 'center',
      paddingHorizontal: 12,
    },
    optionButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    optionText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: '700',
    },
    optionTextActive: {
      color: '#FFFFFF',
    },
    priorityRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 14,
    },
    priorityButton: {
      flex: 1,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    priorityButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    priorityText: {
      color: colors.primary,
      fontWeight: '800',
    },
    priorityTextActive: {
      color: '#FFFFFF',
    },
    actions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 10,
    },
    secondaryButton: {
      flex: 1,
      height: 48,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    secondaryButtonText: {
      color: colors.muted,
      fontWeight: '700',
    },
    primaryButton: {
      flex: 2,
      height: 48,
      borderRadius: 8,
      backgroundColor: colors.success,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontWeight: '800',
    },
  });
}
