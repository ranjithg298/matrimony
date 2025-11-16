
import React, { useState } from 'react';
import { ContactQuery } from '../../types';

interface ContactQueriesManagementProps {
    queries: ContactQuery[];
    onUpdateQueries: (queries: ContactQuery[]) => void;
}

const ContactQueriesManagement: React.FC<ContactQueriesManagementProps> = ({ queries: initialQueries, onUpdateQueries }) => {
    const [queries, setQueries] = useState(initialQueries);
    const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);

    const handleUpdateStatus = (queryId: string, status: 'new' | 'read' | 'handled') => {
        const updatedQueries = queries.map(q => q.id === queryId ? { ...q, status } : q);
        setQueries(updatedQueries);
        onUpdateQueries(updatedQueries);
    };

    const handleDelete = (queryId: string) => {
        if (window.confirm('Are you sure you want to delete this query?')) {
            const updatedQueries = queries.filter(q => q.id !== queryId);
            setQueries(updatedQueries);
            onUpdateQueries(updatedQueries);
        }
    }
    
    // Modal to view the full message
    const MessageModal: React.FC<{query: ContactQuery | null, onClose: () => void}> = ({query, onClose}) => {
        if (!query) return null;
        return (
             <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
                <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
                    <div className="p-6 border-b border-theme-border">
                        <h3 className="text-xl font-bold">Query from {query.name}</h3>
                        <p className="text-sm text-theme-text-secondary">{query.subject}</p>
                    </div>
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        <p className="whitespace-pre-wrap">{query.message}</p>
                    </div>
                    <div className="bg-theme-bg/50 p-4 flex justify-end space-x-3 rounded-b-lg">
                        <button onClick={onClose} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
                           Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
        <div>
            <p className="text-sm text-theme-text-secondary mb-4">View and manage contact form submissions from users.</p>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Name</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Email</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Subject</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Date</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Status</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.map(query => (
                            <tr key={query.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                                <td className="p-3 font-medium">{query.name}</td>
                                <td className="p-3">{query.email}</td>
                                <td className="p-3">{query.subject}</td>
                                <td className="p-3">{query.date}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        query.status === 'handled' ? 'bg-green-500/20 text-green-400' :
                                        query.status === 'read' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                        {query.status}
                                    </span>
                                </td>
                                <td className="p-3 space-x-2 whitespace-nowrap">
                                    <button onClick={() => setSelectedQuery(query)} className="text-xs bg-gray-500/80 hover:bg-gray-500 text-white font-semibold py-1 px-3 rounded-full">View</button>
                                    {query.status === 'new' && <button onClick={() => handleUpdateStatus(query.id, 'read')} className="text-xs bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-full">Mark Read</button>}
                                    {query.status === 'read' && <button onClick={() => handleUpdateStatus(query.id, 'handled')} className="text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full">Mark Handled</button>}
                                    <button onClick={() => handleDelete(query.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {queries.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-theme-text-secondary">No contact queries found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        <MessageModal query={selectedQuery} onClose={() => setSelectedQuery(null)} />
        </>
    );
};

export default ContactQueriesManagement;
