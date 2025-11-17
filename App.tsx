import React, { useState, useEffect } from 'react';
import { Profile, Conversation, PricingPlan, WebsiteSettings, View, Page, Service, HappyStory, Attribute, Report, ContactQuery, Notification, LiveEvent, VendorReview, WeddingPlanner, OfflinePaymentRequest, Astrologer, Message, Quiz, AIWeddingPlan, Gift } from './types';
import { PROFILES, CONVERSATIONS, PRICING_PLANS as initialPricingPlans, HAPPY_STORIES as initialHappyStories, ASTRO_PREDICTIONS, AUSPICIOUS_DATES, WEBSITE_SETTINGS as initialWebsiteSettings, PAGES as initialPages, SERVICES as initialServices, INITIAL_ATTRIBUTES, REPORTS as initialReports, CONTACT_QUERIES as initialContactQueries, LIVE_EVENTS as initialLiveEvents, VENDOR_REVIEWS as initialVendorReviews, OFFLINE_PAYMENT_REQUESTS as initialOfflinePaymentRequests, ASTROLOGERS as initialAstrologers, QUIZZES as initialQuizzes, AVAILABLE_GIFTS } from './constants';

// Services
import { getCompatibilityAnalysis, getAstrologicalCompatibility, generateChatReply, generateCompatibilityQuiz, getQuizSummary } from './services/geminiService';
import * as firebaseService from './services/firebaseService';

// Layouts
import MainLayout from './layouts/MainLayout';

// Core Pages
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import MaintenancePage from './pages/MaintenancePage';
import PendingApprovalPage from './pages/PendingApprovalPage';
import HomePage from './pages/HomePage';

// App Pages
import UserDashboard from './pages/UserDashboard';
import ProfilePage from './pages/ProfilePage';
import PartnerPreferencesPage from './pages/PartnerPreferencesPage';
import AdvancedSearchPage from './pages/AdvancedSearchPage';
import MessagesPage from './pages/MessagesPage';
import PricingPage from './pages/PricingPage';
import SettingsPage from './pages/SettingsPage';
import ProfileViewersPage from './pages/ProfileViewersPage';
import ShortlistedPage from './pages/ShortlistedPage';
import QuizzesPage from './pages/QuizzesPage';
import AIVowGeneratorPage from './pages/AIVowGeneratorPage';
import AIWeddingConciergePage from './pages/AIWeddingConciergePage';
import TellYourStoryPage from './pages/TellYourStoryPage';
import NotificationsPage from './pages/NotificationsPage';
import WeddingPlannerPage from './pages/WeddingPlannerPage';
import NostalgiaHubPage from './pages/NostalgiaHubPage'; // Import the new hub page

// Admin & Vendor Pages
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';

// Public Pages
import FaqPage from './pages/FaqPage';
import HappyStoriesPage from './pages/HappyStoriesPage';
import AstrologyPage from './pages/AstrologyPage';
import ServicePage from './pages/ServicePage';
import VendorDetailPage from './pages/VendorDetailPage';
import AstroReportPage from './pages/AstroReportPage';
import ContentPage from './pages/ContentPage';
import LiveEventsPage from './pages/LiveEventsPage';
import PublicVendorsPage from './pages/PublicVendorsPage';
import PublicAstrologersPage from './pages/PublicAstrologersPage';
import ProfileDetailPage from './pages/ProfileDetailPage';

// Components
import PaymentModal from './components/PaymentModal';
import Snackbar from './components/Snackbar';
import VerificationModal from './components/VerificationModal';
import AstroCompatibilityModal from './components/AstroCompatibilityModal';
import CallModal from './components/CallModal';
import WhatsNewModal from './components/WhatsNewModal';
import LoadingScreen from './components/LoadingScreen';


export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(initialPricingPlans);
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>({...initialWebsiteSettings, theme: 'vibrant-pink'});
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [happyStories, setHappyStories] = useState<HappyStory[]>(initialHappyStories);
  const [attributes, setAttributes] = useState<Attribute[]>(INITIAL_ATTRIBUTES);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>(initialContactQueries);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>(initialLiveEvents);
  const [vendorReviews, setVendorReviews] = useState<VendorReview[]>(initialVendorReviews);
  const [offlinePaymentRequests, setOfflinePaymentRequests] = useState<OfflinePaymentRequest[]>(initialOfflinePaymentRequests);
  const [astrologers, setAstrologers] = useState<Astrologer[]>(initialAstrologers);
  const [storySubmissions, setStorySubmissions] = useState<HappyStory[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [typingStatus, setTypingStatus] = useState<{[key: string]: string[]}>({});

  // UI State
  const [isAppLoading, setAppLoading] = useState(true);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [snackbar, setSnackbar] = useState<{message: string, onUndo?: () => void} | null>(null);
  const [analysisCache, setAnalysisCache] = useState<{[key: string]: string}>({});
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isAstroModalOpen, setAstroModalOpen] = useState(false);
  const [astroReport, setAstroReport] = useState<string | null>(null);
  const [isLoadingAstro, setIsLoadingAstro] = useState(false);
  const [callState, setCallState] = useState<{isOpen: boolean; targetUser: Profile | null; callType: 'voice' | 'video'}>({isOpen: false, targetUser: null, callType: 'voice'});
  const [isWhatsNewModalOpen, setWhatsNewModalOpen] = useState(false);
  const [profileForAstroModal, setProfileForAstroModal] = useState<Profile | null>(null);

  useEffect(() => {
    // Simulate fetching initial app data from Firebase
    const loadInitialData = async () => {
      setAppLoading(true);
      const [profiles, conversations] = await Promise.all([
        firebaseService.getProfiles(),
        firebaseService.getConversations(),
      ]);
      setAllProfiles(profiles);
      setAllConversations(conversations);
      setAppLoading(false);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    // Show "What's New" modal on first visit after login logic is handled in handleLogin
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const createNotification = (userId: string, message: string) => {
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId,
      message,
      isRead: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleLogin = async (email: string, password?: string) => {
    try {
        const userToLogin = await firebaseService.signIn(email, password);
        setCurrentUser(userToLogin);
        window.location.hash = '#/app/home';
    } catch (error) {
        setSnackbar({ message: (error as Error).message });
    }
  };
  
  const handleRegister = async (newUser: Omit<Profile, 'id' | 'status'>) => {
      try {
        const finalUser = await firebaseService.register(newUser);
        setAllProfiles(prev => [...prev, finalUser]);
        setCurrentUser(finalUser);
        window.location.hash = '#/app/home';
      } catch (error) {
        setSnackbar({ message: (error as Error).message });
      }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.hash = '#/';
  };
  
  const handleUpdateProfile = async (updatedProfile: Profile) => {
    const returnedProfile = await firebaseService.updateProfile(updatedProfile);
    setCurrentUser(returnedProfile);
    setAllProfiles(prev => prev.map(p => p.id === returnedProfile.id ? returnedProfile : p));
  };
  
  const handleAddContactQuery = (query: Omit<ContactQuery, 'id' | 'date' | 'status'>) => {
    const newQuery: ContactQuery = { ...query, id: `q${Date.now()}`, date: new Date().toISOString().split('T')[0], status: 'new' };
    setContactQueries(prev => [newQuery, ...prev]);
    setSnackbar({ message: 'Your query has been sent!' });
  };
  
  const handleSendInterest = (profileId: string) => {
      if (!currentUser) return;
      handleUpdateProfile({...currentUser, interestsSent: [...(currentUser.interestsSent || []), profileId]});
      const recipient = allProfiles.find(p => p.id === profileId);
      if(recipient) {
        createNotification(recipient.id, `${currentUser.name} has sent you an interest!`);
      }
      setSnackbar({ message: 'Interest Sent!' });
  }

  const handleSelectProfile = (profile: Profile) => {
    window.location.hash = `#/app/view-profile/${profile.id}`;
  };

  const handleFetchAnalysis = async (profileA: Profile, profileB: Profile) => {
    const cacheKey = `${profileA.id}-${profileB.id}`;
    if (analysisCache[cacheKey]) return; // Already cached
    setIsLoadingAnalysis(true);
    const result = await getCompatibilityAnalysis(profileA, profileB, attributes);
    setAnalysisCache(prev => ({...prev, [cacheKey]: result}));
    setIsLoadingAnalysis(false);
  }
  
  const handleFetchAstroReport = async (profileA: Profile, profileB: Profile) => {
      setIsLoadingAstro(true);
      setAstroReport(null);
      setProfileForAstroModal(profileB);
      setAstroModalOpen(true);
      const result = await getAstrologicalCompatibility(profileA, profileB, attributes);
      setAstroReport(result);
      setIsLoadingAstro(false);
  }

  const handleSendMessage = async (conversationId: string, text: string) => {
    if (!currentUser) return;
    
    await firebaseService.sendMessage(conversationId, {
      senderId: currentUser.id,
      text,
    });
    
    // The listener in MessagesPage will handle the UI update
  };
  
  const handleBlockUser = (userIdToBlock: string) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, blockedUsers: [...(currentUser.blockedUsers || []), userIdToBlock]};
    handleUpdateProfile(updatedUser);
    setSnackbar({ message: 'User has been blocked.' });
    window.location.hash = '#/app/home';
  }
  
  const handleReportUser = (reportedUserId: string, reason: string) => {
      if (!currentUser) return;
      const newReport: Report = { id: `rep${Date.now()}`, reportedUserId, reportedByUserId: currentUser.id, reason, date: new Date().toISOString(), status: 'pending' };
      setReports(prev => [...prev, newReport]);
      setSnackbar({ message: 'User has been reported. Our team will review it.' });
  }

  const handleShortlistProfile = (profileId: string) => {
      if (!currentUser) return;
      const isShortlisted = currentUser.shortlisted?.includes(profileId);
      const newShortlist = isShortlisted ? currentUser.shortlisted?.filter(id => id !== profileId) : [...(currentUser.shortlisted || []), profileId];
      handleUpdateProfile({ ...currentUser, shortlisted: newShortlist });
      setSnackbar({ message: isShortlisted ? 'Removed from shortlist.' : 'Added to shortlist.' });
  }

  const handleProfileView = (viewedProfileId: string) => {
      if (!currentUser) return;
      setAllProfiles(prev => prev.map(p => {
          if (p.id === viewedProfileId) {
              const viewers = p.profileViewers || [];
              if (!viewers.includes(currentUser!.id)) {
                  createNotification(viewedProfileId, `${currentUser!.name} viewed your profile.`);
                  return { ...p, profileViewers: [...viewers, currentUser!.id] };
              }
          }
          return p;
      }));
  }

  const handleSendQuizInvite = (challengedId: string) => {
      if(!currentUser) return;
      generateCompatibilityQuiz(currentUser, allProfiles.find(p => p.id === challengedId)!).then(questions => {
          const newQuiz: Quiz = {
              id: `q${Date.now()}`,
              challengerId: currentUser!.id,
              challengedId,
              questions,
              answers: {},
              status: 'pending',
          };
          setQuizzes(prev => [...prev, newQuiz]);
          handleUpdateProfile({ ...currentUser, quizInvitesSent: [...(currentUser.quizInvitesSent || []), newQuiz.id] });
          setAllProfiles(prev => prev.map(p => p.id === challengedId ? { ...p, quizInvitesReceived: [...(p.quizInvitesReceived || []), newQuiz.id] } : p));
          createNotification(challengedId, `${currentUser.name} has challenged you to a compatibility quiz!`);
          setSnackbar({ message: 'Quiz invite sent!' });
      });
  }
  
  const handleAnswerQuiz = (quizId: string, answers: string[]) => {
      const quiz = quizzes.find(q => q.id === quizId);
      if(!quiz || !currentUser) return;

      const updatedQuiz: Quiz = { ...quiz, answers: { ...quiz.answers, [currentUser.id]: answers }};
      
      // If both have answered, complete the quiz
      const otherUserId = quiz.challengerId === currentUser.id ? quiz.challengedId : quiz.challengerId;
      if (updatedQuiz.answers[otherUserId]) {
          getQuizSummary(quiz.questions, updatedQuiz.answers[currentUser.id], updatedQuiz.answers[otherUserId]).then(summary => {
              const score = Math.floor(Math.random() * 41) + 60; // Random score 60-100
              const completedQuiz = { ...updatedQuiz, status: 'completed' as 'completed', summary, score };
              setQuizzes(prev => prev.map(q => q.id === quizId ? completedQuiz : q));
              createNotification(otherUserId, `You've completed the quiz with ${currentUser.name}! View your results.`);
              createNotification(currentUser.id, `You've completed the quiz with ${allProfiles.find(p=>p.id===otherUserId)?.name}! View your results.`);
          });
      } else {
           setQuizzes(prev => prev.map(q => q.id === quizId ? updatedQuiz : q));
           createNotification(otherUserId, `${currentUser.name} has completed your quiz! It's your turn now.`);
      }
      setSnackbar({ message: 'Quiz answers submitted!' });
  }

  const handleSendGift = (recipientId: string, giftId: string) => {
      const gift = AVAILABLE_GIFTS.find(g => g.id === giftId);
      if (!gift || !currentUser) return;

      const newGift: Gift = {
          ...gift,
          senderId: currentUser.id,
          senderName: currentUser.name,
          timestamp: new Date().toISOString()
      };
      
      setAllProfiles(prev => prev.map(p => {
          if (p.id === recipientId) {
              return { ...p, giftsReceived: [...(p.giftsReceived || []), newGift]};
          }
          return p;
      }));
      createNotification(recipientId, `${currentUser.name} sent you a gift: ${gift.name}!`);
      setSnackbar({ message: 'Gift sent successfully!' });
  }
  
  const handleUpdateStorySubmissions = (submission: Omit<HappyStory, 'id'>) => {
    const newStory: HappyStory = { ...submission, id: `hs-sub-${Date.now()}` };
    setStorySubmissions(prev => [...prev, newStory]);
    // Optionally add to main happy stories list immediately or wait for admin approval
    // setHappyStories(prev => [...prev, newStory]);
    setSnackbar({ message: 'Thank you for sharing your story! It will be reviewed by our team.' });
  };
  
  const handleUpdateWeddingPlanner = (data: WeddingPlanner) => {
      if(!currentUser) return;
      handleUpdateProfile({ ...currentUser, weddingPlanner: data });
  }

  const handleImportAIPlan = (plan: AIWeddingPlan) => {
      if(!currentUser || !currentUser.weddingPlanner) return;
      const newBudgetItems = plan.budgetBreakdown.map(item => ({ id: `b-ai-${Date.now()}-${item.category}`, ...item, name: `AI Suggested: ${item.category}`, estimatedCost: item.cost, actualCost: 0, paid: false }));
      const newChecklistItems = plan.checklist.map(item => ({ id: `c-ai-${Date.now()}-${item.task}`, ...item, isCompleted: false }));

      const updatedPlanner = {
          ...currentUser.weddingPlanner,
          budget: [...currentUser.weddingPlanner.budget, ...newBudgetItems],
          checklist: { ...currentUser.weddingPlanner.checklist, 'AI Suggestions': newChecklistItems }
      }
      handleUpdateProfile({ ...currentUser, weddingPlanner: updatedPlanner });
      setSnackbar({ message: 'AI Plan imported to your Wedding Planner!' });
      window.location.hash = '#/app/wedding-planner';
  };

  const handleAcceptInterest = async (profileId: string) => {
    if (!currentUser) return;

    const { updatedCurrentUser, updatedOtherUser, conversationId } = await firebaseService.acceptInterest(currentUser, profileId);
    
    handleUpdateProfile(updatedCurrentUser); // Update current user in state
    setAllProfiles(prev => prev.map(p => p.id === updatedOtherUser.id ? updatedOtherUser : p));
    
    // The service now handles conversation creation, we just need to update the local state if needed and navigate.
    const updatedConversations = await firebaseService.getConversations();
    setAllConversations(updatedConversations);

    createNotification(profileId, `${currentUser.name} has accepted your interest!`);
    setSnackbar({ message: `You have accepted ${updatedOtherUser.name}'s interest! You can now chat.` });
    
    // Navigate directly to the chat with the person
    window.location.hash = `#/app/messages/${conversationId}`;
  };

  const handleDeclineInterest = (profileId: string) => {
      if (!currentUser) return;
      const otherUser = allProfiles.find(p => p.id === profileId);
      if (!otherUser) return;
      
      const updatedCurrentUser = {
          ...currentUser,
          interestsReceived: (currentUser.interestsReceived || []).filter(id => id !== profileId),
          interestsDeclined: [...(currentUser.interestsDeclined || []), profileId]
      };
      handleUpdateProfile(updatedCurrentUser);
      
      setSnackbar({ message: `You have declined ${otherUser.name}'s interest.` });
  };


  const renderAuthenticatedRoutes = () => {
    if (currentUser?.approvalStatus === 'pending') {
      return <PendingApprovalPage onLogout={handleLogout} />;
    }

    const routeParts = route.split('/');
    const mainRoute = routeParts[1];
    const mainView = routeParts[2] as View;
    const slug = routeParts[3];

    // Handle special routes like the 90s Hub
    if (mainRoute === '90s-hub') {
        return <NostalgiaHubPage currentUser={currentUser} allProfiles={allProfiles} />;
    }
    
    let content;

    switch(mainView) {
        case 'home': content = <HomePage profiles={allProfiles} services={services} currentUser={currentUser!} onSelectProfile={handleSelectProfile} onShortlistProfile={handleShortlistProfile} attributes={attributes} onSendInterest={handleSendInterest} websiteSettings={websiteSettings} />; break;
        case 'dashboard': content = currentUser?.role === 'user' ? <UserDashboard currentUser={currentUser} allProfiles={allProfiles} attributes={attributes} /> : <VendorDashboard vendor={currentUser} clients={[]} />; break;
        case 'profile': content = <ProfilePage user={currentUser} attributes={attributes} onUpdateProfile={handleUpdateProfile} onStartVerification={() => setVerificationModalOpen(true)} onUpgradePlanRequest={() => { setSelectedPlan(pricingPlans[0]); setPaymentModalOpen(true); }} />; break;
        case 'preferences': content = <PartnerPreferencesPage currentUser={currentUser} onUpdateProfile={handleUpdateProfile} />; break;
        case 'search': content = <AdvancedSearchPage profiles={allProfiles} currentUser={currentUser} onSelectProfile={handleSelectProfile} onShortlistProfile={handleShortlistProfile} />; break;
        case 'messages': content = <MessagesPage currentUser={currentUser} conversations={allConversations} allProfiles={allProfiles} onUpdateConversations={setAllConversations} onAcceptInterest={handleAcceptInterest} onDeclineInterest={handleDeclineInterest} typingStatus={typingStatus} onSendMessage={handleSendMessage} onInitiateCall={(targetUserId, type) => setCallState({isOpen: true, targetUser: allProfiles.find(p => p.id === targetUserId) || null, callType: type})} />; break;
        case 'pricing': content = <PricingPage plans={pricingPlans} onSelectPlan={(plan) => { setSelectedPlan(plan); setPaymentModalOpen(true); }} />; break;
        case 'settings': content = <SettingsPage />; break;
        case 'profile-viewers': content = <ProfileViewersPage currentUser={currentUser} allProfiles={allProfiles} onUpgradePlanRequest={() => { setSelectedPlan(pricingPlans[0]); setPaymentModalOpen(true); }} onSelectProfile={handleSelectProfile} onShortlistProfile={handleShortlistProfile} />; break;
        case 'shortlisted': content = <ShortlistedPage currentUser={currentUser} allProfiles={allProfiles} onSelectProfile={handleSelectProfile} onShortlistProfile={handleShortlistProfile} />; break;
        case 'quizzes': content = <QuizzesPage currentUser={currentUser} allProfiles={allProfiles} quizzes={quizzes} onAnswerQuiz={handleAnswerQuiz} />; break;
        case 'vow-generator': content = <AIVowGeneratorPage />; break;
        case 'ai-wedding-concierge': content = <AIWeddingConciergePage currentUser={currentUser} vendors={allProfiles.filter(p=>p.role === 'vendor')} onImportPlan={handleImportAIPlan} />; break;
        case 'happy-stories': content = <HappyStoriesPage stories={happyStories} websiteSettings={websiteSettings} />; break;
        case 'tell-your-story': content = <TellYourStoryPage currentUser={currentUser} onSubmit={handleUpdateStorySubmissions} websiteSettings={websiteSettings} />; break;
        case 'faq': content = <FaqPage websiteSettings={websiteSettings} />; break;
        case 'astrology': content = <AstrologyPage predictions={ASTRO_PREDICTIONS} auspiciousDates={AUSPICIOUS_DATES} websiteSettings={websiteSettings} />; break;
        case 'notifications': content = <NotificationsPage notifications={notifications.filter(n => n.userId === currentUser.id)} />; break;
        case 'wedding-planner': content = currentUser.weddingPlanner ? <WeddingPlannerPage plannerData={currentUser.weddingPlanner} onUpdate={handleUpdateWeddingPlanner} /> : <div>Planner not initialized!</div>; break;
        case 'admin': content = currentUser.role === 'admin' ? <AdminDashboard allProfiles={allProfiles} pricingPlans={pricingPlans} websiteSettings={websiteSettings} pages={pages} services={services} happyStories={happyStories} attributes={attributes} reports={reports} contactQueries={contactQueries} liveEvents={liveEvents} vendorReviews={vendorReviews} offlinePaymentRequests={offlinePaymentRequests} astrologers={astrologers} onUpdateUsers={setAllProfiles} onUpdatePricing={setPricingPlans} onUpdateWebsiteSettings={setWebsiteSettings} onUpdatePages={setPages} onUpdateServices={setServices} onUpdateHappyStories={setHappyStories} onUpdateAttributes={setAttributes} onUpdateReports={setReports} onUpdateContactQueries={setContactQueries} onUpdateLiveEvents={setLiveEvents} onUpdateVendorReviews={setVendorReviews} onProcessOfflinePayment={() => {}} onUpdateAstrologers={setAstrologers} onCreateNotification={createNotification} /> : <NotFoundPage />; break;
        case 'view-profile': content = <ProfileDetailPage profile={allProfiles.find(p => p.id === slug)!} currentUser={currentUser} onBlockUser={handleBlockUser} onReportUser={handleReportUser} onSendInterest={handleSendInterest} onShortlistProfile={handleShortlistProfile} onUpgradePlanRequest={() => { setSelectedPlan(pricingPlans[0]); setPaymentModalOpen(true); }} onFetchAnalysis={handleFetchAnalysis} onFetchAstroReport={handleFetchAstroReport} isLoadingAnalysis={isLoadingAnalysis} analysisCache={analysisCache} attributes={attributes} onProfileView={handleProfileView} onSendQuizInvite={handleSendQuizInvite} onSendGift={handleSendGift} quizzes={quizzes} />; break;
        default: content = <HomePage profiles={allProfiles} services={services} currentUser={currentUser!} onSelectProfile={handleSelectProfile} onShortlistProfile={handleShortlistProfile} attributes={attributes} onSendInterest={handleSendInterest} websiteSettings={websiteSettings} />;
    }
    
    return (
        <MainLayout
            currentUser={currentUser}
            websiteSettings={websiteSettings}
            pages={pages}
            attributes={attributes}
            notifications={notifications.filter(n => n.userId === currentUser.id)}
            onLogout={handleLogout}
            onUpdateWebsiteSettings={setWebsiteSettings}
        >
          {content}
        </MainLayout>
    );
  }

  const renderPublicRoutes = () => {
    const routeParts = route.split('?')[0].split('/');
    const mainPath = routeParts[1];
    const slug = routeParts[2];
    
    const queryParams = new URLSearchParams(route.split('?')[1]);
    
    if (mainPath === 'services' && slug) {
      const service = services.find(s => s.slug === slug);
      return service ? <ServicePage service={service} websiteSettings={websiteSettings} allProfiles={allProfiles} /> : <NotFoundPage />;
    }
    if (mainPath === 'vendors' && slug) {
        const vendor = allProfiles.find(p => p.id === slug);
        return vendor ? <VendorDetailPage vendor={vendor} currentUser={currentUser} onAddReview={() => {}} websiteSettings={websiteSettings} /> : <NotFoundPage />;
    }
    if (mainPath === 'astro-report') {
        const userA = allProfiles.find(p => p.id === queryParams.get('userA'));
        const userB = allProfiles.find(p => p.id === queryParams.get('userB'));
        return userA && userB ? <AstroReportPage userA={userA} userB={userB} /> : <NotFoundPage />;
    }
    
    const dynamicPage = pages.find(p => p.slug === mainPath && p.status === 'published');
    if (dynamicPage) {
        return <ContentPage page={dynamicPage} websiteSettings={websiteSettings} />;
    }
    
    switch(route) {
      case '#/': return <LandingPage websiteSettings={websiteSettings} pricingPlans={pricingPlans} happyStories={happyStories} services={services} onAddContactQuery={handleAddContactQuery} />;
      case '#/login': return <AuthPage onLogin={handleLogin} />;
      case '#/register': return <RegisterPage onRegister={handleRegister} />;
      case '#/faq': return <FaqPage isPublic={true} websiteSettings={websiteSettings} />;
      case '#/happy-stories': return <HappyStoriesPage isPublic={true} stories={happyStories} websiteSettings={websiteSettings} />;
      case '#/astrology': return <AstrologyPage isPublic={true} predictions={ASTRO_PREDICTIONS} auspiciousDates={AUSPICIOUS_DATES} websiteSettings={websiteSettings} />;
      case '#/live': return <LiveEventsPage isPublic={true} events={liveEvents} websiteSettings={websiteSettings} />;
      case '#/vendors': return <PublicVendorsPage vendors={allProfiles.filter(p => p.role === 'vendor' && p.approvalStatus === 'approved')} isPublic={true} websiteSettings={websiteSettings} />;
      case '#/astrologers': return <PublicAstrologersPage astrologers={astrologers} isPublic={true} websiteSettings={websiteSettings} />;
      default:
        if (route.startsWith('#/app') || route.startsWith('#/90s-hub')) {
             window.location.hash = '#/login';
             return null;
        }
        return <NotFoundPage />;
    }
  }

  const renderContent = () => {
    if (isAppLoading) {
      return <LoadingScreen />;
    }

    if (websiteSettings.maintenanceMode.enabled && (!currentUser || currentUser.role !== 'admin')) {
      return <MaintenancePage message={websiteSettings.maintenanceMode.message} />;
    }
    
    return currentUser ? renderAuthenticatedRoutes() : renderPublicRoutes();
  };
  
  const customStyles: React.CSSProperties = {
    '--custom-text-color': websiteSettings.textColor,
  } as React.CSSProperties;

  return (
    <div className={websiteSettings.theme} style={customStyles}>
        <div className="bg-theme-bg min-h-screen">
            {renderContent()}
             {snackbar && (
                  <Snackbar 
                      message={snackbar.message}
                      onUndo={snackbar.onUndo}
                      onClose={() => setSnackbar(null)}
                  />
              )}
              {isPaymentModalOpen && selectedPlan && (
                  <PaymentModal 
                      isOpen={isPaymentModalOpen}
                      plan={selectedPlan}
                      onClose={() => setPaymentModalOpen(false)}
                      onConfirmPayment={() => {
                          handleUpdateProfile({ ...currentUser!, isPremium: true });
                          setPaymentModalOpen(false);
                          setSnackbar({ message: `Successfully upgraded to ${selectedPlan.name}!` });
                      }}
                      manualPaymentMethods={websiteSettings.manualPaymentMethods}
                  />
              )}
              <VerificationModal 
                isOpen={isVerificationModalOpen}
                onClose={() => setVerificationModalOpen(false)}
                onVerified={() => {
                    handleUpdateProfile({ ...currentUser!, isPhotoVerified: true });
                    setVerificationModalOpen(false);
                    setSnackbar({ message: 'You are now Photo Verified!' });
                }}
                profilePhoto={currentUser?.photo || ''}
              />
               <AstroCompatibilityModal 
                  isOpen={isAstroModalOpen}
                  isLoading={isLoadingAstro}
                  report={astroReport}
                  user={profileForAstroModal}
                  onClose={() => setAstroModalOpen(false)}
              />
              <CallModal 
                isOpen={callState.isOpen}
                onClose={() => setCallState({isOpen: false, targetUser: null, callType: 'voice'})}
                targetUser={callState.targetUser}
                callType={callState.callType}
              />
              <WhatsNewModal 
                isOpen={isWhatsNewModalOpen}
                onClose={() => {
                    setWhatsNewModalOpen(false);
                }}
              />
        </div>
    </div>
  )
}