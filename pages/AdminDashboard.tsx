import React, { useState } from 'react';
import { Profile, PricingPlan, WebsiteSettings, Page, Service, HappyStory, Attribute, Report, ContactQuery, LiveEvent, VendorReview, OfflinePaymentRequest, Astrologer } from '../types';

// Icons
import UserIcon from '../components/icons/UserIcon';
import CheckBadgeIcon from '../components/icons/CheckBadgeIcon';
import PhotoIcon from '../components/icons/PhotoIcon';
import FlagIcon from '../components/icons/FlagIcon';
import CurrencyDollarIcon from '../components/icons/CurrencyDollarIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import BuildingStorefrontIcon from '../components/icons/BuildingStorefrontIcon';
import StarIcon from '../components/icons/StarIcon';
import SparklesIcon from '../components/icons/SparklesIcon';
import PageIcon from '../components/icons/PageIcon';
import CogIcon from '../components/icons/CogIcon';
import PaintBrushIcon from '../components/icons/PaintBrushIcon';
import EnvelopeIcon from '../components/icons/EnvelopeIcon';
import WrenchScrewdriverIcon from '../components/icons/WrenchScrewdriverIcon';
import HomeIcon from '../components/icons/HomeIcon';

// Components
import CreateUserModal from '../components/CreateUserModal';
import WebSetup from '../components/admin/WebSetup';
import AppearanceSettings from '../components/admin/AppearanceSettings';
import Utilities from '../components/admin/Utilities';
import PagesManagement from '../components/admin/PagesManagement';
import PackagesManagement from '../components/admin/PackagesManagement';
import ServicesManagement from '../components/admin/ServicesManagement';
import HappyStoriesManagement from '../components/admin/HappyStoriesManagement';
import AttributeBuilder from '../components/admin/AttributeBuilder';
import MembersManagement from '../components/admin/MembersManagement';
import ReportedUsersManagement from '../components/admin/ReportedUsersManagement';
import ContactQueriesManagement from '../components/admin/ContactQueriesManagement';
import PhotoApprovalsManagement from '../components/admin/PhotoApprovalsManagement';
import ApprovalsManagement from '../components/admin/ApprovalsManagement';
import LiveEventsManagement from '../components/admin/LiveEventsManagement';
import VendorReviewsManagement from '../components/admin/VendorReviewsManagement';
import VendorsManagement from '../components/admin/VendorsManagement';
import OfflinePaymentsManagement from '../components/admin/OfflinePaymentsManagement';
import AstrologersManagement from '../components/admin/AstrologersManagement';
import VerificationsManagement from '../components/admin/VerificationsManagement';
import AIAdminAssistant from '../components/AIAdminAssistant';
import HomepageManagement from '../components/admin/HomepageManagement';


interface AdminDashboardProps {
  allProfiles: Profile[];
  pricingPlans: PricingPlan[];
  websiteSettings: WebsiteSettings;
  pages: Page[];
  services: Service[];
  happyStories: HappyStory[];
  attributes: Attribute[];
  reports: Report[];
  contactQueries: ContactQuery[];
  liveEvents: LiveEvent[];
  vendorReviews: VendorReview[];
  offlinePaymentRequests: OfflinePaymentRequest[];
  astrologers: Astrologer[];
  onUpdateUsers: (users: Profile[]) => void;
  onUpdatePricing: (plans: PricingPlan[]) => void;
  onUpdateWebsiteSettings: (settings: WebsiteSettings) => void;
  onUpdatePages: (pages: Page[]) => void;
  onUpdateServices: (services: Service[]) => void;
  onUpdateHappyStories: (stories: HappyStory[]) => void;
  onUpdateAttributes: (attributes: Attribute[]) => void;
  onUpdateReports: (reports: Report[]) => void;
  onUpdateContactQueries: (queries: ContactQuery[]) => void;
  onUpdateLiveEvents: (events: LiveEvent[]) => void;
  onUpdateVendorReviews: (reviews: VendorReview[]) => void;
  onProcessOfflinePayment: (requestId: string, action: 'approve' | 'reject') => void;
  onUpdateAstrologers: (astrologers: Astrologer[]) => void;
  onCreateNotification: (userId: string, message: string) => void;
}

type AdminView = 
  | 'ai-assistant'
  | 'members' | 'approvals' | 'verifications' | 'photo-approvals' | 'reports' | 'offline-payments'
  | 'live' | 'vendors' | 'vendor-reviews' | 'astrologers' 
  | 'pages' | 'services' | 'happy-stories' | 'pricing' | 'attribute-builder' 
  | 'web-setup' | 'appearance' | 'contact-queries' | 'utilities' | 'homepage';


const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeView, setActiveView] = useState<AdminView>('ai-assistant');
  const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);
  
  const handleCreateUser = (newUser: Profile) => {
      props.onUpdateUsers([...props.allProfiles, newUser]);
  };

  const SIDEBAR_ITEMS = {
      'Tools': [
          {id: 'ai-assistant', label: 'AI Assistant', icon: <SparklesIcon className="h-5 w-5"/>, notificationCount: 0},
      ],
      'User Management': [
          {id: 'members', label: 'Members', icon: <UserIcon className="h-5 w-5"/>, notificationCount: 0},
          {id: 'approvals', label: 'Approvals', icon: <CheckBadgeIcon className="h-5 w-5"/>, notificationCount: props.allProfiles.filter(p=>p.approvalStatus === 'pending').length},
          {id: 'verifications', label: 'Verifications', icon: <CheckBadgeIcon className="h-5 w-5"/>, notificationCount: props.allProfiles.filter(p=>p.documentForVerification && !p.isVerified).length},
          {id: 'photo-approvals', label: 'Photo Approvals', icon: <PhotoIcon className="h-5 w-5"/>, notificationCount: props.allProfiles.flatMap(p=>p.gallery).filter(g=>g.status==='pending').length},
          {id: 'reports', label: 'Reports', icon: <FlagIcon className="h-5 w-5"/>, notificationCount: props.reports.filter(r=>r.status === 'pending').length},
          {id: 'offline-payments', label: 'Offline Payments', icon: <CurrencyDollarIcon className="h-5 w-5"/>, notificationCount: props.offlinePaymentRequests.length},
      ],
      'Platform Content': [
          {id: 'pages', label: 'Pages', icon: <PageIcon className="h-5 w-5"/>},
          {id: 'services', label: 'Services', icon: <CogIcon className="h-5 w-5"/>},
          {id: 'happy-stories', label: 'Happy Stories', icon: <StarIcon className="h-5 w-5"/>},
          {id: 'pricing', label: 'Packages', icon: <CurrencyDollarIcon className="h-5 w-5"/>},
          {id: 'contact-queries', label: 'Contact Queries', icon: <EnvelopeIcon className="h-5 w-5"/>, notificationCount: props.contactQueries.filter(q=>q.status === 'new').length},
      ],
      'Vendors & Events': [
          {id: 'live', label: 'Live Events', icon: <CalendarIcon className="h-5 w-5"/>},
          {id: 'vendors', label: 'Vendors', icon: <BuildingStorefrontIcon className="h-5 w-5"/>},
          {id: 'vendor-reviews', label: 'Vendor Reviews', icon: <StarIcon className="h-5 w-5"/>, notificationCount: props.vendorReviews.filter(r=>r.status === 'pending').length},
          {id: 'astrologers', label: 'Astrologers', icon: <SparklesIcon className="h-5 w-5"/>},
      ],
       'Configuration': [
          {id: 'web-setup', label: 'Web Setup', icon: <CogIcon className="h-5 w-5"/>},
          {id: 'appearance', label: 'Appearance', icon: <PaintBrushIcon className="h-5 w-5"/>},
          {id: 'homepage', label: 'Homepage', icon: <HomeIcon className="h-5 w-5"/>},
          {id: 'attribute-builder', label: 'Attribute Builder', icon: <WrenchScrewdriverIcon className="h-5 w-5"/>},
          {id: 'utilities', label: 'Utilities', icon: <CogIcon className="h-5 w-5"/>},
      ]
  };

  const renderViewContent = () => {
      switch(activeView) {
          case 'ai-assistant': return <AIAdminAssistant 
                allProfiles={props.allProfiles} 
                reports={props.reports} 
                contactQueries={props.contactQueries} 
            />;
          case 'members': return <MembersManagement allProfiles={props.allProfiles} onUpdateProfiles={props.onUpdateUsers} />;
          case 'approvals': return <ApprovalsManagement allProfiles={props.allProfiles} onUpdateProfiles={props.onUpdateUsers} onCreateNotification={props.onCreateNotification} />;
          case 'verifications': return <VerificationsManagement allProfiles={props.allProfiles} onUpdateProfiles={props.onUpdateUsers} onCreateNotification={props.onCreateNotification} />;
          case 'photo-approvals': return <PhotoApprovalsManagement profiles={props.allProfiles} onUpdateProfiles={props.onUpdateUsers} />;
          case 'reports': return <ReportedUsersManagement reports={props.reports} profiles={props.allProfiles} onUpdateReports={props.onUpdateReports} onUpdateProfiles={props.onUpdateUsers} />;
          case 'live': return <LiveEventsManagement events={props.liveEvents} onUpdateEvents={props.onUpdateLiveEvents} />;
          case 'vendors': return <VendorsManagement allProfiles={props.allProfiles} onUpdateProfiles={props.onUpdateUsers} />;
          case 'vendor-reviews': return <VendorReviewsManagement reviews={props.vendorReviews} onUpdateReviews={props.onUpdateVendorReviews} profiles={props.allProfiles} />;
          case 'astrologers': return <AstrologersManagement astrologers={props.astrologers} onUpdateAstrologers={props.onUpdateAstrologers} />;
          case 'pages': return <PagesManagement pages={props.pages} onUpdatePages={props.onUpdatePages} />;
          case 'services': return <ServicesManagement services={props.services} onUpdateServices={props.onUpdateServices} />;
          case 'happy-stories': return <HappyStoriesManagement stories={props.happyStories} onUpdateStories={props.onUpdateHappyStories} />;
          case 'pricing': return <PackagesManagement plans={props.pricingPlans} onUpdatePlans={props.onUpdatePricing} />;
          case 'attribute-builder': return <AttributeBuilder attributes={props.attributes} onUpdateAttributes={props.onUpdateAttributes} />;
          case 'web-setup': return <WebSetup settings={props.websiteSettings} onSave={props.onUpdateWebsiteSettings} />;
          case 'appearance': return <AppearanceSettings settings={props.websiteSettings} onSave={props.onUpdateWebsiteSettings} />;
          case 'homepage': return <HomepageManagement settings={props.websiteSettings} onSave={props.onUpdateWebsiteSettings} />;
          case 'contact-queries': return <ContactQueriesManagement queries={props.contactQueries} onUpdateQueries={props.onUpdateContactQueries} />;
          case 'offline-payments': return <OfflinePaymentsManagement requests={props.offlinePaymentRequests} onProcessRequest={props.onProcessOfflinePayment} />;
          case 'utilities': return <Utilities settings={props.websiteSettings} onSave={props.onUpdateWebsiteSettings} />;
          default: return null;
      }
  }

  const activeViewLabel = Object.values(SIDEBAR_ITEMS).flat().find(item => item.id === activeView)?.label;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-theme-surface border-r border-theme-border flex-shrink-0">
         <div className="p-4 border-b border-theme-border">
            <h2 className="text-xl font-bold">Admin Panel</h2>
         </div>
         <nav className="p-2 space-y-4">
            {Object.entries(SIDEBAR_ITEMS).map(([category, items]) => (
                <div key={category}>
                    <h3 className="px-2 text-xs font-semibold text-theme-text-secondary uppercase tracking-wider">{category}</h3>
                    <div className="mt-1 space-y-1">
                        {items.map(item => (
                            <button key={item.id} onClick={() => setActiveView(item.id as AdminView)} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeView === item.id ? 'bg-theme-accent-primary/10 text-theme-accent-primary' : 'text-theme-text-secondary hover:bg-theme-border hover:text-theme-text-primary'}`}>
                                {item.icon}
                                <span className="flex-1 text-left">{item.label}</span>
                                {item.notificationCount && item.notificationCount > 0 && (
                                    <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{item.notificationCount}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
         </nav>
      </aside>

      <main className="flex-1 bg-theme-bg p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{activeViewLabel}</h1>
            <button onClick={() => setCreateUserModalOpen(true)} className="bg-theme-accent-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                + Create Member
            </button>
        </div>
        
        <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
            {renderViewContent()}
        </div>
      </main>
      
       <CreateUserModal isOpen={isCreateUserModalOpen} onClose={() => setCreateUserModalOpen(false)} onCreateUser={handleCreateUser} />
    </div>
  );
};

export default AdminDashboard;