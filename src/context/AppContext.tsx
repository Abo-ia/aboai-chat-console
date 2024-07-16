import { createContext, useState } from "react"
import { AppContextType, AppProviderProps } from "@src/types/types";


export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider(props: AppProviderProps) {

    const [showModal, setShowModal] = useState(false);

    const appContext: AppContextType = {
        showModal: showModal,
        setShowModal: setShowModal
    }

    return (
        <AppContext.Provider value={appContext}>
            {props.children}
        </AppContext.Provider>
    )
}