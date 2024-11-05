import React from 'react'

const ComplaintsForm: React.FC = () => {
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
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Fecha de Nacimiento</span>
                            <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Género</span>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option>Masculino</option>
                                <option>Femenino</option>
                                <option>Otro</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-gray-700">CURP / Identificación Nacional</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Dirección Completa</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Teléfono de Contacto</span>
                            <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Correo Electrónico</span>
                            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Relación con el Denunciado</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                    </div>
                </section>

                {/* Información del Representante Legal */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">2. Información del Representante Legal</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-gray-700">Nombre Completo del Abogado</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Número de Cédula Profesional</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Despacho / Firma de Abogados</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Teléfono de Contacto</span>
                            <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Correo Electrónico</span>
                            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                    </div>
                </section>

                {/* Detalles del Denunciado */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">3. Detalles del Denunciado</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-gray-700">Nombre Completo del Denunciado o Entidad</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Alias o Apodo (si aplica)</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Fecha de Nacimiento</span>
                            <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Identificación (CURP, RFC, etc.)</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Dirección Completa</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Teléfono de Contacto</span>
                            <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Correo Electrónico</span>
                            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Relación con el Denunciante</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                    </div>
                </section>

                {/* Descripción de los Hechos */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">4. Descripción de los Hechos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-gray-700">Fecha del Incidente</span>
                            <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Hora del Incidente</span>
                            <input type="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Lugar del Incidente</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <label className="block col-span-2">
                            <span className="text-gray-700">Descripción de los Hechos</span>
                            <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows={10}></textarea>
                        </label>
                    </div>
                </section>

                <div className="flex justify-end space-x-4">
                    <button className="bg-gray-200 px-4 py-2 rounded-md shadow-sm">Guardar Borrador</button>
                    <button className="bg-custom-base text-white px-4 py-2 rounded-md shadow-sm">Generar Borrador de Denuncia</button>
                </div>

            </div>
        </div>
    )
}

export default ComplaintsForm
