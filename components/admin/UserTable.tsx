import React from 'react';
import { Profile, StaffMember } from '../../types';

const UserTable: React.FC<{users: (Profile | StaffMember)[], onAction: (action: string, userId: string) => void}> = ({users, onAction}) => (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-theme-bg/50">
          <tr className="border-b border-theme-border">
            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Name</th>
            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Email</th>
            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Status</th>
            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={`border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary ${user.status === 'suspended' ? 'opacity-50' : ''}`}>
              <td className="p-3 flex items-center gap-3">
                <img src={user.photo} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                {user.name}
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {user.status}
                  </span>
              </td>
              <td className="p-3 space-x-2">
                {user.status === 'active' ? (
                   <button onClick={() => onAction('suspend', user.id)} className="text-xs bg-yellow-500/80 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded-full">Suspend</button>
                ) : (
                   <button onClick={() => onAction('enable', user.id)} className="text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full">Enable</button>
                )}
                <button onClick={() => onAction('remove', user.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);

export default UserTable;