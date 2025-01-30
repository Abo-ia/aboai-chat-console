import React, { useState } from "react";
import { useOrganization } from "@src/context/OrganizationContext";

const OrganizationTeams: React.FC = () => {
    const { state, dispatch } = useOrganization();
    const { activeOrganization } = state;

    const [showModal, setShowModal] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [teamMembers, setTeamMembers] = useState([{ name: "", role: "" }]);

    if (!activeOrganization) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">No active organization selected</p>
            </div>
        );
    }

    const teams = activeOrganization.teams || [];
    const MAX_MEMBERS_DISPLAYED = 4;

    const handleAddMember = () => {
        setTeamMembers([...teamMembers, { name: "", role: "" }]);
    };

    const handleMemberChange = (index: number, field: "name" | "role", value: string) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index][field] = value;
        setTeamMembers(updatedMembers);
    };

    // const handleCreateTeam = () => {
    //     const newTeam = {
    //         name: teamName,
    //         members: teamMembers
    //             .filter((member) => member.name && member.role) // Filtra miembros válidos
    //             .map((member) => ({
    //                 ...member,
    //                 initial: member.name[0]?.toUpperCase() || "", // Genera el campo initial
    //             })),
    //     };

    //     dispatch({
    //         type: "ADD_TEAM_TO_ORGANIZATION",
    //         payload: {
    //             organizationId: activeOrganization.id,
    //             team: newTeam,
    //         },
    //     });

    //     setShowModal(false);
    //     setTeamName("");
    //     setTeamMembers([{ name: "", role: "" }]);
    // };


    return (
        <section className="bg-white overflow-y-auto h-[50vh]">
            <div className="py-6 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-6">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-left">
                        <h2 className="text-2xl font-extrabold text-gray-900">
                            Equipos {">"} {activeOrganization.name} ({teams.length})
                        </h2>
                        <p className="font-light text-gray-500 sm:text-lg">
                            Conoce a las personas que hacen posible que nuestra organización siga creciendo.
                        </p>
                    </div>
                    <button
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition"
                        onClick={() => setShowModal(true)}
                    >
                        + Crear Equipo
                    </button>
                </div>

                {teams.length > 0 ? (
                    <div className="grid gap-8 lg:gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {teams.map((team, teamIndex) => (
                            <div
                                key={teamIndex}
                                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            >
                                <h3 className="text-lg font-bold text-teal-600 mb-4">{team.name}</h3>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                                    {team.members.slice(0, MAX_MEMBERS_DISPLAYED).map((member, memberIndex) => (
                                        <div
                                            key={memberIndex}
                                            className="flex flex-col items-center text-center text-gray-500"
                                        >
                                            <div
                                                className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-full border-4 border-white shadow-md mb-2 bg-green-100 text-xl font-bold text-green-500"
                                            >
                                                {member.name[0]}
                                            </div>
                                            <h4 className="mb-1 text-sm font-semibold text-gray-900">{member.name}</h4>
                                            <p className="text-xs">{member.role}</p>
                                        </div>
                                    ))}
                                </div>
                                {team.members.length > MAX_MEMBERS_DISPLAYED && (
                                    <button
                                        className="mt-4 text-teal-600 text-sm font-medium hover:underline"
                                        onClick={() => alert(`Mostrar todos los miembros del equipo: ${team.name}`)}
                                    >
                                        + {team.members.length - MAX_MEMBERS_DISPLAYED} más
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 text-lg">
                        <p>No hay equipos registrados para esta organización.</p>
                    </div>
                )}
            </div>

            {/* Modal para crear equipo */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Crear Nuevo Equipo</h3>
                        <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Nombre del equipo"
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                        <div className="space-y-4">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        value={member.name}
                                        onChange={(e) =>
                                            handleMemberChange(index, "name", e.target.value)
                                        }
                                        className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Rol"
                                        value={member.role}
                                        onChange={(e) =>
                                            handleMemberChange(index, "role", e.target.value)
                                        }
                                        className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="mt-4 text-teal-600 text-sm hover:underline"
                            onClick={handleAddMember}
                        >
                            + Agregar Miembro
                        </button>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            {/* <button
                                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                                onClick={handleCreateTeam}
                            >
                                Guardar Equipo
                            </button> */}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrganizationTeams;
