export interface Member {
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
}
