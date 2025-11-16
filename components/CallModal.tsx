import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import PhoneIcon from './icons/PhoneIcon';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: Profile | null;
  callType: 'voice' | 'video';
}

const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, targetUser, callType }) => {
  const [status, setStatus] = useState<'connecting' | 'connected'>('connecting');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!isOpen) {
        setStatus('connecting');
        setTimer(0);
        return;
    };
    
    const connectingTimeout = setTimeout(() => {
        setStatus('connected');
    }, 3000); // Simulate 3 seconds to connect

    return () => clearTimeout(connectingTimeout);
  }, [isOpen]);

  useEffect(() => {
      let interval: ReturnType<typeof setInterval> | null = null;
      if(status === 'connected') {
          interval = setInterval(() => {
              setTimer(prev => prev + 1);
          }, 1000);
      }
      return () => {
          if(interval) clearInterval(interval);
      }
  }, [status]);
  
  const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !targetUser) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-sm text-white text-center p-8">
        <img src={targetUser.photo} alt={targetUser.name} className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-600"/>
        <h3 className="text-2xl font-bold mt-4">{targetUser.name}</h3>
        {status === 'connecting' && <p className="text-gray-400 animate-pulse mt-2">Connecting {callType} call...</p>}
        {status === 'connected' && <p className="text-gray-400 mt-2">{formatTime(timer)}</p>}
        
        <div className="mt-8">
            <button onClick={onClose} className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto hover:bg-red-700">
                <PhoneIcon className="w-8 h-8 transform -rotate-135" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;