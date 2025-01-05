import React, { useState } from 'react';
import { FaUsers, FaCogs, FaCodeBranch, FaProjectDiagram } from 'react-icons/fa';
import { RiOrganizationChart } from "react-icons/ri";
import { useOrganization } from '@src/context/OrganizationContext';
import OrganizationsDetails from './OrganizationsDetails';
import OrganizationTeams from './OrganizationsTeams';
import OrganizationMember from './OrganizationsMembers';
import OrganizationSyncs from './OrganizationsSyncs';
import OrganizationsSettings from './OrganizationsSettings';

const tabs = [
    { label: 'Detalles', icon: RiOrganizationChart, value: 'details' },
    { label: 'Equipos', icon: FaCodeBranch, value: 'teams' },
    { label: 'Personas', icon: FaUsers, value: 'people' },
    { label: 'Sincronizaciones', icon: FaProjectDiagram, value: 'syncs' },
    { label: 'Configuración', icon: FaCogs, value: 'settings' },
];

type Tab = 'details' | 'teams' | 'people' | 'syncs' | 'settings';

const OrganizationWrapped: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('details');
    const { state, dispatch } = useOrganization();
    const { activeOrganization, organizations } = state;

    return (
        <div className="py-6 overflow-x-hidden">
            <div className="max-w-5xl mx-auto bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Organización Activa
                    </h1>
                    <div className="flex items-center space-x-4 mt-4">
                        <img
                            src={activeOrganization?.avatar || ''}
                            alt="Avatar de la organización"
                            className="w-16 h-16 rounded-full border border-gray-300"
                        />
                        <div>
                            <h2 className="text-lg font-bold">
                                {activeOrganization?.name || 'Seleccione una organización'}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {activeOrganization?.description || ''}
                            </p>
                        </div>
                    </div>
                    <select
                        className="mt-4 w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={activeOrganization?.id || ''}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_ACTIVE_ORGANIZATION',
                                payload: e.target.value,
                            })
                        }
                    >
                        <option value="">Seleccione una organización</option>
                        {organizations.map((org) => (
                            <option key={org.id} value={org.id}>
                                {org.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
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
                {activeTab === 'teams' && <OrganizationTeams />}
                {activeTab === 'people' && <OrganizationMember />}
                {activeTab === 'syncs' && <OrganizationSyncs />}
                {activeTab === 'settings' && <OrganizationsSettings />}
            </div>
        </div>
    );
};

export default OrganizationWrapped;
