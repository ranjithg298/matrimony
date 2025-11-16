import React from 'react';
import { OfflinePaymentRequest } from '../../types';

interface OfflinePaymentsManagementProps {
    requests: OfflinePaymentRequest[];
    onProcessRequest: (requestId: string, action: 'approve' | 'reject') => void;
}

const OfflinePaymentsManagement: React.FC<OfflinePaymentsManagementProps> = ({ requests, onProcessRequest }) => {
    return (
        <div className="overflow-x-auto">
            <p className="text-sm text-theme-text-secondary mb-4">Review and approve offline payment submissions for plan upgrades.</p>
            <table className="w-full text-left">
                <thead className="bg-theme-bg/50">
                    <tr className="border-b border-theme-border">
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">User</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Plan</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Reference ID</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Date</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                            <td className="p-3">{req.userName}</td>
                            <td className="p-3">{req.planName}</td>
                            <td className="p-3 font-mono text-xs">{req.referenceId}</td>
                            <td className="p-3">{req.date}</td>
                            <td className="p-3 space-x-2">
                                <button onClick={() => onProcessRequest(req.id, 'approve')} className="text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full">Approve</button>
                                <button onClick={() => onProcessRequest(req.id, 'reject')} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Reject</button>
                            </td>
                        </tr>
                    ))}
                    {requests.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-4 text-center text-theme-text-secondary">No pending offline payment requests.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OfflinePaymentsManagement;
