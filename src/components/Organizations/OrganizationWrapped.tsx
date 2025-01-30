import React, { useEffect, useState } from 'react';
import { FaUsers, FaCogs, FaCodeBranch, FaProjectDiagram, FaPlus } from 'react-icons/fa';
import { RiOrganizationChart } from "react-icons/ri";
import { useOrganization } from '@src/context/OrganizationContext';
import OrganizationsDetails from './OrganizationsDetails';
import OrganizationTeams from './OrganizationsTeams';
import OrganizationMember from './OrganizationsMembers';
import OrganizationSyncs from './OrganizationsSyncs';
import OrganizationsSettings from './OrganizationsSettings';

const tailwindColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500',
    'bg-teal-500', 'bg-cyan-500'
];

type Tab = 'details' | 'people' | 'syncs' | 'settings';

interface CreateOrganizationModalProps {
    onClose: () => void;
}

const OrganizationWrapped: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('details');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [organizationColor, setOrganizationColor] = useState<string>('bg-teal-500');
    const [loading, setLoading] = useState(true);
    const { state, setActiveOrganization } = useOrganization();
    const { organizations, activeOrganization } = state;

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSelectOrganization = (organizationId: string) => {
        const selectedOrganization = organizations.find(org => org.organization_id === organizationId);
        if (selectedOrganization) {
            setActiveOrganization(selectedOrganization);
            const randomColor = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
            setOrganizationColor(randomColor);
        }
    };

    useEffect(() => {
        if (organizations.length > 0 && !activeOrganization) {
            handleSelectOrganization(organizations[0].organization_id);
        }
        setLoading(false);
    }, [organizations, activeOrganization]);

    const created_at = activeOrganization?.created_at
        ? new Date(activeOrganization.created_at).toLocaleDateString()
        : 'Fecha no disponible';


    return (
        <div className="pb-6 py-2 overflow-x-hidden">
            <div className="max-w-5xl mx-auto bg-white rounded-lg p-6 shadow-lg">
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-teal-500 rounded-full animate-spin"></div>
                    </div>
                ) : organizations.length === 0 ? (
                    <div className="text-center py-10">
                        <h2 className="text-xl font-semibold text-gray-800">No tienes organizaciones aún</h2>
                        <p className="text-gray-600 mt-2">
                            Para comenzar, debes crear una organización.
                        </p>
                        <button
                            onClick={handleOpenModal}
                            className="mt-4 bg-teal-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 shadow-md transition-all"
                        >
                            Crear Organización
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center space-x-4 mt-4 justify-between">
                            <div className='flex items-center space-x-4'>
                                <p
                                    className={`flex items-center justify-center w-14 h-14 ${organizationColor} text-white text-2xl font-semibold rounded-lg`}
                                >
                                    {activeOrganization?.name?.charAt(0).toUpperCase() || ''}
                                </p>
                                <div>
                                    <h2 className="text-lg font-bold">{activeOrganization?.name}</h2>
                                    <p className="text-sm text-gray-600">
                                        Organización creada el {created_at}
                                    </p>
                                </div>
                            </div>



                            <button
                                className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                                    { label: 'Detalles', icon: RiOrganizationChart, value: 'details' },
                                    { label: 'Personas', icon: FaUsers, value: 'people' },
                                    { label: 'Sincronizaciones', icon: FaProjectDiagram, value: 'syncs' },
                                    { label: 'Configuración', icon: FaCogs, value: 'settings' },
                                ].map((tab) => (
                                    <button
                                        key={tab.value}
                                        className={`flex items-center py-3 px-4 border-b-2 ${activeTab === tab.value
                                            ? 'border-teal-500 text-teal-500 font-semibold'
                                            : 'border-transparent text-gray-600 hover:text-gray-800'
                                            }`}
                                        onClick={() => setActiveTab(tab.value as Tab)}
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

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({ onClose }) => {
    const { createOrganization } = useOrganization();
    const [formData, setFormData] = useState({ name: '' });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, name: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) return;

        setLoading(true);
        try {
            await createOrganization(formData.name);
            onClose();
        } catch (error) {
            console.error('Error creando organización:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-xl w-[600px]">
                <h2 className="text-2xl font-semibold mb-4">Crear Nueva Organización</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Ingresa el nombre de la organización para añadirla al sistema.
                </p>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nombre de la Organización
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ej. Tech Innovations"
                        className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
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
                        className={`px-4 py-2 rounded-lg ${loading ? 'bg-teal-300' : 'bg-teal-500 hover:bg-teal-600'} text-white`}
                        onClick={handleSubmit}
                        disabled={!formData.name.trim() || loading}
                    >
                        {loading ? 'Creando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
};