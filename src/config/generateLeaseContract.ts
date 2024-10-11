function generateLeaseContract({
    fechaContrato,
    nombreArrendador,
    direccionArrendador,
    nombreArrendatario,
    direccionArrendatario,
    direccionPropiedad,
    descripcionPropiedad,
    duracionContrato,
    fechaInicio,
    rentaMensual,
    depositoGarantia,
    metodoPago,
    obligacionesArrendador,
    obligacionesArrendatario,
    reglasPropiedad,
    renovacionAutomatica,
    terminacionAnticipada,
    penalizaciones,
    jurisdiccion,
    ciudadFirma,
}: {
    fechaContrato: string;
    nombreArrendador: string;
    direccionArrendador: string;
    nombreArrendatario: string;
    direccionArrendatario: string;
    direccionPropiedad: string;
    descripcionPropiedad: string;
    duracionContrato: string;
    fechaInicio: string;
    rentaMensual: string;
    depositoGarantia: string;
    metodoPago: string;
    obligacionesArrendador: string;
    obligacionesArrendatario: string;
    reglasPropiedad: string;
    renovacionAutomatica: boolean;
    terminacionAnticipada: string;
    penalizaciones: string;
    jurisdiccion: string;
    ciudadFirma: string;
}): string {
    return `
  # Contrato de Arrendamiento Detallado
  
  **Fecha del contrato:** ${fechaContrato}
  
  **Este contrato de arrendamiento se celebra entre las siguientes partes:**
  
  - **Arrendador:** ${nombreArrendador}, con domicilio en ${direccionArrendador}.
  - **Arrendatario:** ${nombreArrendatario}, con domicilio en ${direccionArrendatario}.
  
  ## 1. Objeto del Contrato
  
  El presente contrato tiene como objeto el arrendamiento de la propiedad ubicada en **${direccionPropiedad}**, descrita como **${descripcionPropiedad}**. El arrendamiento se regirá bajo los términos y condiciones establecidos en este documento.
  
  ## 2. Duración del Contrato y Renovación
  
  - **Duración Inicial:** El arrendamiento tendrá una duración de **${duracionContrato}**, comenzando el **${fechaInicio}** y finalizando automáticamente salvo previo aviso.
  - **Renovación Automática:** ${renovacionAutomatica ? "El contrato se renovará automáticamente por un período similar si ninguna de las partes notifica su intención de no renovar con al menos 30 días de anticipación." : "Este contrato no contempla renovación automática; debe ser renegociado al finalizar el término actual."}
  
  ## 3. Renta y Depósito de Garantía
  
  - **Renta Mensual:** El Arrendatario se compromete a pagar una renta mensual de **${rentaMensual}**, pagadera mediante **${metodoPago}** antes del día **5** de cada mes.
  - **Depósito de Garantía:** Se requiere un depósito de garantía de **${depositoGarantia}**, que se utilizará para cubrir posibles daños a la propiedad o incumplimientos en los pagos.
  - **Ajuste de Renta:** El Arrendador puede revisar el monto de la renta anualmente, basándose en el índice de inflación o en las condiciones del mercado.
  
  ## 4. Obligaciones del Arrendador
  
  El Arrendador se compromete a:
  - **Mantenimiento Estructural:** Realizar las reparaciones necesarias para mantener la estructura y las instalaciones esenciales de la propiedad en condiciones adecuadas.
  - **Servicios y Suministros:** Asegurar el suministro continuo de servicios públicos básicos como agua y electricidad, salvo cuando el corte de estos servicios sea causado por el Arrendatario.
  - **Entrega de la Propiedad:** Entregar la propiedad en perfectas condiciones para su uso al inicio del arrendamiento.
  - **${obligacionesArrendador}**
  
  ## 5. Obligaciones del Arrendatario
  
  El Arrendatario se compromete a:
  - **Uso Adecuado de la Propiedad:** Utilizar la propiedad exclusivamente para fines residenciales y no realizar actividades ilícitas o comerciales sin el consentimiento del Arrendador.
  - **Mantenimiento Interno:** Mantener el interior de la propiedad limpio y en buen estado, incluyendo la realización de pequeñas reparaciones causadas por su uso normal.
  - **Pago Puntual de la Renta:** Realizar el pago de la renta a tiempo y asumir las penalizaciones aplicables en caso de retrasos.
  - **${obligacionesArrendatario}**
  
  ## 6. Reglas de la Propiedad
  
  El Arrendatario acepta las siguientes reglas y restricciones mientras ocupa la propiedad:
  - **Mascotas:** ${reglasPropiedad.includes('mascotas') ? "Se permite la tenencia de mascotas bajo ciertas condiciones previamente acordadas." : "No se permite la tenencia de mascotas en la propiedad."}
  - **Modificaciones:** No se permiten modificaciones o cambios en la estructura de la propiedad sin el consentimiento escrito del Arrendador.
  - **Uso del Espacio Común:** Se espera que el Arrendatario respete las normas y regulaciones establecidas para las áreas comunes, si las hubiera.
  
  ## 7. Terminación y Resolución del Contrato
  
  - **Terminación Anticipada:** ${terminacionAnticipada}
  - **Desalojo:** En caso de incumplimiento grave por parte del Arrendatario, el Arrendador podrá proceder con el desalojo siguiendo el proceso legal correspondiente.
  - **Notificación de Terminación:** Cualquiera de las partes puede terminar el contrato dando un preaviso de **30 días** antes de la fecha efectiva de terminación.
  
  ## 8. Penalizaciones y Multas
  
  En caso de incumplimiento por parte del Arrendatario:
  - **Penalización por Retraso en el Pago:** ${penalizaciones}
  - **Daños a la Propiedad:** El Arrendatario será responsable de todos los daños causados a la propiedad, más allá del desgaste normal, y deberá cubrir los costos de reparación.
  
  ## 9. Resolución de Disputas
  
  Cualquier disputa derivada de este contrato será tratada conforme a las siguientes disposiciones:
  - **Mediación y Negociación:** Las partes intentarán resolver de forma amistosa cualquier conflicto relacionado con el contrato.
  - **Arbitraje:** Si no se llega a una resolución mediante mediación, las partes se someterán a arbitraje según las normas legales aplicables.
  - **Jurisdicción y Ley Aplicable:** Este contrato se regirá por las leyes de **${jurisdiccion}** y cualquier conflicto será resuelto en los tribunales de **${ciudadFirma}**.
  
  ## 10. Firmas y Aceptación
  
  Al firmar este contrato, ambas partes reconocen y aceptan todos los términos y condiciones establecidos.
  
  **Firma del Arrendador:**  
  Nombre: ${nombreArrendador}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  
  **Firma del Arrendatario:**  
  Nombre: ${nombreArrendatario}  
  Fecha: ${fechaContrato}  
  Firma: ___________________________
  `;
}


export default generateLeaseContract;