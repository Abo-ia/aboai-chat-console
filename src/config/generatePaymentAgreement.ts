function generatePaymentAgreement({
    fechaConvenio,
    nombreDeudor,
    direccionDeudor,
    nombreAcreedor,
    direccionAcreedor,
    montoTotal,
    cronogramaPagos,
    metodoPago,
    interesesMoratorios,
    garantias,
    obligacionesDeudor,
    obligacionesAcreedor,
    medidasSeguridad,
    penalizacionesIncumplimiento,
    resolucionDisputas,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaConvenio: string;
    nombreDeudor: string;
    direccionDeudor: string;
    nombreAcreedor: string;
    direccionAcreedor: string;
    montoTotal: string;
    cronogramaPagos: string;
    metodoPago: string;
    interesesMoratorios: string;
    garantias: string;
    obligacionesDeudor: string;
    obligacionesAcreedor: string;
    medidasSeguridad: string;
    penalizacionesIncumplimiento: string;
    resolucionDisputas: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Convenio de Pago Detallado
  
  **Fecha del convenio:** ${fechaConvenio}
  
  **Este convenio de pago se celebra entre las siguientes partes:**
  
  - **Deudor:** ${nombreDeudor}, con domicilio en ${direccionDeudor}.
  - **Acreedor:** ${nombreAcreedor}, con domicilio en ${direccionAcreedor}.
  
  ## 1. Objeto del Convenio
  
  El presente convenio tiene como objetivo formalizar el acuerdo de pago entre el Deudor y el Acreedor para el monto total de **${montoTotal}**, estableciendo los términos, condiciones y plazos para su cumplimiento.
  
  ## 2. Monto Total y Cronograma de Pagos
  
  - **Monto Total Adeudado:** El Deudor se compromete a pagar la cantidad total de **${montoTotal}** al Acreedor.
  - **Cronograma de Pagos:** El pago se realizará según el siguiente cronograma:
    - **Fechas de Pago:** ${cronogramaPagos}.
    - **Método de Pago:** Los pagos se efectuarán mediante **${metodoPago}**, utilizando una cuenta bancaria designada por el Acreedor.
  
  ## 3. Intereses y Penalizaciones por Morosidad
  
  - **Intereses Moratorios:** En caso de incumplimiento en las fechas de pago acordadas, se aplicará un interés moratorio del **${interesesMoratorios}** sobre el monto adeudado.
  - **Penalizaciones:** Se establecerá una penalización adicional de **${penalizacionesIncumplimiento}** por cada semana de retraso en el pago.
  
  ## 4. Garantías y Seguridad del Pago
  
  - **Garantías Ofrecidas:** ${garantias}.
  - **Medidas de Seguridad:** Implementar medidas de seguridad como la verificación de la identidad del Deudor y la autenticación de transacciones para garantizar la legitimidad de los pagos.
  - **Cumplimiento de Obligaciones:** Tanto el Deudor como el Acreedor se comprometen a cumplir con todas las regulaciones y políticas de seguridad financiera para prevenir fraudes y proteger la información sensible.
  
  ## 5. Obligaciones de las Partes
  
  ### Obligaciones del Deudor
  
  - **Cumplimiento del Cronograma de Pagos:** Realizar todos los pagos de acuerdo con el cronograma establecido sin retrasos ni excepciones.
  - **Notificación de Problemas Financieros:** Informar de inmediato al Acreedor sobre cualquier dificultad financiera que pueda afectar el cumplimiento del acuerdo.
  - **Provisión de Garantías:** Mantener las garantías ofrecidas en condiciones adecuadas hasta el pago total de la deuda.
  
  ### Obligaciones del Acreedor
  
  - **Confirmación de Recepción de Pagos:** Proporcionar al Deudor un recibo detallado y confirmar la recepción de cada pago realizado.
  - **Actualización del Balance de la Deuda:** Mantener al Deudor informado sobre el estado actual del saldo pendiente después de cada pago realizado.
  - **Soporte y Asistencia:** Brindar soporte al Deudor en caso de problemas técnicos o dudas relacionadas con las transacciones de pago.
  
  ## 6. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** En caso de disputa, las partes se comprometen a resolver cualquier conflicto mediante mediación y, si no se alcanza una solución, a través de arbitraje vinculante conforme a las leyes aplicables.
  - **Jurisdicción y Ley Aplicable:** Este convenio se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 7. Consecuencias del Incumplimiento
  
  - **Acciones Legales:** En caso de incumplimiento grave del Deudor, el Acreedor tendrá derecho a tomar las medidas legales necesarias para recuperar el monto adeudado más los intereses y penalizaciones aplicables.
  - **Ejecución de Garantías:** El Acreedor podrá proceder con la ejecución de las garantías ofrecidas en caso de que el Deudor no cumpla con sus obligaciones de pago.
  
  ## 8. Modificaciones y Terminación del Convenio
  
  - **Modificaciones al Convenio:** Cualquier cambio o modificación a este convenio deberá realizarse por escrito y estar firmado por ambas partes.
  - **Terminación del Convenio:** Este convenio será considerado terminado una vez que el Deudor haya cumplido con todas las obligaciones de pago estipuladas.
  
  ## 9. Disposiciones Generales
  
  - **Confidencialidad:** Ambas partes se comprometen a mantener la confidencialidad de los términos de este convenio y de la información financiera proporcionada.
  - **Transferencia de Derechos:** Ninguna parte podrá ceder sus derechos u obligaciones bajo este convenio sin el consentimiento previo y por escrito de la otra parte.
  - **Fuerza Mayor:** Ninguna de las partes será responsable por incumplimientos debido a eventos fuera de su control, como desastres naturales, conflictos bélicos, o cambios legislativos.
  
  ## 10. Firmas y Aceptación del Convenio
  
  Al firmar este convenio, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Deudor:**  
  Nombre: ${nombreDeudor}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  
  **Firma del Acreedor:**  
  Nombre: ${nombreAcreedor}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  `;
}

export default generatePaymentAgreement;
