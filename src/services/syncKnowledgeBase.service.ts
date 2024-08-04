import { IABOGADO_API_URL } from "@src/config/env";

class SyncKnowledgeBase {
    private idToken: string | null;

    constructor(idToken: string) {
        this.idToken = idToken;
    }

    async syncKnowledgeBase(): Promise<any> {
        try {
            const response = await fetch(`${IABOGADO_API_URL}/ingestion`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.idToken}`
                },
            })
            const data = await response.json();
            return data;
        }catch (error) {
            console.error('Error syncing knowledge base:', error);
            throw error;
        }
    }
}

export default SyncKnowledgeBase;