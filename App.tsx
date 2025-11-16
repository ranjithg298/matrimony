import React, { useState, useEffect } from 'react';
import { Profile, Conversation, PricingPlan, WebsiteSettings, View, Page, Service, HappyStory, Attribute, Report, ContactQuery, Notification, LiveEvent, VendorReview, WeddingPlanner, OfflinePaymentRequest, Astrologer, Message, Quiz, AIWeddingPlan, Gift } from './types';
import { PROFILES, CONVERSATIONS, PRICING_PLANS as initialPricingPlans, HAPPY_STORIES as initialHappyStories, ASTRO_PREDICTIONS, AUSPICIOUS_DATES, WEBSITE_SETTINGS as initialWebsiteSettings, PAGES as initialPages, SERVICES as initialServices, INITIAL_ATTRIBUTES, REPORTS as initialReports, CONTACT_QUERIES as initialContactQueries, LIVE_EVENTS as initialLiveEvents, VENDOR_REVIEWS as initialVendorReviews, OFFLINE_PAYMENT_REQUESTS as initialOfflinePaymentRequests, ASTROLOGERS as initialAstrologers, QUIZZES as initialQuizzes, AVAILABLE_GIFTS } from './constants';

// Services
import { getCompatibilityAnalysis, getAstrologicalCompatibility, generateChatReply, generateCompatibilityQuiz, getQuizSummary } from './services/geminiService';

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
import ProfileDetailDrawer from './components/ProfileDetailDrawer';
import VerificationModal from './components/VerificationModal';
import AstroCompatibilityModal from './components/AstroCompatibilityModal';
import CallModal from './components/CallModal';
import WhatsNewModal from './components/WhatsNewModal';


export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [allProfiles, setAllProfiles] = useState<Profile[]>(PROFILES);
  const [allConversations, setAllConversations] = useState(CONVERSATIONS);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(initialPricingPlans);
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>({...initialWebsiteSettings, theme: 'imperial-gold'});
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
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [snackbar, setSnackbar] = useState<{message: string, onUndo?: () => void} | null>(null);
  const [selectedProfileForDetail, setSelectedProfileForDetail] = useState<Profile | null>(null);
  const [analysisCache, setAnalysisCache] = useState<{[key: string]: string}>({});
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isAstroModalOpen, setAstroModalOpen] = useState(false);
  const [astroReport, setAstroReport] = useState<string | null>(null);
  const [isLoadingAstro, setIsLoadingAstro] = useState(false);
  const [callState, setCallState] = useState<{isOpen: boolean; targetUser: Profile | null; callType: 'voice' | 'video'}>({isOpen: false, targetUser: null, callType: 'voice'});
  const [isWhatsNewModalOpen, setWhatsNewModalOpen] = useState(false);


  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
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

  const handleLogin = (email: string) => {
    const user = allProfiles.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(allProfiles[0]);
    }
    window.location.hash = '#/app/home';
    setWhatsNewModalOpen(true);
  };
  
  const handleRegister = (newUser: Omit<Profile, 'id' | 'status'>) => {
      const finalUser: Profile = {
        ...newUser,
        id: `u${Date.now()}`,
        approvalStatus: 'pending',
        status: 'active',
      };
      setAllProfiles(prev => [...prev, finalUser]);
      setCurrentUser(finalUser);
      window.location.hash = '#/app/home';
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.hash = '#/';
  };
  
  const handleUpdateProfile = (updatedProfile: Profile) => {
    setCurrentUser(updatedProfile);
    setAllProfiles(prev => prev.map(p => p.id === updatedProfile.id ? updatedProfile : p));
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
    setSelectedProfileForDetail(profile);
  };
  
  const handleCloseDetailDrawer = () => {
    setSelectedProfileForDetail(null);
    setAnalysisCache(prev => ({ ...prev, [selectedProfileForDetail!.id]: prev[selectedProfileForDetail!.id] || null })); // Persist cache
  };

  const handleFetchAnalysis = async (profileA: Profile, profileB: Profile) => {
    if (analysisCache[profileB.id]) return; // Already cached
    setIsLoadingAnalysis(true);
    const result = await getCompatibilityAnalysis(profileA, profileB, attributes);
    setAnalysisCache(prev => ({...prev, [profileB.id]: result}));
    setIsLoadingAnalysis(false);
  }
  
  const handleFetchAstroReport = async (profileA: Profile, profileB: Profile) => {
      setIsLoadingAstro(true);
      setAstroReport(null);
      setAstroModalOpen(true);
      const result = await getAstrologicalCompatibility(profileA, profileB, attributes);
      setAstroReport(result);
      setIsLoadingAstro(false);
  }

  const handleSendMessage = (conversationId: string, text: string) => {
      const updatedConversations = allConversations.map(c => {
          if (c.id === conversationId) {
              const newMessage: Message = { id: `m${Date.now()}`, senderId: currentUser!.id, text, timestamp: Date.now(), isRead: false };
              return { ...c, messages: [...c.messages, newMessage] };
          }
          return c;
      });
      setAllConversations(updatedConversations);
      // Simulate reply
      const currentConvo = updatedConversations.find(c => c.id === conversationId);
      if(currentConvo) {
          const otherUserId = currentConvo.participantIds.find(id => id !== currentUser!.id)!;
          setTypingStatus(prev => ({ ...prev, [conversationId]: [otherUserId]}));
          setTimeout(async () => {
              const reply = await generateChatReply(currentConvo.messages, allProfiles.find(p => p.id === otherUserId)!);
              const replyMessage: Message = { id: `m${Date.now() + 1}`, senderId: otherUserId, text: reply, timestamp: Date.now(), isRead: false };
              setAllConversations(prev => prev.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, replyMessage]} : c));
              setTypingStatus(prev => ({ ...prev, [conversationId]: []}));
          }, 2000 + Math.random() * 2000);
      }
  };
  
  const handleBlockUser = (userIdToBlock: string) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, blockedUsers: [...(currentUser.blockedUsers || []), userIdToBlock]};
    handleUpdateProfile(updatedUser);
    setSelectedProfileForDetail(null);
    setSnackbar({ message: 'User has been blocked.' });
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
    setHappyStories(prev => [...prev, newStory]);
    setSnackbar({ message: 'Thank you for sharing your story! It will be reviewed by our team.' });
    window.location.hash = '#/app/happy-stories';
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

  const handleAcceptInterest = (profileId: string) => {
    if (!currentUser) return;
    
    const otherUser = allProfiles.find(p => p.id === profileId);
    if (!otherUser) return;

    const updatedCurrentUser = {
        ...currentUser,
        interestsReceived: (currentUser.interestsReceived || []).filter(id => id !== profileId)
    };
    handleUpdateProfile(updatedCurrentUser);

    const updatedOtherUser = {
        ...otherUser,
        interestsSent: (otherUser.interestsSent || []).filter(id => id !== currentUser.id)
    };
    setAllProfiles(prev => prev.map(p => p.id === updatedOtherUser.id ? updatedOtherUser : p));

    createNotification(profileId, `${currentUser.name} has accepted your interest!`);

    const existingConversation = allConversations.find(c => 
        c.participantIds.includes(currentUser.id) && c.participantIds.includes(profileId)
    );

    if (!existingConversation) {
        const newConversation: Conversation = {
            id: `c${Date.now()}`,
            participantIds: [currentUser.id, profileId],
            participants: {
                [currentUser.id]: { name: currentUser.name, photo: currentUser.photo, isOnline: currentUser.isOnline, isPremium: currentUser.isPremium, isVerified: currentUser.isVerified },
                [profileId]: { name: otherUser.name, photo: otherUser.photo, isOnline: otherUser.isOnline, isPremium: otherUser.isPremium, isVerified: otherUser.isVerified },
            },
            messages: [],
            lastReadTimestamp: { [currentUser.id]: Date.now(), [profileId]: 0 },
            typing: {}
        };
        setAllConversations(prev => [newConversation, ...prev]);
    }
    
    setSnackbar({ message: `You have accepted ${otherUser.name}'s interest!` });
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
    const mainView = routeParts[2] as View;
    const slug = routeParts[3];
    
    let content;

    switch(mainView) {
        case 'home': content = <HomePage profiles={allProfiles} currentUser={currentUser!} onSelectProfile={handleSelectProfile} onShortlistProfile={handleShortlistProfile} attributes={attributes} onSendInterest={handleSendInterest} />; break;
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
        case 'tell-your-story': content = <TellYourStoryPage currentUser={currentUser} onSubmit={handleUpdateStorySubmissions} />; break;
        case 'faq': content = <FaqPage websiteSettings={websiteSettings} />; break;
        case 'astrology': content = <AstrologyPage predictions={ASTRO_PREDICTIONS} auspiciousDates={AUSPICIOUS_DATES} websiteSettings={websiteSettings} />; break;
        case 'notifications': content = <NotificationsPage notifications={notifications.filter(n => n.userId === currentUser.id)} />; break;
        case 'wedding-planner': content = currentUser.weddingPlanner ? <WeddingPlannerPage plannerData={currentUser.weddingPlanner} onUpdate={handleUpdateWeddingPlanner} /> : <div>Planner not initialized!</div>; break;
        case 'admin': content = currentUser.role === 'admin' ? <AdminDashboard allProfiles={allProfiles} pricingPlans={pricingPlans} websiteSettings={websiteSettings} pages={pages} services={services} happyStories={happyStories} attributes={attributes} reports={reports} contactQueries={contactQueries} liveEvents={liveEvents} vendorReviews={vendorReviews} offlinePaymentRequests={offlinePaymentRequests} astrologers={astrologers} onUpdateUsers={setAllProfiles} onUpdatePricing={setPricingPlans} onUpdateWebsiteSettings={setWebsiteSettings} onUpdatePages={setPages} onUpdateServices={setServices} onUpdateHappyStories={setHappyStories} onUpdateAttributes={setAttributes} onUpdateReports={setReports} onUpdateContactQueries={setContactQueries} onUpdateLiveEvents={setLiveEvents} onUpdateVendorReviews={setVendorReviews} onProcessOfflinePayment={() => {}} onUpdateAstrologers={setAstrologers} onCreateNotification={createNotification} /> : <NotFoundPage />; break;
        case 'view-profile': content = <ProfileDetailPage profile={allProfiles.find(p => p.id === slug)!} currentUser={currentUser} onBlockUser={handleBlockUser} onReportUser={handleReportUser} onSendInterest={handleSendInterest} onShortlistProfile={handleShortlistProfile} onUpgradePlanRequest={() => { setSelectedPlan(pricingPlans[0]); setPaymentModalOpen(true); }} onFetchAnalysis={handleFetchAnalysis} onFetchAstroReport={handleFetchAstroReport} isLoadingAnalysis={isLoadingAnalysis} analysisCache={analysisCache} attributes={attributes} onProfileView={handleProfileView} onSendQuizInvite={handleSendQuizInvite} onSendGift={handleSendGift} quizzes={quizzes} />; break;
        default: content = <HomePage profiles={allProfiles} currentUser={currentUser!} onSelectProfile={handleSelectProfile} onShortlistProfile={handleShortlistProfile} attributes={attributes} onSendInterest={handleSendInterest} />;
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
      return service ? <ServicePage service={service} websiteSettings={websiteSettings} /> : <NotFoundPage />;
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
        if (route.startsWith('#/app')) {
             window.location.hash = '#/login';
             return null;
        }
        return <NotFoundPage />;
    }
  }

  const renderContent = () => {
    if (websiteSettings.maintenanceMode.enabled && (!currentUser || currentUser.role !== 'admin')) {
      return <MaintenancePage message={websiteSettings.maintenanceMode.message} />;
    }
    
    return currentUser ? renderAuthenticatedRoutes() : renderPublicRoutes();
  };
  
  return (
    <div className={websiteSettings.theme}>
        <div className="bg-theme-bg/98 backdrop-blur-sm min-h-screen">
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
              {selectedProfileForDetail && (
                  <ProfileDetailDrawer 
                      profile={selectedProfileForDetail}
                      currentUser={currentUser}
                      isOpen={!!selectedProfileForDetail}
                      onClose={handleCloseDetailDrawer}
                      analysisResult={analysisCache[selectedProfileForDetail.id]}
                      isLoading={isLoadingAnalysis && !analysisCache[selectedProfileForDetail.id]}
                      onFetchAnalysis={() => handleFetchAnalysis(currentUser!, selectedProfileForDetail)}
                      onUpgradePlanRequest={() => { setSelectedPlan(pricingPlans[0]); setPaymentModalOpen(true); }}
                      onBlockUser={handleBlockUser}
                      onReportUser={handleReportUser}
                      onSendMessage={() => window.location.hash = '#/app/messages'}
                      attributes={attributes}
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
                  user={selectedProfileForDetail}
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
                onClose={() => setWhatsNewModalOpen(false)}
              />
        </div>
    </div>
  )
}