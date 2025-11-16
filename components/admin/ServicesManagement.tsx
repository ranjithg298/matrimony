import React, { useState } from 'react';
import { Service } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface ServicesManagementProps {
    services: Service[];
    onUpdateServices: (services: Service[]) => void;
}

const ServicesManagement: React.FC<ServicesManagementProps> = ({ services: initialServices, onUpdateServices }) => {
    const [services, setServices] = useState(initialServices);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        onUpdateServices(services);
        setEditingService(null);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleAddNew = () => {
        const newService: Service = {
            id: `serv${Date.now()}`,
            title: 'New Service',
            slug: 'new-service',
            description: 'A short description for the homepage card.',
            content: '<h1>New Service Page</h1><p>Full content for the dedicated service page goes here.</p>',
        };
        setServices([...services, newService]);
        setEditingService(newService);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            const newServices = services.filter(s => s.id !== id);
            setServices(newServices);
            onUpdateServices(newServices);
        }
    };

    const handleEditorChange = (field: keyof Service, value: string) => {
        if (editingService) {
            const updatedService = { ...editingService, [field]: value };
            setEditingService(updatedService);
            setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
        }
    };

    if (editingService) {
        return (
             <div>
                 <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">Editing Service</h3>
                <div className="space-y-4 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Service Title" value={editingService.title} onChange={e => handleEditorChange('title', e.target.value)} className="bg-theme-border p-2 rounded-md" />
                        <input type="text" placeholder="URL Slug" value={editingService.slug} onChange={e => handleEditorChange('slug', e.target.value)} className="bg-theme-border p-2 rounded-md" />
                    </div>
                    <textarea placeholder="Short description for homepage" rows={3} value={editingService.description} onChange={e => handleEditorChange('description', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                    <textarea rows={10} placeholder="Full page content (HTML)" value={editingService.content} onChange={e => handleEditorChange('content', e.target.value)} className="w-full bg-theme-border p-2 rounded-md font-mono text-sm" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingService(null)} className="bg-theme-border px-4 py-2 rounded-lg font-semibold hover:bg-theme-border/80">Back</button>
                    <button onClick={handleSave} className="bg-theme-accent-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Save Service</button>
                </div>
            </div>
        );
    }


    return (
        <div>
             <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Manage the services displayed on your homepage and their dedicated pages.</p>
                <div className="flex items-center gap-2">
                    {showSaved && <span className="text-green-500 text-sm">Changes Saved!</span>}
                    <button onClick={handleAddNew} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                        <PlusIcon className="h-5 w-5" /> Add New Service
                    </button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Title</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Slug</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                             <tr key={service.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                                <td className="p-3 font-medium">{service.title}</td>
                                <td className="p-3 font-mono text-xs">/services/{service.slug}</td>
                                <td className="p-3 space-x-2">
                                    <button onClick={() => setEditingService(service)} className="text-xs bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-full">Edit</button>
                                    <button onClick={() => handleDelete(service.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicesManagement;