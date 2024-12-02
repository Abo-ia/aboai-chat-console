import React, { useEffect, useState } from 'react';
import PromptCategoryService from '@src/services/promptsStorage.service';
import { FaTrash } from 'react-icons/fa';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ category: "", isOpen: false, prompts: [{ id: generateUniqueId(), title: "" }] });

    const idToken = "your-authentication-token"; // Replace with actual token
    const promptService = new PromptCategoryService(idToken);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await promptService.getPromptCategories();
                setPromptCategories(categories);
            } catch (error) {
                console.error("Error loading categories:", error);
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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Generate a unique ID for each new prompt
    function generateUniqueId() {
        return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
        const { name, value } = e.target;

        if (name === "isOpen") {
            const checked = (e.target as HTMLInputElement).checked;
            setNewCategory((prev) => ({ ...prev, isOpen: checked }));
        } else if (index !== undefined) {
            const updatedPrompts = [...newCategory.prompts];
            updatedPrompts[index] = { ...updatedPrompts[index], [name]: value };
            setNewCategory((prev) => ({ ...prev, prompts: updatedPrompts }));
        } else {
            setNewCategory((prev) => ({ ...prev, [name]: value }));
        }
    };

    const addPrompt = () => {
        setNewCategory((prev) => ({
            ...prev,
            prompts: [...prev.prompts, { id: generateUniqueId(), title: "" }],
        }));
    };

    const removePrompt = (index: number) => {
        setNewCategory((prev) => ({
            ...prev,
            prompts: prev.prompts.filter((_, i) => i !== index),
        }));
    };

    const createCategory = async () => {
        try {
            await promptService.createPromptCategory(newCategory.category, newCategory.isOpen, newCategory.prompts);
            closeModal();
            const categories = await promptService.getPromptCategories();
            setPromptCategories(categories);
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    return (
        <React.Fragment>
            <div className="text-[#292828] flex-none w-[300px] py-6 transition-transform duration-300 shadow-lg">
                <div className="px-4 py-2 mb-4 flex justify-between items-center rounded-md">
                    <h1 className="text-lg font-semibold">Prompts Base</h1>
                    <button onClick={openModal} className="bg-custom-base text-white px-2 py-1 rounded">+ Nuevo</button>
                </div>

                <div className="px-4 mb-2 h-[65vh] overflow-y-auto">
                    {promptCategories.length > 0 &&
                        promptCategories.map((category: IPromptCategory) => (
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

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/5">
                        <h2 className="text-lg font-semibold mb-4">Nueva Categoría</h2>

                        <label className="block mb-2">
                            Nombre de la Categoría:
                            <input
                                type="text"
                                name="category"
                                value={newCategory.category}
                                onChange={(e) => handleNewCategoryChange(e)}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        </label>
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Prompts</h3>
                            {newCategory.prompts.map((prompt, index) => (
                                <div key={prompt.id} className="flex space-x-2 mb-2 items-center">
                                    <input
                                        type="text"
                                        name="title"
                                        value={prompt.title}
                                        placeholder="Título"
                                        onChange={(e) => handleNewCategoryChange(e, index)}
                                        className="p-2 border rounded w-3/4"
                                    />
                                    <button onClick={() => removePrompt(index)} className="text-red-400">
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addPrompt} className="text-custom-base">+ Añadir Prompt</button>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                            <button onClick={createCategory} className="px-4 py-2 bg-custom-base text-white rounded">Guardar</button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default PromptSidebar;
