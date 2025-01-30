import { HARVEY_REST_API_URL } from "@src/config/env";

class OrganizationsService {
    private idToken: string | null;

    constructor(idToken: string) {
        this.idToken = idToken;
    }

    async createOrganization(
        organization_name: string,
        owner_id: string,
        owner_email: string
    ): Promise<any> {
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/organizations/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.idToken}`,
                },
                body: JSON.stringify({
                    organization_name,
                    owner_id,
                    owner_email,
                }),
            });

            if (!response.ok) {
                throw new Error("Error creating organization");
            }

            const jsonResponse = await response.json();
            return jsonResponse.body;
        } catch (error) {
            console.error("Service: Error creating organization:", error);
            throw error;
        }
    }

    async getUserOrganizations(email: string): Promise<any> {
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/organizations/consult`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.idToken}`,
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error("Error fetching user organizations");
            }

            const jsonResponse = await response.json();
            return jsonResponse.body.organizations;
        } catch (error) {
            console.error("Service: Error fetching user organizations:", error);
            throw error;
        }
    }
}

export default OrganizationsService;
