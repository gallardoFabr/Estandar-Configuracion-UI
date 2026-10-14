export const menusByRole = {
  administrador: [
    { id: 'estudiantes', label: 'Estudiantes', icon: 'Users' },
    { id: 'matricula', label: 'Matrícula', icon: 'ClipboardList' },
    { id: 'pagos', label: 'Pagos', icon: 'CreditCard' },
    { id: 'asistencia', label: 'Asistencia', icon: 'ClipboardCheck' },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: 'BarChart3' },
    { id: 'horarios', label: 'Horarios', icon: 'Calendar' },
    { id: 'usuarios', label: 'Usuarios', icon: 'UserCog' },
    { id: 'configuracion', label: 'Configuración', icon: 'Settings' }
  ],
  docente: [
    { id: 'estudiantes', label: 'Mis cursos', icon: 'BookOpen' },
    { id: 'asistencia', label: 'Asistencia', icon: 'ClipboardCheck' },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: 'BarChart3' },
    { id: 'matricula', label: 'Evidencias', icon: 'FileText' },
    { id: 'horarios', label: 'Horarios', icon: 'Calendar' }
  ],
  alumno: [
    { id: 'estudiantes', label: 'Mis cursos', icon: 'BookOpen' },
    { id: 'evaluaciones', label: 'Mis notas', icon: 'BarChart3' },
    { id: 'asistencia', label: 'Mi asistencia', icon: 'ClipboardCheck' },
    { id: 'horarios', label: 'Mi horario', icon: 'Calendar' }
  ],
  apoderado: [
    { id: 'estudiantes', label: 'Mis hijos', icon: 'Users' },
    { id: 'evaluaciones', label: 'Notas', icon: 'BarChart3' },
    { id: 'asistencia', label: 'Asistencia', icon: 'ClipboardCheck' },
    { id: 'pagos', label: 'Pagos', icon: 'CreditCard' },
    { id: 'horarios', label: 'Horarios', icon: 'Calendar' }
  ]
}

export const screenTitles = {
  estudiantes: 'Estudiantes',
  matricula: 'Matrícula',
  pagos: 'Pagos',
  asistencia: 'Asistencia',
  evaluaciones: 'Evaluaciones',
  horarios: 'Horarios',
  usuarios: 'Usuarios',
  configuracion: 'Configuración'
}

export const roleLabels = {
  administrador: 'Administrador',
  docente: 'Docente',
  alumno: 'Alumno',
  apoderado: 'Apoderado'
}
