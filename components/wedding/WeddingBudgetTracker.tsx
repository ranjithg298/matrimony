import React, { useState, useMemo } from 'react';
import { BudgetItem } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface WeddingBudgetTrackerProps {
    budgetItems: BudgetItem[];
    onUpdateBudget: (items: BudgetItem[]) => void;
}

const WeddingBudgetTracker: React.FC<WeddingBudgetTrackerProps> = ({ budgetItems: initialItems, onUpdateBudget }) => {
    const [items, setItems] = useState(initialItems);

    const handleAddItem = () => {
        const newItem: BudgetItem = { id: `b${Date.now()}`, category: 'Other', name: '', estimatedCost: 0, actualCost: 0, paid: false };
        const newItems = [...items, newItem];
        setItems(newItems);
        onUpdateBudget(newItems);
    };
    
    const handleUpdateItem = (id: string, field: keyof BudgetItem, value: string | number | boolean) => {
        const newItems = items.map(i => i.id === id ? { ...i, [field]: value } : i);
        setItems(newItems);
        onUpdateBudget(newItems);
    };

    const handleDeleteItem = (id: string) => {
        const newItems = items.filter(i => i.id !== id);
        setItems(newItems);
        onUpdateBudget(newItems);
    };

    const totals = useMemo(() => {
        return items.reduce((acc, item) => {
            acc.estimated += Number(item.estimatedCost) || 0;
            acc.actual += Number(item.actualCost) || 0;
            return acc;
        }, { estimated: 0, actual: 0 });
    }, [items]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <p className="text-sm text-theme-text-secondary">Total Estimated</p>
                    <p className="text-2xl font-bold">₹{totals.estimated.toLocaleString()}</p>
                </div>
                <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <p className="text-sm text-theme-text-secondary">Total Actual</p>
                    <p className="text-2xl font-bold">₹{totals.actual.toLocaleString()}</p>
                </div>
                 <div className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <p className="text-sm text-theme-text-secondary">Remaining</p>
                    <p className={`text-2xl font-bold ${totals.estimated - totals.actual < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        ₹{(totals.estimated - totals.actual).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Manage your wedding budget line by line.</p>
                <button onClick={handleAddItem} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                    <PlusIcon className="h-5 w-5" /> Add Item
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Item</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Estimated Cost</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actual Cost</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Paid</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b border-theme-border text-sm">
                                <td className="p-2"><input type="text" value={item.name} onChange={e => handleUpdateItem(item.id, 'name', e.target.value)} className="w-full bg-theme-border p-2 rounded-md"/></td>
                                <td className="p-2"><input type="number" value={item.estimatedCost} onChange={e => handleUpdateItem(item.id, 'estimatedCost', Number(e.target.value))} className="w-full bg-theme-border p-2 rounded-md"/></td>
                                <td className="p-2"><input type="number" value={item.actualCost} onChange={e => handleUpdateItem(item.id, 'actualCost', Number(e.target.value))} className="w-full bg-theme-border p-2 rounded-md"/></td>
                                <td className="p-2 text-center"><input type="checkbox" checked={item.paid} onChange={e => handleUpdateItem(item.id, 'paid', e.target.checked)} className="h-5 w-5 rounded text-theme-accent-primary" /></td>
                                <td className="p-2"><button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-400 p-2"><TrashIcon className="h-5 w-5" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeddingBudgetTracker;
