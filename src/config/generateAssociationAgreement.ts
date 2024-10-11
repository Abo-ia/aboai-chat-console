function generateAssociationAgreement({
    fechaConvenio,
    nombreAsociadoA,
    direccionAsociadoA,
    nombreAsociadoB,
    direccionAsociadoB,
    objetivosAsociacion,
    aportesAsociadoA,
    aportesAsociadoB,
    distribucionBeneficios,
    distribucionCostos,
    tomaDecisiones,
    gestionOperativa,
    duracionConvenio,
    disolucionConvenio,
    propiedadIntelectual,
    confidencialidad,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
  }: {
    fechaConvenio: string;
    nombreAsociadoA: string;
    direccionAsociadoA: string;
    nombreAsociadoB: string;
    direccionAsociadoB: string;
    objetivosAsociacion: string;
    aportesAsociadoA: string;
    aportesAsociadoB: string;
    distribucionBeneficios: string;
    distribucionCostos: string;
    tomaDecisiones: string;
    gestionOperativa: string;
    duracionConvenio: string;
    disolucionConvenio: string;
    propiedadIntelectual: string;
    confidencialidad: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
  }): string {
    return `
  # Convenio de Asociación Detallado
  
  **Fecha del convenio:** ${fechaConvenio}
  
  **Este convenio de asociación se celebra entre las siguientes partes:**
  
  - **Asociado A:** ${nombreAsociadoA}, con domicilio en ${direccionAsociadoA}.
  - **Asociado B:** ${nombreAsociadoB}, con domicilio en ${direccionAsociadoB}.
  
  ## 1. Objeto del Convenio
  
  El presente convenio tiene como objetivo formalizar una asociación entre **${nombreAsociadoA}** y **${nombreAsociadoB}** para **${objetivosAsociacion}**, definiendo claramente los términos, responsabilidades y acuerdos necesarios para el logro de los objetivos comunes.
  
  ## 2. Aportes de las Partes
  
  ### Aportes del Asociado A
  
  - **Contribuciones Financieras:** ${aportesAsociadoA}.
  - **Recursos Humanos y Técnicos:** Provisión de personal especializado y conocimientos técnicos para el desarrollo de las actividades acordadas.
  - **Infraestructura y Equipos:** Facilitar instalaciones, herramientas y recursos necesarios para el proyecto.
  
  ### Aportes del Asociado B
  
  - **Capital de Trabajo y Soporte Técnico:** ${aportesAsociadoB}.
  - **Redes de Contactos:** Contribución con su red de contactos comerciales y estratégicos para expandir las oportunidades de la asociación.
  - **Asesoramiento Estratégico:** Aportar su experiencia y conocimientos para la toma de decisiones críticas.
  
  ## 3. Distribución de Beneficios y Costos
  
  ### Beneficios
  
  - **Distribución de Beneficios:** Los beneficios obtenidos se distribuirán de la siguiente manera:
    - **Asociado A:** ${distribucionBeneficios} de los beneficios netos.
    - **Asociado B:** El porcentaje restante de los beneficios netos.
  
  ### Costos
  
  - **Distribución de Costos Operativos:** Los costos asociados al desarrollo del proyecto se dividirán de acuerdo con la siguiente proporción:
    - **Asociado A:** ${distribucionCostos} de los costos operativos.
    - **Asociado B:** La parte restante de los costos operativos.
  
  ## 4. Toma de Decisiones y Gestión Operativa
  
  ### Toma de Decisiones
  
  - **Proceso de Toma de Decisiones:** ${tomaDecisiones}.
  - **Voto de Desempate:** En caso de empate en una decisión, las partes procederán a una mediación interna para alcanzar un consenso.
  - **Modificaciones Estratégicas:** Cualquier cambio en los objetivos de la asociación requerirá la aprobación de ambas partes.
  
  ### Gestión Operativa
  
  - **Responsable de Gestión:** Se designará un gestor encargado de supervisar las actividades diarias, sujeto a la supervisión de ambos asociados.
  - **Reuniones de Evaluación:** Se llevarán a cabo reuniones mensuales para evaluar el progreso, discutir estrategias y ajustar las operaciones según sea necesario.
  
  ## 5. Propiedad Intelectual y Confidencialidad
  
  ### Propiedad Intelectual
  
  - **Derechos de Propiedad Intelectual:** La propiedad intelectual generada durante la asociación será compartida proporcionalmente según los aportes de cada parte.
  - **Uso de la Propiedad Intelectual:** Ningún asociado podrá utilizar la propiedad intelectual para fines fuera del ámbito de la asociación sin el consentimiento previo por escrito de la otra parte.
  
  ### Confidencialidad
  
  - **Protección de Información Confidencial:** Ambas partes se comprometen a no divulgar ninguna información sensible relacionada con el proyecto a terceros sin el consentimiento previo.
  - **Duración de la Confidencialidad:** Esta obligación se mantendrá vigente durante **${confidencialidad}** años después de la disolución del convenio.
  
  ## 6. Duración y Disolución del Convenio
  
  - **Duración del Convenio:** Este convenio tendrá una duración de **${duracionConvenio}**, renovable automáticamente si ambas partes están de acuerdo.
  - **Disolución del Convenio:** ${disolucionConvenio}.
  - **Proceso de Liquidación:** En caso de disolución, se llevará a cabo un proceso de liquidación para distribuir los activos y resolver las obligaciones financieras.
  
  ## 7. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** En caso de conflicto, las partes se comprometen a resolver la disputa mediante mediación y, si no se alcanza una solución, a través de arbitraje conforme a las leyes de **${jurisdiccion}**.
  - **Jurisdicción y Ley Aplicable:** Este convenio se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 8. Disposiciones Generales
  
  - **Modificaciones al Convenio:** Cualquier cambio o modificación al convenio deberá hacerse por escrito y ser firmado por ambas partes.
  - **Transferencia de Derechos:** Ninguna parte podrá ceder sus derechos u obligaciones bajo este convenio sin el consentimiento previo y por escrito de la otra parte.
  - **Cláusula de Fuerza Mayor:** Ninguna de las partes será responsable por incumplimientos debido a eventos fuera de su control, como desastres naturales o situaciones de emergencia.
  
  ## 9. Firmas y Aceptación del Convenio
  
  Al firmar este convenio, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Asociado A:**  
  Nombre: ${nombreAsociadoA}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  
  **Firma del Asociado B:**  
  Nombre: ${nombreAsociadoB}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  `;
  }
  
export default generateAssociationAgreement;