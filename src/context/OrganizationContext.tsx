import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Team {
    name: string;
    members: { name: string; role: string; initial: string }[];
}

interface Organization {
    id: string;
    name: string;
    description: string;
    avatar: string;
    website: string;
    location: string;
    founded: string;
    employees: number;
    contactEmail: string;
    mission: string;
    vision: string;
    currentProjects: string[];
    awards: string[];
    metrics: {
        yearlyGrowth: string;
        activeProjects: number;
        communityImpact: string;
        awardsWon: number;
    };
    teams: Team[];
}

interface OrganizationState {
    organizations: Organization[];
    activeOrganization: Organization | null;
}

type OrganizationAction =
    | { type: 'SET_ACTIVE_ORGANIZATION'; payload: string }
    | { type: 'ADD_ORGANIZATION'; payload: Organization }
    | { type: 'ADD_TEAM_TO_ORGANIZATION'; payload: { organizationId: string; team: Team } };

const initialOrganizations: Organization[] = [
    {
        id: uuidv4(),
        name: 'Tech Software Innovations',
        description: 'Organización enfocada en proyectos de software innovadores y de código abierto.',
        avatar: 'https://icon-library.com/images/icon-png-logos/icon-png-logos-0.jpg',
        website: 'tech-innovations.com',
        location: 'Global',
        founded: '2015',
        employees: 120,
        contactEmail: 'contact@tech-innovations.com',
        mission: 'To create impactful and open-source software solutions for global challenges.',
        vision: 'To become a global leader in open-source innovation.',
        currentProjects: [
            'Open-source sustainability tools',
            'AI-powered code analyzers',
            'Community-driven coding bootcamps',
        ],
        awards: [
            'Best Open-Source Initiative 2021',
            'Innovation in Technology Award 2020',
        ],
        metrics: {
            yearlyGrowth: '20%',
            activeProjects: 12,
            communityImpact: '10,000+ developers trained',
            awardsWon: 5,
        },
        teams: [
            {
                name: 'Development Team',
                members: [
                    { name: 'Michael Gough', role: 'React Developer', initial: 'M' },
                    { name: 'Neil Sims', role: 'Vue.js Developer', initial: 'N' },
                ],
            },
            {
                name: 'Marketing Team',
                members: [
                    { name: 'Jese Leos', role: 'SEO & Marketing', initial: 'J' },
                    { name: 'Lana Byrd', role: 'Web Designer', initial: 'L' },
                ],
            },
        ],
    },
    {
        id: uuidv4(),
        name: 'Green Earth Org',
        description: 'Promoviendo iniciativas sostenibles y ecológicas a nivel global.',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKe1om3KAlkhbr9Tn7e3yOjCQSxU81dhe5VA&s',
        website: 'green-earth.org',
        location: 'Global',
        founded: '2012',
        employees: 80,
        contactEmail: 'info@green-earth.org',
        mission: 'To create a greener and more sustainable planet for future generations.',
        vision: 'To be the leading organization in sustainability and ecological initiatives.',
        currentProjects: [
            'Renewable energy research',
            'Community recycling programs',
            'Forest restoration campaigns',
        ],
        awards: [
            'Excellence in Sustainability 2022',
            'Top Environmental Organization 2020',
        ],
        metrics: {
            yearlyGrowth: '15%',
            activeProjects: 8,
            communityImpact: '5,000+ families supported',
            awardsWon: 3,
        },
        teams: [
            {
                name: 'Operations Team',
                members: [
                    { name: 'Leslie Livingston', role: 'Graphic Designer', initial: 'L' },
                    { name: 'Joseph Mcfall', role: 'Sales', initial: 'J' },
                    { name: 'Leslie Livingston', role: 'Graphic Designer', initial: 'L' },
                    { name: 'Joseph Mcfall', role: 'Sales', initial: 'J' },
                    { name: 'Leslie Livingston', role: 'Graphic Designer', initial: 'L' },
                    { name: 'Joseph Mcfall', role: 'Sales', initial: 'J' },
                ],
            },
            {
                name: 'Sustainability Team',
                members: [
                    { name: 'Bonnie Green', role: 'CEO/Co-founder', initial: 'B' },
                    { name: 'Helene Engels', role: 'CTO/Co-founder', initial: 'H' },
                ],
            },
        ],
    },
];

const initialState: OrganizationState = {
    organizations: initialOrganizations,
    activeOrganization: initialOrganizations[0] || null, // Primera organización como activa
};

// Reducer
const organizationReducer = (
    state: OrganizationState,
    action: OrganizationAction
): OrganizationState => {
    switch (action.type) {
        case 'SET_ACTIVE_ORGANIZATION':
            const activeOrg = state.organizations.find(
                (org) => org.id === action.payload
            );
            if (activeOrg) {
                localStorage.setItem('activeOrganization', JSON.stringify(activeOrg));
            }
            return { ...state, activeOrganization: activeOrg || null };

        case 'ADD_ORGANIZATION':
            const newOrganizations = [...state.organizations, action.payload];
            return { ...state, organizations: newOrganizations };

        case 'ADD_TEAM_TO_ORGANIZATION': {
            const { organizationId, team } = action.payload;
            const updatedOrganizations = state.organizations.map((org) =>
                org.id === organizationId
                    ? { ...org, teams: [...org.teams, team] }
                    : org
            );
            const activeOrg = updatedOrganizations.find(
                (org) => org.id === state.activeOrganization?.id
            );

            return { ...state, organizations: updatedOrganizations, activeOrganization: activeOrg || null };
        }

        default:
            return state;
    }
};

// Contexto
const OrganizationContext = createContext<{
    state: OrganizationState;
    dispatch: React.Dispatch<OrganizationAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

// Proveedor del Contexto
export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(organizationReducer, initialState, (initial) => {
        const storedActiveOrg = localStorage.getItem('activeOrganization');
        const activeOrganization = storedActiveOrg
            ? JSON.parse(storedActiveOrg)
            : initial.organizations[0] || null; // Primera organización como fallback
        return { ...initial, activeOrganization };
    });

    return (
        <OrganizationContext.Provider value={{ state, dispatch }}>
            {children}
        </OrganizationContext.Provider>
    );
};

// Hook personalizado
export const useOrganization = () => {
    return useContext(OrganizationContext);
};
