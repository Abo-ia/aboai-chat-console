function generateFranchiseContract({
    fechaContrato,
    nombreFranquiciante,
    direccionFranquiciante,
    nombreFranquiciado,
    direccionFranquiciado,
    descripcionFranquicia,
    duracionContrato,
    tarifaInicial,
    regalíasMensuales,
    metodoPago,
    territoriosExclusivos,
    derechosUsoMarca,
    obligacionesFranquiciante,
    obligacionesFranquiciado,
    estandaresOperativos,
    capacitacionSoporte,
    renovacionContrato,
    terminacionContrato,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
  }: {
    fechaContrato: string;
    nombreFranquiciante: string;
    direccionFranquiciante: string;
    nombreFranquiciado: string;
    direccionFranquiciado: string;
    descripcionFranquicia: string;
    duracionContrato: string;
    tarifaInicial: string;
    regalíasMensuales: string;
    metodoPago: string;
    territoriosExclusivos: string;
    derechosUsoMarca: string;
    obligacionesFranquiciante: string;
    obligacionesFranquiciado: string;
    estandaresOperativos: string;
    capacitacionSoporte: string;
    renovacionContrato: string;
    terminacionContrato: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
  }): string {
    return `
  # Contrato de Franquicia Detallado
  
  **Fecha del contrato:** ${fechaContrato}
  
  **Este contrato de franquicia se celebra entre las siguientes partes:**
  
  - **Franquiciante:** ${nombreFranquiciante}, con domicilio en ${direccionFranquiciante}.
  - **Franquiciado:** ${nombreFranquiciado}, con domicilio en ${direccionFranquiciado}.
  
  ## 1. Objeto del Contrato
  
  El presente contrato tiene como objeto establecer los términos y condiciones para la operación de la franquicia **${descripcionFranquicia}**, definiendo los derechos y obligaciones del Franquiciante y el Franquiciado.
  
  ## 2. Duración del Contrato
  
  - **Duración Inicial:** Este contrato tendrá una duración de **${duracionContrato}**, comenzando en la fecha de firma del contrato.
  - **Renovación del Contrato:** ${renovacionContrato}.
  - **Revisión y Actualización:** Cualquier actualización de los términos se revisará al final de cada período de contrato para garantizar el cumplimiento de ambas partes.
  
  ## 3. Tarifas y Regalías
  
  - **Tarifa Inicial:** El Franquiciado deberá pagar una tarifa inicial de **${tarifaInicial}** al momento de la firma de este contrato.
  - **Regalías Mensuales:** Se pagará una regalía mensual de **${regalíasMensuales}** basada en un porcentaje de las ventas brutas, pagadera mediante **${metodoPago}**.
  - **Pagos Puntuales:** El Franquiciado se compromete a realizar todos los pagos dentro del plazo acordado para evitar penalizaciones o intereses adicionales.
  
  ## 4. Derechos y Uso de la Marca
  
  - **Uso Exclusivo de la Marca:** El Franquiciado tendrá el derecho no exclusivo de utilizar la marca, logotipos y demás elementos de propiedad intelectual definidos en **${derechosUsoMarca}**.
  - **Territorios Exclusivos:** ${territoriosExclusivos}, con el compromiso de no abrir nuevas franquicias dentro de estos territorios sin previo acuerdo.
  
  ## 5. Obligaciones del Franquiciante
  
  El Franquiciante se compromete a:
  - **Proveer Capacitación y Soporte Continuo:** Ofrecer un programa de capacitación integral sobre el funcionamiento de la franquicia y soporte continuo durante la vigencia del contrato.
  - **Desarrollar Material de Marketing:** Proporcionar material de marketing y estrategias promocionales para mejorar la visibilidad y el rendimiento de la franquicia.
  - **Supervisión Operativa:** Mantener una supervisión regular para garantizar que la franquicia opere de acuerdo con los estándares establecidos.
  - **${obligacionesFranquiciante}**
  
  ## 6. Obligaciones del Franquiciado
  
  El Franquiciado se compromete a:
  - **Cumplir con los Estándares Operativos:** Operar el negocio de acuerdo con las políticas y estándares definidos en **${estandaresOperativos}**.
  - **Participar en Capacitación Continua:** Asistir a todas las sesiones de capacitación y actualizaciones proporcionadas por el Franquiciante.
  - **Confidencialidad y No Competencia:** Mantener la confidencialidad de toda la información proporcionada y no participar en negocios que compitan con la franquicia durante el contrato y hasta **3 años** después de su finalización.
  - **${obligacionesFranquiciado}**
  
  ## 7. Capacitación y Soporte
  
  - **Programa de Capacitación Inicial:** El Franquiciante proporcionará una capacitación inicial detallada que incluirá operaciones comerciales, manejo de personal, estrategias de ventas y atención al cliente.
  - **Soporte Técnico Continuo:** Asistencia técnica y operativa para resolver problemas específicos que puedan surgir en la operación diaria de la franquicia.
  - **Actualización de Protocolos:** El Franquiciado recibirá actualizaciones periódicas sobre nuevos métodos de operación, innovaciones tecnológicas y estrategias de mercado.
  
  ## 8. Renovación y Terminación del Contrato
  
  - **Condiciones para la Renovación:** ${renovacionContrato}.
  - **Terminación del Contrato:** ${terminacionContrato}.
  - **Cláusula de Rescisión:** En caso de incumplimiento grave por parte de cualquiera de las partes, el contrato puede ser rescindido de inmediato previa notificación escrita.
  
  ## 9. Resolución de Disputas
  
  - **Proceso de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** Las partes se comprometen a resolver cualquier conflicto mediante mediación y, si no se alcanza una solución, a través de arbitraje vinculante conforme a las leyes aplicables.
  - **Jurisdicción y Ley Aplicable:** Este contrato se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 10. Disposiciones Generales
  
  - **Confidencialidad:** Ambas partes se comprometen a mantener en estricta confidencialidad todos los detalles del negocio y estrategias operativas.
  - **Modificaciones al Contrato:** Cualquier cambio o modificación deberá realizarse por escrito y estar firmado por ambas partes.
  - **Fuerza Mayor:** Ninguna de las partes será responsable por el incumplimiento debido a circunstancias fuera de su control, como desastres naturales, conflictos bélicos, o cambios legislativos.
  
  ## 11. Firmas y Aceptación del Contrato
  
  Al firmar este contrato, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Franquiciante:**  
  Nombre: ${nombreFranquiciante}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  
  **Firma del Franquiciado:**  
  Nombre: ${nombreFranquiciado}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  `;
  }
  
export default generateFranchiseContract;