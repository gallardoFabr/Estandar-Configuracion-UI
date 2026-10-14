const clone = (value) => JSON.parse(JSON.stringify(value))

/**
 * Builds the complete GUI template specification.
 * Includes both editable values from the builder and fixed visual/interaction
 * rules that are visible in the school application preview.
 */
function buildTemplateSpec(theme) {
  const t = clone(theme)
  const c = t.colors
  const typo = t.typography

  return {
    colors: clone(c),
    typography: clone(typo),
    buttons: {
      ...clone(t.buttons),
      retry: clone(t.buttons.retry || t.buttons.cancel),
      interaction: {
        hover: { type: 'brightness', value: 0.95, durationMs: 150 },
        active: { transform: 'translateY(1px)', durationMs: 50 },
        disabled: { pointerEvents: 'none', cursor: 'not-allowed' }
      },
      relationships: {
        primary: ['colors.primary'],
        secondaryTextAndBorder: ['colors.primary'],
        cancel: ['colors.error'],
        retry: ['colors.error'],
        delete: ['colors.primary'],
        sharedStructure: ['borderWidth', 'borderStyle', 'borderRadius', 'height', 'paddingX']
      }
    },
    forms: clone(t.forms),
    tables: {
      ...clone(t.tables),
      rowHoverLink: t.tables._hoverLinked !== false ? 'colors.primary + alpha 18' : 'manual'
    },
    states: clone(t.states),
    modals: {
      ...clone(t.modals),
      fixedRendering: {
        position: 'center',
        maxWidth: '90vw',
        internalGap: 16,
        shadow: '0 20px 40px rgba(15,23,42,0.18)',
        transition: { enterMs: 300, leaveMs: 200 }
      }
    },
    icons: {
      ...clone(t.icons),
      library: 'Lucide Icons (@lucide/vue)',
      fallback: 'sans-serif',
      exceptions: {
        sidebar: 'fixed contrast color; independently configurable',
        logo: 'colors.primary',
        tableActions: 'colors.primary',
        buttonIcons: 'inherit button text color',
        stateIcons: 'inherit state color'
      },
      templateMapping: {
        dashboard: 'Home',
        estudiantes: 'Users',
        misCursos: 'BookOpen',
        matricula: 'ClipboardList',
        evidencias: 'FileText',
        pagos: 'CreditCard',
        asistencia: 'ClipboardCheck',
        evaluaciones: 'BarChart3',
        horarios: 'Calendar',
        usuarios: 'UserCog',
        configuracion: 'Settings',
        editar: 'Pencil',
        eliminar: 'Trash2',
        ver: 'Eye',
        buscar: 'Search',
        agregar: 'Plus',
        descargar: 'Download',
        notificaciones: 'Bell',
        cerrarSesion: 'LogOut',
        logo: 'GraduationCap',
        guardar: 'Save',
        volver: 'ArrowLeft',
        menuMovil: 'Menu',
        breadcrumb: 'ChevronRight',
        error: 'XCircle',
        errorValidation: 'AlertCircle',
        warning: 'AlertTriangle',
        success: 'CheckCircle',
        info: 'Info'
      }
    },
    layout: {
      ...clone(t.layout),
      sidebar: {
        ...clone(t.layout.sidebar),
        backgroundSource: 'colors.secondary',
        backgroundLinked: true,
        externalMargin: { top: 8, right: 0, bottom: 8, left: 8 },
        effectiveHeight: 'calc(100% - 16px)',
        navItem: {
          paddingX: 4,
          paddingY: 12,
          gap: 12,
          fontSize: typo.textNormal.size,
          fontWeight: typo.textNormal.weight,
          color: 'rgba(255,255,255,0.7)',
          hover: { color: '#FFFFFF', background: 'rgba(255,255,255,0.1)' },
          active: { color: '#FFFFFF', background: 'colors.primary', borderLeft: '4px solid colors.secondary' }
        }
      },
      header: {
        ...clone(t.layout.header),
        paddingX: 16,
        bottomBorder: '1px solid #E2E8F0',
        logo: { icon: 'GraduationCap', color: 'colors.primary', gap: 8 },
        schoolTag: { fontSize: typo.textSmall.size, fontWeight: typo.textSmall.weight, color: 'colors.secondary', backgroundMix: 'colors.secondary 10%', padding: '3px 6px', borderRadius: 999 },
        search: { background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 6, padding: '4px 8px', gap: 8, iconColor: '#475569' },
        notifications: { icon: 'Bell', iconColor: '#475569', background: 'none', border: 'none' },
        avatar: { size: 32, borderRadius: '50%', background: 'colors.primary', color: '#FFFFFF', fontSize: typo.textSmall.size, fontWeight: typo.textSmall.weight }
      },
      content: {
        ...clone(t.layout.content),
        titleMargin: '16px 0',
        subtitleMargin: '-6px 0 12px',
        infoNotice: { padding: '10px 12px', marginBottom: 12, border: '1px solid color-mix(info 35%, transparent)', borderLeft: '4px solid colors.info', borderRadius: t.layout.borderRadiusGlobal, background: 'color-mix(info 8%, transparent)' }
      }
    },
    errors: clone(t.errors),
    baseRendering: {
      htmlFontSize: 16,
      bodyFontFamily: `${typo.fontFamily}, sans-serif`,
      bodyColor: 'colors.textPrimary',
      bodyBackground: '#F1F5F9',
      bodyLineHeight: 1.5,
      fontSmoothing: { webkit: 'antialiased', mozOsx: 'grayscale' },
      boxSizing: 'border-box'
    },
    toast: {
      position: t.states.toastPosition,
      durationMs: t.states.toastDuration,
      background: '#FFFFFF',
      borderLeftWidth: 4,
      minWidth: 250,
      shadow: '0 4px 6px rgba(0,0,0,0.1)',
      radius: 6,
      transition: { enterMs: 300, leaveMs: 200 }
    },
    responsive: {
      builder: { under1024: { wrap: true, propertiesPanel: 'full-width-bottom', maxHeight: '50vh' }, under768: { configSidebar: 'hidden' } },
      preview: { mobile: { sidebar: 'hidden-by-default', toggle: 'menu-button' } }
    },
    screenAndRoleMenus: {
      administrador: [
        ['Estudiantes', 'Users'], ['Matrícula', 'ClipboardList'], ['Pagos', 'CreditCard'], ['Asistencia', 'ClipboardCheck'], ['Evaluaciones', 'BarChart3'], ['Horarios', 'Calendar'], ['Usuarios', 'UserCog'], ['Configuración', 'Settings']
      ],
      docente: [
        ['Mis cursos', 'BookOpen'], ['Asistencia', 'ClipboardCheck'], ['Evaluaciones', 'BarChart3'], ['Evidencias', 'FileText'], ['Horarios', 'Calendar']
      ],
      alumno: [
        ['Mis cursos', 'BookOpen'], ['Mis notas', 'BarChart3'], ['Mi asistencia', 'ClipboardCheck'], ['Mi horario', 'Calendar']
      ],
      apoderado: [
        ['Mis hijos', 'Users'], ['Notas', 'BarChart3'], ['Asistencia', 'ClipboardCheck'], ['Pagos', 'CreditCard'], ['Horarios', 'Calendar']
      ]
    }
  }
}

export function exportConfigAsJSON(theme, decisions) {
  const template = buildTemplateSpec(theme)
  const data = {
    exportDate: new Date().toISOString(),
    project: 'Sistema de Gestión Educativa',
    version: '3.0',
    exportPurpose: 'Configuración completa de la plantilla GUI: valores configurables + propiedades visuales e interacciones fijas observables en la previsualización.',
    theme: template,
    decisions: clone(decisions),
    documentCoverage: {
      '2_Paleta_de_colores': 'theme.colors',
      '3_Tipografia': 'theme.typography',
      '4_Layout_general': 'theme.layout',
      '5_Botones': 'theme.buttons',
      '6_Formularios': 'theme.forms',
      '7_Tablas': 'theme.tables',
      '8_Estados_visuales': 'theme.states.badge + screenAndRoleMenus',
      '9_Estados_y_mensajes': 'theme.states + theme.toast',
      '10_Modales': 'theme.modals',
      '11_Iconografia': 'theme.icons',
      '12_Diseno_de_errores': 'theme.errors',
      '13_Reglas_generales': 'theme.buttons.relationships + theme.layout.sidebar.backgroundLinked + theme.icons',
      'responsive': 'theme.responsive'
    }
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `gui-standard-complete-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
