import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import OrganizationsService from '@src/services/organization.service';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Organization } from '@src/types/organization.interface';

interface OrganizationState {
    organizations: Organization[];
    activeOrganization: Organization | null;
}

type OrganizationAction =
    | { type: 'CONSULT_ORGANIZATIONS_BY_USER'; payload: Organization[] }
    | { type: 'SET_ACTIVE_ORGANIZATION'; payload: Organization }
    | { type: 'CREATE_ORGANIZATION'; payload: Organization };

const initialState: OrganizationState = {
    organizations: [],
    activeOrganization: null,
};

const organizationReducer = (state: OrganizationState, action: OrganizationAction): OrganizationState => {
    switch (action.type) {
        case 'CONSULT_ORGANIZATIONS_BY_USER':
            return {
                ...state,
                organizations: action.payload
            };
        case 'SET_ACTIVE_ORGANIZATION':
            return {
                ...state,
                activeOrganization: action.payload
            };
        case 'CREATE_ORGANIZATION':
            return {
                ...state,
                organizations: [...state.organizations, action.payload],
                activeOrganization: action.payload
            };
        default:
            return state;
    }
};

const OrganizationContext = createContext<{
    state: OrganizationState;
    dispatch: React.Dispatch<OrganizationAction>;
    setActiveOrganization: (organization: Organization) => void;
    createOrganization: (
        organization_name: string,
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
    ) => Promise<void>;
    inviteUserToOrganization: (organization_id: string, email: string, role?: string) => Promise<void>;
}>({
    state: initialState,
    dispatch: () => null,
    setActiveOrganization: () => { },
    createOrganization: async () => { },
    inviteUserToOrganization: async () => { },
});

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(organizationReducer, initialState);
    const [authEmail, setAuthEmail] = useState<string | null>(null);
    const [authUserId, setAuthUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const consultOrganizationsByUser = async (email: string) => {
        const idToken = localStorage.getItem('idToken') || '';
        const service = new OrganizationsService(idToken);
        try {
            const organizations = await service.getUserOrganizations(email);
            dispatch({ type: 'CONSULT_ORGANIZATIONS_BY_USER', payload: organizations });

            const savedOrganizationId = localStorage.getItem('activeOrganizationId');
            const foundOrganization = organizations.find((org: any) => org.organization_id === savedOrganizationId);

            if (foundOrganization) {
                dispatch({ type: 'SET_ACTIVE_ORGANIZATION', payload: foundOrganization });
            } else if (organizations.length > 0) {
                dispatch({ type: 'SET_ACTIVE_ORGANIZATION', payload: organizations[0] });
                localStorage.setItem('activeOrganization', organizations[0]);
            }

        } catch (error) {
            console.error('Error fetching organizations:', error);
        }
    };

    const setActiveOrganization = (organization: Organization) => {
        dispatch({ type: 'SET_ACTIVE_ORGANIZATION', payload: organization });
        localStorage.setItem('activeOrganization', JSON.stringify(organization));
    };

    const createOrganization = async (
        organization_name: string,
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
    ) => {
        if (!authUserId || !authEmail) {
            console.error("No se puede crear la organización porque falta información del usuario autenticado.");
            return;
        }

        const idToken = localStorage.getItem('idToken') || '';
        const service = new OrganizationsService(idToken);

        console.log(authEmail, authUserId);

        try {
            const newOrganization = await service.createOrganization(
                organization_name,
                authUserId,
                authEmail,
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
            );

            dispatch({ type: 'CREATE_ORGANIZATION', payload: newOrganization });

            localStorage.setItem('activeOrganization', newOrganization);

            window.location.reload();
        } catch (error) {
            console.error('Error creando la organización:', error);
        }
    };

    const inviteUserToOrganization = async (organization_id: string, email: string, role: string = "member") => {
        const idToken = localStorage.getItem('idToken') || '';
        const service = new OrganizationsService(idToken);

        try {
            await service.inviteUserToOrganization(organization_id, email, role);
            window.location.reload();
        } catch (error) {
            console.error("Error invitando usuario a la organización:", error);
        }
    };

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const attributes = await fetchUserAttributes();
                if (attributes.email && attributes.sub) {
                    setAuthEmail(attributes.email);
                    setAuthUserId(attributes.sub);
                }
            } catch (err) {
                console.error('Error al obtener atributos del usuario:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAttributes();
    }, []);

    useEffect(() => {
        if (authEmail) {
            consultOrganizationsByUser(authEmail);
        }
    }, [authEmail]);

    return (
        <OrganizationContext.Provider value={{
            state,
            dispatch,
            setActiveOrganization,
            createOrganization,
            inviteUserToOrganization
        }}>
            {children}
        </OrganizationContext.Provider>
    );
};

export const useOrganization = () => useContext(OrganizationContext);
