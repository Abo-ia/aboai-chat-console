function generateServiceContract({
    fechaContrato,
    nombreProveedor,
    direccionProveedor,
    nombreCliente,
    direccionCliente,
    descripcionServicios,
    objetivosServicios,
    tarifaServicio,
    metodoPago,
    fechasPago,
    inicioServicio,
    duracionServicio,
    obligacionesProveedor,
    obligacionesCliente,
    estandaresCalidad,
    propiedadIntelectual,
    confidencialidad,
    penalizaciones,
    condicionesIncumplimiento,
    renovacionAutomatica,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaContrato: string;
    nombreProveedor: string;
    direccionProveedor: string;
    nombreCliente: string;
    direccionCliente: string;
    descripcionServicios: string;
    objetivosServicios: string;
    tarifaServicio: string;
    metodoPago: string;
    fechasPago: string;
    inicioServicio: string;
    duracionServicio: string;
    obligacionesProveedor: string;
    obligacionesCliente: string;
    estandaresCalidad: string;
    propiedadIntelectual: string;
    confidencialidad: string;
    penalizaciones: string;
    condicionesIncumplimiento: string;
    renovacionAutomatica: boolean;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Contrato de Prestación de Servicios Detallado
  
  **Fecha del contrato:** ${fechaContrato}
  
  **Este contrato de prestación de servicios se celebra entre las siguientes partes:**
  
  - **Proveedor de Servicios:** ${nombreProveedor}, con domicilio en ${direccionProveedor}.
  - **Cliente:** ${nombreCliente}, con domicilio en ${direccionCliente}.
  
  ## 1. Objeto del Contrato
  
  El presente contrato tiene como objeto la prestación de **${descripcionServicios}** por parte del Proveedor de Servicios para el Cliente, con el objetivo de **${objetivosServicios}**.
  
  ## 2. Alcance de los Servicios
  
  - **Descripción Detallada de los Servicios:** Los servicios incluirán todas las tareas y actividades necesarias para cumplir con los objetivos definidos, detallados en **Anexo A - Especificaciones de los Servicios**.
  - **Requisitos Adicionales:** Cualquier modificación o adición al alcance de los servicios deberá ser acordada por escrito y firmada por ambas partes.
  
  ## 3. Tarifas y Condiciones de Pago
  
  - **Tarifa de los Servicios:** La tarifa total por la prestación de los servicios será de **${tarifaServicio}**, que se pagará de acuerdo con el siguiente método:
    - **Método de Pago:** ${metodoPago}.
    - **Fechas de Pago:** ${fechasPago}.
  - **Pagos por Etapas:** Los pagos se realizarán en función de hitos alcanzados o entregables proporcionados, según lo estipulado en **Anexo B - Cronograma de Pagos**.
  - **Condiciones de Pago:** El Cliente se compromete a realizar los pagos en un plazo máximo de **30 días** a partir de la fecha de emisión de la factura correspondiente.
  
  ## 4. Duración del Contrato y Renovación
  
  - **Duración Inicial:** El contrato tendrá una duración de **${duracionServicio}**, comenzando el **${inicioServicio}**.
  - **Renovación Automática:** ${renovacionAutomatica ? "Este contrato se renovará automáticamente por períodos adicionales si ninguna de las partes notifica su intención de no renovar con al menos 30 días de antelación." : "No se contempla la renovación automática; se renegociará al finalizar el término actual."}
  
  ## 5. Obligaciones del Proveedor de Servicios
  
  El Proveedor de Servicios se compromete a:
  - **Cumplir con los estándares de calidad:** Garantizar que todos los servicios se presten de acuerdo con los **${estandaresCalidad}** y las mejores prácticas del sector.
  - **Cumplimiento de Plazos:** Respetar los plazos y tiempos de entrega acordados para cada fase del proyecto.
  - **Reporte de Progreso:** Proporcionar informes periódicos sobre el progreso de los servicios y cualquier incidencia que pueda afectar la entrega.
  
  ## 6. Obligaciones del Cliente
  
  El Cliente se compromete a:
  - **Proveer Información Necesaria:** Suministrar al Proveedor de Servicios toda la información y recursos necesarios para la correcta prestación de los servicios.
  - **Revisar y Aceptar Entregables:** Revisar los entregables proporcionados en un plazo máximo de **10 días hábiles** y notificar cualquier corrección requerida.
  - **Cumplir con los Términos de Pago:** Realizar los pagos correspondientes de manera puntual según lo acordado.
  
  ## 7. Propiedad Intelectual
  
  - **Derechos de Propiedad:** Todos los resultados y productos derivados del servicio prestado serán propiedad exclusiva del Cliente, salvo acuerdo contrario especificado en **Anexo C - Derechos de Propiedad Intelectual**.
  - **Licencia de Uso:** El Proveedor de Servicios tendrá derecho a utilizar los resultados generados solo con el consentimiento previo por escrito del Cliente.
  
  ## 8. Confidencialidad
  
  - **Acuerdo de Confidencialidad:** Ambas partes acuerdan mantener en estricta confidencialidad toda la información técnica, financiera y estratégica relacionada con este contrato y sus servicios.
  - **Duración de la Confidencialidad:** La obligación de confidencialidad se mantendrá vigente durante **${confidencialidad}** años después de la finalización del contrato.
  
  ## 9. Penalizaciones y Condiciones de Incumplimiento
  
  - **Condiciones de Incumplimiento:** ${condicionesIncumplimiento}
  - **Penalizaciones:** En caso de incumplimiento por parte del Proveedor de Servicios, se aplicará una penalización de **${penalizaciones}** además de cualquier otra acción legal que sea procedente.
  - **Resolución del Incumplimiento:** Ambas partes se comprometen a intentar resolver cualquier incumplimiento de buena fe antes de emprender acciones legales.
  
  ## 10. Resolución de Disputas
  
  - **Mediación y Arbitraje:** Las partes se comprometen a resolver cualquier conflicto mediante mediación y, si no se alcanza una solución, mediante arbitraje vinculante.
  - **Jurisdicción y Ley Aplicable:** Este contrato se regirá por las leyes de **${jurisdiccion}** y cualquier disputa se resolverá en los tribunales de **${ciudadFirma}**.
  
  ## 11. Terminación del Contrato
  
  - **Causas de Terminación:** El contrato podrá ser terminado por cualquiera de las partes bajo las siguientes condiciones:
    - **Incumplimiento Material:** Si una de las partes incumple con las obligaciones esenciales del contrato.
    - **Mutuo Acuerdo:** Si ambas partes acuerdan dar por terminado el contrato antes de la fecha de finalización.
  - **Obligaciones Tras la Terminación:** Cualquier obligación de confidencialidad, propiedad intelectual y pago de servicios prestados antes de la terminación permanecerá vigente.
  
  ## 12. Firmas y Aceptación del Contrato
  
  Al firmar este contrato, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Proveedor de Servicios:**  
  Nombre: ${nombreProveedor}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  
  **Firma del Cliente:**  
  Nombre: ${nombreCliente}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  `;
}

export default generateServiceContract;