import { useEffect, useState } from "react";
import SyncKnowledgeBase from "@src/services/syncKnowledgeBase.service";
import { useOrganization } from "@src/context/OrganizationContext";

const OrganizationSyncs = () => {
    const { state } = useOrganization();
    const { activeOrganization } = state;

    const [loading, setLoading] = useState(false);
    const [syncHistory, setSyncHistory] = useState<any[]>([]);

    useEffect(() => {
        const fetchSyncHistory = async () => {
            setLoading(true);
            try {
                const organizationsService = new SyncKnowledgeBase("idToken");
                const history = await organizationsService.getSyncKnowledgeBaseStatus(
                    activeOrganization?.knowledge_base_id || "",
                    activeOrganization?.data_source_id || ""
                );
                setSyncHistory(Array.isArray(history) ? history : []);
            } catch (error) {
                console.error("Error fetching sync history:", error);
                setSyncHistory([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchSyncHistory();
    }, [
        activeOrganization?.knowledge_base_id,
        activeOrganization?.data_source_id,
    ]);

    return (
        <section className="overflow-y-auto h-[60vh]">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-4">
                <div className="bg-white relative -md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <h2 className="text-lg font-semibold text-gray-800">Historial de Sincronización</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">ID de Trabajo</th>
                                    <th scope="col" className="px-4 py-3">Inicio</th>
                                    <th scope="col" className="px-4 py-3">Finalización</th>
                                    <th scope="col" className="px-4 py-3">Estado</th>
                                    <th scope="col" className="px-4 py-3">Archivos Procesados</th>
                                    <th scope="col" className="px-4 py-3">Modificados</th>
                                    <th scope="col" className="px-4 py-3">Eliminados</th>
                                    <th scope="col" className="px-4 py-3">Fallidos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-4 text-gray-500">
                                            Cargando historial...
                                        </td>
                                    </tr>
                                ) : syncHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-4 text-gray-500">
                                            No hay registros de sincronización.
                                        </td>
                                    </tr>
                                ) : (
                                    syncHistory.map((sync, index) => (
                                        <tr key={index} className="border-b dark:border-gray-700">
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {sync.jobId}
                                            </td>
                                            <td className="px-4 py-3">{new Date(sync.startTime).toLocaleString()}</td>
                                            <td className="px-4 py-3">{new Date(sync.endTime).toLocaleString()}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                                                        sync.status === "COMPLETE"
                                                            ? "bg-green-100 text-green-700"
                                                            : sync.status === "FAILED"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {sync.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{sync.sourceFiles}</td>
                                            <td className="px-4 py-3">{sync.modified}</td>
                                            <td className="px-4 py-3">{sync.deleted}</td>
                                            <td className="px-4 py-3">{sync.failedFiles}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrganizationSyncs;