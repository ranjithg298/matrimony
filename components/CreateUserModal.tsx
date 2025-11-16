

import React, { useState } from 'react';
import { Profile } from '../types';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: (newUser: Profile) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onCreateUser }) => {
    const [formState, setFormState] = useState({
        name: '',
        age: 0,
        city: '',
        email: '',
        role: 'user' as 'user' | 'vendor',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || formState.age <= 0) {
            alert("Please fill all required fields.");
            return;
        }
        
        const finalUser: Profile = {
            id: `${formState.role.charAt(0)}${Date.now()}`,
            name: formState.name,
            age: formState.age,
            city: formState.city,
            email: formState.email,
            role: formState.role,
            photo: formState.photo,
            bio: formState.bio,
            status: 'active',
            approvalStatus: 'approved',
            interests: [],
            customFields: {
                rasi: 'Unknown',
                nakshatra: 'Unknown',
            },
            gallery: [],
            isPremium: false,
            isOnline: false,
            interestsSent: [],
            interestsReceived: [],
            shortlisted: [],
            blockedUsers: [],
            profileViewers: [],
        };
        onCreateUser(finalUser);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
            <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-theme-border">
                        <h3 className="text-xl font-bold">Create New User/Vendor</h3>
                    </div>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div>
                            <label className="block text-sm font-medium text-theme-text-secondary">Full Name</label>
                            <input type="text" name="name" value={formState.name} onChange={handleChange} required className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-theme-text-secondary">Age</label>
                                <input type="number" name="age" value={formState.age} onChange={handleChange} required className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-theme-text-secondary">City</label>
                                <input type="text" name="city" value={formState.city} onChange={handleChange} required className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-theme-text-secondary">Email</label>
                            <input type="email" name="email" value={formState.email} onChange={handleChange} required className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-theme-text-secondary">Photo URL</label>
                            <input type="text" name="photo" value={formState.photo} onChange={handleChange} required className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-theme-text-secondary">Role</label>
                            <select name="role" onChange={handleChange} value={formState.role} className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border">
                                <option value="user">User</option>
                                <option value="vendor">Vendor</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-theme-text-secondary">Bio</label>
                            <textarea name="bio" value={formState.bio} rows={3} onChange={handleChange} className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border"></textarea>
                        </div>
                    </div>
                    <div className="bg-theme-bg/50 p-4 flex justify-end space-x-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 rounded-md text-white font-semibold bg-theme-accent-primary hover:opacity-90">
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;