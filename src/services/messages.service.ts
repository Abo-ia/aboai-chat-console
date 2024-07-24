import { IABOGADO_API_URL } from "@src/config/env";

class MessageService {
    constructor() { }

    async sendMessage(message: string): Promise<any> {
        try {
            const response = await fetch(
                `${IABOGADO_API_URL}/inference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_query: message,
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
}

export default MessageService;