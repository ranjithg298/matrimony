import React, { useState } from 'react';
import { WeddingPlanner } from '../types';
import GuestListManagement from '../components/wedding/GuestListManagement';
import WeddingBudgetTracker from '../components/wedding/WeddingBudgetTracker';
import WeddingChecklist from '../components/wedding/WeddingChecklist';

interface WeddingPlannerPageProps {
    plannerData: WeddingPlanner;
    onUpdate: (data: WeddingPlanner) => void;
}

type PlannerTab = 'guests' | 'budget' | 'checklist';

const WeddingPlannerPage: React.FC<WeddingPlannerPageProps> = ({ plannerData, onUpdate }) => {
    const [activeTab, setActiveTab] = useState<PlannerTab>('guests');

    const renderContent = () => {
        switch (activeTab) {
            case 'guests':
                return <GuestListManagement guests={plannerData.guests} onUpdateGuests={guests => onUpdate({ ...plannerData, guests })} />;
            case 'budget':
                return <WeddingBudgetTracker budgetItems={plannerData.budget} onUpdateBudget={budget => onUpdate({ ...plannerData, budget })} />;
            case 'checklist':
                return <WeddingChecklist checklistData={plannerData.checklist} onUpdateChecklist={checklist => onUpdate({ ...plannerData, checklist })} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
            <h1 className="text-3xl font-bold mb-2">My Wedding Planner</h1>
            <p className="text-theme-text-secondary mb-6">Your central hub for organizing the big day.</p>

            <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                <div className="border-b border-theme-border mb-6">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('guests')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'guests' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'}`}>
                            Guest List
                        </button>
                        <button onClick={() => setActiveTab('budget')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'budget' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'}`}>
                            Budget Tracker
                        </button>
                         <button onClick={() => setActiveTab('checklist')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'checklist' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'}`}>
                            Checklist
                        </button>
                    </nav>
                </div>
                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default WeddingPlannerPage;
