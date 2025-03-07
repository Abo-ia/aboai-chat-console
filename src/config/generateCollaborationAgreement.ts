function generateCollaborationAgreement({
    fechaConvenio,
    nombreParteA,
    direccionParteA,
    nombreParteB,
    direccionParteB,
    objetivosColaboracion,
    aportesParteA,
    aportesParteB,
    estructuraComunicacion,
    distribucionBeneficios,
    distribucionCostos,
    propiedadIntelectual,
    confidencialidad,
    duracionConvenio,
    terminacionConvenio,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaConvenio: string;
    nombreParteA: string;
    direccionParteA: string;
    nombreParteB: string;
    direccionParteB: string;
    objetivosColaboracion: string;
    aportesParteA: string;
    aportesParteB: string;
    estructuraComunicacion: string;
    distribucionBeneficios: string;
    distribucionCostos: string;
    propiedadIntelectual: string;
    confidencialidad: string;
    duracionConvenio: string;
    terminacionConvenio: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Convenio de Colaboración Detallado
  
  **Fecha del convenio:** ${fechaConvenio}
  
  **Este convenio de colaboración se celebra entre las siguientes partes:**
  
  - **Parte A:** ${nombreParteA}, con domicilio en ${direccionParteA}.
  - **Parte B:** ${nombreParteB}, con domicilio en ${direccionParteB}.
  
  ## 1. Objeto del Convenio
  
  El presente convenio tiene como objetivo formalizar una colaboración entre **${nombreParteA}** y **${nombreParteB}** para **${objetivosColaboracion}**, estableciendo los términos, responsabilidades y acuerdos necesarios para alcanzar estos fines comunes.
  
  ## 2. Aportes y Responsabilidades
  
  ### Aportes de la Parte A
  
  - **Contribuciones Financieras y Recursos:** ${aportesParteA}.
  - **Provisión de Personal Especializado:** Apoyo mediante recursos humanos calificados para el desarrollo y ejecución de las actividades acordadas.
  - **Infraestructura y Equipos Técnicos:** Facilitar instalaciones, herramientas y tecnologías necesarias para la implementación del proyecto.
  
  ### Aportes de la Parte B
  
  - **Capital y Apoyo Técnico:** ${aportesParteB}.
  - **Asesoramiento Estratégico:** Contribuir con su experiencia y conocimientos específicos para guiar las decisiones estratégicas.
  - **Acceso a Redes y Contactos:** Proporcionar acceso a una red de contactos y socios estratégicos que apoyen el desarrollo de las actividades de colaboración.
  
  ## 3. Estructura de Comunicación
  
  - **Coordinación y Gestión:** Se designará un coordinador principal por cada parte para facilitar la comunicación y coordinación efectiva del proyecto.
  - **Reuniones de Seguimiento:** Se realizarán reuniones periódicas (mensuales o según se acuerde) para revisar el progreso del proyecto, resolver problemas y ajustar las estrategias si es necesario.
  - **Documentación Compartida:** Toda la información relevante y los informes de progreso serán compartidos a través de una plataforma acordada, garantizando la transparencia y el acceso a los datos en tiempo real.
  
  ## 4. Distribución de Beneficios y Costos
  
  ### Beneficios
  
  - **Distribución de Beneficios Generados:** Los beneficios obtenidos se distribuirán de la siguiente manera:
    - **Parte A:** ${distribucionBeneficios} de los beneficios netos.
    - **Parte B:** El porcentaje restante de los beneficios netos.
  
  ### Costos
  
  - **Distribución de Costos Operativos:** Los costos asociados al desarrollo del proyecto se dividirán de acuerdo con los aportes financieros y recursos proporcionados por cada parte:
    - **Parte A:** ${distribucionCostos} de los costos operativos.
    - **Parte B:** La parte restante de los costos operativos.
  
  ## 5. Propiedad Intelectual y Confidencialidad
  
  ### Propiedad Intelectual
  
  - **Derechos sobre la Propiedad Intelectual:** Cualquier propiedad intelectual desarrollada durante la colaboración será compartida proporcionalmente según los aportes de cada parte, a menos que se acuerde lo contrario.
  - **Licencia de Uso:** Ninguna parte podrá utilizar la propiedad intelectual para fines fuera de la colaboración sin el consentimiento previo y por escrito de la otra parte.
  
  ### Confidencialidad
  
  - **Protección de Información Sensible:** Ambas partes se comprometen a no divulgar ninguna información confidencial relacionada con el proyecto a terceros sin el consentimiento previo.
  - **Duración de la Obligación de Confidencialidad:** Esta obligación se mantendrá vigente durante **${confidencialidad}** años después de la finalización del convenio.
  
  ## 6. Duración y Terminación del Convenio
  
  - **Duración Inicial del Convenio:** Este convenio tendrá una duración de **${duracionConvenio}**, comenzando en la fecha de su firma.
  - **Condiciones de Terminación:** ${terminacionConvenio}.
  - **Proceso de Liquidación:** En caso de terminación anticipada, se procederá a una revisión y liquidación de las responsabilidades financieras y la distribución de cualquier beneficio generado.
  
  ## 7. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** Las partes se comprometen a resolver cualquier conflicto mediante mediación y, si no se alcanza una solución, a través de arbitraje vinculante conforme a las leyes de **${jurisdiccion}**.
  - **Jurisdicción y Ley Aplicable:** Este convenio se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 8. Disposiciones Generales
  
  - **Modificaciones al Convenio:** Cualquier modificación o adición al convenio deberá hacerse por escrito y ser firmada por ambas partes.
  - **Transferencia de Derechos:** Ninguna parte podrá ceder sus derechos y obligaciones bajo este convenio sin el consentimiento previo y por escrito de la otra parte.
  - **Cláusula de Fuerza Mayor:** Ninguna de las partes será responsable por incumplimientos debido a circunstancias fuera de su control, como desastres naturales o situaciones de emergencia.
  
  ## 9. Firmas y Aceptación del Convenio
  
  Al firmar este convenio, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma de la Parte A:**  
  Nombre: ${nombreParteA}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  
  **Firma de la Parte B:**  
  Nombre: ${nombreParteB}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  `;
}

export default generateCollaborationAgreement;
