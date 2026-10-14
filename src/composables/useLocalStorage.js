import { useThemeStore } from '@/stores/themeStore.js'
import { useDecisionStore } from '@/stores/decisionStore.js'
import { defaultTheme } from '@/data/defaultTheme.js'

const STORAGE_KEY_THEME = 'gui-builder-theme'
const STORAGE_KEY_DECISIONS = 'gui-builder-decisions'

export function useLocalStorage() {
  const themeStore = useThemeStore()
  const decisionStore = useDecisionStore()

  function saveConfig() {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(themeStore.theme))
      localStorage.setItem(STORAGE_KEY_DECISIONS, JSON.stringify(decisionStore.decisions))
      return true
    } catch (e) {
      console.error('Error saving config:', e)
      return false
    }
  }

  function loadConfig() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME)
      const savedDecisions = localStorage.getItem(STORAGE_KEY_DECISIONS)

      if (savedTheme) {
        const saved = JSON.parse(savedTheme)
        // Merge with the current schema so older saved configurations do not break new controls.
        const merge = (base, incoming) => {
          if (Array.isArray(base)) return incoming ?? base
          if (base && typeof base === 'object') {
            const out = { ...base }
            Object.keys(incoming || {}).forEach(key => { out[key] = key in base ? merge(base[key], incoming[key]) : incoming[key] })
            return out
          }
          return incoming ?? base
        }
        themeStore.loadFromObject(merge(defaultTheme, saved))
      }
      if (savedDecisions) {
        decisionStore.loadFromObject(JSON.parse(savedDecisions))
      }
      return !!savedTheme
    } catch (e) {
      console.error('Error loading config:', e)
      return false
    }
  }

  function clearConfig() {
    localStorage.removeItem(STORAGE_KEY_THEME)
    localStorage.removeItem(STORAGE_KEY_DECISIONS)
  }

  function hasStoredConfig() {
    return !!localStorage.getItem(STORAGE_KEY_THEME)
  }

  return { saveConfig, loadConfig, clearConfig, hasStoredConfig }
}
