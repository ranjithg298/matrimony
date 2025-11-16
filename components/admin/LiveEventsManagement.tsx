import React, { useState } from 'react';
import { LiveEvent } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface LiveEventsManagementProps {
    events: LiveEvent[];
    onUpdateEvents: (events: LiveEvent[]) => void;
}

const LiveEventsManagement: React.FC<LiveEventsManagementProps> = ({ events: initialEvents, onUpdateEvents }) => {
    const [events, setEvents] = useState(initialEvents);
    const [editingEvent, setEditingEvent] = useState<LiveEvent | null>(null);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        onUpdateEvents(events);
        setEditingEvent(null);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleAddNew = () => {
        const newEvent: LiveEvent = {
            id: `le${Date.now()}`,
            title: 'New Live Event',
            description: 'A brief description of the event.',
            date: new Date().toISOString(),
            meetLink: 'https://meet.google.com/new',
        };
        setEvents([...events, newEvent]);
        setEditingEvent(newEvent);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            const newEvents = events.filter(e => e.id !== id);
            setEvents(newEvents);
            onUpdateEvents(newEvents);
        }
    };
    
    const handleEditorChange = (field: keyof LiveEvent, value: string) => {
        if (editingEvent) {
            const updatedEvent = { ...editingEvent, [field]: value };
            setEditingEvent(updatedEvent);
            setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
        }
    };
    
    // Format ISO date string for datetime-local input
    const formatDateTimeForInput = (isoString: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        // Pad with leading zeros if necessary
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    if (editingEvent) {
        return (
             <div>
                 <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">Editing Live Event</h3>
                <div className="space-y-4 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <input type="text" placeholder="Event Title" value={editingEvent.title} onChange={e => handleEditorChange('title', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                    <input type="datetime-local" value={formatDateTimeForInput(editingEvent.date)} onChange={e => handleEditorChange('date', new Date(e.target.value).toISOString())} className="w-full bg-theme-border p-2 rounded-md" />
                    <input type="text" placeholder="Google Meet/Zoom Link" value={editingEvent.meetLink} onChange={e => handleEditorChange('meetLink', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                    <textarea rows={4} placeholder="Event Description" value={editingEvent.description} onChange={e => handleEditorChange('description', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingEvent(null)} className="bg-theme-border px-4 py-2 rounded-lg font-semibold hover:bg-theme-border/80">Back</button>
                    <button onClick={handleSave} className="bg-theme-accent-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Save Event</button>
                </div>
            </div>
        );
    }

    return (
        <div>
             <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Manage live matchmaking events for users.</p>
                <div className="flex items-center gap-2">
                    {showSaved && <span className="text-green-500 text-sm">Changes Saved!</span>}
                    <button onClick={handleAddNew} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                        <PlusIcon className="h-5 w-5" /> Schedule New Event
                    </button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Title</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Date & Time</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Meet Link</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                             <tr key={event.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                                <td className="p-3 font-medium">{event.title}</td>
                                <td className="p-3">{new Date(event.date).toLocaleString()}</td>
                                <td className="p-3 font-mono text-xs"><a href={event.meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{event.meetLink}</a></td>
                                <td className="p-3 space-x-2">
                                    <button onClick={() => setEditingEvent(event)} className="text-xs bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-full">Edit</button>
                                    <button onClick={() => handleDelete(event.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Delete</button>
                                </td>
                            </tr>
                        ))}
                         {events.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-theme-text-secondary">No live events scheduled.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LiveEventsManagement;