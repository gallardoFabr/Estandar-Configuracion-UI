import { watch } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'

export function useCssVariables() {
  const themeStore = useThemeStore()

  function applyVariables() {
    const t = themeStore.theme
    const root = document.documentElement

    // Colors
    root.style.setProperty('--theme-primary', t.colors.primary)
    root.style.setProperty('--theme-secondary', t.colors.secondary)
    root.style.setProperty('--theme-success', t.colors.success)
    root.style.setProperty('--theme-warning', t.colors.warning)
    root.style.setProperty('--theme-error', t.colors.error)
    root.style.setProperty('--theme-info', t.colors.info)
    root.style.setProperty('--theme-background', t.colors.background)
    root.style.setProperty('--theme-text-primary', t.colors.textPrimary)
    root.style.setProperty('--theme-text-secondary', t.colors.textSecondary)

    // Typography
    root.style.setProperty('--theme-font-family', t.typography.fontFamily + ', sans-serif')
    root.style.setProperty('--theme-title-main-size', t.typography.titleMain.size + 'px')
    root.style.setProperty('--theme-title-main-weight', t.typography.titleMain.weight)
    root.style.setProperty('--theme-title-section-size', t.typography.titleSection.size + 'px')
    root.style.setProperty('--theme-title-section-weight', t.typography.titleSection.weight)
    root.style.setProperty('--theme-subtitle-size', t.typography.subtitle.size + 'px')
    root.style.setProperty('--theme-subtitle-weight', t.typography.subtitle.weight)
    root.style.setProperty('--theme-text-normal-size', t.typography.textNormal.size + 'px')
    root.style.setProperty('--theme-text-normal-weight', t.typography.textNormal.weight)
    root.style.setProperty('--theme-text-secondary-size', t.typography.textSecondary.size + 'px')
    root.style.setProperty('--theme-text-secondary-weight', t.typography.textSecondary.weight)
    root.style.setProperty('--theme-text-small-size', t.typography.textSmall.size + 'px')
    root.style.setProperty('--theme-text-small-weight', t.typography.textSmall.weight)
    // Aliases used by legacy preview components
    root.style.setProperty('--theme-text-base-size', t.typography.textNormal.size + 'px')
    root.style.setProperty('--theme-text', t.colors.textPrimary)
    root.style.setProperty('--theme-radius-base', t.layout.borderRadiusGlobal + 'px')
    root.style.setProperty('--theme-title-size', t.typography.titleMain.size + 'px')
    root.style.setProperty('--theme-btn-font-size', t.typography.textNormal.size + 'px')
    root.style.setProperty('--theme-btn-font-weight-normal', t.typography.textNormal.weight)

    // Buttons
    const sharedButton = t.buttons.primary || Object.values(t.buttons)[0]
    Object.keys(t.buttons).forEach(variant => {
      const btn = t.buttons[variant]
      root.style.setProperty(`--theme-btn-${variant}-bg`, btn.background)
      root.style.setProperty(`--theme-btn-${variant}-color`, btn.color)
      root.style.setProperty(`--theme-btn-${variant}-border`, sharedButton.borderStyle === 'none' || Number(sharedButton.borderWidth) === 0 ? 'none' : `${sharedButton.borderWidth}px ${sharedButton.borderStyle} ${btn.borderColor}`)
      root.style.setProperty(`--theme-btn-${variant}-radius`, sharedButton.borderRadius + 'px')
      root.style.setProperty(`--theme-btn-${variant}-height`, sharedButton.height + 'px')
      root.style.setProperty(`--theme-btn-${variant}-padding-x`, sharedButton.paddingX + 'px')
      root.style.setProperty(`--theme-btn-${variant}-font-weight`, sharedButton.fontWeight)
    })

    // Forms
    root.style.setProperty('--theme-input-bg', t.forms.background)
    root.style.setProperty('--theme-input-border', t.forms.borderColor)
    root.style.setProperty('--theme-input-border-focus', t.forms.focusBorderColor)
    root.style.setProperty('--theme-input-border-error', t.forms.errorBorderColor)
    root.style.setProperty('--theme-input-radius', t.forms.borderRadius + 'px')
    root.style.setProperty('--theme-input-height', t.forms.height + 'px')
    root.style.setProperty('--theme-input-padding-x', t.forms.paddingX + 'px')
    root.style.setProperty('--theme-input-font-size', t.forms.fontSize + 'px')
    root.style.setProperty('--theme-label-font-size', t.forms.labelSize + 'px')
    root.style.setProperty('--theme-label-font-weight', t.forms.labelFontWeight)
    root.style.setProperty('--theme-label-color', t.forms.labelColor)
    root.style.setProperty('--theme-error-color', t.forms.errorColor)
    root.style.setProperty('--theme-placeholder-color', t.forms.placeholderColor)
    root.style.setProperty('--theme-input-disabled-bg', t.forms.disabledBackground)
    root.style.setProperty('--theme-input-disabled-color', t.forms.disabledColor)
    root.style.setProperty('--theme-error-font-size', t.forms.errorFontSize)

    // Tables
    root.style.setProperty('--theme-table-header-bg', t.tables.headerBackground)
    root.style.setProperty('--theme-table-header-color', t.tables.headerColor)
    root.style.setProperty('--theme-table-header-weight', t.tables.headerFontWeight)
    root.style.setProperty('--theme-table-row-bg', t.tables.rowBackground)
    root.style.setProperty('--theme-table-row-alt-bg', t.tables.rowAlternateBackground)
    root.style.setProperty('--theme-table-row-hover-bg', t.tables.rowHoverBackground)
    root.style.setProperty('--theme-table-border-color', t.tables.borderColor)
    root.style.setProperty('--theme-table-radius', t.tables.borderRadius + 'px')
    root.style.setProperty('--theme-table-row-height', t.tables.rowHeight + 'px')
    root.style.setProperty('--theme-table-font-size', t.tables.fontSize + 'px')

    // Layout
    root.style.setProperty('--theme-sidebar-width', t.layout.sidebar.width + 'px')
    root.style.setProperty('--theme-sidebar-bg', t.layout.sidebar.background)
    root.style.setProperty('--theme-sidebar-radius', t.layout.sidebar.borderRadius + 'px')
    root.style.setProperty('--theme-sidebar-spacing', t.layout.sidebar.spacing + 'px')
    root.style.setProperty('--theme-sidebar-icon-color', t.layout.sidebar.iconColor)
    root.style.setProperty('--theme-header-height', t.layout.header.height + 'px')
    root.style.setProperty('--theme-header-bg', t.layout.header.background)
    root.style.setProperty('--theme-content-bg', t.layout.content.background)
    root.style.setProperty('--theme-content-padding', t.layout.content.padding + 'px')
    root.style.setProperty('--theme-content-max-width', t.layout.content.maxWidth + 'px')
    root.style.setProperty('--theme-radius-global', t.layout.borderRadiusGlobal + 'px')

    // Icons
    root.style.setProperty('--theme-icon-size', t.icons.size + 'px')
    root.style.setProperty('--theme-icon-stroke-width', t.icons.strokeWidth)
    root.style.setProperty('--theme-icon-color', t.icons.color)

    // Modals
    root.style.setProperty('--theme-modal-width', t.modals.width + 'px')
    root.style.setProperty('--theme-modal-radius', t.modals.borderRadius + 'px')
    root.style.setProperty('--theme-modal-overlay', t.modals.overlayColor)
    root.style.setProperty('--theme-modal-padding', t.modals.padding + 'px')
    root.style.setProperty('--theme-modal-title-size', t.modals.titleSize + 'px')
    root.style.setProperty('--theme-modal-title-weight', t.modals.titleWeight)
  }

  watch(() => themeStore.theme, applyVariables, { deep: true, immediate: true })

  return { applyVariables }
}
