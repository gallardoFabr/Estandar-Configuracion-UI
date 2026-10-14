<template>
  <div class="component-showcase">
    <div class="showcase-header">
      <div>
        <p class="eyebrow">PREVISUALIZACIÓN DE COMPONENTE</p>
        <h2>{{ componentTitle }}</h2>
        <p class="description">Los cambios del panel de configuración se reflejan aquí en tiempo real. Esta zona usa estilos propios del GUI Builder.</p>
      </div>
      <div v-if="selectorOptions.length" class="showcase-selector">
        <label>{{ selectorLabel }}</label>
        <select v-model="selectedOption">
          <option v-for="option in selectorOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </div>
    </div>

    <div class="showcase-canvas">
      <!-- BUTTONS -->
      <section v-if="category === 'buttons'" class="component-section">
        <div class="demo-heading"><strong>Botón seleccionado</strong><span>{{ selectedOptionLabel }}</span></div>
        <div class="button-demo-context">
          <template v-if="selectedOption === 'primary'">
            <div class="example-block"><span class="example-label">Acciones principales</span><div class="button-demo-row">
              <PreviewButton variant="primary" label="Nuevo estudiante" icon="Plus" />
              <PreviewButton variant="primary" label="Guardar" icon="Save" />
              <PreviewButton variant="primary" label="Editar" icon="Pencil" />
            </div></div>
          </template>
          <template v-else-if="selectedOption === 'secondary'">
            <div class="example-block"><span class="example-label">Acciones complementarias</span><div class="button-demo-row">
              <PreviewButton variant="secondary" label="Ver detalles" icon="Eye" />
              <PreviewButton variant="secondary" label="Descargar" icon="Download" />
              <PreviewButton variant="secondary" label="Volver" icon="ArrowLeft" />
            </div></div>
          </template>
          <template v-else-if="selectedOption === 'cancel'">
            <div class="example-block"><span class="example-label">Cancelar una operación</span><div class="button-demo-row">
              <PreviewButton variant="cancel" label="Cancelar" />
              <PreviewButton variant="retry" label="Reintentar" />
            </div></div>
          </template>
          <template v-else-if="selectedOption === 'delete'">
            <div class="example-block"><span class="example-label">Acción destructiva</span><div class="button-demo-row">
              <PreviewButton variant="delete" label="Eliminar" icon="Trash2" />
            </div></div>
          </template>
          <template v-else>
            <div class="example-block"><span class="example-label">Todos los botones en estado deshabilitado</span><div class="button-demo-row">
              <PreviewButton variant="disabled" label="Nuevo estudiante" icon="Plus" />
              <PreviewButton variant="disabled" label="Guardar" icon="Save" />
              <PreviewButton variant="disabled" label="Editar" icon="Pencil" />
              <PreviewButton variant="disabled" label="Cancelar" />
              <PreviewButton variant="disabled" label="Eliminar" icon="Trash2" />
            </div></div>
          </template>
        </div>
        <div class="component-note">El tipo seleccionado en configuración y en esta previsualización está sincronizado.</div>
      </section>

      <!-- FORMS -->
      <section v-else-if="category === 'forms'" class="component-section form-demo">
        <div class="demo-heading"><strong>Estado: {{ selectedOptionLabel }}</strong><span>Haz clic en el campo para probar el foco</span></div>
        <PreviewInput label="Nombre completo" model-value="Juan Pérez" :required="selectedOption === 'required'" :disabled="selectedOption === 'disabled'" />
        <PreviewInput label="Correo electrónico" model-value="usuario@" :required="selectedOption === 'required'" :disabled="selectedOption === 'disabled'" :error="selectedOption === 'error' ? 'Ingrese un correo electrónico válido.' : ''" />
        <PreviewInput label="Grado" placeholder="Seleccione un grado" :required="selectedOption === 'required'" :disabled="selectedOption === 'disabled'" />
        <div class="button-demo-row form-actions"><PreviewButton variant="cancel" label="Cancelar" /><PreviewButton variant="primary" label="Guardar" /></div>
      </section>

      <!-- TABLES -->
      <section v-else-if="category === 'tables'" class="component-section table-demo">
        <div class="demo-heading"><strong>Tabla de estudiantes</strong><span>Pasa el cursor por las filas para ver el hover configurado</span></div>
        <PreviewTable :columns="columns" :rows="rows" />
      </section>

      <!-- STATES -->
      <section v-else-if="category === 'states'" class="component-section state-demo">
        <div class="demo-heading"><strong>{{ selectedOptionLabel }}</strong><span>{{ displayTypeLabel }} · {{ displayType === 'toast' ? `${toastPositionLabel} · ${toastDuration} ms` : 'Centro' }}</span></div>
        <div class="state-stage" :class="{ 'toast-stage': displayType === 'toast' }">
          <div :key="stateAnimationKey" class="state-message" :style="{ ...stateStyle, animationDuration: displayType === 'toast' ? `${toastDuration}ms` : undefined }">
            <component :is="stateIcon" class="state-icon" :size="themeStore.theme.icons.size" :stroke-width="themeStore.theme.icons.strokeWidth" />
            <div><strong>{{ stateTitle }}</strong><p>{{ stateMessage }}</p></div>
          </div>
          <div v-if="displayType === 'toast'" class="state-animation-controls">
            <button class="replay-animation-btn" type="button" @click="replayStateAnimation">
              ▶ Reproducir animación
            </button>
            <span class="toast-preview-note">Duración configurada: {{ toastDuration }} ms</span>
          </div>
        </div>
      </section>

      <!-- MODALS -->
      <section v-else-if="category === 'modals'" class="component-section modal-demo">
        <div class="demo-heading"><strong>{{ modalData.title }}</strong><span>Tipo: {{ selectedOptionLabel }}</span></div>
        <div class="modal-overlay-demo" :style="{ backgroundColor: themeStore.theme.modals.overlayColor }">
          <div class="modal-card" :style="modalStyle">
            <div class="modal-card-header">
              <h3 v-if="selectedOption !== 'error'">{{ modalData.title }}</h3>
              <h3 v-else class="modal-title-error" :style="{ color: themeStore.theme.colors.error }"><CircleX class="modal-error-icon" :size="themeStore.theme.icons.size" :stroke-width="themeStore.theme.icons.strokeWidth" />{{ modalData.title }}</h3>
              <span>×</span>
            </div>
            <p v-if="selectedOption !== 'form'">{{ modalData.text }}</p>
            <div v-else class="modal-form-fields"><PreviewInput label="Nombre" placeholder="Ingrese el nombre" /><PreviewInput label="Correo" placeholder="Ingrese el correo" /></div>
            <div class="modal-actions"><PreviewButton v-if="modalData.cancel" variant="cancel" label="Cancelar" /><PreviewButton :variant="modalData.danger ? 'delete' : 'primary'" :label="modalData.action" /></div>
          </div>
        </div>
      </section>

      <!-- ICONS -->
      <section v-else-if="category === 'icons'" class="component-section icons-demo">
        <div class="demo-heading"><strong>Iconografía</strong><span>Los cambios globales de tamaño, grosor y color se aplican a todos.</span></div>
        <div class="icon-grid-preview">
          <div v-for="(iconComp, name) in iconsList" :key="name" class="icon-card">
            <component :is="iconComp" :size="themeStore.theme.icons.size" :stroke-width="themeStore.theme.icons.strokeWidth" :color="themeStore.theme.icons.color" />
            <span>{{ name }}</span>
          </div>
        </div>
      </section>

      <!-- ERRORS -->
      <section v-else-if="category === 'errors'" class="component-section error-demo">
        <div class="demo-heading"><strong>{{ errorTitle }}</strong><span>Tipo: {{ selectedOptionLabel }}</span></div>
        <div v-if="selectedOption === 'validation'" class="validation-card">
          <label class="validation-label">Correo electrónico <span>*</span></label>
          <input class="validation-input" value="usuario@" :style="{ borderColor: errorConfig.errorBorderColor || errorConfig.color, borderRadius: `${errorConfig.borderRadius}px` }" />
          <div class="validation-message" :style="errorStyle"><component :is="errorIcon" :size="themeStore.theme.icons.size" :stroke-width="themeStore.theme.icons.strokeWidth" /> Ingrese un correo electrónico válido.</div>
        </div>
        <div v-else class="error-message" :style="errorStyle">
          <component :is="errorIcon" class="error-icon" :size="themeStore.theme.icons.size" :stroke-width="themeStore.theme.icons.strokeWidth" />
          <div><strong>{{ errorTitle }}</strong><p>{{ errorMessage }}</p><PreviewButton :variant="selectedOption === 'operation' ? 'retry' : 'primary'" :label="selectedOption === 'operation' ? 'Reintentar' : 'Entendido'" /></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'
import { useAppStore } from '@/stores/appStore.js'
import PreviewButton from './PreviewButton.vue'
import PreviewInput from './PreviewInput.vue'
import PreviewTable from './PreviewTable.vue'
import { CheckCircle, AlertTriangle, XCircle, Info, AlertCircle, Home, Users, GraduationCap, ClipboardList, CreditCard, Calendar, Settings, Pencil, Trash2, Search, Bell, Eye, Plus, Download, ArrowLeft, Save, CircleCheckBig, CircleX, TriangleAlert, ClipboardCheck, BarChart3, LogOut, BookOpen, FileText, UserCog, CircleAlert } from '@lucide/vue'

const props = defineProps({ category: { type: String, required: true } })
const themeStore = useThemeStore(); const appStore = useAppStore()
const selectedOption = computed({ get: () => appStore.componentSelection[props.category], set: v => appStore.setComponentSelection(props.category, v) })
const stateAnimationKey = ref(0)
const replayStateAnimation = () => { stateAnimationKey.value += 1 }
const optionMap = {
  buttons:[['primary','Primario'],['secondary','Secundario'],['cancel','Cancelar'],['delete','Eliminar'],['disabled','Deshabilitado']],
  forms:[['normal','Normal'],['error','Error'],['required','Obligatorio'],['disabled','Deshabilitado']],
  states:[['success','Éxito'],['warning','Advertencia'],['error','Error'],['info','Información']],
  modals:[['confirm','Confirmación'],['info','Información'],['error','Error'],['form','Formulario']],
  errors:[['validation','Validación'],['operation','Operación'],['businessRule','Regla de negocio']]
}
const selectorOptions = computed(()=> (optionMap[props.category]||[]).map(([value,label])=>({value,label})))
const selectorLabel = computed(()=>({buttons:'Tipo de botón',forms:'Estado',states:'Tipo',modals:'Tipo',errors:'Tipo de error'}[props.category]||'Tipo'))
const selectedOptionLabel = computed(()=>selectorOptions.value.find(o=>o.value===selectedOption.value)?.label||'')
const componentTitle = computed(()=>({buttons:'Botones',forms:'Formularios',tables:'Tabla',states:'Estados visuales',modals:'Modales',icons:'Iconografía',errors:'Diseño de errores'}[props.category]||'Componente'))

const columns=[{key:'code',label:'Código'},{key:'name',label:'Estudiante'},{key:'grade',label:'Grado'},{key:'section',label:'Sección'},{key:'status',label:'Estado'}]
const rows=[{code:'EST-001',name:'Juan Pérez',grade:'3°',section:'A',status:'Activo'},{code:'EST-002',name:'Ana López',grade:'3°',section:'A',status:'Activo'},{code:'EST-003',name:'Carlos Ruiz',grade:'4°',section:'B',status:'Retirado'}]
const stateConfig=computed(()=>themeStore.theme.states[selectedOption.value]||themeStore.theme.states.info)
const stateIcon=computed(()=>({success:CheckCircle,warning:AlertTriangle,error:XCircle,info:Info}[selectedOption.value]||Info))
const stateTitle=computed(()=>({success:'Operación exitosa',warning:'Advertencia',error:'Ocurrió un error',info:'Información'}[selectedOption.value]))
const stateMessage=computed(()=>({success:'El estudiante fue registrado correctamente.',warning:'El estudiante tiene pagos pendientes.',error:'No se pudo completar la operación.',info:'Se encontraron 8 registros.'}[selectedOption.value]))
const stateStyle=computed(()=>({backgroundColor:stateConfig.value.background,color:stateConfig.value.color,border:`1px solid ${stateConfig.value.border}`,borderRadius:`${themeStore.theme.states.borderRadius}px`,fontFamily:'var(--theme-font-family)'}))
const displayType=computed(()=>themeStore.theme.states.displayType||'toast')
const toastPosition=computed(()=>themeStore.theme.states.toastPosition||'top-right'); const toastDuration=computed(()=>themeStore.theme.states.toastDuration||4000)
const displayTypeLabel=computed(()=>displayType.value==='toast'?'Toast':'Modal'); const toastPositionLabel=computed(()=>({ 'top-right':'Arriba derecha','top-left':'Arriba izquierda','bottom-right':'Abajo derecha','bottom-left':'Abajo izquierda','center':'Centro'}[toastPosition.value]||toastPosition.value))
const modalData=computed(()=>({confirm:{title:'Eliminar estudiante',text:'¿Está seguro de eliminar a Juan Pérez? Esta acción no puede deshacerse.',cancel:true,action:'Eliminar',danger:true},info:{title:'Información',text:'El período de matrícula cierra el 28 de febrero.',cancel:false,action:'Aceptar'},error:{title:'Error',text:'No se pudo registrar el pago. Intente nuevamente.',cancel:false,action:'Reintentar'},form:{title:'Nuevo registro',text:'',cancel:true,action:'Guardar'}}[selectedOption.value]||{}))
const modalStyle=computed(()=>({width:`${themeStore.theme.modals.width}px`,maxWidth:'100%',borderRadius:`${themeStore.theme.modals.borderRadius}px`,padding:`${themeStore.theme.modals.padding}px`}))
const errorConfig=computed(()=>themeStore.theme.errors[selectedOption.value]||themeStore.theme.errors.validation)
const errorIcon=computed(()=>({AlertCircle,XCircle,AlertTriangle}[errorConfig.value.icon]||AlertCircle)); const errorTitle=computed(()=>({validation:'Error de validación',operation:'No se pudo completar la operación',businessRule:'No se puede realizar esta acción'}[selectedOption.value])); const errorMessage=computed(()=>({operation:'No se pudo registrar el pago. Intente nuevamente.',businessRule:'El docente seleccionado ya tiene una clase asignada en este horario.'}[selectedOption.value]||'Ingrese un correo electrónico válido.'))
const errorStyle=computed(()=>({color:errorConfig.value.color,backgroundColor:errorConfig.value.background,border:errorConfig.value.border,borderRadius:`${errorConfig.value.borderRadius}px`,fontSize:`${errorConfig.value.fontSize}px`,fontFamily:'var(--theme-font-family)',padding:'16px'}))
const iconsList={Home,Users,GraduationCap,ClipboardList,CreditCard,Calendar,Settings,Pencil,Trash2,Search,Bell,Eye,Plus,Download,ArrowLeft,Save,CircleCheckBig,CircleX,TriangleAlert,Info,ClipboardCheck,BarChart3,LogOut,BookOpen, FileText, UserCog, CircleAlert}
</script>

<style scoped>
.component-showcase{height:100%;display:flex;flex-direction:column;min-height:0;background:#fff}.showcase-header{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding:22px 24px;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0}.eyebrow{margin:0 0 5px;color:#2563eb;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}.showcase-header h2{margin:0;color:#0f172a;font-size:24px;font-weight:700}.description{margin:6px 0 0;color:#64748b;font-size:13px;line-height:1.5}.showcase-selector{min-width:190px;display:flex;flex-direction:column;gap:5px}.showcase-selector label{font-size:11px;font-weight:700;color:#475569}.showcase-selector select{height:36px;padding:0 10px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;color:#334155}.showcase-canvas{flex:1;min-height:0;overflow:auto;padding:28px;background:#f8fafc}.component-section{max-width:1100px;margin:0 auto}.demo-heading{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:18px;color:#334155;font-size:13px}.demo-heading span{font-size:12px;color:#64748b}.button-demo-row,.form-actions,.modal-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.component-note{margin-top:14px;padding:10px 12px;border:1px dashed #cbd5e1;border-radius:6px;color:#64748b;background:#fff;font-size:12px}.form-demo{max-width:650px}.form-actions{justify-content:flex-end}.table-demo{width:100%}.state-demo{max-width:800px}.state-stage{min-height:280px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:30px;position:relative;overflow:hidden}.state-message{display:flex;gap:14px;align-items:flex-start;padding:18px;width:100%;max-width:560px;box-sizing:border-box;box-shadow:0 6px 18px rgba(15,23,42,.06)}.state-icon{flex-shrink:0}.state-message strong{font-size:var(--theme-title-section-size);font-weight:var(--theme-title-section-weight)}.state-message p{margin:5px 0 0;font-size:var(--theme-text-normal-size);font-weight:var(--theme-text-normal-weight)}.toast-stage .state-message{animation:toast-in .55s ease-out both}.state-animation-controls{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:8px}
.replay-animation-btn{border:1px solid #cbd5e1;background:#fff;color:#334155;border-radius:6px;padding:6px 10px;font-size:11px;cursor:pointer}
.replay-animation-btn:hover{background:#f8fafc}
.toast-preview-note{font-size:11px;color:#64748b;background:#fff;border:1px solid #e2e8f0;padding:6px 10px;border-radius:5px;white-space:nowrap}@keyframes toast-in{0%{opacity:0;transform:translateX(40px)}12%{opacity:1;transform:translateX(0)}100%{opacity:1;transform:translateX(0)}}.modal-demo{width:100%}.modal-overlay-demo{width:100%;min-height:430px;display:flex;align-items:center;justify-content:center;padding:30px;border:1px solid #e2e8f0;border-radius:8px;box-sizing:border-box}.modal-card{background:#fff;box-shadow:0 20px 40px rgba(15,23,42,.18);display:flex;flex-direction:column;gap:16px}.modal-card-header{display:flex;align-items:center;justify-content:space-between;gap:16px}.modal-card-header h3{margin:0;color:#0f172a;font-size:var(--theme-modal-title-size);font-weight:var(--theme-modal-title-weight)}.modal-title-error{display:flex;align-items:center;gap:8px}.modal-error-icon{flex-shrink:0}.modal-card-header span{color:#64748b;font-size:20px}.modal-card>p{margin:0;color:#64748b;font-size:var(--theme-text-secondary-size)}.modal-form-fields{display:flex;flex-direction:column}.icons-demo{width:100%}.icon-grid-preview{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px}.icon-card{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;color:#334155}.icon-card span{font-size:11px;color:#64748b}.error-demo{max-width:800px}.validation-card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:22px}.validation-label{display:block;margin-bottom:6px;font-size:var(--theme-text-secondary-size);font-weight:var(--theme-text-secondary-weight);color:var(--theme-text-primary)}.validation-label span{color:#dc2626}.validation-input{width:100%;height:40px;box-sizing:border-box;border:1px solid #dc2626;border-radius:6px;padding:0 12px;font-size:var(--theme-text-normal-size);font-family:var(--theme-font-family);font-weight:var(--theme-text-normal-weight);color:var(--theme-text-primary);outline:none}.validation-message{display:flex;align-items:center;gap:6px;margin-top:6px;font-size:12px;background:transparent!important;border:none!important;padding:0!important}.error-message{display:flex;gap:14px;align-items:flex-start}.error-icon{flex-shrink:0}.error-message strong{display:block;font-size:var(--theme-title-section-size);font-weight:var(--theme-title-section-weight)}.error-message p{margin:5px 0 14px;font-size:var(--theme-text-normal-size);font-weight:var(--theme-text-normal-weight)}.error-message :deep(.preview-button){margin-top:2px}@media(max-width:700px){.showcase-header{flex-direction:column}.showcase-selector{width:100%}.showcase-canvas{padding:16px}.state-animation-controls{max-width:calc(100% - 24px);flex-wrap:wrap;justify-content:center}.toast-preview-note{white-space:normal;text-align:center}}
</style>
