import React, { useEffect, useState } from 'react';
import {
    FaUsers,
    FaCogs,
    FaProjectDiagram,
    FaPlus,
    FaSpinner,
    FaTimes,
    FaCheck,
} from 'react-icons/fa';
import { RiOrganizationChart } from 'react-icons/ri';
import { useOrganization } from '@src/context/OrganizationContext';
import OrganizationsDetails from './OrganizationsDetails';
import OrganizationMember from './OrganizationsMembers';
import OrganizationSyncs from './OrganizationsSyncs';
import OrganizationsSettings from './OrganizationsSettings';
import OrganizationsService from '@src/services/organization.service';

import { fetchUserAttributes } from 'aws-amplify/auth';

const tailwindColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500',
];

type Tab = 'details' | 'people' | 'syncs' | 'settings';

const OrganizationWrapped: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>(() => {
        return (localStorage.getItem('activeTab') as Tab) || 'details';
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [organizationColor, setOrganizationColor] = useState<string>('bg-teal-500');
    const { state, setActiveOrganization } = useOrganization();
    const { activeOrganization } = state;

    const [organizations, setOrganizations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [authEmail, setAuthEmail] = useState<string>('');
    const [authUserId, setAuthUserId] = useState<string>('');

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const attributes = await fetchUserAttributes();
                if (attributes.email && attributes.sub) {
                    setAuthEmail(attributes.email);
                    setAuthUserId(attributes.sub);
                }
            } catch (err) {
                console.error('Error al obtener atributos del usuario:', err);
            }
        };
        fetchAttributes();
    }, []);

    useEffect(() => {
        const fetchOrganizations = async () => {
            setLoading(true);

            try {
                const organizationsService = new OrganizationsService('');
                const organizations = await organizationsService.getUserOrganizations(authEmail);
                setOrganizations(organizations);
                if (organizations.length > 0) {
                    handleSelectOrganization(organizations[0].organization_id);
                }
            } catch (error) {
                console.error('Error fetching organizations:', error);
            } finally {
                setLoading(false);
            }
        };

        if (authEmail) {
            fetchOrganizations();
        }
    }, [authEmail]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSelectOrganization = (organizationId: string) => {
        const selectedOrganization = organizations.find(
            (org) => org.organization_id === organizationId,
        );
        if (selectedOrganization) {
            setActiveOrganization(selectedOrganization);
            const randomColor = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
            setOrganizationColor(randomColor);
        }
    };

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    return (
        <div className="pb-6 py-2 overflow-x-hidden">
            <div className="max-w-5xl mx-auto bg-white rounded-lg p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <FaSpinner className="w-8 h-8 text-teal-500 animate-spin mb-2" />
                        <p className="text-gray-600">Cargando organizaciones...</p>
                    </div>
                ) : organizations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg max-w-md mx-auto">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3039/3039436.png"
                            alt="No organizations"
                            className="w-24 h-24 mb-4 opacity-90"
                        />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Aún no tienes organizaciones
                        </h2>
                        <p className="text-gray-600 mt-2 text-center px-6">
                            Para comenzar, necesitas registrar una organización y administrar su
                            información.
                        </p>
                        <button
                            onClick={handleOpenModal}
                            className="mt-6 bg-custom-primary flex items-center gap-2  text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105"
                        >
                            <FaPlus /> Crear Organización
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center space-x-4 mt-4 justify-between">
                            <div className="flex items-center space-x-4">
                                <p
                                    className={`flex items-center justify-center w-14 h-14 bg-custom-secondary text-white text-2xl font-semibold rounded-lg `}
                                >
                                    {activeOrganization?.name?.charAt(0).toUpperCase() || ''}
                                </p>
                                <div>
                                    <h2 className="text-lg font-bold">
                                        {activeOrganization?.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Organización creada el{' '}
                                        {new Date(
                                            activeOrganization?.created_at || '',
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <button
                                className="flex items-center bg-custom-primary text-white px-4 py-2 rounded-lg shadow-md"
                                onClick={handleOpenModal}
                            >
                                <FaPlus className="mr-2" /> Nueva Organización
                            </button>
                        </div>

                        <select
                            className="mt-4 w-1/3 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={activeOrganization?.organization_id || ''}
                            onChange={(e) => handleSelectOrganization(e.target.value)}
                        >
                            {organizations.map((org) => (
                                <option key={org.organization_id} value={org.organization_id}>
                                    {org.name}
                                </option>
                            ))}
                        </select>

                        <div className="border-b border-gray-200 mb-6 mt-6">
                            <nav className="flex space-x-8">
                                {[
                                    {
                                        label: 'Detalles',
                                        icon: RiOrganizationChart,
                                        value: 'details',
                                    },
                                    { label: 'Personas', icon: FaUsers, value: 'people' },
                                    {
                                        label: 'Sincronizaciones',
                                        icon: FaProjectDiagram,
                                        value: 'syncs',
                                    },
                                    { label: 'Configuración', icon: FaCogs, value: 'settings' },
                                ].map((tab) => (
                                    <button
                                        key={tab.value}
                                        className={`flex items-center py-3 px-4 border-b-2 ${
                                            activeTab === tab.value
                                                ? 'border-teal-500 text-teal-500 font-semibold'
                                                : 'border-transparent text-gray-600 hover:text-gray-800'
                                        }`}
                                        onClick={() => handleTabChange(tab.value as Tab)}
                                    >
                                        <tab.icon className="mr-2" /> {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {activeTab === 'details' && <OrganizationsDetails />}
                        {activeTab === 'people' && <OrganizationMember />}
                        {activeTab === 'syncs' && <OrganizationSyncs />}
                        {activeTab === 'settings' && <OrganizationsSettings />}
                    </>
                )}
            </div>

            {isModalOpen && <CreateOrganizationModal onClose={handleCloseModal} />}
        </div>
    );
};

export default OrganizationWrapped;

const CreateOrganizationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { createOrganization } = useOrganization();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: 'Bufete Jurídico López & Asociados',
        practice_areas: ['Derecho Penal', 'Derecho Civil', 'Propiedad Intelectual'],
        bar_association: 'Colegio de Abogados de México',
        registration_number: 'LAW-987654',
        legal_structure: 'Sociedad Civil',
        operating_countries: 'México, España, Argentina',
        contact_email: 'info@bufetejuridico.com',
        contact_phone: '+52 55 9876 5432',
        clients_served: '250',
        active_cases: '30',
        legal_documents: ['Contratos', 'Demandas', 'Testamentos', 'Reglamentos Corporativos'],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddItem = (field: 'practice_areas' | 'legal_documents', value: string) => {
        if (value.trim()) {
            setFormData((prev) => ({
                ...prev,
                [field]: [...prev[field], value.trim()],
            }));
        }
    };

    const handleRemoveItem = (field: 'practice_areas' | 'legal_documents', index: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) return;

        setLoading(true);
        try {
            await createOrganization(
                formData.name,
                formData.practice_areas,
                formData.bar_association,
                formData.registration_number,
                formData.legal_structure,
                formData.operating_countries.split(',').map((item) => item.trim()),
                formData.contact_email,
                formData.contact_phone,
                parseInt(formData.clients_served) || 0,
                parseInt(formData.active_cases) || 0,
                formData.legal_documents,
            );
            onClose();
        } catch (error) {
            console.error('Error creando organización:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-xl w-3/4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Crear Nueva Organización
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Ingresa los datos de la organización para añadirla al sistema.
                </p>

                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre de la Organización
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ej. Bufete Jurídico López & Asociados"
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Áreas de Práctica
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Ej. Derecho Penal"
                                className="mt-1 flex-1 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddItem(
                                            'practice_areas',
                                            (e.target as HTMLInputElement).value,
                                        );
                                        (e.target as HTMLInputElement).value = '';
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.practice_areas.map((area, index) => (
                                <span
                                    key={index}
                                    className="flex items-center bg-teal-100 text-teal-700 px-3 py-1 rounded-lg text-sm"
                                >
                                    {area}
                                    <button
                                        className="ml-2 text-teal-500 hover:text-teal-700"
                                        onClick={() => handleRemoveItem('practice_areas', index)}
                                    >
                                        <FaTimes />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <label>
                            <small className="text-gray-500">Presiona Enter para agregar</small>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Asociación de Abogados
                        </label>
                        <input
                            type="text"
                            name="bar_association"
                            value={formData.bar_association}
                            onChange={handleInputChange}
                            placeholder="Ej. Colegio de Abogados de México"
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Número de Registro
                        </label>
                        <input
                            type="text"
                            name="registration_number"
                            value={formData.registration_number}
                            onChange={handleInputChange}
                            placeholder="Ej. LAW-987654"
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Estructura Legal
                        </label>
                        <input
                            type="text"
                            name="legal_structure"
                            value={formData.legal_structure}
                            onChange={handleInputChange}
                            placeholder="Ej. Sociedad Anónima"
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Países de Operación
                        </label>
                        <input
                            type="text"
                            name="operating_countries"
                            value={formData.operating_countries}
                            onChange={handleInputChange}
                            placeholder="Ej. México, Estados Unidos"
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email de Contacto
                        </label>
                        <input
                            type="email"
                            name="contact_email"
                            value={formData.contact_email}
                            onChange={handleInputChange}
                            placeholder="Ej."
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Teléfono de Contacto
                        </label>
                        <input
                            type="tel"
                            name="contact_phone"
                            value={formData.contact_phone}
                            onChange={handleInputChange}
                            placeholder="Ej. 555-123-4567"
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Clientes Atendidos
                        </label>
                        <input
                            type="number"
                            name="clients_served"
                            value={formData.clients_served}
                            onChange={handleInputChange}
                            placeholder="Ej. 100"
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Casos Activos
                        </label>
                        <input
                            type="number"
                            name="active_cases"
                            value={formData.active_cases}
                            onChange={handleInputChange}
                            placeholder="Ej. 10"
                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Documentos Legales
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Ej. Contratos"
                                className="mt-1 flex-1 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddItem(
                                            'legal_documents',
                                            (e.target as HTMLInputElement).value,
                                        );
                                        (e.target as HTMLInputElement).value = '';
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.legal_documents.map((doc, index) => (
                                <span
                                    key={index}
                                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm"
                                >
                                    {doc}
                                    <button
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                        onClick={() => handleRemoveItem('legal_documents', index)}
                                    >
                                        <FaTimes />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <label>
                            <small className="text-gray-500">Presiona Enter para agregar</small>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-3"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg bg-custom-primary text-white flex items-center justify-center transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-custom-bg-hover'}`}
                        onClick={handleSubmit}
                        disabled={!formData.name.trim() || loading}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin mr-2" /> Creando...
                            </>
                        ) : (
                            <>
                                <FaCheck className="mr-2" /> Confirmar
                            </>
                        )}
                    </button>
                </div>

                {loading && (
                    <div
                        role="alert"
                        className="mt-3 relative flex flex-col w-full p-3 text-sm border-2 rounded-md"
                    >
                        <p className="flex text-base">
                            <FaSpinner className="w-5 h-5 text-teal-500 animate-spin mr-2" />
                            Organización en proceso de creación
                        </p>
                        <p className="ml-4 px-3">
                            La organización está siendo creada, por favor espera unos minutos. Una
                            vez creada, podrás comenzar a administrarla. Puedes cerrar esta ventana
                            en cualquier momento.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
