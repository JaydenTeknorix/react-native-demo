export const theme = {
  colors: {
    background: '#F4F6FB',
    surface: '#FFFFFF',
    primary: '#4361EE',
    primaryLight: '#EEF0FD',
    text: '#1A1A2E',
    textSecondary: '#6C757D',
    textMuted: '#ADB5BD',
    border: '#E9ECEF',
    danger: '#E63946',
    warning: '#F4A261',
    success: '#2DC653',
    // status colours
    statusNotDone: '#E63946',
    statusInProgress: '#F4A261',
    statusCompleted: '#2DC653',
    // category colours
    catPothole: '#FFD8D8',
    catLighting: '#FFF3BF',
    catTrash: '#D3F9D8',
    catGraffiti: '#E0C3FC',
    catOther: '#DBE4FF',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '999px',
  },
  shadow: {
    card: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.07;
      shadow-radius: 8px;
      elevation: 3;
    `,
  },
};

export type Theme = typeof theme;
