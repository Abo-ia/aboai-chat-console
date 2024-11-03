import React, { useEffect, useState } from 'react';
import PromptCategoryService from '@src/services/promptsStorage.service';

type ChatSidebarProps = {
    loadConversation: (conversationId: string) => void;
    isSidebarOpen: boolean;
    handleQueyChange: (promptTitle: string) => void;
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
    const { handleQueyChange } = props;

    const [promptCategories, setPromptCategories] = useState<IPromptCategory[]>([]);
    const [optionsState, setOptionsState] = useState(false);

    const idToken = "your-authentication-token"; 
    const promptService = new PromptCategoryService(idToken);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await promptService.getPromptCategories();
                setPromptCategories(categories);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        fetchCategories();
    }, []);

    const toggleCategory = (id: string) => {
        setPromptCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === id ? { ...category, isOpen: !category.isOpen } : category
            )
        );
    };

    const handleOptionsState = () => {
        setOptionsState(!optionsState);
    };

    return (
        <React.Fragment>
            <div className="text-[#292828] flex-none w-[300px] py-6 transition-transform duration-300 shadow-lg">
                <div className="px-4 py-2 mb-4 flex justify-between items-center rounded-md">
                    <h1 className="text-lg font-semibold">Prompts Base</h1>
                </div>

                <div className="px-4 mb-2 h-[65vh] overflow-y-auto">
                    {promptCategories.map((category: IPromptCategory) => (
                        <div key={category.id} className="mb-4">
                            <div
                                className="flex text-sm justify-between items-center cursor-pointer p-2 bg-gray-50 rounded transition-colors duration-200"
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
                                            className="flex justify-between cursor-pointer items-center p-2 mt-2 bg-gray-50 rounded transition-colors duration-200"
                                        >
                                            <p className="text-sm">{prompt.title}</p>
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