function generateNDAContract({
    fechaContrato,
    nombreParteDivulgante,
    direccionParteDivulgante,
    nombreParteReceptora,
    direccionParteReceptora,
    definicionInformacionConfidencial,
    obligacionesConfidencialidad,
    excepcionesConfidencialidad,
    duracionConfidencialidad,
    medidasSeguridad,
    consecuenciasIncumplimiento,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
  }: {
    fechaContrato: string;
    nombreParteDivulgante: string;
    direccionParteDivulgante: string;
    nombreParteReceptora: string;
    direccionParteReceptora: string;
    definicionInformacionConfidencial: string;
    obligacionesConfidencialidad: string;
    excepcionesConfidencialidad: string;
    duracionConfidencialidad: string;
    medidasSeguridad: string;
    consecuenciasIncumplimiento: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
  }): string {
    return `
  # Contrato de Confidencialidad (NDA) Detallado
  
  **Fecha del contrato:** ${fechaContrato}
  
  **Este contrato de confidencialidad se celebra entre las siguientes partes:**
  
  - **Parte Divulgante:** ${nombreParteDivulgante}, con domicilio en ${direccionParteDivulgante}.
  - **Parte Receptora:** ${nombreParteReceptora}, con domicilio en ${direccionParteReceptora}.
  
  ## 1. Objeto del Contrato
  
  El presente contrato tiene como objetivo proteger la información confidencial que será divulgada entre las partes para **fines específicos acordados**, asegurando que dicha información no sea utilizada de manera inapropiada o divulgada a terceros.
  
  ## 2. Definición de Información Confidencial
  
  - **Información Confidencial Incluida:** ${definicionInformacionConfidencial}
  - **Alcance de la Información Protegida:** Se considera información confidencial todos los datos, documentos, conocimientos técnicos, estrategias comerciales, secretos industriales y cualquier otro tipo de información relacionada con la Parte Divulgante, ya sea oral, escrita, visual, electrónica o de otro formato.
  
  ## 3. Obligaciones de la Parte Receptora
  
  La Parte Receptora se compromete a:
  - **No Divulgar Información:** Mantener la más estricta confidencialidad y no revelar la información protegida a ningún tercero sin el consentimiento previo por escrito de la Parte Divulgante.
  - **Uso Limitado de la Información:** Utilizar la información confidencial exclusivamente para los fines especificados en este contrato.
  - **Control de Acceso:** Restringir el acceso a la información confidencial únicamente a aquellos empleados o colaboradores que necesiten conocerla y que estén obligados a mantener su confidencialidad.
  
  ## 4. Excepciones a la Confidencialidad
  
  La obligación de confidencialidad no se aplicará a la información que:
  - **Sea del dominio público** en el momento de su divulgación o se convierta en pública sin violación de este contrato.
  - **Esté en posesión legítima de la Parte Receptora** antes de ser divulgada por la Parte Divulgante.
  - **Sea divulgada bajo la obligación de cumplir con una ley, reglamento o mandato judicial**, siempre que la Parte Receptora notifique de inmediato a la Parte Divulgante sobre dicha divulgación obligatoria.
  
  ## 5. Duración de la Obligación de Confidencialidad
  
  - **Período de Confidencialidad:** Las obligaciones de confidencialidad establecidas en este contrato se mantendrán vigentes durante **${duracionConfidencialidad}** años a partir de la fecha de divulgación de la información.
  - **Extensión de la Obligación:** Esta obligación continuará vigente incluso después de la finalización de la relación contractual entre las partes.
  
  ## 6. Medidas de Seguridad
  
  La Parte Receptora se compromete a tomar las siguientes medidas de seguridad para proteger la información confidencial:
  - **Protección Física y Electrónica:** Implementar sistemas de seguridad física y electrónica adecuados para evitar el acceso no autorizado a la información.
  - **Encriptación de Datos Sensibles:** Utilizar tecnologías de encriptación para proteger la información confidencial almacenada o transmitida electrónicamente.
  - **Auditorías de Seguridad:** Realizar auditorías periódicas para garantizar que se mantengan los estándares de seguridad y se prevengan brechas de datos.
  
  ## 7. Consecuencias del Incumplimiento
  
  - **Indemnización por Daños:** La Parte Receptora será responsable de todos los daños directos e indirectos que resulten del uso indebido o divulgación no autorizada de la información confidencial.
  - **Medidas Legales:** La Parte Divulgante tendrá derecho a solicitar medidas cautelares inmediatas, como una orden de restricción temporal para prevenir cualquier uso no autorizado de la información.
  - **Rescisión del Contrato:** En caso de violación grave de las obligaciones de confidencialidad, la Parte Divulgante podrá rescindir este contrato y solicitar la compensación correspondiente.
  
  ## 8. Resolución de Disputas
  
  - **Proceso de Resolución:** ${resolucionDisputas}
  - **Mediación y Arbitraje:** Las partes se comprometen a resolver cualquier conflicto relacionado con este contrato mediante mediación y, si no se alcanza una solución, a través de arbitraje vinculante conforme a las normas legales aplicables.
  - **Jurisdicción y Ley Aplicable:** Este contrato se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 9. Disposiciones Generales
  
  - **Modificaciones al Contrato:** Cualquier cambio o modificación de este contrato deberá hacerse por escrito y estar firmado por ambas partes para que sea válido.
  - **Transferencia de Derechos:** Ninguna de las partes podrá ceder o transferir sus derechos u obligaciones bajo este contrato sin el consentimiento previo por escrito de la otra parte.
  - **Renuncia:** La falta de ejercicio de cualquier derecho bajo este contrato no se considerará una renuncia a dicho derecho.
  
  ## 10. Firmas y Aceptación del Contrato
  
  Al firmar este contrato, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma de la Parte Divulgante:**  
  Nombre: ${nombreParteDivulgante}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  
  **Firma de la Parte Receptora:**  
  Nombre: ${nombreParteReceptora}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  `;
  }
  

export default generateNDAContract;