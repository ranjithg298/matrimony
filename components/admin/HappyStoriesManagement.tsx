import React, { useState } from 'react';
import { HappyStory } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface HappyStoriesManagementProps {
    stories: HappyStory[];
    onUpdateStories: (stories: HappyStory[]) => void;
}

const HappyStoriesManagement: React.FC<HappyStoriesManagementProps> = ({ stories: initialStories, onUpdateStories }) => {
    const [stories, setStories] = useState(initialStories);
    const [editingStory, setEditingStory] = useState<HappyStory | null>(null);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        onUpdateStories(stories);
        setEditingStory(null);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleAddNew = () => {
        const newStory: HappyStory = {
            id: `hs${Date.now()}`,
            coupleNames: 'New Couple',
            weddingDate: new Date().toISOString().split('T')[0],
            imageUrl: 'https://images.unsplash.com/photo-1588031212454-de853de3b4d4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            story: 'Their beautiful story begins here...',
        };
        setStories([...stories, newStory]);
        setEditingStory(newStory);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this story?')) {
            const newStories = stories.filter(s => s.id !== id);
            setStories(newStories);
            onUpdateStories(newStories);
        }
    };
    
    const handleEditorChange = (field: keyof HappyStory, value: string) => {
        if (editingStory) {
            const updatedStory = { ...editingStory, [field]: value };
            setEditingStory(updatedStory);
            setStories(stories.map(s => s.id === updatedStory.id ? updatedStory : s));
        }
    };

     if (editingStory) {
        return (
             <div>
                 <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">Editing Happy Story</h3>
                <div className="space-y-4 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Couple Names" value={editingStory.coupleNames} onChange={e => handleEditorChange('coupleNames', e.target.value)} className="bg-theme-border p-2 rounded-md" />
                        <input type="date" placeholder="Wedding Date" value={editingStory.weddingDate} onChange={e => handleEditorChange('weddingDate', e.target.value)} className="bg-theme-border p-2 rounded-md" />
                    </div>
                    <input type="text" placeholder="Image URL" value={editingStory.imageUrl} onChange={e => handleEditorChange('imageUrl', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                    <textarea rows={5} placeholder="Their Story" value={editingStory.story} onChange={e => handleEditorChange('story', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingStory(null)} className="bg-theme-border px-4 py-2 rounded-lg font-semibold hover:bg-theme-border/80">Back</button>
                    <button onClick={handleSave} className="bg-theme-accent-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Save Story</button>
                </div>
            </div>
        );
    }

    return (
        <div>
             <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Manage the success stories displayed on your website.</p>
                <div className="flex items-center gap-2">
                    {showSaved && <span className="text-green-500 text-sm">Changes Saved!</span>}
                    <button onClick={handleAddNew} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                        <PlusIcon className="h-5 w-5" /> Add New Story
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stories.map(story => (
                    <div key={story.id} className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border flex gap-4">
                       <img src={story.imageUrl} alt={story.coupleNames} className="w-24 h-24 object-cover rounded-md" />
                       <div className="flex-grow">
                           <h4 className="font-bold">{story.coupleNames}</h4>
                           <p className="text-xs text-theme-text-secondary">{story.weddingDate}</p>
                           <p className="text-sm mt-2 line-clamp-2">{story.story}</p>
                           <div className="flex gap-2 mt-2">
                                <button onClick={() => setEditingStory(story)} className="text-xs bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-full">Edit</button>
                                <button onClick={() => handleDelete(story.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Delete</button>
                           </div>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HappyStoriesManagement;