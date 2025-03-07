function generateDistributionAgreement({
    fechaConvenio,
    nombreDistribuidor,
    direccionDistribuidor,
    nombreProveedor,
    direccionProveedor,
    productosDistribuidos,
    territorioExclusivo,
    condicionesEntrega,
    metodoPago,
    preciosProductos,
    obligacionesDistribuidor,
    obligacionesProveedor,
    derechosPropiedadMarca,
    duracionConvenio,
    terminacionConvenio,
    resolucionDisputas,
    confidencialidad,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaConvenio: string;
    nombreDistribuidor: string;
    direccionDistribuidor: string;
    nombreProveedor: string;
    direccionProveedor: string;
    productosDistribuidos: string;
    territorioExclusivo: string;
    condicionesEntrega: string;
    metodoPago: string;
    preciosProductos: string;
    obligacionesDistribuidor: string;
    obligacionesProveedor: string;
    derechosPropiedadMarca: string;
    duracionConvenio: string;
    terminacionConvenio: string;
    resolucionDisputas: string;
    confidencialidad: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Convenio de Distribución Detallado
  
  **Fecha del convenio:** ${fechaConvenio}
  
  **Este convenio de distribución se celebra entre las siguientes partes:**
  
  - **Distribuidor:** ${nombreDistribuidor}, con domicilio en ${direccionDistribuidor}.
  - **Proveedor:** ${nombreProveedor}, con domicilio en ${direccionProveedor}.
  
  ## 1. Objeto del Convenio
  
  El presente convenio tiene como objetivo formalizar un acuerdo de distribución para la venta y comercialización de **${productosDistribuidos}** por parte del Distribuidor en el territorio designado, estableciendo los términos, condiciones y obligaciones de ambas partes.
  
  ## 2. Territorio Exclusivo y Áreas de Distribución
  
  - **Territorio Exclusivo:** El Distribuidor tendrá derechos exclusivos para distribuir los productos en **${territorioExclusivo}**, sin competencia directa del Proveedor ni de otros distribuidores dentro del área designada.
  - **Restricciones de Expansión:** Cualquier expansión fuera del territorio definido requerirá el consentimiento por escrito del Proveedor.
  
  ## 3. Condiciones de Entrega y Pago
  
  - **Condiciones de Entrega:** ${condicionesEntrega}, incluyendo detalles sobre el tiempo estimado de entrega, métodos de transporte y responsabilidades de cada parte.
  - **Método de Pago:** El Distribuidor realizará los pagos mediante **${metodoPago}** de acuerdo con los términos establecidos.
  - **Precios de los Productos:** Los precios de los productos serán definidos por el Proveedor y podrán estar sujetos a cambios con notificación previa de **30 días** al Distribuidor.
  
  ## 4. Obligaciones del Distribuidor
  
  El Distribuidor se compromete a:
  - **Promoción y Venta de Productos:** Promocionar activamente los productos en el territorio asignado y mantener un stock adecuado para satisfacer la demanda.
  - **Cumplimiento de las Normas de Marca:** Usar los materiales promocionales y la marca del Proveedor de acuerdo con las directrices proporcionadas.
  - **Informe de Ventas y Mercadeo:** Proporcionar informes periódicos detallados sobre las ventas, inventario y estrategias de mercado para la optimización continua.
  - **${obligacionesDistribuidor}**
  
  ## 5. Obligaciones del Proveedor
  
  El Proveedor se compromete a:
  - **Suministro Constante de Productos:** Proveer productos de calidad al Distribuidor según la demanda acordada y en conformidad con los plazos de entrega.
  - **Apoyo Técnico y Comercial:** Brindar capacitación y soporte al Distribuidor en cuanto a las características del producto y técnicas de venta efectivas.
  - **Actualización de Precios y Políticas:** Mantener informado al Distribuidor sobre cualquier cambio en los precios o políticas de venta que puedan afectar la distribución.
  - **${obligacionesProveedor}**
  
  ## 6. Derechos sobre la Propiedad y la Marca
  
  - **Uso de la Marca:** El Distribuidor tendrá derecho a utilizar la marca, logotipos y materiales promocionales del Proveedor únicamente para los fines de comercialización de los productos distribuidos.
  - **Propiedad de la Marca:** La propiedad de la marca y los derechos de autor relacionados permanecerán en todo momento con el Proveedor.
  - **Protección de la Propiedad Intelectual:** El Distribuidor se compromete a no registrar ni intentar registrar la marca o cualquier variación de la misma en su nombre.
  
  ## 7. Duración y Terminación del Convenio
  
  - **Duración del Convenio:** Este convenio tendrá una duración de **${duracionConvenio}**, con opción de renovación si ambas partes así lo acuerdan.
  - **Condiciones de Terminación:** ${terminacionConvenio}.
  - **Liquidación de Obligaciones:** En caso de terminación, ambas partes se comprometen a cumplir con todas las obligaciones pendientes, incluidas las órdenes de entrega y pagos correspondientes.
  
  ## 8. Resolución de Disputas
  
  - **Procedimiento de Resolución:** ${resolucionDisputas}.
  - **Mediación y Arbitraje:** Las partes se comprometen a resolver cualquier conflicto mediante mediación y, si no se alcanza una solución, a través de arbitraje conforme a las leyes de **${jurisdiccion}**.
  - **Jurisdicción y Ley Aplicable:** Este convenio se regirá por las leyes de **${jurisdiccion}** y cualquier disputa será resuelta en los tribunales de **${ciudadFirma}**.
  
  ## 9. Confidencialidad
  
  - **Protección de Información Confidencial:** Ambas partes se comprometen a mantener la confidencialidad de la información comercial y estratégica compartida en relación con este convenio.
  - **Duración de la Confidencialidad:** La obligación de confidencialidad se mantendrá vigente durante **${confidencialidad}** años después de la finalización del convenio.
  
  ## 10. Disposiciones Generales
  
  - **Modificaciones al Convenio:** Cualquier cambio o modificación al convenio deberá hacerse por escrito y ser firmado por ambas partes.
  - **Transferencia de Derechos:** Ninguna de las partes podrá ceder sus derechos u obligaciones bajo este convenio sin el consentimiento previo y por escrito de la otra parte.
  - **Fuerza Mayor:** Ninguna de las partes será responsable por incumplimientos debido a eventos fuera de su control, como desastres naturales o situaciones de emergencia.
  
  ## 11. Firmas y Aceptación del Convenio
  
  Al firmar este convenio, ambas partes confirman que han leído, comprendido y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Distribuidor:**  
  Nombre: ${nombreDistribuidor}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  
  **Firma del Proveedor:**  
  Nombre: ${nombreProveedor}  
  Fecha: ${fechaConvenio}  
  Firma: ___________________________
  `;
}

export default generateDistributionAgreement;
