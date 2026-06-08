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
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 28,
      paddingVertical: 40,
    },
    logoSection: {
      alignItems: 'center',
      marginBottom: 32,
    },
    logoCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    appName: {
      fontSize: 26,
      fontWeight: '900',
      marginBottom: 4,
    },
    appSubtitle: {
      fontSize: 14,
    },
    card: {
      borderRadius: 16,
      borderWidth: 1,
      padding: 24,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 6,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '800',
      marginBottom: 20,
    },
    fieldGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 12,
      fontWeight: '800',
      marginBottom: 6,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    inputRow: {
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      gap: 10,
    },
    input: {
      flex: 1,
      fontSize: 15,
      paddingVertical: 0,
    },
    errorBox: {
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      padding: 12,
      marginBottom: 16,
    },
    errorText: {
      flex: 1,
      color: '#DC2626',
      fontSize: 13,
      fontWeight: '600',
      lineHeight: 18,
    },
    loginButton: {
      height: 50,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      marginBottom: 16,
    },
    disabledButton: {
      opacity: 0.7,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '800',
    },
    hint: {
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 17,
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 28,
      paddingVertical: 8,
    },
    themeToggleText: {
      fontSize: 13,
      fontWeight: '600',
    },
  });
}
