const light = {
  mode: 'light',
  colors: {
    primary: '#1565C0',
    primaryDark: '#0D47A1',
    primaryLight: '#51A2FF',
    primarySoft: '#BBDEFB',
    secondary: '#42A5F5',
    background: '#E3F2FD',
    surface: '#FFFFFF',
    surfaceMuted: '#F8FAFC',
    text: '#001233',
    muted: '#526070',
    border: '#BBDEFB',
    danger: '#D32F2F',
    success: '#002855',
    warning: '#F9A825',
    shadow: '#7EA4C7',
  },
};

const dark = {
  mode: 'dark',
  colors: {
    primary: '#C4B3D9',
    primaryDark: '#40325A',
    primaryLight: '#6D5C88',
    primarySoft: '#2F2640',
    secondary: '#51A2FF',
    background: '#1E1828',
    surface: '#2A2238',
    surfaceMuted: '#332A45',
    text: '#FFFFFF',
    muted: '#B5A8CC',
    border: '#3A2F4D',
    danger: '#FF7B7B',
    success: '#42A5F5',
    warning: '#FFD166',
    shadow: '#111018',
  },
};

export function getTheme(darkMode) {
  return darkMode ? dark : light;
}
