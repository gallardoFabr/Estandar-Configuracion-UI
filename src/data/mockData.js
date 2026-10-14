export const estudiantes = [
  { codigo: 'EST-001', nombre: 'Juan Pérez', grado: '3°', seccion: 'A', estado: 'Activo', pago: 'Pagado' },
  { codigo: 'EST-002', nombre: 'Ana López', grado: '3°', seccion: 'A', estado: 'Activo', pago: 'Moroso' },
  { codigo: 'EST-003', nombre: 'Carlos Ruiz', grado: '4°', seccion: 'B', estado: 'Retirado', pago: 'Pendiente' },
  { codigo: 'EST-004', nombre: 'María Torres', grado: '2°', seccion: 'A', estado: 'Activo', pago: 'Pagado' },
  { codigo: 'EST-005', nombre: 'Diego Mendoza', grado: '5°', seccion: 'C', estado: 'Activo', pago: 'Pagado' },
  { codigo: 'EST-006', nombre: 'Lucía Fernández', grado: '1°', seccion: 'B', estado: 'Activo', pago: 'Pendiente' },
  { codigo: 'EST-007', nombre: 'Pedro Castillo', grado: '3°', seccion: 'B', estado: 'Retirado', pago: 'Pagado' },
  { codigo: 'EST-008', nombre: 'Sofía Ramírez', grado: '4°', seccion: 'A', estado: 'Activo', pago: 'Moroso' }
]

export const matriculas = [
  { codigo: 'MAT-2024-001', estudiante: 'Juan Pérez', grado: '3°', seccion: 'A', estado: 'Confirmada', fecha: '15/02/2024' },
  { codigo: 'MAT-2024-002', estudiante: 'Ana López', grado: '3°', seccion: 'A', estado: 'Confirmada', fecha: '16/02/2024' },
  { codigo: 'MAT-2024-003', estudiante: 'Carlos Ruiz', grado: '4°', seccion: 'B', estado: 'Pendiente', fecha: '18/02/2024' },
  { codigo: 'MAT-2024-004', estudiante: 'María Torres', grado: '2°', seccion: 'A', estado: 'Confirmada', fecha: '14/02/2024' }
]

export const pagos = [
  { codigo: 'PAG-001', estudiante: 'Juan Pérez', concepto: 'Mensualidad Marzo', monto: 'S/ 850.00', estado: 'Pagado', fecha: '05/03/2024' },
  { codigo: 'PAG-002', estudiante: 'Ana López', concepto: 'Mensualidad Marzo', monto: 'S/ 850.00', estado: 'Moroso', fecha: '-' },
  { codigo: 'PAG-003', estudiante: 'Carlos Ruiz', concepto: 'Mensualidad Marzo', monto: 'S/ 850.00', estado: 'Pendiente', fecha: '-' },
  { codigo: 'PAG-004', estudiante: 'María Torres', concepto: 'Mensualidad Marzo', monto: 'S/ 850.00', estado: 'Pagado', fecha: '03/03/2024' },
  { codigo: 'PAG-005', estudiante: 'Diego Mendoza', concepto: 'Mensualidad Marzo', monto: 'S/ 850.00', estado: 'Pagado', fecha: '01/03/2024' }
]

export const asistencia = [
  { estudiante: 'Juan Pérez', lunes: 'Presente', martes: 'Presente', miercoles: 'Tardanza', jueves: 'Presente', viernes: 'Presente' },
  { estudiante: 'Ana López', lunes: 'Presente', martes: 'Falta', miercoles: 'Justificado', jueves: 'Presente', viernes: 'Presente' },
  { estudiante: 'Carlos Ruiz', lunes: 'Presente', martes: 'Presente', miercoles: 'Presente', jueves: 'Falta', viernes: 'Presente' },
  { estudiante: 'María Torres', lunes: 'Presente', martes: 'Presente', miercoles: 'Presente', jueves: 'Presente', viernes: 'Tardanza' }
]

export const evaluaciones = [
  { estudiante: 'Juan Pérez', curso: 'Matemática', nota1: 16, nota2: 18, nota3: 15, promedio: 16.3 },
  { estudiante: 'Ana López', curso: 'Matemática', nota1: 19, nota2: 17, nota3: 20, promedio: 18.7 },
  { estudiante: 'Carlos Ruiz', curso: 'Matemática', nota1: 12, nota2: 10, nota3: 14, promedio: 12.0 },
  { estudiante: 'María Torres', curso: 'Matemática', nota1: 15, nota2: 16, nota3: 17, promedio: 16.0 }
]

export const horarios = [
  { hora: '07:30 - 08:15', lunes: 'Matemática', martes: 'Comunicación', miercoles: 'Ciencias', jueves: 'Historia', viernes: 'Inglés' },
  { hora: '08:15 - 09:00', lunes: 'Matemática', martes: 'Comunicación', miercoles: 'Ciencias', jueves: 'Historia', viernes: 'Inglés' },
  { hora: '09:00 - 09:45', lunes: 'Educación Física', martes: 'Arte', miercoles: 'Matemática', jueves: 'Comunicación', viernes: 'Ciencias' },
  { hora: '09:45 - 10:15', lunes: 'Recreo', martes: 'Recreo', miercoles: 'Recreo', jueves: 'Recreo', viernes: 'Recreo' },
  { hora: '10:15 - 11:00', lunes: 'Comunicación', martes: 'Matemática', miercoles: 'Tutoría', jueves: 'Educación Física', viernes: 'Arte' },
  { hora: '11:00 - 11:45', lunes: 'Ciencias', martes: 'Historia', miercoles: 'Inglés', jueves: 'Matemática', viernes: 'Comunicación' }
]

export const usuarios = [
  { id: 'USR-001', nombre: 'Admin Principal', email: 'admin@colegio.edu', rol: 'Administrador', estado: 'Activo' },
  { id: 'USR-002', nombre: 'Prof. García', email: 'garcia@colegio.edu', rol: 'Docente', estado: 'Activo' },
  { id: 'USR-003', nombre: 'Prof. Martínez', email: 'martinez@colegio.edu', rol: 'Docente', estado: 'Activo' },
  { id: 'USR-004', nombre: 'Juan Pérez', email: 'jperez@colegio.edu', rol: 'Alumno', estado: 'Activo' },
  { id: 'USR-005', nombre: 'Roberto Pérez', email: 'rperez@colegio.edu', rol: 'Apoderado', estado: 'Inactivo' }
]

export const grados = ['1°', '2°', '3°', '4°', '5°']
export const secciones = ['A', 'B', 'C']
export const estadosPago = ['Pagado', 'Pendiente', 'Moroso']
export const estadosAsistencia = ['Presente', 'Tardanza', 'Falta', 'Justificado']
export const estadosEstudiante = ['Activo', 'Inactivo', 'Retirado']

export const badgeColors = {
  Activo: 'success',
  Pagado: 'success',
  Presente: 'success',
  Confirmada: 'success',
  Pendiente: 'warning',
  Tardanza: 'warning',
  Moroso: 'error',
  Falta: 'error',
  Inactivo: 'neutral',
  Retirado: 'neutral',
  Justificado: 'info'
}
