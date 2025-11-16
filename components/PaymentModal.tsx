import React, { useState } from 'react';
import { PricingPlan, ManualPaymentMethod } from '../types';
import OfflinePaymentInstructionsModal from './OfflinePaymentInstructionsModal';

interface PaymentModalProps {
  isOpen: boolean;
  plan: PricingPlan;
  onClose: () => void;
  onConfirmPayment: () => void;
  manualPaymentMethods: ManualPaymentMethod[];
}

type PaymentMethod = 'card' | 'upi';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, plan, onClose, onConfirmPayment, manualPaymentMethods }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOfflineModalOpen, setOfflineModalOpen] = useState(false);

  const handlePayment = () => {
      setIsProcessing(true);
      // Simulate API call
      setTimeout(() => {
          setIsProcessing(false);
          onConfirmPayment();
      }, 1500);
  }

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-md text-theme-text-primary border border-theme-border">
        <div className="p-6 border-b border-theme-border">
          <h3 className="text-xl font-bold">Complete Your Purchase</h3>
          <p className="text-theme-text-secondary">You are subscribing to the <span className="font-semibold text-theme-accent-light">{plan.name}</span> plan.</p>
        </div>
        <div className="p-6">
            <div className="flex border-b border-theme-border mb-4">
                <button onClick={() => setPaymentMethod('card')} className={`px-4 py-2 font-semibold ${paymentMethod === 'card' ? 'border-b-2 border-theme-accent-primary text-theme-accent-primary' : 'text-theme-text-secondary'}`}>Credit/Debit Card</button>
                <button onClick={() => setPaymentMethod('upi')} className={`px-4 py-2 font-semibold ${paymentMethod === 'upi' ? 'border-b-2 border-theme-accent-primary text-theme-accent-primary' : 'text-theme-text-secondary'}`}>UPI</button>
            </div>

            {paymentMethod === 'card' && (
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-theme-text-secondary">Card Number</label>
                        <input type="text" placeholder="•••• •••• •••• ••••" className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-theme-text-secondary">Expiry Date</label>
                            <input type="text" placeholder="MM / YY" className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-theme-text-secondary">CVC</label>
                            <input type="text" placeholder="•••" className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                        </div>
                    </div>
                </div>
            )}
            {paymentMethod === 'upi' && (
                <div>
                     <label className="block text-sm font-medium text-theme-text-secondary">UPI ID</label>
                     <input type="text" placeholder="yourname@bank" className="w-full mt-1 bg-theme-bg p-2 rounded-md border border-theme-border" />
                     <p className="text-xs text-theme-text-secondary mt-2">You will receive a payment request on your UPI app.</p>
                </div>
            )}
             <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-theme-border"></div>
                <span className="flex-shrink mx-4 text-theme-text-secondary text-sm">Or</span>
                <div className="flex-grow border-t border-theme-border"></div>
            </div>
             <button onClick={() => setOfflineModalOpen(true)} className="w-full text-center border-2 border-dashed border-theme-border rounded-lg py-3 text-theme-text-secondary hover:border-theme-accent-primary hover:text-theme-accent-primary transition-colors">
                Pay Offline (Bank Transfer)
            </button>
        </div>
        <div className="bg-theme-bg/50 p-4 flex justify-between items-center rounded-b-lg">
          <span className="text-xl font-bold">Total: {plan.price}{plan.duration}</span>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
              Cancel
            </button>
            <button onClick={handlePayment} disabled={isProcessing} className="px-4 py-2 rounded-md bg-theme-accent-primary text-white font-semibold hover:opacity-90 disabled:bg-theme-border disabled:cursor-wait flex items-center">
              {isProcessing ? 'Processing...' : `Pay ${plan.price}`}
            </button>
          </div>
        </div>
      </div>
    </div>
    <OfflinePaymentInstructionsModal 
        isOpen={isOfflineModalOpen}
        onClose={() => setOfflineModalOpen(false)}
        methods={manualPaymentMethods}
        plan={plan}
    />
    </>
  );
};

export default PaymentModal;