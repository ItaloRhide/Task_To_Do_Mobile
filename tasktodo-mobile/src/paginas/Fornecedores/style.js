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
  });
}
