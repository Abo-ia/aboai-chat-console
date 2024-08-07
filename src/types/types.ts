import { ReactNode } from "react";

interface AppContextType {
    setShowModal: (showModal: boolean) => void;
    showModal: boolean; 
    setUploadFileShowModal: (uploadFileShowModal: boolean) => void;
    uploadFileShowModal: boolean;
}

interface AppProviderProps {
    children: ReactNode;
}

interface AuthProviderProps {
    children: ReactNode;
}

export type {
    AuthProviderProps,
    AppContextType,
    AppProviderProps
}