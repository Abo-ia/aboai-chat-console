import React, { useState } from 'react';

const OrganizationsSettings = () => {
    const [settings, setSettings] = useState({
        organizationName: '',
        contactEmail: '',
        allowExternalSharing: false,
        enableNotifications: true,
    });

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Settings saved:', settings);
    };

    return (
        <section className="bg-white overflow-y-auto h-[60vh] p-6 rounded-2xl mx-auto max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                    <div className="grid gap-5">
                        <div className="flex flex-col">
                            <label
                                className="text-sm font-medium text-gray-700"
                                htmlFor="organizationName"
                            >
                                Organization Name
                            </label>
                            <input
                                type="text"
                                id="organizationName"
                                name="organizationName"
                                value={settings.organizationName}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-gray-900 shadow-sm"
                                placeholder="Enter organization name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                className="text-sm font-medium text-gray-700"
                                htmlFor="contactEmail"
                            >
                                Contact Email
                            </label>
                            <input
                                type="email"
                                id="contactEmail"
                                name="contactEmail"
                                value={settings.contactEmail}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 text-gray-900 shadow-sm"
                                placeholder="Enter contact email"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800">Permissions</h2>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="allowExternalSharing"
                            name="allowExternalSharing"
                            checked={settings.allowExternalSharing}
                            onChange={handleInputChange}
                            className="h-5 w-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="allowExternalSharing" className="text-sm text-gray-700">
                            Allow external sharing of resources
                        </label>
                    </div>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800">Advanced Settings</h2>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="enableNotifications"
                            name="enableNotifications"
                            checked={settings.enableNotifications}
                            onChange={handleInputChange}
                            className="h-5 w-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="enableNotifications" className="text-sm text-gray-700">
                            Enable email notifications
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-lg text-sm font-medium text-white bg-custom-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </section>
    );
};

export default OrganizationsSettings;
