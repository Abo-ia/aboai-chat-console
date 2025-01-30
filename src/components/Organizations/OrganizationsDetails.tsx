import React from 'react';
import { useOrganization } from '@src/context/OrganizationContext';
import { FaUser, FaServer, FaCalendarAlt, FaGlobe, FaLayerGroup, FaShieldAlt } from 'react-icons/fa';

const OrganizationDetails: React.FC = () => {
    const { state } = useOrganization();
    const { activeOrganization } = state;

    if (!activeOrganization) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">No hay una organización activa seleccionada</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg overflow-y-auto h-[50vh] shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Información de {activeOrganization.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Propietario */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaUser className="text-teal-500 w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Propietario ID:</span> {activeOrganization.owner_id}
                    </p>
                </div>

                {/* Fecha de Creación */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaCalendarAlt className="text-teal-500 w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Creado en:</span> {new Date(activeOrganization.created_at).toLocaleDateString()}
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaShieldAlt className="text-teal-500 w-6 h-6" />
                    <p className="text-gray-700 flex items-center space-x-2">
                        <span className="font-medium">Estado:</span>{' '}
                        <span className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold shadow-md ${activeOrganization.status === 'active' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}
                        >
                            {activeOrganization.status === 'active' ? (
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            )}
                            <span>{activeOrganization.status === 'active' ? 'Activo' : 'Inactivo'}</span>
                        </span>

                    </p>
                </div>

                {/* Nivel de Plan */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaLayerGroup className="text-teal-500 w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Plan:</span> {activeOrganization.tier}
                    </p>
                </div>

                {/* Región */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaGlobe className="text-teal-500 w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Región:</span> {activeOrganization.region}
                    </p>
                </div>

                {/* Límites */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Límites de la Organización</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-4">
                            <FaUser className="text-teal-500 w-6 h-6" />
                            <p className="text-gray-700">
                                <span className="font-medium">Límite de Usuarios:</span>{' '}
                                {activeOrganization.limits?.user_limit || 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaServer className="text-teal-500 w-6 h-6" />
                            <p className="text-gray-700">
                                <span className="font-medium">Almacenamiento (GB):</span>{' '}
                                {activeOrganization.limits?.storage_limit_gb || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;
