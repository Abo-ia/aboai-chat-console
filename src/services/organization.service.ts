import { HARVEY_REST_API_URL } from "@src/config/env";

class OrganizationsService {
    private idToken: string | null;

    constructor(idToken: string) {
        this.idToken = idToken;
    }

    async createOrganization(
        organization_name: string,
        owner_id: string,
        owner_email: string,
        practice_areas: string[],
        bar_association: string,
        registration_number: string,
        legal_structure: string,
        operating_countries: string[],
        contact_email: string,
        contact_phone: string,
        clients_served: number,
        active_cases: number,
        legal_documents: string[]
    ): Promise<any> {
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/api-organizations-create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.idToken}`,
                },
                body: JSON.stringify({
                    organization_name,
                    owner_id,
                    owner_email,
                    practice_areas,
                    bar_association,
                    registration_number,
                    legal_structure,
                    operating_countries,
                    contact_email,
                    contact_phone,
                    clients_served,
                    active_cases,
                    legal_documents
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


    async getUserOrganizations(email: string): Promise<any[]> {
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/api-organizations-consult`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.idToken}`,
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(`Error fetching user organizations: ${response.statusText}`);
            }

            const jsonResponse = await response.json();

            if (!jsonResponse.body || !Array.isArray(jsonResponse.body.organizations)) {
                console.error("Service: Unexpected response format", jsonResponse);
                return [];
            }

            return jsonResponse.body.organizations;
        } catch (error) {
            console.error("Service: Error fetching user organizations:", error);
            return [];
        }
    }


    async inviteUserToOrganization(organization_id: string, email: string, role: string = "member"): Promise<any> {
        try {
            const response = await fetch(`${HARVEY_REST_API_URL}/api-organizations-invite`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.idToken}`,
                },
                body: JSON.stringify({
                    organization_id,
                    user_email: email,
                    role,
                }),
            });

            if (!response.ok) {
                throw new Error("Error inviting user to organization");
            }

            const jsonResponse = await response.json();
            return jsonResponse.body;
        } catch (error) {
            console.error("Service: Error inviting user to organization:", error);
            throw error;
        }
    }
}

export default OrganizationsService;
