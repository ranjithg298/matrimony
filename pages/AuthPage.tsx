import React, { useState } from 'react';
import HeartIcon from '../components/icons/HeartIcon';
import Captcha from '../components/Captcha';
import GoogleIcon from '../components/icons/GoogleIcon';
import FacebookIcon from '../components/icons/FacebookIcon';
import TwitterIcon from '../components/icons/TwitterIcon';

interface AuthPageProps {
  onLogin: (email: string, password?: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [error, setError] = useState('');
  
  const handleDemoLogin = (demoEmail: string) => {
    onLogin(demoEmail, 'admin@123'); // Pass dummy password for demo, real check in App.tsx
  };
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
          setError('Invalid CAPTCHA. Please try again.');
          // Also need to refresh captcha here, which the Captcha component does via key prop
          setCaptchaInput('');
          return;
      }
      setError('');
      onLogin(email, password);
  }

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-2xl bg-theme-surface shadow-2xl shadow-theme-accent-secondary/10 flex overflow-hidden">
            {/* Form Side */}
            <div className="w-full lg:w-1/2 p-8 md:p-12">
                 <div className="flex items-center space-x-2 mb-8">
                    <HeartIcon className="h-8 w-8 text-theme-accent-primary" />
                    <a href="#/" className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient">matrimony.ai</a>
                </div>

                <h1 className="text-3xl font-bold text-theme-text-primary mb-2">Welcome Back</h1>
                <p className="text-theme-text-secondary mb-6">Sign in to find your perfect partner.</p>

                 <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-theme-text-secondary text-sm font-bold mb-2" htmlFor="email">Email Address or Username</label>
                        <input 
                            type="text" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com or admin"
                            className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-theme-text-secondary text-sm font-bold" htmlFor="password">Password</label>
                            <a href="#" className="text-sm text-theme-accent-primary hover:underline">Forgot Password?</a>
                        </div>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-theme-text-secondary text-sm font-bold mb-2" htmlFor="captcha">Validate Security</label>
                        <Captcha onGenerated={setCaptchaText} />
                        <input
                            type="text"
                            id="captcha"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            placeholder="Type the captcha above"
                            className="w-full mt-2 px-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    
                    <button type="submit" className="w-full bg-theme-gradient text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300">
                    Sign In
                    </button>
                </form>

                <div className="my-4 flex items-center">
                    <div className="flex-grow border-t border-theme-border"></div>
                    <span className="flex-shrink mx-4 text-theme-text-secondary text-sm">Or continue with</span>
                    <div className="flex-grow border-t border-theme-border"></div>
                </div>

                <div className="flex justify-center gap-4">
                    <button className="p-2 border border-theme-border rounded-full hover:bg-theme-border"><GoogleIcon className="h-5 w-5"/></button>
                    <button className="p-2 border border-theme-border rounded-full hover:bg-theme-border"><FacebookIcon /></button>
                    <button className="p-2 border border-theme-border rounded-full hover:bg-theme-border"><TwitterIcon /></button>
                </div>
                
                <p className="text-center text-sm text-theme-text-secondary mt-6">
                    Don't have an account? <a href="#/register" className="font-semibold text-theme-accent-primary hover:underline">Register Now</a>
                </p>


                <div className="mt-6 p-4 bg-theme-bg/50 rounded-lg text-center">
                    <p className="text-sm text-theme-text-secondary mb-3">For demo purposes, log in as:</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                        <button onClick={() => handleDemoLogin('priya@matrimony.ai')} className="text-xs bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-1 px-3 rounded-full">User</button>
                        <button onClick={() => handleDemoLogin('vendor@matrimony.ai')} className="text-xs bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-1 px-3 rounded-full">Vendor</button>
                        <button onClick={() => handleDemoLogin('admin')} className="text-xs bg-theme-border hover:bg-theme-border/80 text-theme-text-primary font-semibold py-1 px-3 rounded-full">Admin</button>
                    </div>
                </div>
            </div>

             {/* Image Side */}
            <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1588031212454-de853de3b4d4?q=80&w=1887&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
                <div className="w-full h-full bg-black/30"></div>
            </div>
        </div>
    </div>
  );
};

export default AuthPage;
