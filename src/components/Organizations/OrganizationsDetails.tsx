import React from "react";
import { useOrganization } from "@src/context/OrganizationContext";
import {
    FaUser,
    FaCalendarAlt,
    FaGlobe,
    FaLayerGroup,
    FaShieldAlt,
    FaUsers,
    FaBalanceScale,
    FaBook,
    FaBuilding,
    FaPhone,
    FaFileContract,
} from "react-icons/fa";

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
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg overflow-y-auto h-[60vh] shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Información de {activeOrganization.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Propietario */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaUser className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Propietario ID:</span> {activeOrganization.owner_id}
                    </p>
                </div>

                {/* Fecha de Creación */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaCalendarAlt className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Creado en:</span>{" "}
                        {new Date(activeOrganization.created_at).toLocaleDateString()}
                    </p>
                </div>

                {/* Estado */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaShieldAlt className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Estado:</span>{" "}
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold shadow-md ${activeOrganization.status === "active"
                                    ? "bg-green-100 text-green-700 border border-green-400"
                                    : "bg-red-100 text-red-700 border border-red-400"
                                }`}
                        >
                            {activeOrganization.status === "active" ? "Activo" : "Inactivo"}
                        </span>
                    </p>
                </div>

                {/* Plan */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaLayerGroup className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Plan:</span> {activeOrganization.tier}
                    </p>
                </div>

                {/* Región */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaGlobe className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Región:</span> {activeOrganization.region}
                    </p>
                </div>

                {/* Asociación de Abogados */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaBalanceScale className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Asociación de Abogados:</span>{" "}
                        {activeOrganization.bar_association || "N/A"}
                    </p>
                </div>

                {/* Número de Registro */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaBook className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Número de Registro:</span>{" "}
                        {activeOrganization.registration_number || "N/A"}
                    </p>
                </div>

                {/* Estructura Legal */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaBuilding className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Estructura Legal:</span>{" "}
                        {activeOrganization.legal_structure || "N/A"}
                    </p>
                </div>

                {/* Teléfono de Contacto */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaPhone className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Teléfono:</span> {activeOrganization.contact_phone}
                    </p>
                </div>

                {/* Correo Electrónico */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                    <FaUser className="text-custom-bg-main w-6 h-6" />
                    <p className="text-gray-700">
                        <span className="font-medium">Email:</span> {activeOrganization.contact_email}
                    </p>
                </div>

                {/* Países donde opera */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
                    <h3 className="text-lg font-semibold text-custom-bg-main mb-2">Países donde opera</h3>
                    <p className="text-gray-700">{activeOrganization.operating_countries.join(", ")}</p>
                </div>

                {/* Áreas de Práctica */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
                    <h3 className="text-lg font-semibold text-custom-bg-main mb-2">Áreas de Práctica</h3>
                    <p className="text-gray-700">{activeOrganization.practice_areas.join(", ")}</p>
                </div>

                {/* Documentos Legales */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
                    <h3 className="text-lg font-semibold text-custom-bg-main mb-2">Documentos Legales</h3>
                    <p className="text-gray-700">{activeOrganization.legal_documents.join(", ")}</p>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;
