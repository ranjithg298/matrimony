import React, { useState } from 'react';

interface OfflinePayment {
    id: string;
    userName: string;
    planName: string;
    amount: string;
    method: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    date: string;
}

const DUMMY_PAYMENTS: OfflinePayment[] = [
    { id: 'op1', userName: 'Karan Singh', planName: 'Premium Annual', amount: '₹2999', method: 'Bank Transfer', status: 'Pending', date: '2024-10-25' },
    { id: 'op2', userName: 'Sneha Reddy', planName: 'VIP Annual', amount: '₹14999', method: 'Cash Deposit', status: 'Approved', date: '2024-10-24' },
];

const OfflinePayments = () => {
    const [payments, setPayments] = useState(DUMMY_PAYMENTS);

    const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
        setPayments(payments.map(p => p.id === id ? { ...p, status: newStatus } : p));
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-theme-bg/50">
                    <tr className="border-b border-theme-border">
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">User</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Plan</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Amount</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Method</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Status</th>
                        <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(p => (
                        <tr key={p.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                            <td className="p-3">{p.userName}</td>
                            <td className="p-3">{p.planName}</td>
                            <td className="p-3">{p.amount}</td>
                            <td className="p-3">{p.method}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    p.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                                    p.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                    {p.status}
                                </span>
                            </td>
                            <td className="p-3 space-x-2">
                                {p.status === 'Pending' && (
                                    <>
                                        <button onClick={() => handleStatusChange(p.id, 'Approved')} className="text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full">Approve</button>
                                        <button onClick={() => handleStatusChange(p.id, 'Rejected')} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OfflinePayments;
