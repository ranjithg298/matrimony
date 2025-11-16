import React, { useState } from 'react';
import { ChecklistItem } from '../../types';

interface WeddingChecklistProps {
    checklistData: { [category: string]: ChecklistItem[] };
    onUpdateChecklist: (data: { [category: string]: ChecklistItem[] }) => void;
}

const WeddingChecklist: React.FC<WeddingChecklistProps> = ({ checklistData: initialData, onUpdateChecklist }) => {
    const [checklist, setChecklist] = useState(initialData);

    const handleToggle = (category: string, taskId: string) => {
        const newChecklist = {
            ...checklist,
            [category]: checklist[category].map(item =>
                item.id === taskId ? { ...item, isCompleted: !item.isCompleted } : item
            )
        };
        setChecklist(newChecklist);
        onUpdateChecklist(newChecklist);
    };

    return (
        <div>
            <p className="text-sm text-theme-text-secondary mb-4">Stay on top of your wedding planning with this handy checklist.</p>
            <div className="space-y-6">
                {Object.keys(checklist).map((category) => {
                    const items = checklist[category];
                    const completedCount = items.filter(i => i.isCompleted).length;
                    const totalCount = items.length;
                    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

                    return (
                        <div key={category} className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                            <h3 className="text-lg font-semibold text-theme-text-primary mb-3">{category}</h3>
                            <div className="w-full bg-theme-border rounded-full h-2.5 mb-4">
                                <div className="bg-theme-accent-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="space-y-2">
                                {items.map(item => (
                                    <label key={item.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-theme-border/50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.isCompleted}
                                            onChange={() => handleToggle(category, item.id)}
                                            className="h-5 w-5 rounded text-theme-accent-primary focus:ring-theme-accent-primary"
                                        />
                                        <span className={`text-sm ${item.isCompleted ? 'text-theme-text-secondary line-through' : 'text-theme-text-primary'}`}>
                                            {item.task}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeddingChecklist;