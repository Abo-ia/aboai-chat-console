import React, { useState } from 'react';
import {
    FaBook,
    FaUsers,
    FaCogs,
    FaBox,
    FaProjectDiagram,
    FaCodeBranch,
    FaLink,
    FaStar,
    FaCode,
    FaUserTie,
} from 'react-icons/fa';

type Tab = 'repositories' | 'projects' | 'packages' | 'people' | 'teams' | 'settings';

const OrganizationDetails: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('repositories');

    return (
        <div className="bg-gray-100 min-h-[90vh] p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Header de la organización */}
                <div className="flex items-center space-x-4 mb-8 border-b pb-6">
                    <img
                        src="https://cdn-icons-png.freepik.com/512/432/432594.png"
                        alt="Organization Avatar"
                        className="w-20 h-20 rounded-full border border-gray-300"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">Tech Innovations</h1>
                        <p className="text-gray-600">Organización enfocada en proyectos de software innovadores y de código abierto.</p>
                        <div className="flex space-x-4 mt-2">
                            <span className="text-gray-500">🌎 Ubicación: Global</span>
                            <span className="text-gray-500">🔗 <a href="#" className="text-custom-base hover:underline">tech-innovations.com</a></span>
                        </div>
                    </div>
                </div>

                {/* Navegación de pestañas */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        <button
                            className={`flex items-center py-3 px-4 border-b-2 ${activeTab === 'repositories' ? 'border-custom-base text-custom-base font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('repositories')}
                        >
                            <FaBook className="mr-2" /> Repositorios
                        </button>
                        <button
                            className={`flex items-center py-3 px-4 border-b-2 ${activeTab === 'projects' ? 'border-custom-base text-custom-base font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <FaProjectDiagram className="mr-2" /> Proyectos
                        </button>
                        <button
                            className={`flex items-center py-3 px-4 border-b-2 ${activeTab === 'packages' ? 'border-custom-base text-custom-base font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('packages')}
                        >
                            <FaBox className="mr-2" /> Paquetes
                        </button>
                        <button
                            className={`flex items-center py-3 px-4 border-b-2 ${activeTab === 'people' ? 'border-custom-base text-custom-base font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('people')}
                        >
                            <FaUsers className="mr-2" /> Personas
                        </button>
                        <button
                            className={`flex items-center py-3 px-4 border-b-2 ${activeTab === 'teams' ? 'border-custom-base text-custom-base font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('teams')}
                        >
                            <FaCodeBranch className="mr-2" /> Equipos
                        </button>
                        <button
                            className={`flex items-center py-3 px-4 border-b-2 ${activeTab === 'settings' ? 'border-custom-base text-custom-base font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            <FaCogs className="mr-2" /> Configuración
                        </button>
                    </nav>
                </div>

                {/* Contenido de las pestañas */}
                <div className="mt-4">
                    {activeTab === 'repositories' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Repositorios</h2>
                            <ul className="space-y-4">
                                {[1, 2, 3].map((repo) => (
                                    <li key={repo} className="p-4 bg-gray-50 rounded-lg shadow-md flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">Repositorio {repo}</h3>
                                            <p className="text-gray-500">Descripción breve del repositorio {repo}.</p>
                                        </div>
                                        <div className="text-yellow-500 flex items-center space-x-1">
                                            <FaStar />
                                            <span>{Math.floor(Math.random() * 100)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'projects' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Proyectos</h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((project) => (
                                    <div key={project} className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center">
                                        <FaProjectDiagram className="text-custom-base mr-4" />
                                        <div>
                                            <h3 className="text-lg font-semibold">Proyecto {project}</h3>
                                            <p className="text-gray-500">Detalles y objetivos del proyecto {project}.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'packages' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Paquetes</h2>
                            <ul className="space-y-4">
                                {[1, 2].map((pkg) => (
                                    <li key={pkg} className="p-4 bg-gray-50 rounded-lg shadow-md flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">Paquete {pkg}</h3>
                                            <p className="text-gray-500">Versión {Math.random().toFixed(2)}</p>
                                        </div>
                                        <FaLink className="text-custom-base" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'people' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Personas</h2>
                            <ul className="space-y-4">
                                {['Alice', 'Bob', 'Charlie'].map((name) => (
                                    <li key={name} className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center">
                                        <FaUserTie className="text-custom-base mr-4" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{name}</h3>
                                            <p className="text-gray-500">Rol: {name === 'Alice' ? 'Administrador' : 'Desarrollador'}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'teams' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Equipos</h2>
                            <ul className="space-y-4">
                                {['Frontend', 'Backend'].map((team) => (
                                    <li key={team} className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center">
                                        <FaCode className="text-custom-base mr-4" />
                                        <div>
                                            <h3 className="text-lg font-semibold">Equipo {team}</h3>
                                            <p className="text-gray-500">Área de enfoque: {team}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Configuración</h2>
                            <p className="text-gray-700">Administra los ajustes de privacidad, seguridad, y permisos de la organización.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;
