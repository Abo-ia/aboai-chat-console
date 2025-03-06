import { HARVEY_REST_API_URL } from "@src/config/env";

class MessageService {
    private idToken: string | null;

    constructor(idToken: string) {
        this.idToken = idToken;
    }

    async createConversation(userId: string, message: string): Promise<any> {
        console.log('Service: Creating conversation - createConversation');
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/api-chat-registry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.idToken}`
                },
                body: JSON.stringify({
                    userId,
                    instruction: 'CREATE_CONVERSATION',
                    conversationName: message,
                }),
            });
            const data = await response.json();
            console.log('Service: Created conversation:', data);
            return data;
        } catch (error) {
            console.error('Error creating conversation:', error);
            throw error;
        }
    }    

    async sendMessage(
        message: string, 
        userId: string, 
        conversationId: string, 
        chatThread: string,
        knowledgeBaseId: string
    ): Promise<any> {
        try {
            if (!this.idToken) {
                throw new Error("Missing idToken. Authentication may be required.");
            }
    
            const response = await fetch(`${HARVEY_REST_API_URL}/api-chat-inference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.idToken}`
                },
                body: JSON.stringify({
                    userId: userId,
                    conversationId: conversationId,
                    chatThread: chatThread,
                    instruction: 'ADD_MESSAGE',
                    prompt: message,
                    timestamp: new Date().toISOString(),
                    knowledgeBaseId: knowledgeBaseId
                }),
            });
    
            const data = await response.json(); 
            const output = JSON.parse(data.body);

            return output;
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw error;
        }
    }
}

export default MessageService;
