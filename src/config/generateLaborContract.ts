function generateLaborContract({
    fechaContrato,
    nombreEmpleado,
    direccionEmpleado,
    nombreEmpleador,
    direccionEmpleador,
    puestoTrabajo,
    salario,
    fechaInicio,
    duracionContrato,
    horarioTrabajo,
    periodoPrueba,
    beneficios,
    obligacionesEmpleado,
    obligacionesEmpleador,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaContrato: string;
    nombreEmpleado: string;
    direccionEmpleado: string;
    nombreEmpleador: string;
    direccionEmpleador: string;
    puestoTrabajo: string;
    salario: string;
    fechaInicio: string;
    duracionContrato: string;
    horarioTrabajo: string;
    periodoPrueba: string;
    beneficios: string;
    obligacionesEmpleado: string;
    obligacionesEmpleador: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Contrato Laboral entre ${nombreEmpleador} y ${nombreEmpleado}
  
  **Fecha del contrato:** ${fechaContrato}
  
  **Este contrato laboral se celebra entre las siguientes partes:**
  
  - **Empleador:** ${nombreEmpleador}, con domicilio en ${direccionEmpleador}.
  - **Empleado:** ${nombreEmpleado}, con domicilio en ${direccionEmpleado}.
  
  ## 1. Puesto de Trabajo
  
  El Empleado es contratado para desempeñar el puesto de **${puestoTrabajo}**, y sus responsabilidades incluirán, pero no se limitarán a:
  
  - **Desarrollo y Ejecución de Tareas:** Completar todas las tareas asignadas con profesionalismo y dentro de los plazos estipulados por el Empleador.
  - **Adaptación a Nuevas Responsabilidades:** El Empleado acepta que sus funciones pueden ser modificadas según las necesidades operativas del negocio, con la debida notificación.
  - **Colaboración Multidisciplinaria:** Trabajar en colaboración con otros equipos para garantizar la integración y alineación de las actividades con los objetivos de la empresa.
  
  ## 2. Salario, Beneficios y Compensaciones
  
  ### Salario y Revisión
  
  - **Salario Bruto Mensual:** El Empleado recibirá un salario de **${salario}** que será pagado mensualmente mediante transferencia bancaria a la cuenta designada por el Empleado.
  - **Revisión Salarial Anual:** Se llevará a cabo una revisión del salario cada año basada en el rendimiento individual del Empleado, las condiciones del mercado y los resultados financieros de la empresa.
  
  ### Beneficios y Prestaciones
  
  - **Seguro de Salud y Vida:** Cobertura completa de seguro médico, dental y seguro de vida para el Empleado y sus dependientes.
  - **Bonificaciones y Incentivos:** Bonos anuales basados en el rendimiento individual y el logro de objetivos específicos establecidos al inicio del período fiscal.
  - **Plan de Jubilación y Ahorro:** Acceso a un plan de jubilación con contribuciones iguales por parte del Empleador y el Empleado.
  
  ### Beneficios No Monetarios
  
  - **Vacaciones Anuales:** ${beneficios}, con un incremento proporcional por cada año adicional de servicio.
  - **Permisos Especiales:** Permisos remunerados en caso de emergencias familiares, nacimientos, o problemas de salud graves, sujetos a la aprobación previa del Empleador.
  - **Descuentos en Productos/Servicios:** Descuentos exclusivos en productos y servicios proporcionados por la empresa o sus filiales.
  
  ## 3. Duración y Naturaleza del Contrato
  
  - **Duración del Contrato:** Este contrato tendrá una duración inicial de **${duracionContrato}**, renovable automáticamente si ambas partes están de acuerdo y cumplen con los términos establecidos.
  - **Periodo de Prueba:** Un período inicial de prueba de **${periodoPrueba}** durante el cual se evaluará el ajuste y desempeño del Empleado para determinar su continuidad.
  - **Revisión y Evaluación Formal:** Evaluaciones de desempeño semestrales que incluyen retroalimentación detallada y definición de metas de desarrollo profesional.
  
  ## 4. Horario de Trabajo y Disponibilidad
  
  - **Horario Estándar:** El horario laboral regular será de **${horarioTrabajo}**, con pausas para el almuerzo y descansos de acuerdo con la normativa vigente.
  - **Horas Extras y Remuneración:** Las horas adicionales trabajadas serán compensadas a una tasa de **150%** del salario estándar por hora.
  - **Disponibilidad Fuera de Horario:** En casos de emergencias operativas, se podrá requerir la disponibilidad del Empleado fuera de su horario habitual.
  
  ## 5. Obligaciones y Responsabilidades del Empleado
  
  - **Cumplimiento de Normas y Políticas:** Adherirse a las políticas de la empresa, incluyendo el código de conducta, las políticas de seguridad y los protocolos de uso de tecnología.
  - **Actualización y Capacitación Continua:** Participar activamente en cursos de capacitación y formación continua proporcionados por el Empleador.
  - **Confidencialidad y Protección de Datos:** Mantener la confidencialidad de toda la información empresarial y evitar el uso indebido de datos sensibles.
  - **${obligacionesEmpleado}**
  
  ### Medidas Disciplinarias
  
  En caso de incumplimiento de las responsabilidades o violación de las políticas, se podrán aplicar las siguientes medidas disciplinarias:
  - **Advertencia Verbal:** Primera acción correctiva con indicaciones claras para evitar futuros errores.
  - **Advertencia Escrita:** Documento formal indicando la conducta inapropiada y las consecuencias de un comportamiento repetitivo.
  - **Suspensión Temporal:** Retiro temporal del Empleado de sus funciones sin pago si se cometen infracciones graves.
  
  ## 6. Obligaciones y Responsabilidades del Empleador
  
  - **Proporcionar un Entorno Seguro y Saludable:** Garantizar que el lugar de trabajo cumpla con las normas de seguridad ocupacional y bienestar.
  - **Desarrollo Profesional:** Facilitar el acceso a programas de desarrollo profesional y oportunidades de crecimiento dentro de la organización.
  - **Cumplimiento Legal y Normativo:** Asegurar que todas las prácticas de empleo estén en conformidad con las leyes laborales aplicables.
  - **${obligacionesEmpleador}**
  
  ## 7. Terminación del Contrato
  
  ### Condiciones de Terminación
  
  El contrato puede ser terminado bajo las siguientes circunstancias:
  - **Renuncia Voluntaria:** El Empleado debe dar un preaviso mínimo de **30 días** antes de dejar el empleo.
  - **Despido por Causa Justificada:** El Empleador puede finalizar el contrato inmediatamente en caso de mala conducta grave, fraude o falta de integridad profesional.
  - **Terminación Sin Causa:** El Empleador puede rescindir el contrato con una indemnización equivalente a **3 meses de salario** más los beneficios adquiridos.
  
  ### Proceso de Salida
  
  - **Entrevista de Salida:** El Empleado tendrá una entrevista de salida para proporcionar retroalimentación y devolver todos los materiales y propiedades de la empresa.
  - **Certificado de Trabajo:** Al finalizar el contrato, se le proporcionará al Empleado un certificado de empleo que detalle su posición, período de trabajo y rendimiento.
  
  ## 8. Propiedad Intelectual y No Competencia
  
  ### Derechos de Propiedad Intelectual
  
  - Todos los trabajos, inventos, diseños, ideas y proyectos desarrollados durante el período de empleo serán propiedad exclusiva del Empleador.
  - El Empleado renuncia a cualquier derecho de autor o interés sobre los desarrollos realizados en el curso de sus funciones.
  
  ### Cláusula de No Competencia
  
  - **No Competencia:** El Empleado se compromete a no trabajar con competidores directos de la empresa durante un período de **2 años** después de la finalización del contrato.
  - **No Solicitud de Clientes o Empleados:** El Empleado no podrá intentar atraer a los clientes o empleados del Empleador durante **3 años** después de dejar la empresa.
  
  ## 9. Resolución de Disputas y Legislación Aplicable
  
  - **Mediación y Arbitraje:** Se buscará resolver cualquier conflicto primero mediante mediación y, si no se alcanza una solución, a través de un arbitraje formal.
  - **Jurisdicción y Legislación Aplicable:** Este contrato se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 10. Firmas y Aceptación del Contrato
  
  Ambas partes, al firmar este documento, aceptan y se comprometen a cumplir con los términos y condiciones establecidos en el presente contrato.
  
  **Firma del Empleador:**  
  Nombre: ${nombreEmpleador}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  
  **Firma del Empleado:**  
  Nombre: ${nombreEmpleado}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  `;
}

export default generateLaborContract;
