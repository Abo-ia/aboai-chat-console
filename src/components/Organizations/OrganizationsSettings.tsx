import React, { useState } from "react";

const OrganizationsSettings = () => {
    const [settings, setSettings] = useState({
        organizationName: "",
        contactEmail: "",
        allowExternalSharing: false,
        enableNotifications: true,
    });

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Settings saved:", settings);
        // Add logic to save settings to a server or API here
    };

    return (
        <section className="bg-white overflow-y-auto h-[60vh] p-6 rounded-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Organization Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Info */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Basic Information</h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="organizationName">
                                Organization Name
                            </label>
                            <input
                                type="text"
                                id="organizationName"
                                name="organizationName"
                                value={settings.organizationName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter organization name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="contactEmail">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                id="contactEmail"
                                name="contactEmail"
                                value={settings.contactEmail}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter contact email"
                            />
                        </div>
                    </div>
                </div>

                {/* Permissions */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Permissions</h2>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="allowExternalSharing"
                            name="allowExternalSharing"
                            checked={settings.allowExternalSharing}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="allowExternalSharing" className="ml-2 text-sm text-gray-700">
                            Allow external sharing of resources
                        </label>
                    </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Advanced Settings</h2>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="enableNotifications"
                            name="enableNotifications"
                            checked={settings.enableNotifications}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="enableNotifications" className="ml-2 text-sm text-gray-700">
                            Enable email notifications
                        </label>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </section>
    );
};

export default OrganizationsSettings;
