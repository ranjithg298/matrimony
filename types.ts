import React from 'react';

// Core User & Profile Types
export interface PartnerPreferences {
  ageRange: [number, number];
  heightRange: [string, string];
  maritalStatus: string[];
  religion: string[];
  caste: string[];
  motherTongue: string[];
  occupation: string[];
  annualIncome: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  email: string;
  role: 'user' | 'vendor' | 'admin' | 'staff';
  status: 'active' | 'suspended';
  approvalStatus: 'approved' | 'pending' | 'rejected';
  photo: string;
  bio: string;
  interests: string[];
  isPremium?: boolean;
  isOnline?: boolean;
  isVerified?: boolean; // For 'Blue Tick' status (documents)
  isPhotoVerified?: boolean; // For selfie verification
  documentForVerification?: { url: string; type: 'Aadhaar' | 'Passport' }; // For admin review
  bioDataUrl?: string; // For bio-data document upload
  distance?: number; // in km
  
  // Dynamic fields controlled by Admin Attribute Builder
  customFields: {
    [attributeId: string]: any; // Can be string, number, string[], etc.
  };

  // Engagement
  interestsSent?: string[];
  interestsReceived?: string[];
  interestsDeclined?: string[]; // Added to track declined interests
  shortlisted?: string[];
  blockedUsers?: string[];
  profileViewers?: string[];
  compatibilityScore?: number;
  quizInvitesSent?: string[];
  quizInvitesReceived?: string[];
  giftsReceived?: Gift[];
  
  // User Photo Gallery
  gallery: { url: string; status: 'approved' | 'pending' | 'rejected' }[];

  // Wedding Planner
  weddingPlanner?: WeddingPlanner;

  // Partner Preferences
  partnerPreferences?: PartnerPreferences;

  // For Vendors
  serviceCategory?: string;
  portfolioUrl?: string;
  vendorBio?: string;
  reviews?: VendorReview[];
}

export type StaffMember = Profile;

export type View = 
  | 'home' | 'discover' | 'profile' | 'messages' | 'admin' | 'vendor' | 'settings' | 'pricing' | 'live' | 'faq' 
  | 'dashboard' | 'search' | 'preferences' | 'happy-stories' | 'astrology' | 'vendors' | 'wedding-planner'
  | 'vow-generator' | 'astrologers' | 'tell-your-story' | 'view-profile' // Added view-profile
  | 'profile-viewers'
  | 'shortlisted'
  | 'quizzes'
  | 'notifications'
  | 'ai-wedding-concierge'
  | 'approvals' | 'photo-approvals' // Admin specific views

export type Theme = 'imperial-gold' | 'royal-purple' | 'classic-blue' | 'elegant-teal' | 'sunset-rose' | 'emerald-green' | 'midnight-blue' | 'vibrant-pink';
export type Typography = 'classic' | 'modern' | 'roboto' | 'merriweather' | 'nunito' | 'lora';

// FIX: Exported the 'WindowState' interface to define the shape of window objects used in the 90s hub desktop layout, resolving import errors.
export interface WindowState {
  id: string;
  title: string;
  component: React.ReactNode;
  zIndex: number;
}

// Admin Attribute Builder Types
export enum AttributeType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  DROPDOWN = 'dropdown',
  MULTISELECT = 'multoselect',
  DATE = 'date',
}
export interface Attribute {
  id: string;
  label: string;
  type: AttributeType;
  options?: string[]; // For dropdown and multoselect
  isCore?: boolean; // Core attributes cannot be deleted by admin
}


// Messaging Types
export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number; // Use timestamp for sorting
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: { [key: string]: Pick<Profile, 'name' | 'photo' | 'isOnline' | 'isPremium' | 'isVerified'> };
  messages: Message[];
  lastReadTimestamp: { [userId: string]: number };
  typing: { [userId: string]: boolean };
}

// AI Quiz Types
export interface QuizQuestion {
  question: string;
  options: string[];
}
export interface Quiz {
  id: string;
  challengerId: string;
  challengedId: string;
  questions: QuizQuestion[];
  answers: {
    [userId: string]: string[];
  };
  status: 'pending' | 'completed';
  score?: number; // out of 100
  summary?: string;
}

// Wedding Planner Types
export interface Guest {
    id: string;
    name: string;
    side: 'bride' | 'groom' | 'both';
    status: 'invited' | 'attending' | 'declined' | 'pending';
    group: string;
}

export interface BudgetItem {
    id: string;
    category: string;
    name: string;
    estimatedCost: number;
    actualCost: number;
    paid: boolean;
}

export interface ChecklistItem {
    id: string;
    task: string;
    isCompleted: boolean;
}

export interface WeddingPlanner {
    guests: Guest[];
    budget: BudgetItem[];
    checklist: { [category: string]: ChecklistItem[] };
}

export interface AIWeddingPlan {
    budgetBreakdown: { category: string; cost: number; }[];
    vendorSuggestions: { category: string; name: string; }[];
    checklist: { category: string; task: string; }[];
}


// Monetization & Content Types
export interface Gift {
    id: string;
    name: string;
    icon: string;
    senderId: string;
    senderName: string;
    timestamp: string;
}

export interface PricingPlan {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    duration: string;
    planType: 'standard' | 'elite' | 'late-marriage';
    description: string;
    features: string[];
    popular?: boolean;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface HappyStory {
    id: string;
    coupleNames: string;
    weddingDate: string;
    imageUrl: string;
    story: string;
    videoUrl?: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    heroImageUrl?: string;
    isSpecialCategory?: '90s-hub';
}

// Astrology Types
export interface AstroPrediction {
    rasi: string;
    prediction: string;
}

export interface AuspiciousDate {
    date: string;
    day: string;
    reason: string;
}

export interface Astrologer {
    id:string;
    name: string;
    photo: string;
    specializations: string[];
    experience: number; // in years
    bio: string;
    meetLink: string;
}


// Admin & System Types
export interface AdminAssistantMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface HeaderLink {
  id: string;
  text: string;
  url: string;
}

export interface SocialLink {
  id: string;
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'Youtube';
  url: string;
}

export interface HomepageSection {
  id: 'matchmaker' | '90s-hub' | 'featured-services' | 'recommendations';
  title: string;
  enabled: boolean;
}

export interface WebsiteSettings {
  siteName: string;
  siteNamePosition: 'left' | 'right';
  logoUrl: string;
  slogan: string;
  stickyHeader: boolean;
  headerLinks: HeaderLink[];

  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroImageZoom?: number;
  
  footerContent: string;
  copyrightText: string;
  socialLinks: SocialLink[];

  contactEmail: string;
  contactPhonePrimary: string;
  address: string;

  maintenanceMode: {
    enabled: boolean;
    message: string;
  };
  
  theme: Theme;
  typography: Typography;
  textColor?: string;
  
  manualPaymentMethods: ManualPaymentMethod[];
  siteBackgroundImageUrl?: string;
  homepageSettings: HomepageSection[];
  backendStatus: 'simulated' | 'live';

  // New fields for editable founder message
  storySubmissionFounderName: string;
  storySubmissionFounderMessage: string;
  storySubmissionFounderImage: string;
}

export interface OfflinePaymentRequest {
    id: string;
    userId: string;
    userName: string;
    planName: string;
    referenceId: string;
    date: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface ManualPaymentMethod {
    id: string;
    name: string;
    type: 'Bank Transfer' | 'Cash Deposit' | 'Other';
    thumbnailUrl: string;
    instructions: string;
    bankAccounts: BankAccount[];
    enabled: boolean;
}

export interface ContactQuery {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'new' | 'read' | 'handled';
    bioDataUrl?: string;
}

export interface Page {
    id: string;
    title: string;
    slug: string;
    content: string;
    status: 'published' | 'draft';
    isVisibleInMenu: boolean;
    metaTitle?: string;
    metaDescription?: string;
}

export interface Report {
  id: string;
  reportedUserId: string;
  reportedByUserId: string;
  reason: string;
  date: string; // ISO string
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  timestamp: string; // ISO string
}

export interface LiveEvent {
    id: string;
    title: string;
    description: string;
    date: string; // ISO string
    meetLink: string;
}

export interface VendorReview {
    id: string;
    vendorId: string;
    userId: string;
    userName: string;
    userPhoto: string;
    rating: number; // 1-5
    comment: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
}
