

import React, { useState } from 'react';
import { Profile } from '../types';
import HeartIcon from '../components/icons/HeartIcon';
import GoogleIcon from '../components/icons/GoogleIcon';
import FacebookIcon from '../components/icons/FacebookIcon';
import TwitterIcon from '../components/icons/TwitterIcon';

interface RegisterPageProps {
  onRegister: (newUser: Omit<Profile, 'id' | 'status'>) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    city: '',
    role: 'user' as 'user' | 'vendor',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: '',
    interests: [],
    rasi: 'Unknown',
    nakshatra: 'Unknown',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: Omit<Profile, 'id' | 'status'> = {
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age, 10),
      city: formData.city,
      role: formData.role,
      photo: formData.photo,
      bio: formData.bio,
      interests: [],
      approvalStatus: 'pending',
      customFields: {
        rasi: formData.rasi,
        nakshatra: formData.nakshatra
      },
      gallery: [],
    };
    onRegister(newUser);
  };

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-theme-surface shadow-2xl shadow-theme-accent-secondary/10 overflow-hidden">
             <div className="p-8">
                 <div className="flex items-center space-x-2 mb-8 justify-center">
                    <HeartIcon className="h-8 w-8 text-theme-accent-primary" />
                    <a href="#/" className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient">matrimony.ai</a>
                </div>
                <h1 className="text-3xl font-bold text-theme-text-primary mb-2 text-center">Create Your Account</h1>
                <p className="text-theme-text-secondary mb-6 text-center">Join us to find your soulmate.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary" />
                        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary" />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary" />
                         <div className="grid grid-cols-2 gap-4">
                           <input type="number" name="age" placeholder="Age" onChange={handleChange} required className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary" />
                           <input type="text" name="city" placeholder="City" onChange={handleChange} required className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary" />
                         </div>
                    </div>
                     <button type="submit" className="w-full bg-theme-gradient text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 mt-6">
                        Register
                    </button>
                </form>
                
                 <div className="my-4 flex items-center">
                    <div className="flex-grow border-t border-theme-border"></div>
                    <span className="flex-shrink mx-4 text-theme-text-secondary text-sm">Or sign up with</span>
                    <div className="flex-grow border-t border-theme-border"></div>
                </div>

                <div className="flex justify-center gap-4">
                    <button className="p-2 border border-theme-border rounded-full hover:bg-theme-border"><GoogleIcon className="h-5 w-5"/></button>
                    <button className="p-2 border border-theme-border rounded-full hover:bg-theme-border"><FacebookIcon /></button>
                    <button className="p-2 border border-theme-border rounded-full hover:bg-theme-border"><TwitterIcon /></button>
                </div>
                
                 <p className="text-center text-sm text-theme-text-secondary mt-6">
                    Already have an account? <a href="#/login" className="font-semibold text-theme-accent-primary hover:underline">Login</a>
                </p>

            </div>
        </div>
    </div>
  )
}

export default RegisterPage;