import { HARVEY_REST_API_URL } from "@src/config/env";

class PromptCategoryService {
    private idToken: string | null;

    constructor(idToken: string) {
        this.idToken = idToken;
    }

    async getPromptCategories(): Promise<any> {
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/prompts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.idToken}`
                },
                body: JSON.stringify({
                    action: 'get_prompt_categories'
                }),
            });

            const data = await response.json();
            return JSON.parse(data.body); 
        } catch (error) {
            console.error('Error fetching prompt categories:', error);
            throw error;
        }
    }

    async createPromptCategory(category: string, isOpen: boolean, prompts: { id: string; title: string }[]): Promise<any> {
        try {
            if (!this.idToken) {
                throw new Error("Missing idToken. Authentication may be required.");
            }

            const response = await fetch(`${HARVEY_REST_API_URL}/prompts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.idToken}`
                },
                body: JSON.stringify({
                    action: 'create_prompt_category',
                    new_category: {
                        category: category,
                        isOpen: isOpen,
                        prompts: prompts
                    }
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating prompt category:", error);
            throw error;
        }
    }
}

export default PromptCategoryService;
