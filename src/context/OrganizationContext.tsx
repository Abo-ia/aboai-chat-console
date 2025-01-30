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
    createOrganization: (organization_name: string) => Promise<void>;
}>({
    state: initialState,
    dispatch: () => null,
    setActiveOrganization: () => {},
    createOrganization: async () => {},
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
                localStorage.setItem('activeOrganizationId', organizations[0].organization_id);
            }

        } catch (error) {
            console.error('Error fetching organizations:', error);
        }
    };

    const setActiveOrganization = (organization: Organization) => {
        dispatch({ type: 'SET_ACTIVE_ORGANIZATION', payload: organization });
        localStorage.setItem('activeOrganizationId', organization.organization_id); // 🔹 Guardar en localStorage
    };

    const createOrganization = async (organization_name: string) => {
        if (!authUserId || !authEmail) {
            console.error("No se puede crear la organización porque falta información del usuario autenticado.");
            return;
        }

        const idToken = localStorage.getItem('idToken') || '';
        const service = new OrganizationsService(idToken);

        try {
            const newOrganization = await service.createOrganization(
                organization_name,
                authUserId,
                authEmail
            );
            dispatch({ type: 'CREATE_ORGANIZATION', payload: newOrganization });

            localStorage.setItem('activeOrganizationId', newOrganization.organization_id);
            
            window.location.reload();
        } catch (error) {
            console.error('Error creando la organización:', error);
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
        <OrganizationContext.Provider value={{ state, dispatch, setActiveOrganization, createOrganization }}>
            {children}
        </OrganizationContext.Provider>
    );
};

export const useOrganization = () => useContext(OrganizationContext);
