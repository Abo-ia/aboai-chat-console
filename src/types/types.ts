import { ReactNode } from "react";

interface AppContextType {
    // Show modal
    setShowModal: (showModal: boolean) => void;
    showModal: boolean; 

    // Upload file modal
    setUploadFileShowModal: (uploadFileShowModal: boolean) => void;
    uploadFileShowModal: boolean;

    // Sync history modal
    setSyncHistoryShowModal: (syncHistoryShowModal: boolean) => void;
    syncHistoryShowModal: boolean;
}

interface AppProviderProps {
    children: ReactNode;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    owner: string;
    lastModified: string;
    size?: string;
}

export type {
    AuthProviderProps,
    AppContextType,
    AppProviderProps,
    FileItem
}