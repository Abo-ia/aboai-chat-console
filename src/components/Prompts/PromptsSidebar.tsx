import React, { useState } from 'react';

type ChatSidebarProps = {
    loadConversation: (conversationId: string) => void;
    isSidebarOpen: boolean;
    handleQueyChange: any
};

interface IPromptCategory {
    id: string;
    category: string;
    prompts: { id: string; title: string }[];
    isOpen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PromptSidebar: React.FC<ChatSidebarProps> = (props) => {
    const [promptCategories, setPromptCategories] = useState<IPromptCategory[]>([
        {
            id: '1',
            category: 'Prompts para Consumidores Legales',
            prompts: [
                { id: '1-1', title: '¿Cuáles son mis derechos como empleado?' },
                { id: '1-2', title: '¿Cómo puedo presentar una demanda por despido injustificado?' },
                { id: '1-3', title: '¿Qué debo hacer si sufro acoso laboral?' },
                { id: '1-4', title: '¿Cómo puedo reclamar por una compra defectuosa?' },
                { id: '1-5', title: '¿Qué pasos debo seguir para denunciar una estafa?' },
                { id: '1-6', title: '¿Cómo puedo solicitar la cancelación de un contrato de servicio?' },
            ],
            isOpen: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            category: 'Prompts para Investigación Legal',
            prompts: [
                { id: '2-1', title: 'Proporciona ejemplos de [caso legal/asunto].' },
                { id: '2-2', title: 'Explora jurisprudencia relevante sobre [tema].' },
                { id: '2-3', title: '¿Qué precedentes legales existen sobre [asunto]?' },
                { id: '2-4', title: 'Investiga los derechos civiles en diferentes países.' },
                { id: '2-5', title: '¿Qué dice la ley sobre derechos de autor en el ámbito digital?' },
                { id: '2-6', title: 'Analiza la evolución de las leyes sobre privacidad de datos.' },
            ],
            isOpen: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '3',
            category: 'Prompts para Abogados de Familia',
            prompts: [
                { id: '3-1', title: '¿Cómo puedo solicitar la custodia de mis hijos?' },
                { id: '3-2', title: '¿Cuáles son los requisitos para el divorcio en mi país?' },
                { id: '3-3', title: '¿Cómo se calcula la pensión alimenticia?' },
                { id: '3-4', title: '¿Qué derechos tengo como padre no custodio?' },
                { id: '3-5', title: '¿Cómo puedo modificar un acuerdo de manutención?' },
                { id: '3-6', title: '¿Qué debo considerar antes de firmar un acuerdo prenupcial?' },
            ],
            isOpen: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '4',
            category: 'Prompts para Contratos y Acuerdos Legales',
            prompts: [
                { id: '4-1', title: 'Redacta un acuerdo de confidencialidad (NDA) para una empresa.' },
                { id: '4-2', title: '¿Qué términos deben incluirse en un contrato de arrendamiento?' },
                { id: '4-3', title: 'Escribe un contrato de servicios para una consultora.' },
                { id: '4-4', title: '¿Cómo se redacta un acuerdo de compraventa de bienes inmuebles?' },
                { id: '4-5', title: 'Proporciona un ejemplo de contrato de trabajo temporal.' },
                { id: '4-6', title: '¿Cuáles son las cláusulas estándar en un acuerdo de asociación?' },
            ],
            isOpen: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '5',
            category: 'Prompts para Derecho Penal',
            prompts: [
                { id: '5-1', title: '¿Qué derechos tengo si soy arrestado?' },
                { id: '5-2', title: '¿Cuáles son las diferencias entre delitos menores y graves?' },
                { id: '5-3', title: '¿Cómo se presenta una denuncia penal?' },
                { id: '5-4', title: 'Proporciona un ejemplo de defensa para un caso de fraude.' },
                { id: '5-5', title: '¿Qué debo hacer si soy víctima de un delito?' },
                { id: '5-6', title: '¿Cómo puedo solicitar un abogado de oficio?' },
            ],
            isOpen: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '6',
            category: 'Prompts para Derecho Laboral',
            prompts: [
                { id: '6-1', title: '¿Cómo se calcula la indemnización por despido?' },
                { id: '6-2', title: '¿Qué derechos tienen los empleados a tiempo parcial?' },
                { id: '6-3', title: '¿Cómo puedo denunciar prácticas laborales injustas?' },
                { id: '6-4', title: '¿Cuáles son las regulaciones para la seguridad en el trabajo?' },
                { id: '6-5', title: '¿Qué debo saber antes de firmar un contrato de trabajo?' },
                { id: '6-6', title: '¿Cómo se gestionan los conflictos laborales según la ley?' },
            ],
            isOpen: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '7',
            category: 'Prompts para Ley de Propiedad Intelectual',
            prompts: [
                { id: '7-1', title: '¿Cómo registrar una marca comercial?' },
                { id: '7-2', title: '¿Qué es una patente y cómo se obtiene?' },
                { id: '7-3', title: '¿Cuáles son los derechos del autor en el ámbito digital?' },
                { id: '7-4', title: '¿Cómo proteger la propiedad intelectual de una empresa?' },
                { id: '7-5', title: 'Proporciona un ejemplo de carta de cese y desistimiento por infracción de derechos de autor.' },
                { id: '7-6', title: '¿Cuáles son las diferencias entre una marca registrada y una marca comercial común?' },
            ],
            isOpen: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const toggleCategory = (id: string) => {
        setPromptCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === id ? { ...category, isOpen: !category.isOpen } : category
            )
        );
    };

    const { handleQueyChange } = props;

    return (
        <React.Fragment>
            <div className="bg-[#f8fbfc] text-[#292828] flex-none w-[300px] py-6 transition-transform duration-300 shadow-lg">
                <div className="px-4 py-2 mb-4 flex justify-between items-center rounded-md">
                    <h1 className="text-lg font-semibold">Prompts Base</h1>
                    
                </div>

                <div className="px-4 mb-2 h-[82vh] overflow-y-auto">
                    {promptCategories.map((category: IPromptCategory) => (
                        <div key={category.id} className="mb-4">
                            <div
                                className="flex text-sm justify-between items-center cursor-pointer p-2 bg-[#e9eaee] rounded transition-colors duration-200"
                                onClick={() => toggleCategory(category.id)}
                            >
                                <span className="font-semibold">{category.category}</span>
                                <svg
                                    className={`w-5 h-5 transform transition-transform ${category.isOpen ? 'rotate-180' : 'rotate-0'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {category.isOpen && (
                                <div className="pl-4">
                                    {category.prompts.map((prompt) => (
                                        <div
                                            key={prompt.id}
                                            onClick={() => handleQueyChange(prompt.title)}
                                            className="flex justify-between cursor-pointer items-center p-2 mt-2 bg-[#e9eaee] rounded transition-colors duration-200"
                                        >
                                            <p className="">{prompt.title}</p>
                                            <button className="text-red-400 hover:text-white">
                                                <svg
                                                    className="w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};

export default PromptSidebar;