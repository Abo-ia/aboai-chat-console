export interface Member {
    user_id: string;
    email: string;
    role: string;
}

export interface Organization {
    organization_id: string;
    name: string;
    owner_id: string;
    created_at: string;
    tier: string;
    status: string;
    limits: {
        user_limit: number;
        storage_limit_gb: number;
    };
    region: string;
    members: Member[];
    practice_areas: string[];
    bar_association: string;
    registration_number: string;
    legal_structure: string;
    operating_countries: string[];
    contact_email: string;
    contact_phone: string;
    clients_served: number;
    active_cases: number;
    legal_documents: string[];
}
