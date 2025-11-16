import React, { useState } from 'react';
import { Attribute, AttributeType } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface AttributeBuilderProps {
    attributes: Attribute[];
    onUpdateAttributes: (attributes: Attribute[]) => void;
}

const AttributeBuilder: React.FC<AttributeBuilderProps> = ({ attributes: initialAttributes, onUpdateAttributes }) => {
    const [attributes, setAttributes] = useState(initialAttributes);
    const [editingAttr, setEditingAttr] = useState<Attribute | null>(null);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        onUpdateAttributes(attributes);
        setEditingAttr(null);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleAddNew = () => {
        const newAttr: Attribute = {
            id: `attr${Date.now()}`,
            label: 'New Field',
            type: AttributeType.TEXT,
            options: [],
        };
        setAttributes([...attributes, newAttr]);
        setEditingAttr(newAttr);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure? Deleting an attribute will remove it from all user profiles.')) {
            const newAttrs = attributes.filter(a => a.id !== id);
            setAttributes(newAttrs);
            onUpdateAttributes(newAttrs);
        }
    };

    const handleEditorChange = (field: keyof Attribute, value: string | string[]) => {
        if (editingAttr) {
            const updatedAttr = { ...editingAttr, [field]: value };
            setEditingAttr(updatedAttr);
            setAttributes(attributes.map(a => a.id === updatedAttr.id ? updatedAttr : a));
        }
    };

    if (editingAttr) {
        return (
            <div>
                 <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">Editing Attribute</h3>
                <div className="space-y-4 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <div>
                        <label className="text-sm">Label</label>
                        <input type="text" value={editingAttr.label} onChange={e => handleEditorChange('label', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1" />
                    </div>
                     <div>
                        <label className="text-sm">Type</label>
                        <select value={editingAttr.type} onChange={e => handleEditorChange('type', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1">
                            {Object.values(AttributeType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    {(editingAttr.type === AttributeType.DROPDOWN || editingAttr.type === AttributeType.MULTISELECT) && (
                        <div>
                            <label className="text-sm">Options (one per line)</label>
                            <textarea
                                rows={5}
                                value={editingAttr.options?.join('\n') || ''}
                                onChange={e => handleEditorChange('options', e.target.value.split('\n'))}
                                className="w-full bg-theme-border p-2 rounded-md mt-1 font-mono text-sm"
                            />
                        </div>
                    )}
                </div>
                 <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingAttr(null)} className="bg-theme-border px-4 py-2 rounded-lg font-semibold hover:bg-theme-border/80">Back to List</button>
                    <button onClick={handleSave} className="bg-theme-accent-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Save Attribute</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Define the data fields for user profiles across the platform.</p>
                 <div className="flex items-center gap-2">
                    {showSaved && <span className="text-green-500 text-sm">Changes Saved!</span>}
                    <button onClick={handleAddNew} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                        <PlusIcon className="h-5 w-5" /> Add New Attribute
                    </button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Label</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Type</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.map(attr => (
                            <tr key={attr.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                                <td className="p-3 font-medium">{attr.label} {attr.isCore && <span className="text-xs text-theme-text-secondary">(Core)</span>}</td>
                                <td className="p-3"><span className="px-2 py-1 bg-theme-border text-xs rounded-full">{attr.type}</span></td>
                                <td className="p-3 space-x-2">
                                    <button onClick={() => setEditingAttr(attr)} className="text-xs bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-full">Edit</button>
                                    {!attr.isCore && <button onClick={() => handleDelete(attr.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Delete</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttributeBuilder;