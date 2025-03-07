function generateSocietyContract({
    fechaContrato,
    nombreSocioA,
    direccionSocioA,
    nombreSocioB,
    direccionSocioB,
    tipoSociedad,
    aportesSocioA,
    aportesSocioB,
    distribucionBeneficios,
    distribucionPerdidas,
    tomaDecisiones,
    gestionOperativa,
    obligacionesSocios,
    duracionSociedad,
    disolucionSociedad,
    propiedadIntelectual,
    confidencialidad,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaContrato: string;
    nombreSocioA: string;
    direccionSocioA: string;
    nombreSocioB: string;
    direccionSocioB: string;
    tipoSociedad: string;
    aportesSocioA: string;
    aportesSocioB: string;
    distribucionBeneficios: string;
    distribucionPerdidas: string;
    tomaDecisiones: string;
    gestionOperativa: string;
    obligacionesSocios: string;
    duracionSociedad: string;
    disolucionSociedad: string;
    propiedadIntelectual: string;
    confidencialidad: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Contrato de Sociedad Detallado
  
  **Fecha del contrato:** ${fechaContrato}
  
  **Este contrato de sociedad se celebra entre las siguientes partes:**
  
  - **Socio A:** ${nombreSocioA}, con domicilio en ${direccionSocioA}.
  - **Socio B:** ${nombreSocioB}, con domicilio en ${direccionSocioB}.
  
  ## 1. Objeto del Contrato
  
  El presente contrato tiene como objetivo formalizar la creación de una **sociedad de tipo ${tipoSociedad}** para llevar a cabo **actividades comerciales y empresariales definidas por las partes**, estableciendo las bases para la gestión, operación y distribución de beneficios de la sociedad.
  
  ## 2. Aportes de los Socios
  
  ### Aportes del Socio A
  
  - **Contribución Financiera Inicial:** ${aportesSocioA}, destinada a financiar las operaciones y capital de trabajo de la sociedad.
  - **Recursos Humanos y Técnicos:** Provisión de personal y conocimientos técnicos especializados según las necesidades de la sociedad.
  - **Red de Contactos y Experiencia:** Acceso a una base de contactos comerciales y asesoramiento en estrategias empresariales.
  
  ### Aportes del Socio B
  
  - **Inversión Financiera y Capital de Trabajo:** ${aportesSocioB}, para la expansión y desarrollo de proyectos clave dentro de la sociedad.
  - **Infraestructura y Equipamiento:** Facilitar el uso de oficinas, equipos y herramientas necesarias para la operación diaria.
  - **Asesoramiento Estratégico:** Contribuir con experiencia en el sector y habilidades de gestión para la toma de decisiones críticas.
  
  ## 3. Distribución de Beneficios y Pérdidas
  
  ### Distribución de Beneficios
  
  - **Esquema de Distribución de Beneficios:** Los beneficios generados se distribuirán de la siguiente manera:
    - **Socio A:** ${distribucionBeneficios} de los beneficios netos.
    - **Socio B:** El porcentaje restante de los beneficios netos.
  
  ### Distribución de Pérdidas
  
  - **Asunción de Pérdidas:** Las pérdidas serán asumidas proporcionalmente según los aportes de cada socio:
    - **Socio A:** ${distribucionPerdidas} de las pérdidas.
    - **Socio B:** La parte restante de las pérdidas.
  
  ## 4. Toma de Decisiones y Gestión Operativa
  
  ### Toma de Decisiones
  
  - **Decisiones Ordinarias:** Se tomarán mediante mayoría simple de votos.
  - **Decisiones Estratégicas:** Requerirán la aprobación unánime de todos los socios, especialmente en cuestiones como la modificación del objeto social o la venta de activos significativos.
  - **Proceso de Resolución de Desacuerdos:** ${tomaDecisiones}.
  
  ### Gestión Operativa
  
  - **Responsable de Gestión:** Se designará a un **gerente** o responsable operativo encargado de la supervisión diaria de las operaciones, bajo la dirección conjunta de los socios.
  - **Reuniones de Gestión:** Se llevarán a cabo reuniones mensuales para evaluar el progreso, definir nuevas estrategias y revisar los resultados financieros.
  
  ## 5. Obligaciones de los Socios
  
  Los socios se comprometen a:
  - **Cumplimiento Activo de Responsabilidades:** Participar activamente en la toma de decisiones y gestión de las operaciones diarias.
  - **Transparencia Financiera:** Mantener registros claros, completos y precisos de todas las transacciones comerciales.
  - **Confidencialidad y No Competencia:** No divulgar información sensible de la sociedad ni participar en negocios que compitan con la sociedad durante y hasta **5 años** después de la disolución del contrato.
  - **${obligacionesSocios}**
  
  ## 6. Propiedad Intelectual y Confidencialidad
  
  ### Derechos sobre la Propiedad Intelectual
  
  - **Distribución de Derechos:** La propiedad intelectual generada en el curso de la sociedad será compartida proporcionalmente según los aportes de cada socio.
  - **Uso Exclusivo:** Ningún socio podrá utilizar la propiedad intelectual para fines fuera de los intereses de la sociedad sin el consentimiento previo y escrito de los demás socios.
  
  ### Obligación de Confidencialidad
  
  - **Duración de la Confidencialidad:** Las obligaciones de confidencialidad se mantendrán vigentes durante **${confidencialidad}** años tras la disolución de la sociedad.
  - **Protección de Información Sensible:** Toda la información empresarial y técnica deberá ser protegida contra acceso no autorizado y divulgación inapropiada.
  
  ## 7. Duración del Contrato y Disolución de la Sociedad
  
  - **Duración de la Sociedad:** La sociedad tendrá una duración inicial de **${duracionSociedad}**, renovable automáticamente si ambas partes están de acuerdo.
  - **Disolución de la Sociedad:** ${disolucionSociedad}.
  - **Proceso de Liquidación:** En caso de disolución, se procederá a la liquidación de los activos y al pago de pasivos según lo acordado en las disposiciones de la sociedad.
  
  ## 8. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** En caso de conflicto, las partes se comprometen a resolver la disputa mediante mediación y, si no se alcanza una solución, a través de arbitraje según las normas de **${jurisdiccion}**.
  - **Jurisdicción y Ley Aplicable:** Cualquier disputa será resuelta en los tribunales de **${ciudadFirma}** bajo las leyes de **${jurisdiccion}**.
  
  ## 9. Disposiciones Generales
  
  - **Modificaciones al Contrato:** Cualquier modificación a este contrato deberá realizarse por escrito y ser firmada por todas las partes.
  - **Fuerza Mayor:** Ninguna de las partes será responsable por incumplimientos debido a eventos fuera de su control, como desastres naturales o situaciones de emergencia.
  - **Transferencia de Derechos:** Ningún socio podrá ceder sus derechos y obligaciones bajo este contrato sin el consentimiento previo y por escrito de los demás socios.
  
  ## 10. Firmas y Aceptación del Contrato
  
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

export default generateSocietyContract;
