import { HARVEY_REST_API_URL } from '@src/config/env';

export const createComplaint = async (data: any) => {
    try {
        // Envía los datos a la API
        const apiResponse = await fetch(`${HARVEY_REST_API_URL}/api-complaints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form_data: JSON.stringify(data),
            }),
        });

        if (!apiResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await apiResponse.json();
        return JSON.parse(responseData['body']);
    } catch (error) {
        console.error('Error:', error);
    }
};
