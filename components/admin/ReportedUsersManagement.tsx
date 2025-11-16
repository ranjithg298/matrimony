import React, { useState } from 'react';
import { Report, Profile } from '../../types';

interface ReportedUsersManagementProps {
    reports: Report[];
    profiles: Profile[];
    onUpdateReports: (reports: Report[]) => void;
    onUpdateProfiles: (profiles: Profile[]) => void;
}

const ReportedUsersManagement: React.FC<ReportedUsersManagementProps> = ({ reports: initialReports, profiles, onUpdateReports, onUpdateProfiles }) => {
    const [reports, setReports] = useState(initialReports);

    const findUser = (userId: string) => profiles.find(p => p.id === userId);

    const handleUpdateReportStatus = (reportId: string, status: 'resolved' | 'dismissed') => {
        const updatedReports = reports.map(r => r.id === reportId ? { ...r, status } : r);
        setReports(updatedReports);
        onUpdateReports(updatedReports);
    };

    const handleSuspendUser = (userId: string) => {
        if (window.confirm('Are you sure you want to suspend this user? They will not be able to log in.')) {
            const updatedProfiles = profiles.map((p): Profile => {
                if (p.id === userId) {
                    return { ...p, status: 'suspended' };
                }
                return p;
            });
            onUpdateProfiles(updatedProfiles);
        }
    };

    return (
        <div>
            <p className="text-sm text-theme-text-secondary mb-4">Review user-submitted reports and take appropriate action to maintain community safety.</p>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Reported User</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Reported By</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Reason</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Date</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Status</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map(report => {
                            const reportedUser = findUser(report.reportedUserId);
                            const reportingUser = findUser(report.reportedByUserId);

                            if (!reportedUser || !reportingUser) return null;

                            return (
                                <tr key={report.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                                    <td className="p-3 font-medium flex items-center gap-2">
                                        <img src={reportedUser.photo} alt={reportedUser.name} className="w-8 h-8 rounded-full object-cover" />
                                        {reportedUser.name}
                                    </td>
                                     <td className="p-3">{reportingUser.name}</td>
                                    <td className="p-3 max-w-xs truncate" title={report.reason}>{report.reason}</td>
                                    <td className="p-3">{report.date}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            report.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                                            report.status === 'dismissed' ? 'bg-gray-500/20 text-gray-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="p-3 space-x-2 whitespace-nowrap">
                                        {report.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleUpdateReportStatus(report.id, 'resolved')} className="text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full">Resolve</button>
                                                <button onClick={() => handleUpdateReportStatus(report.id, 'dismissed')} className="text-xs bg-gray-500/80 hover:bg-gray-500 text-white font-semibold py-1 px-3 rounded-full">Dismiss</button>
                                                <button onClick={() => handleSuspendUser(reportedUser.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Suspend User</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                         {reports.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-theme-text-secondary">No reports found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedUsersManagement;