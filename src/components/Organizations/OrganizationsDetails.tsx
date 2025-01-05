import React from 'react';
import { useOrganization } from '@src/context/OrganizationContext';
import { FaAward, FaTasks, FaChartLine, FaHeart } from 'react-icons/fa';

const OrganizationDetails: React.FC = () => {
    const { state } = useOrganization();
    const { activeOrganization } = state;

    if (!activeOrganization) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">No active organization selected</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg overflow-y-auto h-[50vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                About {activeOrganization.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Misión */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Mission</h3>
                    <p className="text-gray-700">{activeOrganization.mission || 'No mission available'}</p>
                </div>

                {/* Visión */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Vision</h3>
                    <p className="text-gray-700">{activeOrganization.vision || 'No vision available'}</p>
                </div>

                {/* Proyectos en curso */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Current Projects</h3>
                    {activeOrganization.currentProjects && activeOrganization.currentProjects.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {activeOrganization.currentProjects.map((project, index) => (
                                <li key={index}>{project}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No current projects available</p>
                    )}
                </div>

                {/* Reconocimientos */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Awards & Certifications</h3>
                    {activeOrganization.awards && activeOrganization.awards.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {activeOrganization.awards.map((award, index) => (
                                <li key={index}>{award}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No awards or certifications available</p>
                    )}
                </div>

                {/* Métricas clave */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
                    <h3 className="text-lg font-semibold text-teal-600 mb-2">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-4">
                            <FaChartLine className="text-teal-500 w-6 h-6" />
                            <p className="text-gray-700">
                                <span className="font-medium">Yearly Growth:</span>{' '}
                                {activeOrganization.metrics?.yearlyGrowth || 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaTasks className="text-teal-500 w-6 h-6" />
                            <p className="text-gray-700">
                                <span className="font-medium">Active Projects:</span>{' '}
                                {activeOrganization.metrics?.activeProjects || 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaHeart className="text-teal-500 w-6 h-6" />
                            <p className="text-gray-700">
                                <span className="font-medium">Community Impact:</span>{' '}
                                {activeOrganization.metrics?.communityImpact || 'N/A'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaAward className="text-teal-500 w-6 h-6" />
                            <p className="text-gray-700">
                                <span className="font-medium">Awards Won:</span>{' '}
                                {activeOrganization.metrics?.awardsWon || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;
