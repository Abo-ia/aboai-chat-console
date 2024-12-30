import React, { useState } from 'react';
import { createComplaint } from '@src/services/complaint.service';

const ComplaintsForm: React.FC = () => {
    const [formData, setFormData] = useState({
        // Información del Denunciante
        nombreDenunciante: 'Juan Pérez López',
        fechaNacimientoDenunciante: '1985-05-12',
        genero: 'Masculino',
        curp: 'PELJ850512HDFRZN08',
        direccionDenunciante: 'Calle Falsa 123, Colonia Centro, Ciudad de México, CP 06000',
        telefonoDenunciante: '5551234567',
        correoDenunciante: 'juan.perez@example.com',
        relacionDenunciado: 'Empleado',

        // Información del Representante Legal
        nombreAbogado: 'María Gómez Herrera',
        cedulaAbogado: '12345678',
        despacho: 'Gómez & Asociados',
        telefonoAbogado: '5559876543',
        correoAbogado: 'maria.gomez@lawfirm.com',

        // Detalles del Denunciado
        nombreDenunciado: 'Carlos López Martínez',
        aliasDenunciado: 'El Tigre',
        fechaNacimientoDenunciado: '1980-03-20',
        identificacionDenunciado: 'LOMC800320HMCRLN09',
        direccionDenunciado: 'Av. Siempre Viva 742, Colonia Industrial, Guadalajara, Jalisco, CP 44100',
        telefonoDenunciado: '3312345678',
        correoDenunciado: 'carlos.lopez@example.com',
        relacionDenunciante: 'Supervisor',

        // Descripción de los Hechos
        fechaIncidente: '2024-12-25',
        horaIncidente: '14:30',
        lugarIncidente: 'Oficina principal, Piso 3, Edificio Reforma',
        descripcionHechos: 'El denunciado, Carlos López Martínez, realizó acciones de hostigamiento verbal y físico hacia el denunciante, Juan Pérez López, en el lugar de trabajo. Estos eventos se registraron en presencia de varios testigos. El incidente incluyó amenazas directas que generaron un ambiente de intimidación.'
    });


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
    const [submissionResult, setSubmissionResult] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmissionStatus(null);
        setSubmissionResult(null);

        try {
            const response = await createComplaint(formData);
            setSubmissionStatus('success');
            setSubmissionResult(response);
            setIsModalOpen(true);
            console.log('Complaint created successfully:', response);
        } catch (error) {
            console.error('Error creating complaint:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formatTextWithLineBreaks = (text: string) => {
        return text
            .split('\n\n') // Primero manejamos doble salto de línea
            .map((paragraph, index) =>
                paragraph
                    .split('\n') // Luego manejamos los saltos de línea simples
                    .map((line, lineIndex) => (
                        <span key={`${index}-${lineIndex}`}>
                            {line}
                            <br />
                        </span>
                    ))
            )
            .map((lines, paragraphIndex) => (
                <p key={`paragraph-${paragraphIndex}`} className="mb-4">
                    {lines}
                </p>
            ));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Formulario para la Generación de Denuncias</h1>

            <div className='h-[70vh] overflow-y-scroll'>
                {/* Información del Denunciante */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">1. Información del Denunciante</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-gray-700">Nombre Completo del Denunciante</span>
                            <input type="text" name="nombreDenunciante" value={formData.nombreDenunciante} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Fecha de Nacimiento</span>
                            <input type="date" name="fechaNacimientoDenunciante" value={formData.fechaNacimientoDenunciante} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Género</span>
                            <select name="genero" value={formData.genero} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-gray-700">CURP / Identificación Nacional</span>
                            <input type="text" name="curp" value={formData.curp} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Dirección Completa</span>
                            <input type="text" name="direccionDenunciante" value={formData.direccionDenunciante} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Teléfono de Contacto</span>
                            <input type="tel" name="telefonoDenunciante" value={formData.telefonoDenunciante} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Correo Electrónico</span>
                            <input type="email" name="correoDenunciante" value={formData.correoDenunciante} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Relación con el Denunciado</span>
                            <input type="text" name="relacionDenunciado" value={formData.relacionDenunciado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                    </div>
                </section>

                {/* Información del Representante Legal */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">2. Información del Representante Legal</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-gray-700">Nombre Completo del Abogado</span>
                            <input type="text" name="nombreAbogado" value={formData.nombreAbogado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Número de Cédula Profesional</span>
                            <input type="text" name="cedulaAbogado" value={formData.cedulaAbogado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Despacho / Firma de Abogados</span>
                            <input type="text" name="despacho" value={formData.despacho} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Teléfono de Contacto</span>
                            <input type="tel" name="telefonoAbogado" value={formData.telefonoAbogado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Correo Electrónico</span>
                            <input type="email" name="correoAbogado" value={formData.correoAbogado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                    </div>
                </section>

                {/* Detalles del Denunciado */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">3. Detalles del Denunciado</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-gray-700">Nombre Completo del Denunciado o Entidad</span>
                            <input type="text" name="nombreDenunciado" value={formData.nombreDenunciado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Alias o Apodo (si aplica)</span>
                            <input type="text" name="aliasDenunciado" value={formData.aliasDenunciado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Fecha de Nacimiento</span>
                            <input type="date" name="fechaNacimientoDenunciado" value={formData.fechaNacimientoDenunciado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Identificación (CURP, RFC, etc.)</span>
                            <input type="text" name="identificacionDenunciado" value={formData.identificacionDenunciado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Dirección Completa</span>
                            <input type="text" name="direccionDenunciado" value={formData.direccionDenunciado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Teléfono de Contacto</span>
                            <input type="tel" name="telefonoDenunciado" value={formData.telefonoDenunciado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Correo Electrónico</span>
                            <input type="email" name="correoDenunciado" value={formData.correoDenunciado} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Relación con el Denunciante</span>
                            <input type="text" name="relacionDenunciante" value={formData.relacionDenunciante} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                    </div>
                </section>

                {/* Descripción de los Hechos */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">4. Descripción de los Hechos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-gray-700">Fecha del Incidente</span>
                            <input type="date" name="fechaIncidente" value={formData.fechaIncidente} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Hora del Incidente</span>
                            <input type="time" name="horaIncidente" value={formData.horaIncidente} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Lugar del Incidente</span>
                            <input type="text" name="lugarIncidente" value={formData.lugarIncidente} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Descripción de los Hechos</span>
                            <textarea name="descripcionHechos" value={formData.descripcionHechos} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows={10}></textarea>
                        </label>
                    </div>
                </section>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleSubmit}
                        className={`bg-custom-base text-white px-4 py-2 rounded-md shadow-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Generar Denuncia'}
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full h-[70vh] overflow-y-auto">
                        <h2 className="text-lg font-bold mb-4 text-center">Descripción de los Hechos</h2>
                        <p className="mb-4 text-gray-700 text-center">
                            Esta funcionalidad ayuda a desarrollar la sección "Descripción de los Hechos" generada con base en los datos recabados. Asegúrate de revisar y confirmar que la información es correcta.
                        </p>
                        <div className="text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded-md overflow-y-auto max-h-[70vh] border border-gray-300">
                            {submissionResult && typeof submissionResult === 'string'
                                ? formatTextWithLineBreaks(submissionResult)
                                : JSON.stringify(submissionResult, null, 2)}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={closeModal}
                                className="bg-custom-base text-white px-6 py-2 transition rounded-md hover:bg-custom-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ComplaintsForm;
