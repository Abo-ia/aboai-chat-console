function generatePartnershipContract({
    fechaContrato,
    nombreSocioA,
    direccionSocioA,
    nombreSocioB,
    direccionSocioB,
    propositoAsociacion,
    aportesSocioA,
    aportesSocioB,
    distribucionBeneficios,
    distribucionPerdidas,
    tomaDecisiones,
    duracionContrato,
    disolucionAsociacion,
    obligacionesSocios,
    propiedadIntelectual,
    confidencialidad,
    penalizaciones,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaContrato: string;
    nombreSocioA: string;
    direccionSocioA: string;
    nombreSocioB: string;
    direccionSocioB: string;
    propositoAsociacion: string;
    aportesSocioA: string;
    aportesSocioB: string;
    distribucionBeneficios: string;
    distribucionPerdidas: string;
    tomaDecisiones: string;
    duracionContrato: string;
    disolucionAsociacion: string;
    obligacionesSocios: string;
    propiedadIntelectual: string;
    confidencialidad: string;
    penalizaciones: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Contrato de Asociación Detallado
  
  **Fecha del contrato:** ${fechaContrato}
  
  **Este contrato de asociación se celebra entre las siguientes partes:**
  
  - **Socio A:** ${nombreSocioA}, con domicilio en ${direccionSocioA}.
  - **Socio B:** ${nombreSocioB}, con domicilio en ${direccionSocioB}.
  
  ## 1. Objeto del Contrato
  
  El presente contrato tiene como objetivo formalizar una asociación para **${propositoAsociacion}**, definiendo los términos, responsabilidades y acuerdos necesarios para alcanzar este propósito común.
  
  ## 2. Aportes de los Socios
  
  ### Aportes del Socio A
  
  - **Contribución Financiera:** ${aportesSocioA}.
  - **Recursos Humanos y Técnicos:** Provisión de personal especializado y conocimientos técnicos relevantes para el desarrollo del proyecto.
  - **Red de Contactos:** Acceso a su red de contactos comerciales y estratégicos para el crecimiento de la asociación.
  
  ### Aportes del Socio B
  
  - **Inversión Inicial:** ${aportesSocioB}.
  - **Infraestructura y Equipos:** Facilitar el uso de instalaciones, herramientas y equipos necesarios para la ejecución de las actividades del proyecto.
  - **Experiencia en el Sector:** Aportar su experiencia y conocimientos específicos en el sector para guiar las decisiones estratégicas.
  
  ## 3. Distribución de Beneficios y Pérdidas
  
  ### Beneficios
  
  - **Distribución de Beneficios:** Los beneficios generados por la asociación serán distribuidos según el siguiente esquema:
    - **Socio A:** ${distribucionBeneficios} de los beneficios netos.
    - **Socio B:** El porcentaje restante de los beneficios netos.
  
  ### Pérdidas
  
  - **Distribución de Pérdidas:** Las pérdidas serán asumidas por ambas partes de acuerdo con el siguiente esquema:
    - **Socio A:** ${distribucionPerdidas} de las pérdidas.
    - **Socio B:** La parte restante de las pérdidas.
  
  ## 4. Toma de Decisiones
  
  - **Proceso de Toma de Decisiones:** ${tomaDecisiones}.
  - **Voto de Desempate:** En caso de empate en una decisión, se procederá a una mediación entre los socios para alcanzar un consenso.
  - **Cambios Estratégicos:** Cualquier cambio en la estructura de la asociación requerirá la aprobación unánime de ambas partes.
  
  ## 5. Duración del Contrato y Disolución
  
  - **Duración del Contrato:** Este contrato de asociación tendrá una duración de **${duracionContrato}**, renovable automáticamente si ambas partes lo acuerdan.
  - **Disolución de la Asociación:** ${disolucionAsociacion}.
  - **Proceso de Liquidación:** En caso de disolución, se llevará a cabo un proceso de liquidación para distribuir los activos y resolver las obligaciones de la asociación.
  
  ## 6. Obligaciones de los Socios
  
  Ambos socios se comprometen a:
  - **Participación Activa:** Participar de manera activa y constante en la gestión y desarrollo de la asociación.
  - **Transparencia Financiera:** Mantener registros claros y precisos de todas las transacciones financieras y actividades realizadas.
  - **Cumplimiento Legal:** Cumplir con todas las leyes y regulaciones aplicables relacionadas con las actividades de la asociación.
  - **${obligacionesSocios}**
  
  ## 7. Propiedad Intelectual y Confidencialidad
  
  ### Propiedad Intelectual
  
  - **Derechos sobre el Trabajo Creado:** Cualquier propiedad intelectual desarrollada durante la asociación será compartida proporcionalmente según los aportes de cada socio.
  - **Licencia de Uso:** Ninguno de los socios podrá usar la propiedad intelectual sin el consentimiento previo y por escrito del otro socio.
  
  ### Confidencialidad
  
  - **Obligación de Confidencialidad:** Ambas partes se comprometen a no divulgar ninguna información confidencial relacionada con la asociación.
  - **Duración de la Confidencialidad:** La obligación de confidencialidad se mantendrá vigente durante **${confidencialidad}** años después de la disolución del contrato.
  
  ## 8. Penalizaciones y Condiciones de Incumplimiento
  
  - **Incumplimiento de Obligaciones:** En caso de que alguno de los socios no cumpla con sus obligaciones, se aplicarán penalizaciones de **${penalizaciones}**.
  - **Proceso de Resolución de Incumplimiento:** Se deberá intentar resolver cualquier incumplimiento a través de un diálogo amistoso y mediación antes de tomar acciones legales.
  
  ## 9. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Arbitraje y Mediación:** En caso de disputa no resuelta mediante negociación, las partes acuerdan someterse a un arbitraje de acuerdo con las normas de **${jurisdiccion}**.
  - **Jurisdicción y Ley Aplicable:** Este contrato se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 10. Disposiciones Finales
  
  - **Modificaciones al Contrato:** Cualquier modificación o adición a este contrato deberá hacerse por escrito y ser firmada por ambas partes.
  - **Transferencia de Derechos:** Ninguna parte puede ceder o transferir sus derechos sin el consentimiento previo de la otra parte.
  - **Cláusula de Fuerza Mayor:** Ninguna de las partes será responsable por el incumplimiento debido a eventos fuera de su control, como desastres naturales o conflictos bélicos.
  
  ## 11. Firmas y Aceptación del Contrato
  
  Al firmar este contrato, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Socio A:**  
  Nombre: ${nombreSocioA}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  
  **Firma del Socio B:**  
  Nombre: ${nombreSocioB}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  `;
}

export default generatePartnershipContract;