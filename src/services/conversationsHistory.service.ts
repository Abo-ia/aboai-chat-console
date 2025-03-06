import { HARVEY_REST_API_URL } from "@src/config/env";

class ConversationsHistoryService {
    private idToken: string | null;

    constructor(idToken: string) {
        this.idToken = idToken;
    }

    async getConversationsHistory(userId: string): Promise<any> {
        console.log('Service: Getting conversations history - getConversationsHistory');

        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/api-chat-registry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.idToken}`
                },
                body: JSON.stringify({
                    userId: userId,
                    instruction: 'GET_CONVERSATIONS_BY_USER',
                }),
            });
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Service: Error getting conversations history:', error);
            throw error;
        }
    }    

    async getConversation(userId: string, conversationId: string): Promise<any> {
        console.log('Service: Getting conversation - getConversation');

        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/api-chat-registry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.idToken}`
                },
                body: JSON.stringify({
                    userId: userId,
                    conversationId: conversationId,
                    instruction: 'GET_CONVERSATIONS_BY_ID',
                }),
            });
            const data = await response.json();
            const body = JSON.parse(data.body);
            return body;
        } catch (error) {
            console.error('Service: Error getting conversation:', error);
            throw error;
        }
    }
}    
    

export default ConversationsHistoryService;