

import React, { useState } from 'react';
import { PricingPlan } from '../types';

interface PricingPageProps {
    plans: PricingPlan[];
    onSelectPlan: (plan: PricingPlan) => void;
}

const PlanFeature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center space-x-3">
        <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
        <span className="text-theme-text-secondary">{children}</span>
    </li>
);

const PricingCard: React.FC<{plan: PricingPlan, onSelect: () => void}> = ({plan, onSelect}) => (
    <div className={`relative flex flex-col p-8 text-center text-theme-text-primary bg-theme-surface rounded-2xl shadow-2xl shadow-theme-accent-secondary/5 ${plan.popular ? 'border-2 border-theme-accent-primary' : 'border border-theme-border'}`}>
        {plan.popular && <span className="absolute top-0 right-6 -translate-y-1/2 bg-theme-accent-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
        <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
        <p className="font-light text-theme-text-secondary sm:text-lg h-12">{plan.description}</p>
        <div className="flex justify-center items-baseline my-8">
            {plan.originalPrice && (
                 <span className="mr-2 text-2xl font-normal text-gray-400 line-through">{plan.originalPrice}</span>
            )}
            <span className="mr-2 text-5xl font-extrabold">{plan.price}</span>
            <span className="text-theme-text-secondary">{plan.duration}</span>
        </div>
        <ul role="list" className="mb-8 space-y-4 text-left">
            {plan.features.map(feature => <PlanFeature key={feature}>{feature}</PlanFeature>)}
        </ul>
        <button onClick={onSelect} className={`w-full font-bold mt-auto py-3 px-4 rounded-lg transition duration-300 ${plan.popular ? 'bg-theme-gradient text-white hover:opacity-90' : 'bg-theme-accent-secondary/20 text-theme-accent-secondary hover:bg-theme-accent-secondary/30'}`}>
            Choose Plan
        </button>
    </div>
);


const PricingPage: React.FC<PricingPageProps> = ({ plans, onSelectPlan }) => {
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');

  const filteredPlans = plans.filter(p => {
    const duration = p.duration.toLowerCase();
    if (planType === 'monthly') {
      return duration.includes('month');
    }
    return duration.includes('year');
  });
    
  return (
    <div className="bg-theme-bg">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-theme-text-primary">Choose Your Perfect Plan</h1>
            <p className="mb-5 font-light text-theme-text-secondary sm:text-xl">Unlock premium features to find your partner faster, powered by our advanced AI and astrological matching.</p>
        </div>

        <div className="flex justify-center items-center mb-12">
            <div className="relative flex p-1 bg-theme-surface rounded-full border border-theme-border">
                <button onClick={() => setPlanType('monthly')} className={`relative z-10 w-32 py-2 text-sm font-semibold rounded-full transition-colors ${planType === 'monthly' ? 'text-white' : 'text-theme-text-secondary'}`}>
                    Monthly
                </button>
                <button onClick={() => setPlanType('yearly')} className={`relative z-10 w-32 py-2 text-sm font-semibold rounded-full transition-colors ${planType === 'yearly' ? 'text-white' : 'text-theme-text-secondary'}`}>
                    Yearly
                </button>
                 <div className={`absolute top-1 left-1 h-[calc(100%-0.5rem)] w-32 bg-theme-gradient rounded-full transition-transform duration-300 ease-out ${planType === 'yearly' ? 'translate-x-full' : ''}`} />
            </div>
        </div>

        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 items-stretch">
            {filteredPlans.map(plan => (
                <PricingCard 
                    key={plan.id}
                    plan={plan}
                    onSelect={() => onSelectPlan(plan)}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;