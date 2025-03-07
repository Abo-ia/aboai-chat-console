function generateSaleContract({
    fechaContrato,
    nombreVendedor,
    direccionVendedor,
    nombreComprador,
    direccionComprador,
    descripcionBien,
    estadoBien,
    precioVenta,
    metodoPago,
    fechaEntrega,
    lugarEntrega,
    obligacionesVendedor,
    obligacionesComprador,
    garantia,
    penalizaciones,
    condicionesIncumplimiento,
    transferenciaPropiedad,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaContrato: string;
    nombreVendedor: string;
    direccionVendedor: string;
    nombreComprador: string;
    direccionComprador: string;
    descripcionBien: string;
    estadoBien: string;
    precioVenta: string;
    metodoPago: string;
    fechaEntrega: string;
    lugarEntrega: string;
    obligacionesVendedor: string;
    obligacionesComprador: string;
    garantia: string;
    penalizaciones: string;
    condicionesIncumplimiento: string;
    transferenciaPropiedad: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Contrato de Compraventa Detallado
  
  **Fecha del contrato:** ${fechaContrato}
  
  **Este contrato de compraventa se celebra entre las siguientes partes:**
  
  - **Vendedor:** ${nombreVendedor}, con domicilio en ${direccionVendedor}.
  - **Comprador:** ${nombreComprador}, con domicilio en ${direccionComprador}.
  
  ## 1. Objeto del Contrato
  
  El presente contrato tiene como objeto la compraventa de **${descripcionBien}**, el cual se encuentra en **${estadoBien}**. Las condiciones de la venta y los términos se detallan a continuación.
  
  ## 2. Precio de Venta y Condiciones de Pago
  
  - **Precio de Venta:** El precio total del bien objeto de este contrato es de **${precioVenta}**.
  - **Método de Pago:** El Comprador realizará el pago mediante **${metodoPago}**, según lo acordado entre ambas partes.
  - **Condiciones de Pago:** El pago se deberá efectuar de manera íntegra antes de la entrega del bien, salvo que se acuerde una modalidad de pagos parciales que serán documentados por separado.
  - **Confirmación del Pago:** Una vez realizado el pago completo, el Vendedor proporcionará un recibo detallando el monto recibido y las condiciones acordadas.
  
  ## 3. Entrega del Bien
  
  - **Fecha de Entrega:** El bien será entregado el **${fechaEntrega}** en **${lugarEntrega}**.
  - **Condiciones de Entrega:** La entrega se realizará en condiciones adecuadas para el transporte y en conformidad con las especificaciones del bien acordadas.
  - **Transferencia de Riesgo:** El riesgo asociado con el bien se transferirá al Comprador en el momento de la entrega.
  
  ## 4. Obligaciones del Vendedor
  
  El Vendedor se compromete a:
  - **Garantizar la autenticidad y titularidad del bien:** El bien vendido es de propiedad legítima del Vendedor y está libre de cualquier gravamen o carga.
  - **Cumplir con la entrega del bien en la fecha acordada:** Respetar el plazo de entrega y asegurarse de que el bien se encuentra en las condiciones descritas.
  - **Proporcionar documentación de respaldo:** Suministrar todos los documentos necesarios para la transferencia de propiedad y legalización del bien.
  - **${obligacionesVendedor}**
  
  ## 5. Obligaciones del Comprador
  
  El Comprador se compromete a:
  - **Realizar el pago puntual del precio de venta:** Cumplir con los términos de pago según lo estipulado en el contrato.
  - **Verificar el estado del bien al momento de la entrega:** Aceptar el bien solo si cumple con las especificaciones y condiciones acordadas.
  - **Cumplir con las disposiciones de uso:** Respetar cualquier restricción o condición de uso que el Vendedor pueda haber especificado.
  - **${obligacionesComprador}**
  
  ## 6. Garantía y Condiciones
  
  - **Duración de la Garantía:** El bien vendido está cubierto por una garantía de **${garantia}** a partir de la fecha de entrega.
  - **Cobertura de la Garantía:** La garantía cubrirá defectos de fabricación y fallos operativos que no sean resultado del uso indebido o negligencia por parte del Comprador.
  - **Exclusiones de la Garantía:** No se aplicará la garantía en casos de desgaste normal, daños accidentales o manipulación incorrecta del bien.
  
  ## 7. Transferencia de Propiedad
  
  - **Transferencia Formal:** La propiedad del bien será transferida al Comprador una vez se haya efectuado el pago completo y cumplido con todas las condiciones contractuales.
  - **Registro Legal:** El Vendedor proporcionará toda la documentación necesaria para la formalización y registro del bien a nombre del Comprador en las entidades correspondientes.
  - **${transferenciaPropiedad}**
  
  ## 8. Incumplimiento y Penalizaciones
  
  - **Condiciones de Incumplimiento:** ${condicionesIncumplimiento}
  - **Penalizaciones por Incumplimiento:** En caso de incumplimiento de cualquiera de las partes, se aplicará una penalización de **${penalizaciones}**, además de otras acciones legales que puedan ser procedentes.
  - **Resolución en Caso de Incumplimiento:** Ambas partes se comprometen a intentar resolver cualquier incumplimiento de buena fe antes de tomar medidas legales.
  
  ## 9. Resolución de Disputas
  
  - **Mediación:** Las partes intentarán resolver de manera amistosa cualquier conflicto relacionado con este contrato a través de la mediación.
  - **Arbitraje:** Si no se resuelve la disputa mediante mediación, las partes aceptan someterse a arbitraje bajo las leyes de **${jurisdiccion}**.
  - **Jurisdicción Legal:** Cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**, conforme a la legislación aplicable.
  
  ## 10. Firmas y Aceptación del Contrato
  
  Al firmar este contrato, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Vendedor:**  
  Nombre: ${nombreVendedor}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  
  **Firma del Comprador:**  
  Nombre: ${nombreComprador}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  `;
}

export default generateSaleContract;
