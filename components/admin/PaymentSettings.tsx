import React, { useState } from 'react';
import { ManualPaymentMethod, BankAccount } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface PaymentSettingsProps {
    manualMethods: ManualPaymentMethod[];
    onUpdateManualMethods: (methods: ManualPaymentMethod[]) => void;
}

const FormField: React.FC<{label: string, helpText?: string, children: React.ReactNode}> = ({label, helpText, children}) => (
    <div>
        <label className="text-md font-medium text-theme-text-primary">{label}</label>
        {helpText && <p className="text-sm text-theme-text-secondary mb-2">{helpText}</p>}
        {children}
    </div>
);

const PaymentSettings: React.FC<PaymentSettingsProps> = ({ manualMethods, onUpdateManualMethods }) => {
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        setShowSaved(true);
        // Here you would also save the online payment settings state
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleManualMethodChange = (id: string, field: keyof ManualPaymentMethod, value: any) => {
        onUpdateManualMethods(manualMethods.map(m => m.id === id ? { ...m, [field]: value } : m));
    };
    
    const handleBankAccountChange = (methodId: string, accountId: string, field: keyof BankAccount, value: string) => {
        const updatedMethods = manualMethods.map(method => {
            if (method.id === methodId) {
                return {
                    ...method,
                    bankAccounts: method.bankAccounts.map(acc => 
                        acc.id === accountId ? { ...acc, [field]: value } : acc
                    )
                };
            }
            return method;
        });
        onUpdateManualMethods(updatedMethods);
    };

    const addBankAccount = (methodId: string) => {
        const newAccount: BankAccount = { id: `ba${Date.now()}`, bankName: '', accountName: '', accountNumber: '', ifscCode: '' };
        onUpdateManualMethods(manualMethods.map(m => m.id === methodId ? {...m, bankAccounts: [...m.bankAccounts, newAccount]} : m));
    };

    const removeBankAccount = (methodId: string, accountId: string) => {
        onUpdateManualMethods(manualMethods.map(m => m.id === methodId ? {...m, bankAccounts: m.bankAccounts.filter(a => a.id !== accountId)} : m));
    };

    return (
        <div className="space-y-8">
            <div className="bg-theme-bg/50 p-6 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Manual / Offline Payment Methods</h3>
                <div className="space-y-4">
                    {manualMethods.map(method => (
                        <div key={method.id} className="bg-theme-surface p-4 rounded-lg border border-theme-border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-theme-text-secondary">Method Name</label>
                                    <input type="text" value={method.name} onChange={e => handleManualMethodChange(method.id, 'name', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50" />
                                </div>
                                <div>
                                    <label className="text-sm text-theme-text-secondary">Method Type</label>
                                    <select value={method.type} onChange={e => handleManualMethodChange(method.id, 'type', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50">
                                        <option>Bank Transfer</option>
                                        <option>Cash Deposit</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-theme-text-secondary">Payment Instructions</label>
                                    <textarea value={method.instructions} onChange={e => handleManualMethodChange(method.id, 'instructions', e.target.value)} rows={3} className="w-full bg-theme-border p-2 rounded-md mt-1 border-theme-border/50" />
                                </div>
                            </div>
                             <div className="mt-4">
                                <h4 className="text-md font-semibold text-theme-text-primary mb-2">Bank Accounts</h4>
                                <div className="space-y-2">
                                    {method.bankAccounts.map(account => (
                                        <div key={account.id} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-end">
                                            <input type="text" placeholder="Bank Name" value={account.bankName} onChange={e => handleBankAccountChange(method.id, account.id, 'bankName', e.target.value)} className="col-span-2 md:col-span-1 bg-theme-border p-2 rounded-md border-theme-border/50 text-sm" />
                                            <input type="text" placeholder="Account Name" value={account.accountName} onChange={e => handleBankAccountChange(method.id, account.id, 'accountName', e.target.value)} className="col-span-2 md:col-span-1 bg-theme-border p-2 rounded-md border-theme-border/50 text-sm" />
                                            <input type="text" placeholder="Account Number" value={account.accountNumber} onChange={e => handleBankAccountChange(method.id, account.id, 'accountNumber', e.target.value)} className="col-span-2 md:col-span-1 bg-theme-border p-2 rounded-md border-theme-border/50 text-sm" />
                                            <input type="text" placeholder="IFSC/Routing" value={account.ifscCode} onChange={e => handleBankAccountChange(method.id, account.id, 'ifscCode', e.target.value)} className="col-span-2 md:col-span-1 bg-theme-border p-2 rounded-md border-theme-border/50 text-sm" />
                                            <button onClick={() => removeBankAccount(method.id, account.id)} className="text-red-500 hover:text-red-400 p-2 bg-theme-border rounded-md"><TrashIcon className="h-4 w-4" /></button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => addBankAccount(method.id)} className="text-sm flex items-center gap-1 mt-2 text-theme-accent-primary hover:underline">
                                    <PlusIcon className="h-4 w-4" /> Add Bank Account
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-theme-bg/50 p-6 rounded-lg border border-theme-border">
                <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">Online Gateways (Stripe, PayPal etc.)</h3>
                <div className="space-y-4">
                    <FormField label="Stripe Public Key" helpText="Enter your public API key from your Stripe dashboard.">
                        <input type="text" placeholder="pk_live_************************" className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary" />
                    </FormField>
                    <FormField label="Stripe Secret Key" helpText="Enter your secret API key. This will be stored securely.">
                        <input type="password" placeholder="sk_live_************************" className="w-full bg-theme-border p-2 rounded-md border border-theme-border/50 text-theme-text-primary" />
                    </FormField>
                </div>
            </div>
            
            <div className="flex justify-end items-center gap-4">
              {showSaved && <span className="text-green-400">Saved!</span>}
              <button onClick={handleSave} className="bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
                  Save Payment Settings
              </button>
            </div>
        </div>
    );
};

export default PaymentSettings;