import { HARVEY_REST_API_URL } from "@src/config/env";

class SyncKnowledgeBase {
    private idToken: string | null;

    constructor(idToken: string) {
        this.idToken = idToken;
    }

    async syncKnowledgeBase(): Promise<any> {
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/api/ingestion`, {
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
    async getSyncKnowledgeBaseStatus(): Promise<any> {
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/api/sync-history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.idToken}`
                },
            })
            const data = await response.json();
            return JSON.parse(data.body);
        }catch (error) {
            console.error('Error getting sync knowledge base status:', error);
            throw error;
        }
    }
}

export default SyncKnowledgeBase;