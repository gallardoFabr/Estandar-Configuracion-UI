import { defaultTheme } from './defaultTheme.js'
import { getContrastColor } from '../utils/colorUtils.js'

const clone = (value) => JSON.parse(JSON.stringify(value))

const makeTheme = (colors, options = {}) => {
  const theme = clone(defaultTheme)
  theme.colors = { ...theme.colors, ...colors }

  if (options.typography) {
    theme.typography = { ...theme.typography, ...clone(options.typography) }
  }

  const primary = colors.primary
  const secondary = colors.secondary
  const success = colors.success
  const warning = colors.warning
  const error = colors.error
  const info = colors.info
  const textPrimary = colors.textPrimary
  const textSecondary = colors.textSecondary
  const background = colors.background

  const button = options.buttons || {}
  const sharedButton = {
    borderWidth: button.borderWidth ?? 0,
    borderStyle: button.borderStyle ?? 'none',
    borderRadius: button.borderRadius ?? 6,
    height: button.height ?? 40,
    paddingX: button.paddingX ?? 16,
    fontWeight: button.fontWeight ?? theme.typography.textNormal.weight
  }
  const buttonColors = {
    primary: { background: primary, color: '#FFFFFF', borderColor: primary },
    secondary: { background: '#FFFFFF', color: primary, borderColor: primary },
    cancel: { background: error, color: '#FFFFFF', borderColor: error },
    retry: { background: error, color: '#FFFFFF', borderColor: error },
    // El botón Eliminar usa el color primario (linkeado, no se edita aparte).
    delete: { background: primary, color: '#FFFFFF', borderColor: primary },
    disabled: { background: '#E2E8F0', color: '#94A3B8', borderColor: '#CBD5E1' }
  }
  theme.buttons = Object.fromEntries(Object.entries(buttonColors).map(([key, value]) => [key, {
    ...clone(sharedButton),
    ...value,
    border: sharedButton.borderStyle === 'none' || sharedButton.borderWidth === 0
      ? 'none'
      : `${sharedButton.borderWidth}px ${sharedButton.borderStyle} ${value.borderColor}`
  }]))

  theme.forms = {
    ...theme.forms,
    background: options.forms?.background ?? '#FFFFFF',
    borderColor: options.forms?.borderColor ?? '#CBD5E1',
    focusBorderColor: primary,
    errorBorderColor: error,
    borderRadius: options.forms?.borderRadius ?? 6,
    height: options.forms?.height ?? 40,
    paddingX: options.forms?.paddingX ?? 12,
    fontSize: theme.typography.textNormal.size,
    labelSize: theme.typography.textSecondary.size,
    labelFontWeight: theme.typography.textSecondary.weight,
    labelColor: textPrimary,
    errorColor: error,
    errorFontSize: theme.typography.textSmall.size,
    placeholderColor: options.forms?.placeholderColor ?? '#94A3B8',
    disabledBackground: options.forms?.disabledBackground ?? '#F1F5F9',
    disabledColor: options.forms?.disabledColor ?? '#94A3B8'
  }

  theme.tables = {
    ...theme.tables,
    headerBackground: secondary,
    headerColor: '#FFFFFF',
    headerFontWeight: theme.typography.titleSection.weight,
    rowBackground: '#FFFFFF',
    rowAlternateBackground: background,
    rowHoverBackground: options.tables?.rowHoverBackground ?? `${primary}18`,
    _hoverLinked: options.tables?.rowHoverBackground ? false : true,
    borderColor: options.tables?.borderColor ?? '#E2E8F0',
    borderRadius: options.tables?.borderRadius ?? 6,
    rowHeight: options.tables?.rowHeight ?? 48,
    fontSize: theme.typography.textNormal.size
  }

  theme.states = {
    ...clone(theme.states),
    success: { color: success, background: options.states?.successBackground ?? `${success}18`, border: options.states?.successBorder ?? `${success}40`, icon: 'CheckCircle' },
    warning: { color: warning, background: options.states?.warningBackground ?? `${warning}18`, border: options.states?.warningBorder ?? `${warning}40`, icon: 'AlertTriangle' },
    error: { color: error, background: options.states?.errorBackground ?? `${error}18`, border: options.states?.errorBorder ?? `${error}40`, icon: 'XCircle' },
    info: { color: info, background: options.states?.infoBackground ?? `${info}18`, border: options.states?.infoBorder ?? `${info}40`, icon: 'Info' },
    toastPosition: options.states?.toastPosition ?? 'top-right',
    toastDuration: options.states?.toastDuration ?? 4000,
    borderRadius: options.states?.borderRadius ?? 8,
    displayType: options.states?.displayType ?? 'toast'
  }

  theme.modals = {
    ...theme.modals,
    width: options.modals?.width ?? 500,
    borderRadius: options.modals?.borderRadius ?? 8,
    overlayColor: options.modals?.overlayColor ?? 'rgba(0, 0, 0, 0.5)',
    padding: options.modals?.padding ?? 24,
    position: options.modals?.position ?? 'center',
    titleSize: theme.typography.titleSection.size,
    titleWeight: theme.typography.titleSection.weight
  }

  theme.icons = {
    ...theme.icons,
    size: options.icons?.size ?? 20,
    strokeWidth: options.icons?.strokeWidth ?? 2,
    color: options.icons?.color ?? secondary
  }

  theme.layout = {
    ...clone(theme.layout),
    sidebar: {
      ...theme.layout.sidebar,
      width: options.layout?.sidebar?.width ?? 240,
      background: secondary,
      borderRadius: options.layout?.sidebar?.borderRadius ?? 0,
      spacing: options.layout?.sidebar?.spacing ?? 4,
      iconColor: options.layout?.sidebar?.iconColor
        ?? getContrastColor(options.layout?.sidebar?.background ?? secondary),
      _bgLinked: true,
      _iconLinked: options.layout?.sidebar?.iconColor ? false : true
    },
    header: {
      ...theme.layout.header,
      height: options.layout?.header?.height ?? 56,
      background: options.layout?.header?.background ?? '#FFFFFF'
    },
    content: {
      ...theme.layout.content,
      background: options.layout?.content?.background ?? background,
      padding: options.layout?.content?.padding ?? 24,
      maxWidth: options.layout?.content?.maxWidth ?? 1200
    },
    borderRadiusGlobal: options.layout?.borderRadiusGlobal ?? 6
  }

  theme.errors = {
    validation: {
      ...theme.errors.validation,
      color: error,
      icon: 'AlertCircle',
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      fontSize: theme.typography.textSmall.size
    },
    operation: {
      ...theme.errors.operation,
      color: error,
      icon: 'XCircle',
      background: options.errors?.operationBackground ?? `${error}10`,
      border: `1px solid ${options.errors?.operationBorder ?? `${error}40`}`,
      borderRadius: options.errors?.borderRadius ?? 8,
      fontSize: theme.typography.textSecondary.size
    },
    businessRule: {
      ...theme.errors.businessRule,
      color: warning,
      icon: 'AlertTriangle',
      background: options.errors?.businessBackground ?? `${warning}10`,
      border: `1px solid ${options.errors?.businessBorder ?? `${warning}40`}`,
      borderRadius: options.errors?.borderRadius ?? 8,
      fontSize: theme.typography.textSecondary.size
    }
  }

  return theme
}

const institutionalColors = {
  primary: '#1E40AF', secondary: '#1E3A8A', success: '#15803D', warning: '#D97706',
  error: '#B91C1C', info: '#0369A1', background: '#F8FAFC', textPrimary: '#1E293B', textSecondary: '#64748B'
}

const modernaColors = {
  primary: '#7C3AED', secondary: '#4F46E5', success: '#059669', warning: '#F59E0B',
  error: '#E11D48', info: '#06B6D4', background: '#FAFAFE', textPrimary: '#18181B', textSecondary: '#71717A'
}

const educativaColors = {
  primary: '#0D9488', secondary: '#0E7490', success: '#16A34A', warning: '#EAB308',
  error: '#DC2626', info: '#2563EB', background: '#F0FDFA', textPrimary: '#134E4A', textSecondary: '#5F7A76'
}

// Paleta solicitada del estándar GUI / SieWeb.
const sieWebColors = {
  primary: '#00A6CE',
  secondary: '#1E3A8A',
  success: '#16A34A',
  warning: '#F97316',
  error: '#DC2626',
  info: '#38BDF8',
  background: '#F8FAFC',
  textPrimary: '#1E293B',
  textSecondary: '#64748B'
}

export const palettes = [
  {
    id: 'institucional',
    name: 'Institucional',
    description: 'Tonos azules clásicos e institucionales.',
    theme: makeTheme(institutionalColors, {
      typography: {
        fontFamily: 'Roboto',
        titleMain: { size: 28, weight: 700 }, titleSection: { size: 22, weight: 600 }, subtitle: { size: 18, weight: 600 },
        textNormal: { size: 16, weight: 400 }, textSecondary: { size: 14, weight: 400 }, textSmall: { size: 12, weight: 400 }
      },
      buttons: { borderRadius: 6, height: 40, paddingX: 16, fontWeight: 500 },
      forms: { borderRadius: 6 }, tables: { borderRadius: 6 }, states: { borderRadius: 8 }, modals: { borderRadius: 8 },
      icons: { size: 20, strokeWidth: 2 }, layout: { sidebar: { width: 240, borderRadius: 0 }, borderRadiusGlobal: 6 }, errors: { borderRadius: 8 }
    })
  },
  {
    id: 'moderna',
    name: 'Moderna',
    description: 'Morados y azules contemporáneos.',
    theme: makeTheme(modernaColors, {
      typography: {
        fontFamily: 'Poppins',
        titleMain: { size: 30, weight: 700 }, titleSection: { size: 20, weight: 600 }, subtitle: { size: 17, weight: 500 },
        textNormal: { size: 15, weight: 400 }, textSecondary: { size: 13, weight: 400 }, textSmall: { size: 11, weight: 400 }
      },
      buttons: { borderRadius: 10, height: 42, paddingX: 18, fontWeight: 600 },
      forms: { borderRadius: 10, height: 42 }, tables: { borderRadius: 10, rowHeight: 50 }, states: { borderRadius: 10 }, modals: { borderRadius: 14, width: 520 },
      icons: { size: 21, strokeWidth: 1.8 }, layout: { sidebar: { width: 250, borderRadius: 12 }, header: { height: 60 }, borderRadiusGlobal: 10 }, errors: { borderRadius: 10 }
    })
  },
  {
    id: 'educativa',
    name: 'Educativa',
    description: 'Verdes y azules frescos para educación.',
    theme: makeTheme(educativaColors, {
      typography: {
        fontFamily: 'Open Sans',
        titleMain: { size: 28, weight: 700 }, titleSection: { size: 21, weight: 700 }, subtitle: { size: 18, weight: 600 },
        textNormal: { size: 16, weight: 400 }, textSecondary: { size: 14, weight: 400 }, textSmall: { size: 12, weight: 400 }
      },
      buttons: { borderRadius: 8, height: 40, paddingX: 16, fontWeight: 600 },
      forms: { borderRadius: 8 }, tables: { borderRadius: 8 }, states: { borderRadius: 8 }, modals: { borderRadius: 10 },
      icons: { size: 20, strokeWidth: 2 }, layout: { sidebar: { width: 235, borderRadius: 8 }, borderRadiusGlobal: 8 }, errors: { borderRadius: 8 }
    })
  },
  {
    id: 'sieweb',
    name: 'SieWeb',
    description: 'Paleta del estándar GUI basada en la referencia de SieWeb.',
    theme: makeTheme(sieWebColors, {
      typography: {
        fontFamily: 'Inter',
        titleMain: { size: 28, weight: 700 }, titleSection: { size: 22, weight: 600 }, subtitle: { size: 18, weight: 600 },
        textNormal: { size: 16, weight: 400 }, textSecondary: { size: 14, weight: 400 }, textSmall: { size: 12, weight: 400 }
      },
      buttons: { borderRadius: 6, height: 40, paddingX: 16, fontWeight: 600 },
      forms: { borderRadius: 6 }, tables: { borderRadius: 6 }, states: { borderRadius: 8 }, modals: { borderRadius: 8 },
      icons: { size: 20, strokeWidth: 2, color: '#1E3A8A' }, layout: { sidebar: { width: 240, borderRadius: 0 }, header: { height: 56 }, content: { maxWidth: 1200 }, borderRadiusGlobal: 6 }, errors: { borderRadius: 8 }
    })
  }
]
