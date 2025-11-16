

import React, { useState } from 'react';
import { ContactQuery } from '../../types';

interface ContactQueriesProps {
    initialQueries: ContactQuery[];
}

const ContactQueries: React.FC<ContactQueriesProps> = ({ initialQueries }) => {
    const [queries, setQueries] = useState(initialQueries);

    const handleMarkAsRead = (id: string) => {
        setQueries(queries.map(q => q.id === id ? { ...q, status: 'read' } : q));
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-theme-bg/50">
                    <tr className="border-b border-theme-border">
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Name</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Email</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Subject</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Date</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map(query => (
                        <tr key={query.id} className={`border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary ${query.status !== 'new' ? 'opacity-60' : ''}`}>
                            <td className="p-3 font-medium">{query.name}</td>
                            <td className="p-3">{query.email}</td>
                            <td className="p-3">{query.subject}</td>
                            <td className="p-3">{query.date}</td>
                            <td className="p-3">
                                {query.status === 'new' && (
                                    <button onClick={() => handleMarkAsRead(query.id)} className="text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full">
                                        Mark as Read
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactQueries;