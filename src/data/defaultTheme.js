export const defaultTheme = {
  colors: {
    primary: '#00A6CE',
    secondary: '#1E3A8A',
    success: '#16A34A',
    warning: '#F97316',
    error: '#DC2626',
    info: '#38BDF8',
    background: '#F8FAFC',
    textPrimary: '#1E293B',
    textSecondary: '#64748B'
  },
  typography: {
    fontFamily: 'Inter',
    titleMain: { size: 28, weight: 700 },
    titleSection: { size: 22, weight: 600 },
    subtitle: { size: 18, weight: 600 },
    textNormal: { size: 16, weight: 400 },
    textSecondary: { size: 14, weight: 400 },
    textSmall: { size: 12, weight: 400 }
  },
  buttons: {
    primary: {
      background: '#00A6CE',
      color: '#FFFFFF',
      border: 'none',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: '#00A6CE',
      borderRadius: 6,
      height: 40,
      paddingX: 16,
      fontWeight: 400
    },
    secondary: {
      background: '#FFFFFF',
      color: '#00A6CE',
      border: '1px solid #00A6CE',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#00A6CE',
      borderRadius: 6,
      height: 40,
      paddingX: 16,
      fontWeight: 400
    },
    cancel: {
      background: '#DC2626',
      color: '#FFFFFF',
      border: 'none',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: '#DC2626',
      borderRadius: 6,
      height: 40,
      paddingX: 16,
      fontWeight: 400
    },
    retry: {
      background: '#DC2626',
      color: '#FFFFFF',
      border: 'none',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: '#DC2626',
      borderRadius: 6,
      height: 40,
      paddingX: 16,
      fontWeight: 400
    },
    delete: {
      background: '#00A6CE',
      color: '#FFFFFF',
      border: 'none',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: '#00A6CE',
      borderRadius: 6,
      height: 40,
      paddingX: 16,
      fontWeight: 400
    },
    disabled: {
      background: '#E2E8F0',
      color: '#94A3B8',
      border: 'none',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: '#CBD5E1',
      borderRadius: 6,
      height: 40,
      paddingX: 16,
      fontWeight: 400
    }
  },
  forms: {
    background: '#FFFFFF',
    borderColor: '#CBD5E1',
    focusBorderColor: '#00A6CE',
    errorBorderColor: '#DC2626',
    borderRadius: 6,
    height: 40,
    paddingX: 12,
    fontSize: 16,
    labelSize: 14,
    labelFontWeight: 500,
    labelColor: '#1E293B',
    errorColor: '#DC2626',
    errorFontSize: 12,
    placeholderColor: '#94A3B8',
    disabledBackground: '#F1F5F9',
    disabledColor: '#94A3B8'
  },
  tables: {
    headerBackground: '#1E3A8A',
    headerColor: '#FFFFFF',
    headerFontWeight: 600,
    rowBackground: '#FFFFFF',
    rowAlternateBackground: '#F8FAFC',
    // El hover parte "linkeado" al color primario (tenue) pero se puede
    // editar con libertad; al hacerlo se desvincula automáticamente.
    rowHoverBackground: '#00A6CE18',
    _hoverLinked: true,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    rowHeight: 48,
    fontSize: 16
  },
  states: {
    success: {
      color: '#16A34A',
      background: '#16A34A18',
      border: '#16A34A40',
      icon: 'CheckCircle'
    },
    warning: {
      color: '#F97316',
      background: '#F9731618',
      border: '#F9731640',
      icon: 'AlertTriangle'
    },
    error: {
      color: '#DC2626',
      background: '#DC262618',
      border: '#DC262640',
      icon: 'XCircle'
    },
    info: {
      color: '#38BDF8',
      background: '#38BDF818',
      border: '#38BDF840',
      icon: 'Info'
    },
    toastPosition: 'top-right',
    toastDuration: 4000,
    borderRadius: 8
  },
  modals: {
    width: 500,
    borderRadius: 8,
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    padding: 24,
    position: 'center',
    titleSize: 22,
    titleWeight: 600
  },
  icons: {
    size: 20,
    strokeWidth: 2,
    color: '#1E3A8A'
  },
  layout: {
    sidebar: {
      width: 240,
      background: '#1E3A8A',
      borderRadius: 0,
      spacing: 4,
      // Color de los iconos del menú lateral: por defecto contrasta con el
      // fondo del sidebar, pero es independiente de la paleta y se puede
      // editar libremente (se desvincula al modificarlo).
      iconColor: '#FFFFFF',
      _bgLinked: true,
      _iconLinked: true
    },
    header: {
      height: 56,
      background: '#FFFFFF',
      showLogo: true,
      showNotifications: true,
      showUser: true
    },
    content: {
      background: '#F8FAFC',
      padding: 24,
      maxWidth: 1200
    },
    borderRadiusGlobal: 6
  },
  errors: {
    validation: {
      color: '#DC2626',
      icon: 'AlertCircle',
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      fontSize: 12
    },
    operation: {
      color: '#DC2626',
      icon: 'XCircle',
      background: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: 8,
      fontSize: 14
    },
    businessRule: {
      color: '#F97316',
      icon: 'AlertTriangle',
      background: '#FFFBEB',
      border: '1px solid #FDE68A',
      borderRadius: 8,
      fontSize: 14
    }
  }
}
