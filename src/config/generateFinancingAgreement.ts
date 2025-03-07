function generateFinancingAgreement({
    fechaConvenio,
    nombreFinanciador,
    direccionFinanciador,
    nombreBeneficiario,
    direccionBeneficiario,
    montoFinanciacion,
    cronogramaDesembolsos,
    tasaInteres,
    plazoPago,
    garantias,
    obligacionesBeneficiario,
    obligacionesFinanciador,
    medidasSeguridad,
    penalizacionesIncumplimiento,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaConvenio: string;
    nombreFinanciador: string;
    direccionFinanciador: string;
    nombreBeneficiario: string;
    direccionBeneficiario: string;
    montoFinanciacion: string;
    cronogramaDesembolsos: string;
    tasaInteres: string;
    plazoPago: string;
    garantias: string;
    obligacionesBeneficiario: string;
    obligacionesFinanciador: string;
    medidasSeguridad: string;
    penalizacionesIncumplimiento: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Convenio de Financiación Detallado
  
  **Fecha del convenio:** ${fechaConvenio}
  
  **Este convenio de financiación se celebra entre las siguientes partes:**
  
  - **Financiador:** ${nombreFinanciador}, con domicilio en ${direccionFinanciador}.
  - **Beneficiario:** ${nombreBeneficiario}, con domicilio en ${direccionBeneficiario}.
  
  ## 1. Objeto del Convenio
  
  El presente convenio tiene como objetivo formalizar un acuerdo de financiación por un monto total de **${montoFinanciacion}**, estableciendo los términos, condiciones y obligaciones de ambas partes para garantizar el adecuado uso y reembolso de los fondos otorgados.
  
  ## 2. Monto y Desembolsos de Financiación
  
  - **Monto Total de Financiación:** El Financiador se compromete a proporcionar un monto de **${montoFinanciacion}** al Beneficiario, sujeto a los términos y condiciones especificados en este convenio.
  - **Cronograma de Desembolsos:** Los desembolsos se realizarán de acuerdo con el siguiente cronograma:
    - **Fechas de Desembolso:** ${cronogramaDesembolsos}.
    - **Condiciones para el Desembolso:** Cada desembolso estará sujeto al cumplimiento de hitos o condiciones previamente acordadas.
  
  ## 3. Tasa de Interés y Plazo de Pago
  
  - **Tasa de Interés Aplicable:** Se aplicará una tasa de interés del **${tasaInteres}** anual sobre el monto financiado, calculada de acuerdo con las regulaciones financieras locales.
  - **Plazo de Pago:** El Beneficiario deberá reembolsar el monto total, incluidos los intereses, en un plazo de **${plazoPago}**, comenzando a partir de la fecha de desembolso inicial.
  - **Método de Pago:** Los pagos se realizarán mediante transferencia bancaria a la cuenta designada por el Financiador.
  
  ## 4. Garantías y Seguridad de la Financiación
  
  - **Garantías Ofrecidas por el Beneficiario:** ${garantias}, las cuales se utilizarán como respaldo en caso de incumplimiento.
  - **Medidas de Seguridad Financiera:** Implementación de procedimientos de control y monitoreo para asegurar el uso adecuado de los fondos y proteger contra riesgos financieros.
  - **Cumplimiento de Normativas:** Ambas partes se comprometen a cumplir con todas las leyes y regulaciones aplicables para garantizar la integridad del proceso de financiación.
  
  ## 5. Obligaciones de las Partes
  
  ### Obligaciones del Beneficiario
  
  - **Uso Adecuado de los Fondos:** Utilizar los fondos financiados exclusivamente para los fines especificados en este convenio y no desviarlos hacia otros proyectos.
  - **Cumplimiento del Cronograma de Pago:** Realizar los pagos de acuerdo con el cronograma establecido, sin retrasos ni demoras.
  - **Provisión de Información Financiera:** Proporcionar informes periódicos sobre el uso de los fondos y el estado financiero del proyecto.
  
  ### Obligaciones del Financiador
  
  - **Desembolso Puntual de los Fondos:** Realizar los desembolsos conforme al cronograma acordado, siempre que el Beneficiario cumpla con las condiciones estipuladas.
  - **Supervisión y Monitoreo:** Monitorear el uso de los fondos y ofrecer asistencia técnica si es necesario para asegurar el correcto desarrollo del proyecto.
  - **Transparencia en los Términos Financieros:** Informar claramente al Beneficiario sobre cualquier ajuste o cambio en los términos de la financiación.
  
  ## 6. Penalizaciones y Consecuencias del Incumplimiento
  
  - **Penalizaciones por Retraso en el Pago:** En caso de retraso en el pago, se aplicará una penalización del **${penalizacionesIncumplimiento}** sobre el monto adeudado, además de los intereses acumulados.
  - **Ejecución de Garantías:** El Financiador tendrá el derecho de ejecutar las garantías proporcionadas por el Beneficiario en caso de incumplimiento grave.
  - **Acciones Legales:** El Financiador podrá tomar medidas legales para recuperar los fondos adeudados y los costos asociados al proceso.
  
  ## 7. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** Las partes se comprometen a resolver cualquier conflicto mediante mediación y, si no se alcanza una solución, a través de arbitraje vinculante según las leyes de **${jurisdiccion}**.
  - **Jurisdicción y Ley Aplicable:** Este convenio se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 8. Duración y Terminación del Convenio
  
  - **Duración del Convenio:** Este convenio permanecerá en vigor hasta que todas las obligaciones financieras sean cumplidas por ambas partes.
  - **Terminación Anticipada:** El convenio puede ser terminado anticipadamente por mutuo acuerdo o en caso de incumplimiento grave de las condiciones por cualquiera de las partes.
  - **Liquidación de Obligaciones:** Se procederá a la liquidación de todas las obligaciones pendientes en caso de terminación anticipada.
  
  ## 9. Disposiciones Generales
  
  - **Modificaciones al Convenio:** Cualquier modificación o adición a este convenio deberá realizarse por escrito y ser firmada por ambas partes.
  - **Confidencialidad:** Ambas partes se comprometen a mantener la confidencialidad de los términos y detalles del convenio.
  - **Fuerza Mayor:** Ninguna de las partes será responsable por incumplimientos debido a eventos fuera de su control, como desastres naturales o cambios legislativos.
  
  ## 10. Firmas y Aceptación del Convenio
  
  Al firmar este convenio, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Financiador:**  
  Nombre: ${nombreFinanciador}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  
  **Firma del Beneficiario:**  
  Nombre: ${nombreBeneficiario}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  `;
}

export default generateFinancingAgreement;
