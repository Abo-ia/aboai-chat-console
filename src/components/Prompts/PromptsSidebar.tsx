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
    const [newCategory, setNewCategory] = useState({
        category: '',
        isOpen: false,
        prompts: [{ id: generateUniqueId(), title: '' }],
    });

    const idToken = 'your-authentication-token';
    const promptService = new PromptCategoryService(idToken);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await promptService.getPromptCategories();
                setPromptCategories(categories);
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const toggleCategory = (id: string) => {
        setPromptCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === id ? { ...category, isOpen: !category.isOpen } : category,
            ),
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

    const handleNewCategoryChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        index?: number,
    ) => {
        const { name, value } = e.target;

        if (name === 'isOpen') {
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
            prompts: [...prev.prompts, { id: generateUniqueId(), title: '' }],
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
            const response = await promptService.createPromptCategory(
                newCategory.category,
                newCategory.isOpen,
                newCategory.prompts,
            );
            console.log('Category created:', response);
            closeModal();
            const categories = await promptService.getPromptCategories();
            setPromptCategories(categories);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div className="px-4 py-2 mb-4">
            <div className="flex justify-between items-center gap-10 ml-5 mb-4">
                <h1 className="text-lg font-semibold">Preguntas Frecuentes</h1>
                <button
                    onClick={openModal}
                    className="px-3 py-1.5 border rounded-md transition hover:bg-gray-100"
                >
                    + Nuevo
                </button>
            </div>

            {/* Contenedor de Categorías */}
            <div className="border-l border-gray-200 py-6">
                <div className="px-4 mb-2 h-[65vh] overflow-y-auto space-y-4">
                    {promptCategories.length > 0 &&
                        promptCategories.map((category) => (
                            <div key={category.id}>
                                {/* Categoría */}
                                <div
                                    className="flex justify-between items-center p-2 border rounded-md cursor-pointer hover:bg-custom-secondary hover:text-white transition-all "
                                    onClick={() => toggleCategory(category.id)}
                                >
                                    <span className="font-medium">{category.category}</span>
                                    <svg
                                        className={`w-5 h-5 transform transition-transform ${category.isOpen ? 'rotate-180' : 'rotate-0'}`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>

                                {/* Lista de Prompts */}
                                {category.isOpen && (
                                    <div className="pl-4 space-y-2 mt-2">
                                        {category.prompts.map((prompt) => (
                                            <div
                                                key={prompt.id}
                                                onClick={() => handleQueyChange(prompt.title)}
                                                className="flex justify-between items-center p-2 border rounded-md cursor-pointer hover:border-custom-secondary hover:bg-custom-secondary hover:text-white transition-all"
                                            >
                                                <p className="text-sm">{prompt.title}</p>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <svg
                                                        className="w-5 h-5"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 4v16m8-8H4"
                                                        />
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Nueva Categoría</h2>

                        {/* Nombre de la categoría */}
                        <label className="block mb-4 text-sm font-medium text-gray-700">
                            Nombre de la Categoría:
                            <input
                                type="text"
                                name="category"
                                value={newCategory.category}
                                onChange={handleNewCategoryChange}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>

                        {/* Lista de Prompts */}
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-sm text-gray-700">Prompts</h3>
                            {newCategory.prompts.map((prompt, index) => (
                                <div key={prompt.id} className="flex space-x-2 mb-2 items-center">
                                    <input
                                        type="text"
                                        name="title"
                                        value={prompt.title}
                                        placeholder="Título"
                                        onChange={(e) => handleNewCategoryChange(e, index)}
                                        className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button
                                        onClick={() => removePrompt(index)}
                                        className="text-gray-400 hover:text-red-500 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addPrompt}
                                className="text-sm text-custom-secondary hover:text-indigo-800 transition"
                            >
                                + Añadir Prompt
                            </button>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={createCategory}
                                className="px-4 py-2 rounded-md bg-custom-primary text-white hover:bg-indigo-500 transition"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PromptSidebar;
