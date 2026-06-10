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
    searchBox: {
      flex: 1,
      height: 46,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      gap: 8,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      fontSize: 14,
      paddingVertical: 0,
    },
    addButton: {
      width: 46,
      height: 46,
      borderRadius: 8,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 4,
    },
    filterButton: {
      flex: 1,
      minHeight: 38,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: '700',
    },
    filterTextActive: {
      color: '#FFFFFF',
    },
    listContent: {
      paddingTop: 12,
      paddingBottom: 36,
    },
    summaryRow: {
      flexDirection: 'row',
      gap: 10,
    },
    statusPill: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: colors.primarySoft,
    },
    statusPillDone: {
      backgroundColor: colors.success,
    },
    statusText: {
      color: colors.primary,
      fontSize: 11,
      fontWeight: '800',
    },
    statusTextDone: {
      color: '#FFFFFF',
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      marginTop: 8,
    },
    metaText: {
      flex: 1,
      color: colors.muted,
      fontSize: 12,
    },
    categoryText: {
      flex: 1,
      color: colors.primary,
      fontSize: 12,
      fontWeight: '700',
    },
    actionsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 12,
    },
    outlineButton: {
      minHeight: 34,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
    },
    outlineButtonText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: '700',
    },
    dangerButton: {
      borderColor: colors.danger,
    },
    dangerButtonText: {
      color: colors.danger,
      fontSize: 12,
      fontWeight: '700',
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
      marginBottom: 8,
    },
    feedbackText: {
      flex: 1,
      color: colors.danger,
      fontSize: 12,
      fontWeight: '700',
      lineHeight: 17,
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: 12,
      gap: 4,
    },
    statValue: {
      fontSize: 26,
      fontWeight: '900',
    },
    statLabel: {
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    taskImage: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      marginBottom: 8,
    },
    emptyBox: {
      alignItems: 'center',
      paddingVertical: 48,
    },
    emptyText: {
      color: colors.muted,
      marginTop: 10,
      fontSize: 14,
    },
  });
}
