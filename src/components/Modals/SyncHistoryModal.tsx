import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@src/context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SyncKnowledgeBase from "@src/services/syncKnowledgeBase.service";
import { fetchAuthSession } from "aws-amplify/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faExclamationCircle, faHourglassHalf, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useOrganization } from '@src/context/OrganizationContext';

const SyncHistoryModal = () => {
    const appContext = useContext(AppContext);
    const [syncHistory, setSyncHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { state } = useOrganization();
    const { activeOrganization } = state;

    useEffect(() => {
        const fetchSyncHistory = async () => {
            setLoading(true);
            try {
                const session = await fetchAuthSession();
                const idToken = session?.tokens?.idToken?.toString() as string;

                const syncKnowledgeBaseInstance = new SyncKnowledgeBase(idToken);
                const response = await syncKnowledgeBaseInstance.getSyncKnowledgeBaseStatus(
                    activeOrganization?.knowledge_base_id || "",
                    activeOrganization?.data_source_id || ""
                );
                setSyncHistory(response);
            } catch (error) {
                toast.error("Error al obtener el historial de sincronización");
            } finally {
                setLoading(false);
            }
        };

        fetchSyncHistory();
    }, [
        activeOrganization?.knowledge_base_id,
        activeOrganization?.data_source_id,
    ]);

    if (!appContext?.syncHistoryShowModal) {
        return null;
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETE':
                return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
            case 'FAILED':
                return <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" />;
            case 'IN_PROGRESS':
                return <FontAwesomeIcon icon={faHourglassHalf} className="text-yellow-500" />;
            default:
                return <FontAwesomeIcon icon={faHourglassHalf} className="text-gray-500" />;
        }
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-5xl my-6 mx-auto">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className='flex flex-row justify-between px-4 py-5 border-b items-center bg-gray-100'>
                            <div className='flex items-center space-x-2'>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/5582/5582334.png"
                                    alt="Google Drive"
                                    className="w-10 h-10"
                                />
                                <h3 className='text-lg font-semibold'>
                                    Historial de sincronización
                                </h3>
                            </div>
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none"
                                type="button"
                                onClick={() => appContext?.setSyncHistoryShowModal(false)}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="relative flex-auto p-6 overflow-y-auto max-h-96">
                            {loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <FontAwesomeIcon icon={faSpinner} className="text-blue-500 animate-spin text-3xl" />
                                </div>
                            ) : syncHistory.length > 0 ? (
                                <table className="min-w-full bg-white table-auto border-collapse">
                                    <thead>
                                        <tr>
                                            {/* <th className="px-4 py-2 border">ID de Trabajo</th> */}
                                            <th className="px-4 py-2 border">Hora de Inicio</th>
                                            <th className="px-4 py-2 border">Hora de Fin</th>
                                            <th className="px-4 py-2 border">Estado</th>
                                            <th className="px-4 py-2 border">Archivos Fuente</th>
                                            <th className="px-4 py-2 border">Archivos Fallidos</th>
                                            <th className="px-4 py-2 border">Añadidos</th>
                                            <th className="px-4 py-2 border">Eliminados</th>
                                            <th className="px-4 py-2 border">Modificados</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {syncHistory.map((history, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                {/* <td className="px-4 py-2 border text-center">{history.jobId}</td> */}
                                                <td className="px-4 py-2 border text-center text-sm">{new Date(history.startTime).toLocaleString()}</td>
                                                <td className="px-4 py-2 border text-center text-sm">{new Date(history.endTime).toLocaleString()}</td>
                                                <td className="px-4 py-2 border text-center">{getStatusIcon(history.status)}</td>
                                                <td className="px-4 py-2 border text-center">{history.sourceFiles}</td>
                                                <td className="px-4 py-2 border text-center">{history.failedFiles}</td>
                                                <td className="px-4 py-2 border text-center">{history.added}</td>
                                                <td className="px-4 py-2 border text-center">{history.deleted}</td>
                                                <td className="px-4 py-2 border text-center">{history.modified}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">No hay historial de sincronización disponible</p>
                            )}
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => appContext?.setSyncHistoryShowModal(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            <ToastContainer />
        </>
    );
}

export default SyncHistoryModal;
