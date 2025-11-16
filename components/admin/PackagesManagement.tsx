import React, { useState } from 'react';
import { PricingPlan } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface PackagesManagementProps {
    plans: PricingPlan[];
    onUpdatePlans: (plans: PricingPlan[]) => void;
}

const PackagesManagement: React.FC<PackagesManagementProps> = ({ plans: initialPlans, onUpdatePlans }) => {
    const [plans, setPlans] = useState(initialPlans);
    const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        onUpdatePlans(plans);
        setEditingPlan(null);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleAddNew = () => {
        const newPlan: PricingPlan = {
            id: `plan${Date.now()}`,
            name: 'New Package',
            price: '0',
            duration: '',
            planType: 'standard',
            description: 'New package description',
            features: [],
        };
        setPlans([...plans, newPlan]);
        setEditingPlan(newPlan);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            const newPlans = plans.filter(p => p.id !== id);
            setPlans(newPlans);
            onUpdatePlans(newPlans);
        }
    };

    const handleEditorChange = (field: keyof PricingPlan, value: string | string[] | boolean) => {
        if (editingPlan) {
            const updatedPlan = { ...editingPlan, [field]: value };
            setEditingPlan(updatedPlan);
            setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
        }
    };

    if (editingPlan) {
        return (
            <div>
                 <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">Editing Package</h3>
                <div className="space-y-4 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Package Name" value={editingPlan.name} onChange={e => handleEditorChange('name', e.target.value)} className="bg-theme-border p-2 rounded-md" />
                        <input type="text" placeholder="Price (e.g., 11 K)" value={editingPlan.price} onChange={e => handleEditorChange('price', e.target.value)} className="bg-theme-border p-2 rounded-md" />
                    </div>
                    <input type="text" placeholder="Duration Info" value={editingPlan.description} onChange={e => handleEditorChange('description', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                    <textarea 
                        rows={5} 
                        placeholder="Features (one per line)" 
                        value={Array.isArray(editingPlan.features) ? editingPlan.features.join('\n') : ''}
                        onChange={e => handleEditorChange('features', e.target.value.split('\n'))}
                        className="w-full bg-theme-border p-2 rounded-md font-mono text-sm" 
                    />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingPlan(null)} className="bg-theme-border px-4 py-2 rounded-lg font-semibold hover:bg-theme-border/80">Back</button>
                    <button onClick={handleSave} className="bg-theme-accent-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Save Package</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Manage your membership packages.</p>
                <div className="flex items-center gap-2">
                    {showSaved && <span className="text-green-500 text-sm">Changes Saved!</span>}
                    <button onClick={handleAddNew} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                        <PlusIcon className="h-5 w-5" /> Add New Package
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <div key={plan.id} className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                        <h4 className="font-bold">{plan.name}</h4>
                        <p className="text-xl font-bold">{plan.price}</p>
                        <p className="text-sm text-theme-text-secondary">{plan.description}</p>
                        <ul className="text-sm list-disc list-inside my-2">
                            {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => setEditingPlan(plan)} className="text-xs bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-full">Edit</button>
                            <button onClick={() => handleDelete(plan.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackagesManagement;