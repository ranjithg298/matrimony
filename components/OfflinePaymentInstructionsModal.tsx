import React, { useState } from 'react';
import { ManualPaymentMethod, PricingPlan } from '../types';

interface OfflinePaymentInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  methods: ManualPaymentMethod[];
  plan: PricingPlan;
}

const OfflinePaymentInstructionsModal: React.FC<OfflinePaymentInstructionsModalProps> = ({ isOpen, onClose, methods, plan }) => {
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referenceId.trim()) {
      // In a real app, this would submit the request to the backend
      console.log(`Submitting offline payment request for plan ${plan.name} with ref ID: ${referenceId}`);
      alert("Your payment request has been submitted for verification. You will be notified upon approval.");
      onClose();
    }
  };

  if (!isOpen) return null;
  
  const bankMethod = methods.find(m => m.type === 'Bank Transfer' && m.enabled);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
        <div className="p-6 border-b border-theme-border">
          <h3 className="text-xl font-bold">Offline Payment Instructions</h3>
          <p className="text-theme-text-secondary">For the <span className="font-semibold text-theme-accent-light">{plan.name}</span> plan.</p>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <p className="text-theme-text-secondary mb-4">Please transfer <span className="font-bold text-theme-text-primary">{plan.price}</span> to one of the bank accounts below. After transferring, enter the transaction reference ID and submit for verification.</p>
          
          {bankMethod ? (
            <div className="space-y-4">
              {bankMethod.bankAccounts.map(acc => (
                <div key={acc.id} className="bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                  <h4 className="font-semibold">{acc.bankName}</h4>
                  <p className="text-sm"><span className="text-theme-text-secondary">Account Name:</span> {acc.accountName}</p>
                  <p className="text-sm"><span className="text-theme-text-secondary">Account Number:</span> {acc.accountNumber}</p>
                  <p className="text-sm"><span className="text-theme-text-secondary">IFSC Code:</span> {acc.ifscCode}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500">Offline payments are not configured. Please contact support.</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 border-t border-theme-border pt-6">
             <label className="block text-sm font-medium text-theme-text-secondary">Transaction Reference ID</label>
             <input 
                type="text" 
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder="Enter your UPI/NEFT/IMPS transaction ID" 
                required
                className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
          </form>
        </div>

        <div className="bg-theme-bg/50 p-4 flex justify-end items-center rounded-b-lg gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
            Cancel
            </button>
            <button type="submit" onClick={handleSubmit} disabled={!referenceId.trim()} className="px-4 py-2 rounded-md bg-theme-accent-primary text-white font-semibold hover:opacity-90 disabled:opacity-50">
            Submit for Verification
            </button>
        </div>
      </div>
    </div>
  );
};

export default OfflinePaymentInstructionsModal;