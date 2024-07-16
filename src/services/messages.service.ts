import { INFERENCE_API_DOMAIN } from "../config/env";

class MessageService {
    constructor() {}

    async sendMessage(message: string): Promise<any> {
        try {
            const response = await fetch(`https://phhz2fa35i.execute-api.us-west-2.amazonaws.com/inference`, {
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