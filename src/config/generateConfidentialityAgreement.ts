function generateConfidentialityAgreement({
    fechaConvenio,
    nombreParteDivulgante,
    direccionParteDivulgante,
    nombreParteReceptora,
    direccionParteReceptora,
    definicionInformacionConfidencial,
    obligacionesParteReceptora,
    excepcionesConfidencialidad,
    duracionConfidencialidad,
    medidasSeguridad,
    consecuenciasIncumplimiento,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
  }: {
    fechaConvenio: string;
    nombreParteDivulgante: string;
    direccionParteDivulgante: string;
    nombreParteReceptora: string;
    direccionParteReceptora: string;
    definicionInformacionConfidencial: string;
    obligacionesParteReceptora: string;
    excepcionesConfidencialidad: string;
    duracionConfidencialidad: string;
    medidasSeguridad: string;
    consecuenciasIncumplimiento: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
  }): string {
    return `
  # Convenio de Confidencialidad Detallado
  
  **Fecha del convenio:** ${fechaConvenio}
  
  **Este convenio de confidencialidad se celebra entre las siguientes partes:**
  
  - **Parte Divulgante:** ${nombreParteDivulgante}, con domicilio en ${direccionParteDivulgante}.
  - **Parte Receptora:** ${nombreParteReceptora}, con domicilio en ${direccionParteReceptora}.
  
  ## 1. Objeto del Convenio
  
  El presente convenio tiene como objetivo proteger la información confidencial divulgada entre las partes con fines específicos, asegurando que dicha información no sea utilizada de manera inapropiada ni divulgada a terceros sin autorización previa.
  
  ## 2. Definición de Información Confidencial
  
  - **Información Confidencial Incluida:** ${definicionInformacionConfidencial}.
  - **Alcance de la Información Protegida:** Toda la información técnica, comercial, estratégica, datos financieros, procedimientos, y cualquier otro material relacionado con la Parte Divulgante, ya sea en formato escrito, oral, visual, electrónico o de otro tipo, se considerará información confidencial.
  
  ## 3. Obligaciones de la Parte Receptora
  
  La Parte Receptora se compromete a:
  - **No Divulgar Información:** Mantener la confidencialidad absoluta de la información recibida y no divulgarla a terceros sin el consentimiento expreso por escrito de la Parte Divulgante.
  - **Uso Limitado:** Utilizar la información confidencial únicamente para los fines establecidos en este convenio y no para beneficios personales o comerciales no autorizados.
  - **Control de Acceso:** Implementar controles estrictos para limitar el acceso a la información confidencial solo a empleados o colaboradores que necesiten conocerla para cumplir con el propósito del convenio.
  - **${obligacionesParteReceptora}**
  
  ## 4. Excepciones a la Confidencialidad
  
  La obligación de confidencialidad no se aplicará a la información que:
  - **Sea de dominio público:** Información que ya era de conocimiento público al momento de la divulgación o se convierte en pública sin violar este convenio.
  - **Esté legalmente en posesión de la Parte Receptora:** Antes de ser recibida por la Parte Divulgante y sin una obligación de confidencialidad.
  - **Sea divulgada bajo mandato legal:** Información que debe ser revelada por orden judicial, reglamento gubernamental o una ley aplicable, siempre que la Parte Receptora notifique de inmediato a la Parte Divulgante sobre dicha obligación.
  
  ## 5. Duración de la Obligación de Confidencialidad
  
  - **Vigencia de la Obligación:** Las obligaciones de confidencialidad establecidas en este convenio permanecerán vigentes durante **${duracionConfidencialidad}** años a partir de la fecha de firma del convenio o hasta la finalización del propósito de la colaboración.
  - **Continuidad de la Obligación:** Incluso después de la terminación de este convenio, la Parte Receptora seguirá obligada a proteger la información confidencial divulgada.
  
  ## 6. Medidas de Seguridad
  
  La Parte Receptora se compromete a implementar las siguientes medidas de seguridad:
  - **Encriptación de Datos:** Uso de tecnologías de encriptación para proteger la información confidencial almacenada y transmitida electrónicamente.
  - **Protocolos de Seguridad Física:** Restringir el acceso físico a la información confidencial almacenada en instalaciones controladas y seguras.
  - **Evaluaciones y Auditorías Periódicas:** Realización de auditorías regulares para evaluar la eficacia de las medidas de seguridad implementadas y prevenir brechas de datos.
  
  ## 7. Consecuencias del Incumplimiento
  
  - **Indemnización por Daños:** La Parte Receptora será responsable de todos los daños directos, indirectos y consecuentes derivados del uso no autorizado o divulgación indebida de la información confidencial.
  - **Medidas Legales:** La Parte Divulgante tendrá derecho a buscar medidas cautelares inmediatas, como órdenes judiciales para prevenir la divulgación no autorizada de la información.
  - **Terminación del Convenio:** En caso de incumplimiento grave de las obligaciones de confidencialidad, la Parte Divulgante podrá rescindir este convenio con notificación inmediata a la Parte Receptora.
  - **${consecuenciasIncumplimiento}**
  
  ## 8. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** Las partes se comprometen a resolver cualquier disputa relacionada con este convenio mediante mediación y, si no se alcanza una solución, a través de arbitraje vinculante conforme a las leyes aplicables.
  - **Jurisdicción y Ley Aplicable:** Este convenio se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 9. Disposiciones Generales
  
  - **Modificaciones al Convenio:** Cualquier modificación o adición a este convenio deberá realizarse por escrito y ser firmada por ambas partes para que sea válida.
  - **Transferencia de Derechos:** Ninguna de las partes podrá ceder o transferir sus derechos u obligaciones bajo este convenio sin el consentimiento previo por escrito de la otra parte.
  - **Renuncia:** El no ejercicio de cualquier derecho bajo este convenio no se considerará una renuncia a dicho derecho.
  
  ## 10. Firmas y Aceptación del Convenio
  
  Al firmar este convenio, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma de la Parte Divulgante:**  
  Nombre: ${nombreParteDivulgante}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  
  **Firma de la Parte Receptora:**  
  Nombre: ${nombreParteReceptora}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  `;
  }
  

export default generateConfidentialityAgreement;