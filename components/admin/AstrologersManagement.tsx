import React, { useState } from 'react';
import { Astrologer } from '../../types';
import PlusIcon from '../icons/PlusIcon';

interface AstrologersManagementProps {
    astrologers: Astrologer[];
    onUpdateAstrologers: (astrologers: Astrologer[]) => void;
}

const AstrologersManagement: React.FC<AstrologersManagementProps> = ({ astrologers: initialAstrologers, onUpdateAstrologers }) => {
    const [astrologers, setAstrologers] = useState(initialAstrologers);
    const [editingAstrologer, setEditingAstrologer] = useState<Astrologer | null>(null);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        onUpdateAstrologers(astrologers);
        setEditingAstrologer(null);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleAddNew = () => {
        const newAstrologer: Astrologer = {
            id: `astro${Date.now()}`,
            name: 'New Astrologer',
            photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib.rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            specializations: [],
            experience: 0,
            bio: '',
            meetLink: 'https://meet.google.com',
        };
        setAstrologers([...astrologers, newAstrologer]);
        setEditingAstrologer(newAstrologer);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this astrologer?')) {
            const newAstrologers = astrologers.filter(a => a.id !== id);
            setAstrologers(newAstrologers);
            onUpdateAstrologers(newAstrologers);
        }
    };
    
    const handleEditorChange = (field: keyof Astrologer, value: string | number | string[]) => {
        if (editingAstrologer) {
            const updatedAstrologer = { ...editingAstrologer, [field]: value };
            setEditingAstrologer(updatedAstrologer);
            setAstrologers(astrologers.map(a => a.id === updatedAstrologer.id ? updatedAstrologer : a));
        }
    };

    if (editingAstrologer) {
        return (
             <div>
                 <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">Editing Astrologer</h3>
                <div className="space-y-4 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <input type="text" placeholder="Name" value={editingAstrologer.name} onChange={e => handleEditorChange('name', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                    <input type="number" placeholder="Experience (years)" value={editingAstrologer.experience} onChange={e => handleEditorChange('experience', Number(e.target.value))} className="w-full bg-theme-border p-2 rounded-md" />
                    <input type="text" placeholder="Photo URL" value={editingAstrologer.photo} onChange={e => handleEditorChange('photo', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                    <input type="text" placeholder="Google Meet Link" value={editingAstrologer.meetLink} onChange={e => handleEditorChange('meetLink', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                    <textarea placeholder="Specializations (comma-separated)" value={editingAstrologer.specializations.join(', ')} onChange={e => handleEditorChange('specializations', e.target.value.split(',').map(s => s.trim()))} className="w-full bg-theme-border p-2 rounded-md" />
                    <textarea rows={4} placeholder="Bio" value={editingAstrologer.bio} onChange={e => handleEditorChange('bio', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingAstrologer(null)} className="bg-theme-border px-4 py-2 rounded-lg font-semibold hover:bg-theme-border/80">Back</button>
                    <button onClick={handleSave} className="bg-theme-accent-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Save</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Manage the astrologers available for consultation.</p>
                <div className="flex items-center gap-2">
                    {showSaved && <span className="text-green-500 text-sm">Changes Saved!</span>}
                    <button onClick={handleAddNew} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                        <PlusIcon className="h-5 w-5" /> Add Astrologer
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {astrologers.map(astro => (
                    <div key={astro.id} className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border flex gap-4">
                       <img src={astro.photo} alt={astro.name} className="w-24 h-24 object-cover rounded-md" />
                       <div className="flex-grow">
                           <h4 className="font-bold">{astro.name}</h4>
                           <p className="text-xs text-theme-text-secondary">{astro.experience} years experience</p>
                           <p className="text-sm mt-2 line-clamp-2">{astro.specializations.join(', ')}</p>
                           <div className="flex gap-2 mt-2">
                                <button onClick={() => setEditingAstrologer(astro)} className="text-xs bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-full">Edit</button>
                                <button onClick={() => handleDelete(astro.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Delete</button>
                           </div>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AstrologersManagement;