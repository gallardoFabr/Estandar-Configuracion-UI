import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDecisionStore = defineStore('decisions', () => {
  // Decisions per category, each property can have a status and comment
  const decisions = ref({
    colors: { status: 'pending', comment: '', properties: {} },
    typography: { status: 'pending', comment: '', properties: {} },
    buttons: { status: 'pending', comment: '', properties: {} },
    forms: { status: 'pending', comment: '', properties: {} },
    tables: { status: 'pending', comment: '', properties: {} },
    states: { status: 'pending', comment: '', properties: {} },
    modals: { status: 'pending', comment: '', properties: {} },
    icons: { status: 'pending', comment: '', properties: {} },
    layout: { status: 'pending', comment: '', properties: {} },
    errors: { status: 'pending', comment: '', properties: {} }
  })

  function setCategoryStatus(category, status) {
    if (decisions.value[category]) {
      decisions.value[category].status = status
    }
  }

  function setCategoryComment(category, comment) {
    if (decisions.value[category]) {
      decisions.value[category].comment = comment
    }
  }

  function setPropertyDecision(category, property, status, comment) {
    if (decisions.value[category]) {
      decisions.value[category].properties[property] = { status, comment: comment || '' }
    }
  }

  function getCategoryStatus(category) {
    return decisions.value[category]?.status || 'pending'
  }

  function getCategoryComment(category) {
    return decisions.value[category]?.comment || ''
  }

  const categorySummary = computed(() => {
    const result = {}
    Object.keys(decisions.value).forEach(key => {
      result[key] = decisions.value[key].status
    })
    return result
  })

  const progressPercentage = computed(() => {
    const categories = Object.values(decisions.value)
    const total = categories.length
    const approved = categories.filter(c => c.status === 'approved').length
    return Math.round((approved / total) * 100)
  })

  const progressCounts = computed(() => {
    const categories = Object.values(decisions.value)
    return {
      total: categories.length,
      approved: categories.filter(c => c.status === 'approved').length,
      changes: categories.filter(c => c.status === 'changes').length,
      pending: categories.filter(c => c.status === 'pending').length
    }
  })

  function resetDecisions() {
    Object.keys(decisions.value).forEach(key => {
      decisions.value[key] = { status: 'pending', comment: '', properties: {} }
    })
  }

  function loadFromObject(obj) {
    decisions.value = JSON.parse(JSON.stringify(obj))
  }

  const exportAsJSON = computed(() => {
    return JSON.parse(JSON.stringify(decisions.value))
  })

  return {
    decisions,
    setCategoryStatus,
    setCategoryComment,
    setPropertyDecision,
    getCategoryStatus,
    getCategoryComment,
    categorySummary,
    progressPercentage,
    progressCounts,
    resetDecisions,
    loadFromObject,
    exportAsJSON
  }
})
