function generateSubcontractingAgreement({
    fechaConvenio,
    nombreContratista,
    direccionContratista,
    nombreSubcontratista,
    direccionSubcontratista,
    descripcionTrabajo,
    plazosEntrega,
    estandaresCalidad,
    metodoPago,
    compensacionTotal,
    obligacionesSubcontratista,
    obligacionesContratista,
    propiedadIntelectual,
    confidencialidad,
    penalizacionesIncumplimiento,
    resolucionDisputas,
    duracionConvenio,
    terminacionConvenio,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaConvenio: string;
    nombreContratista: string;
    direccionContratista: string;
    nombreSubcontratista: string;
    direccionSubcontratista: string;
    descripcionTrabajo: string;
    plazosEntrega: string;
    estandaresCalidad: string;
    metodoPago: string;
    compensacionTotal: string;
    obligacionesSubcontratista: string;
    obligacionesContratista: string;
    propiedadIntelectual: string;
    confidencialidad: string;
    penalizacionesIncumplimiento: string;
    resolucionDisputas: string;
    duracionConvenio: string;
    terminacionConvenio: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Convenio de Subcontratación Detallado
  
  **Fecha del convenio:** ${fechaConvenio}
  
  **Este convenio de subcontratación se celebra entre las siguientes partes:**
  
  - **Contratista:** ${nombreContratista}, con domicilio en ${direccionContratista}.
  - **Subcontratista:** ${nombreSubcontratista}, con domicilio en ${direccionSubcontratista}.
  
  ## 1. Objeto del Convenio
  
  El presente convenio tiene como objetivo formalizar un acuerdo de subcontratación para la realización de **${descripcionTrabajo}**, estableciendo los términos, condiciones y obligaciones de ambas partes para asegurar la entrega de un trabajo de alta calidad.
  
  ## 2. Plazos de Entrega y Estándares de Calidad
  
  - **Plazos de Entrega:** El Subcontratista se compromete a completar y entregar el trabajo según el siguiente cronograma:
    - **Fechas de Entrega:** ${plazosEntrega}.
  - **Estándares de Calidad:** Todos los trabajos realizados deben cumplir con los estándares de calidad definidos por el Contratista, que incluyen **${estandaresCalidad}**.
  - **Revisiones y Aprobaciones:** El Contratista se reserva el derecho de revisar y solicitar ajustes si el trabajo no cumple con los estándares requeridos.
  
  ## 3. Compensación y Método de Pago
  
  - **Compensación Total:** El Contratista se compromete a pagar al Subcontratista una suma total de **${compensacionTotal}** por los servicios prestados.
  - **Método de Pago:** Los pagos se efectuarán mediante **${metodoPago}**, y se realizarán en las fechas acordadas tras la entrega y aprobación del trabajo.
  - **Bonificaciones y Retenciones:** Se podrán aplicar bonificaciones por entregas anticipadas y retenciones en caso de incumplimiento de los plazos o calidad establecida.
  
  ## 4. Obligaciones del Subcontratista
  
  El Subcontratista se compromete a:
  - **Cumplimiento del Cronograma:** Realizar el trabajo de acuerdo con los plazos y especificaciones acordados.
  - **Calidad y Precisión:** Garantizar que todos los productos y servicios entregados cumplan con los estándares y requisitos técnicos definidos por el Contratista.
  - **Provisión de Informes de Progreso:** Mantener al Contratista informado con reportes regulares sobre el avance del trabajo y cualquier problema que pueda afectar la entrega.
  - **${obligacionesSubcontratista}**
  
  ## 5. Obligaciones del Contratista
  
  El Contratista se compromete a:
  - **Proporcionar Información y Recursos Necesarios:** Brindar al Subcontratista toda la información y recursos técnicos necesarios para la correcta ejecución del trabajo.
  - **Revisión y Aprobación de Entregas:** Revisar y proporcionar feedback sobre el trabajo entregado en un plazo razonable.
  - **Pagos Puntuales:** Efectuar los pagos según el cronograma establecido tras la aprobación de los entregables del Subcontratista.
  - **${obligacionesContratista}**
  
  ## 6. Propiedad Intelectual y Confidencialidad
  
  ### Propiedad Intelectual
  
  - **Derechos sobre el Trabajo Realizado:** Todos los derechos de propiedad intelectual relacionados con el trabajo realizado por el Subcontratista bajo este convenio pertenecerán al Contratista.
  - **Licencia de Uso Restringido:** El Subcontratista no tendrá derecho a utilizar, reproducir o distribuir el trabajo realizado sin el consentimiento previo por escrito del Contratista.
  
  ### Confidencialidad
  
  - **Protección de Información Sensible:** Ambas partes se comprometen a no divulgar ninguna información confidencial relacionada con este convenio y a proteger todos los datos sensibles del proyecto.
  - **Duración de la Confidencialidad:** La obligación de confidencialidad se mantendrá vigente durante **${confidencialidad}** años después de la finalización del convenio.
  
  ## 7. Penalizaciones y Consecuencias del Incumplimiento
  
  - **Penalizaciones por Retraso:** En caso de incumplimiento de los plazos establecidos, se aplicará una penalización de **${penalizacionesIncumplimiento}** por cada día de retraso.
  - **Reducción de Pago:** El Contratista podrá deducir una parte del pago acordado si el trabajo no cumple con los estándares de calidad previamente definidos.
  - **Acciones Legales:** El Contratista se reserva el derecho de emprender acciones legales para recuperar pérdidas o daños derivados del incumplimiento del Subcontratista.
  
  ## 8. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** Las partes se comprometen a resolver cualquier conflicto mediante mediación y, si no se alcanza una solución, a través de arbitraje vinculante conforme a las leyes de **${jurisdiccion}**.
  - **Jurisdicción y Ley Aplicable:** Este convenio se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 9. Duración y Terminación del Convenio
  
  - **Duración del Convenio:** Este convenio tendrá una duración de **${duracionConvenio}**, renovable si ambas partes están de acuerdo.
  - **Terminación del Convenio:** ${terminacionConvenio}.
  - **Liquidación de Obligaciones:** Se procederá a la liquidación de todas las obligaciones pendientes en caso de terminación anticipada.
  
  ## 10. Disposiciones Generales
  
  - **Modificaciones al Convenio:** Cualquier cambio o modificación a este convenio deberá realizarse por escrito y ser firmado por ambas partes.
  - **Transferencia de Derechos:** Ninguna parte podrá ceder sus derechos u obligaciones bajo este convenio sin el consentimiento previo y por escrito de la otra parte.
  - **Fuerza Mayor:** Ninguna de las partes será responsable por incumplimientos debido a eventos fuera de su control, como desastres naturales o conflictos bélicos.
  
  ## 11. Firmas y Aceptación del Convenio
  
  Al firmar este convenio, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Contratista:**  
  Nombre: ${nombreContratista}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  
  **Firma del Subcontratista:**  
  Nombre: ${nombreSubcontratista}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  `;
}

export default generateSubcontractingAgreement;
