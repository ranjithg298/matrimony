

import { Profile, Conversation, PricingPlan, FaqItem, HappyStory, AstroPrediction, AuspiciousDate, WebsiteSettings, ContactQuery, ManualPaymentMethod, Page, Service, Attribute, AttributeType, Report, LiveEvent, VendorReview, ChecklistItem, OfflinePaymentRequest, Astrologer, Quiz, QuizQuestion } from './types';

export const INITIAL_ATTRIBUTES: Attribute[] = [
  { id: 'height', label: 'Height', type: AttributeType.TEXT, isCore: true },
  { id: 'maritalStatus', label: 'Marital Status', type: AttributeType.DROPDOWN, options: ['Never Married', 'Divorced', 'Widowed'], isCore: true },
  { id: 'motherTongue', label: 'Mother Tongue', type: AttributeType.TEXT },
  { id: 'religion', label: 'Religion', type: AttributeType.TEXT, isCore: true },
  { id: 'caste', label: 'Caste / Community', type: AttributeType.TEXT },
  { id: 'education', label: 'Highest Education', type: AttributeType.TEXT },
  { id: 'occupation', label: 'Occupation', type: AttributeType.TEXT },
  { id: 'annualIncome', label: 'Annual Income', type: AttributeType.DROPDOWN, options: ["< ₹1L", "₹1L - ₹3L", "₹3L - ₹5L", "₹5L - ₹8L", "₹8L - ₹12L", "₹12L - ₹18L", "₹18L - ₹25L", "₹25L+"] },
  { id: 'diet', label: 'Dietary Habits', type: AttributeType.DROPDOWN, options: ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'] },
  { id: 'rasi', label: 'Vedic Rasi (Moon Sign)', type: AttributeType.TEXT, isCore: true },
  { id: 'nakshatra', label: 'Nakshatra', type: AttributeType.TEXT, isCore: true },
  { id: 'phoneNumber', label: 'Phone Number', type: AttributeType.TEXT },
  { id: 'mangalik', label: 'Mangalik', type: AttributeType.DROPDOWN, options: ["Yes", "No", "Don't Know"] },
];

export const AVAILABLE_GIFTS: { id: string; name: string; icon: string }[] = [
    { id: 'gift_rose', name: 'A Single Rose', icon: '🌹' },
    { id: 'gift_ring', name: 'A Diamond Ring', icon: '💍' },
    { id: 'gift_chocolate', name: 'Box of Chocolates', icon: '🍫' },
    { id: 'gift_teddy', name: 'A Cute Teddy Bear', icon: '🧸' },
    { id: 'gift_letter', name: 'A Love Letter', icon: '💌' },
    { id: 'gift_cake', name: 'A Delicious Cake', icon: '🍰' },
];

export const DEFAULT_WEDDING_CHECKLIST: { [category: string]: ChecklistItem[] } = {
    "12+ Months Out": [
        { id: 'c1', task: "Set a wedding budget", isCompleted: false },
        { id: 'c2', task: "Choose your wedding party", isCompleted: false },
        { id: 'c3', task: "Create a guest list draft", isCompleted: false },
        { id: 'c4', task: "Book a venue", isCompleted: false },
    ],
    "8-10 Months Out": [
        { id: 'c5', task: "Book photographer & videographer", isCompleted: false },
        { id: 'c6', task: "Book caterer & entertainment", isCompleted: false },
        { id: 'c7', task: "Shop for wedding attire", isCompleted: false },
    ],
    "4-6 Months Out": [
        { id: 'c8', task: "Send save-the-dates", isCompleted: false },
        { id: 'c9', task: "Book transportation", isCompleted: false },
    ],
    "2-3 Months Out": [
        { id: 'c10', task: "Send wedding invitations", isCompleted: false },
        { id: 'c11', task: "Finalize menu and floral arrangements", isCompleted: false },
    ],
};

export const PROFILES: Profile[] = [
  { 
    id: "u1", 
    name: "Priya Sharma", 
    age: 26, 
    city: "Bangalore", 
    email: "priya@matrimony.ai",
    role: "user",
    status: "active",
    approvalStatus: 'approved',
    isVerified: true,
    isPhotoVerified: true,
    photo: "https://images.unsplash.com/photo-1542345821-54b1f69255a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    bio: "Software Engineer passionate about travel, hiking, and exploring new cuisines. Looking for a meaningful connection with someone who is ambitious, kind, and has a good sense of humor. I value honesty and open communication in a relationship.",
    interests: ["Travel", "Hiking", "Foodie", "Technology"],
    isPremium: true,
    isOnline: true,
    bioDataUrl: '/assets/sample-biodata.pdf',
    gallery: [
      { url: "https://images.unsplash.com/photo-1542345821-54b1f69255a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", status: 'approved'},
      { url: "https://images.unsplash.com/photo-1562222409-1555a610d705?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", status: 'approved'},
      { url: "https://images.unsplash.com/photo-1594911382410-88cde882b545?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", status: 'pending'},
    ],
    customFields: {
      height: "5' 5\"",
      maritalStatus: 'Never Married',
      motherTongue: 'Hindi',
      religion: 'Hindu',
      caste: 'Brahmin',
      education: "B.Tech in Computer Science",
      occupation: "Software Engineer",
      annualIncome: "₹18L - ₹25L",
      diet: 'Vegetarian',
      rasi: "Karka (Cancer)",
      nakshatra: "Ashlesha",
      phoneNumber: "9876543210",
      mangalik: "No",
    },
    interestsSent: ["u3"],
    interestsReceived: ["u2", "u4"],
    quizInvitesReceived: ["q1"],
    shortlisted: ["u4"],
    blockedUsers: ["u5"],
    weddingPlanner: {
        guests: [
            { id: 'g1', name: 'Ravi Sharma', side: 'bride', status: 'attending', group: 'Family' },
            { id: 'g2', name: 'Sunita Sharma', side: 'bride', status: 'attending', group: 'Family' },
            { id: 'g3', name: 'Amit Singh', side: 'bride', status: 'invited', group: 'Friends' },
        ],
        budget: [],
        checklist: DEFAULT_WEDDING_CHECKLIST
    },
    partnerPreferences: {
      ageRange: [28, 32],
      heightRange: ["5' 9\"", "6' 2\""],
      maritalStatus: ['Never Married'],
      religion: ['Hindu'],
      caste: ['Brahmin', 'Kshatriya'],
      motherTongue: ['Hindi', 'English'],
      occupation: ['Software Engineer', 'Product Manager', 'Architect', 'Doctor'],
      annualIncome: '₹18L - ₹25L'
    }
  },
  { 
    id: "u2", 
    name: "Rohit Verma", 
    age: 29, 
    city: "Chennai", 
    email: "rohit@matrimony.ai",
    role: "user",
    status: "active",
    approvalStatus: 'approved',
    isPhotoVerified: false,
    photo: "https://images.unsplash.com/photo-1610053252276-8f3833a54b6c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    bio: "Product Manager and a foodie at heart. I enjoy long drives, old movies, and a good book on a rainy day.",
    interests: ["Movies", "Reading", "Driving", "Cooking"],
    isPremium: false,
    isOnline: false,
    documentForVerification: { url: 'https://i.imgur.com/example-doc.png', type: 'Aadhaar'},
    gallery: [],
    customFields: {
        height: "5' 11\"",
        maritalStatus: 'Never Married',
        motherTongue: 'Tamil',
        religion: 'Hindu',
        caste: 'Chettiar',
        education: "MBA in Marketing",
        occupation: "Product Manager",
        annualIncome: "₹18L - ₹25L",
        diet: 'Non-Vegetarian',
        rasi: "Simha (Leo)",
        nakshatra: "Magha",
        phoneNumber: "9123456789",
        mangalik: "Yes",
    },
    compatibilityScore: 88,
    weddingPlanner: {
        guests: [],
        budget: [],
        checklist: DEFAULT_WEDDING_CHECKLIST
    }
  },
  {
    id: "u3",
    name: "Dr. Ananya Rao",
    age: 31,
    city: "Hyderabad",
    email: "ananya.rao@example.com",
    role: "user",
    status: "active",
    approvalStatus: "approved",
    isVerified: true,
    isPhotoVerified: true,
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "A compassionate doctor specializing in pediatrics. In my free time, I love classical dance and volunteering at local shelters. Looking for a partner who is kind, ambitious, and values family.",
    interests: ["Classical Dance", "Volunteering", "Reading", "Medicine"],
    isPremium: true,
    isOnline: true,
    gallery: [],
    customFields: {
        occupation: "Doctor",
        education: "MD, Pediatrics",
        height: "5' 6\"",
        maritalStatus: "Never Married",
        religion: "Hindu",
        caste: "Rao",
        annualIncome: "₹25L+",
        rasi: "Vrishabha (Taurus)",
        nakshatra: "Rohini"
    },
    compatibilityScore: 92,
  },
  {
    id: "u4",
    name: "Vikram Singh",
    age: 34,
    city: "Mumbai",
    email: "vikram.singh@example.com",
    role: "user",
    status: "active",
    approvalStatus: "approved",
    isPhotoVerified: false,
    photo: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Corporate lawyer with a passion for fitness and adventure sports. I believe in living life to the fullest. Seeking a partner who is independent, intelligent, and has a great sense of humor.",
    interests: ["Fitness", "Trekking", "Scuba Diving", "Law"],
    isPremium: false,
    isOnline: false,
    gallery: [],
    customFields: {
        occupation: "Lawyer",
        education: "LL.M",
        height: "6' 0\"",
        maritalStatus: "Never Married",
        religion: "Sikh",
        caste: "Jat",
        annualIncome: "₹25L+",
        rasi: "Tula (Libra)",
        nakshatra: "Swati",
    }
  },
  {
    id: "u5",
    name: "Sameer Joshi",
    age: 42,
    city: "Pune",
    email: "sameer.joshi@example.com",
    role: "user",
    status: "active",
    approvalStatus: "approved",
    isPhotoVerified: false,
    photo: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "IT project manager, divorcee with an 8-year-old daughter. I'm a stable, grounded person who loves spending weekends with my child. Looking for a mature and understanding partner for a fresh start.",
    interests: ["Parenting", "Jazz Music", "Gardening"],
    isPremium: true,
    isOnline: false,
    gallery: [],
    customFields: {
        occupation: "IT Manager",
        education: "MCA",
        height: "5' 9\"",
        maritalStatus: "Divorced",
        religion: "Hindu",
        caste: "Brahmin",
        annualIncome: "₹18L - ₹25L",
        rasi: "Makara (Capricorn)",
        nakshatra: "Shravana",
    }
  },
   {
    id: "u6",
    name: "Neha Gupta",
    age: 28,
    city: "Delhi",
    email: "neha.gupta@example.com",
    role: "user",
    status: "active",
    approvalStatus: "pending",
    isPhotoVerified: false,
    photo: "https://images.unsplash.com/photo-1619219816298-9f1a8b9e6f32?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Fashion designer with my own small boutique. I am creative, ambitious, and love exploring art galleries. Looking for a supportive partner who appreciates the arts.",
    interests: ["Fashion", "Art", "Sketching", "Entrepreneurship"],
    isPremium: false,
    isOnline: true,
    gallery: [],
    customFields: {
        occupation: "Fashion Designer",
        education: "NIFT Graduate",
        height: "5' 4\"",
        maritalStatus: "Never Married",
        religion: "Jain",
        caste: "Gupta",
        annualIncome: "₹8L - ₹12L",
        rasi: "Kanya (Virgo)",
        nakshatra: "Hasta"
    }
  },
  { 
    id: "u7", 
    name: "Kavita Iyer", 
    age: 27, 
    city: "Mumbai", 
    email: "kavita.iyer@example.com",
    role: "user",
    status: "active",
    approvalStatus: 'approved',
    isPhotoVerified: true,
    photo: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    bio: "Banker and part-time baker. I find joy in numbers and dough. Looking for someone genuine, witty, and who enjoys the simple things in life.",
    interests: ["Baking", "Finance", "Stand-up Comedy", "Yoga"],
    isPremium: true,
    isOnline: true,
    documentForVerification: { url: 'https://i.imgur.com/example-passport.png', type: 'Passport'},
    gallery: [],
    customFields: {
        height: "5' 3\"",
        maritalStatus: 'Never Married',
        motherTongue: 'Tamil',
        religion: 'Hindu',
        caste: 'Iyer',
        education: "M.Com",
        occupation: "Banker",
        annualIncome: "₹12L - ₹18L",
        diet: 'Vegetarian',
        rasi: "Meena (Pisces)",
        nakshatra: "Revati",
        phoneNumber: "9988776655",
        mangalik: "No",
    },
    quizInvitesSent: ["q1"]
  },
  {
    id: 'u8',
    name: 'Aarav Patel',
    age: 29,
    city: 'Ahmedabad',
    email: 'aarav.patel@example.com',
    role: 'user',
    status: 'active',
    approvalStatus: 'approved',
    isVerified: true,
    isPhotoVerified: false,
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Architect with a love for sustainable design and photography. Weekends are for long bike rides and discovering hidden gems in the city.',
    interests: ['Architecture', 'Photography', 'Cycling', 'Sustainability'],
    isPremium: true,
    isOnline: false,
    gallery: [],
    customFields: {
        height: "5' 10\"",
        maritalStatus: 'Never Married',
        motherTongue: 'Gujarati',
        religion: 'Hindu',
        caste: 'Patel',
        education: 'B.Arch',
        occupation: 'Architect',
        annualIncome: '₹12L - ₹18L',
        rasi: 'Mithuna (Gemini)',
        nakshatra: 'Ardra'
    },
  },
  {
    id: 'u9',
    name: 'Meenakshi Desai',
    age: 38,
    city: 'Jaipur',
    email: 'meenakshi.desai@example.com',
    role: 'user',
    status: 'active',
    approvalStatus: 'approved',
    isPhotoVerified: false,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Professor of History and a single mother to a wonderful teenage son. I am passionate about my work, classical music, and literature. Seeking a companion who is intellectually curious and emotionally mature.',
    interests: ['History', 'Classical Music', 'Literature', 'Parenting'],
    isPremium: false,
    isOnline: true,
    gallery: [],
    customFields: {
        height: "5' 7\"",
        maritalStatus: 'Widowed',
        motherTongue: 'Hindi',
        religion: 'Hindu',
        caste: 'Rajput',
        education: 'PhD in History',
        occupation: 'Professor',
        annualIncome: '₹8L - ₹12L',
        rasi: 'Dhanu (Sagittarius)',
        nakshatra: 'Mula'
    },
  },
  {
    id: "u10",
    name: "Dr. Rohan Gupta",
    age: 32,
    city: "Delhi",
    email: "rohan.gupta@example.com",
    role: "user", status: "active", approvalStatus: "approved", isVerified: true,
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da60710?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Cardiologist dedicated to saving lives. I unwind by playing the guitar and exploring nature trails. Looking for a partner who is genuine, has a zest for life, and appreciates a quiet evening at home as much as a spontaneous trip.",
    interests: ["Guitar", "Trekking", "Cardiology", "Cooking"],
    isPremium: true, isOnline: true, gallery: [],
    customFields: { occupation: "Doctor", education: "MD, Cardiology", height: "5' 11\"", maritalStatus: "Never Married", religion: "Hindu", caste: "Gupta", annualIncome: "₹25L+", rasi: "Mesha (Aries)", nakshatra: "Bharani" },
  },
  {
    id: "u11",
    name: "Dr. Aisha Khan",
    age: 29,
    city: "Mumbai",
    email: "aisha.khan@example.com",
    role: "user", status: "active", approvalStatus: "approved", isVerified: true,
    photo: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "A dentist with a passion for creating beautiful smiles. I enjoy painting, yoga, and trying out new cafes in the city. Seeking a partner who is understanding, supportive, and has a great sense of humor.",
    interests: ["Painting", "Yoga", "Foodie", "Dentistry"],
    isPremium: false, isOnline: false, gallery: [],
    customFields: { occupation: "Doctor", education: "BDS", height: "5' 4\"", maritalStatus: "Never Married", religion: "Muslim", caste: "Khan", annualIncome: "₹12L - ₹18L", rasi: "Libra (Tula)", nakshatra: "Chitra" },
  },
  { 
    id: "a1",
    name: "Admin User",
    age: 42,
    city: "Platform HQ",
    email: "admin@matrimony.ai",
    role: "admin",
    status: "active",
    approvalStatus: 'approved',
    isPhotoVerified: true,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "System Administrator for matrimony.ai. Ensuring a safe and effective platform for all users.",
    interests: ["System Ops", "User Safety", "Analytics"],
    isOnline: true,
    gallery: [],
    customFields: { rasi: "Mesha (Aries)", nakshatra: "Ashwini", }
  },
  {
    id: "v1",
    name: "Elite Matchmakers",
    age: 35,
    city: "Delhi",
    email: "vendor@matrimony.ai",
    role: "vendor",
    status: "active",
    approvalStatus: 'approved',
    isPhotoVerified: true,
    photo: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "A premium, white-glove matchmaking service now using the matrimony.ai platform to connect our clients.",
    interests: ["Matchmaking", "Client Management", "Events"],
    isOnline: false,
    gallery: [],
    customFields: { rasi: "Kumbha (Aquarius)", nakshatra: "Dhanishta" },
    serviceCategory: 'Photography',
    portfolioUrl: 'https://unsplash.com',
    vendorBio: 'Capturing timeless moments with artistry and passion. We specialize in candid wedding photography, telling your love story through breathtaking images. With over a decade of experience, our team is dedicated to making your special day unforgettable.',
    reviews: []
  },
];

const getParticipantDetails = (ids: string[]) => {
  const details: { [key: string]: Pick<Profile, 'name' | 'photo' | 'isOnline' | 'isPremium' | 'isVerified'> } = {};
  ids.forEach(id => {
    const profile = PROFILES.find(p => p.id === id);
    if (profile) {
      details[id] = { 
          name: profile.name, 
          photo: profile.photo, 
          isOnline: profile.isOnline, 
          isPremium: profile.isPremium, 
          isVerified: profile.isVerified 
        };
    }
  });
  return details;
};

export const CONVERSATIONS: Conversation[] = [
    {
        id: 'c1',
        participantIds: ['u1', 'u2'],
        participants: getParticipantDetails(['u1', 'u2']),
        messages: [
            { id: 'm1', senderId: 'u2', text: 'Hey Priya! Saw your profile, we seem to have a lot in common, especially the love for food!', timestamp: Date.now() - 300000, isRead: true },
            { id: 'm2', senderId: 'u1', text: 'Hey Rohit! That\'s great. A fellow foodie is always a win. What\'s your favorite cuisine?', timestamp: Date.now() - 240000, isRead: true },
            { id: 'm3', senderId: 'u2', text: 'Definitely Italian. I make a mean lasagna. What about you?', timestamp: Date.now() - 180000, isRead: false },
        ],
        lastReadTimestamp: { u1: Date.now() - 200000, u2: Date.now() - 300000 },
        typing: {}
    },
    {
        id: 'c2',
        participantIds: ['u1', 'u3'],
        participants: getParticipantDetails(['u1', 'u3']),
        messages: [
            { id: 'm4', senderId: 'u3', text: 'Hi Priya, I\'m Ananya. I admire your passion for hiking!', timestamp: Date.now() - 86400000, isRead: true },
        ],
        lastReadTimestamp: { u1: Date.now() - 86400000 },
        typing: {}
    },
];

export const DUMMY_QUIZ_QUESTIONS: QuizQuestion[] = [
    { question: 'What is your ideal weekend?', options: ['A quiet night in', 'A big party with friends', 'A trip to the mountains', 'Exploring the city'] },
    { question: 'When it comes to finances, are you more of a...', options: ['Saver', 'Spender', 'Investor', 'It\'s complicated'] },
    { question: 'A perfect vacation for you is:', options: ['Relaxing on a beach', 'Hiking a challenging trail', 'Visiting historical museums', 'A luxury resort experience'] },
    { question: 'How do you handle conflict?', options: ['Address it directly', 'Need some space first', 'Try to find a compromise', 'Avoid it if possible'] },
    { question: 'What role does family play in your life?', options: ['They are my top priority', 'Important, but I value my independence', 'I keep a respectful distance', 'I\'m closest to my chosen family'] },
];

export const QUIZZES: Quiz[] = [
    {
        id: 'q1',
        challengerId: 'u7',
        challengedId: 'u1',
        questions: DUMMY_QUIZ_QUESTIONS,
        answers: {},
        status: 'pending',
    },
    {
        id: 'q2',
        challengerId: 'u3',
        challengedId: 'u1',
        questions: DUMMY_QUIZ_QUESTIONS,
        answers: {
            'u1': ['A trip to the mountains', 'Saver', 'Hiking a challenging trail', 'Address it directly', 'They are my top priority'],
            'u3': ['A quiet night in', 'Saver', 'Visiting historical museums', 'Address it directly', 'They are my top priority'],
        },
        status: 'completed',
        score: 60,
        summary: 'You both are direct communicators who value family and financial stability, but your ideas of a perfect downtime might differ. A good mix of shared core values and different interests to keep things exciting!'
    }
];

export const PRICING_PLANS: PricingPlan[] = [
    { id: 'p1', name: 'Premium Monthly', price: '₹999', duration: '/month', planType: 'standard', description: 'Get started with premium features.', features: ['Send Unlimited Messages', 'View Contact Details', 'Enhanced Privacy', 'Send Virtual Gifts'], popular: true },
    { id: 'p2', name: 'Premium Yearly', price: '₹8,999', originalPrice: '₹11,988', duration: '/year', planType: 'standard', description: 'Best value for long-term search.', features: ['All Premium Features', 'Profile Spotlight', 'AI Matchmaker Assistance', 'Send Unlimited Gifts'] },
    { id: 'p3', name: 'Elite Quarterly', price: '₹14,999', duration: '/3 months', planType: 'elite', description: 'For discerning clients seeking personalized service.', features: ['Dedicated Relationship Manager', 'Handpicked Matches', 'Astrological Compatibility Report', 'Unlimited Gifts'] },
    { id: 'p4', name: 'Second Innings+', price: '₹1,499', duration: '/month', planType: 'late-marriage', description: 'Tailored for those seeking a partner again.', features: ['Connect with similar profiles', 'Enhanced Privacy Controls', 'Community Support', 'Send Virtual Gifts'] },
];

export const HAPPY_STORIES: HappyStory[] = [
    { id: 'hs1', coupleNames: 'Rohan & Meera', weddingDate: '15th Dec 2023', imageUrl: 'https://images.unsplash.com/photo-1597157639199-8742464a93f5?q=80&w=1887&auto=format&fit=crop', story: 'We connected over our shared love for classic literature and long walks. The AI match was spot on! We knew from our first conversation that this was something special. Thank you matrimony.ai!' },
    { id: 'hs2', coupleNames: 'Priya & Sameer', weddingDate: '28th Jan 2024', imageUrl: 'https://images.unsplash.com/photo-1529622263201-d24e29c05e83?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', story: 'Finding someone who understands your past and looks forward to your future is a blessing. We found that in each other here. Our families couldn\'t be happier.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 'hs3', coupleNames: 'Anjali & Vikram', weddingDate: '09th Mar 2024', imageUrl: 'https://images.unsplash.com/photo-1523952578875-e6e17b8f42a2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', story: 'We were both busy doctors with little time for socializing. The platform\'s filters helped us find each other, and the compatibility report was incredibly insightful. It felt like destiny.' },
    { id: 'hs4', coupleNames: 'Aisha & Karan', weddingDate: '20th May 2024', imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', story: 'Our first date was a video call set up through the platform\'s live event feature. We talked for hours, and the rest is history. We are so grateful for this amazing service!', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

export const SERVICES: Service[] = [
    { 
        id: 's1', 
        title: 'Doctors Matrimony', 
        description: 'Exclusive matchmaking for medical professionals.', 
        slug: 'doctors-matrimony', 
        heroImageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop',
        content: `<h2>Find Your Partner in the Medical Field</h2>
                  <p class="lead">Our specialized service connects doctors, surgeons, and other healthcare professionals who understand the demands and rewards of a life in medicine. We provide a discreet and effective platform to find a like-minded partner who shares your passion and dedication.</p>
                  <h3>Why Choose Doctors Matrimony?</h3>
                  <ul>
                    <li>Verified profiles of medical professionals.</li>
                    <li>Advanced filters for specialization and lifestyle.</li>
                    <li>Understanding of busy schedules and unique preferences.</li>
                    <li>AI-powered matchmaking based on compatibility and values.</li>
                  </ul>`
    },
    { 
        id: 's2', 
        title: 'Lawyers Matrimony', 
        description: 'Connect with legal eagles and law professionals.', 
        slug: 'lawyers-matrimony', 
        heroImageUrl: 'https://images.unsplash.com/photo-1589994995937-380d6f2ba32e?q=80&w=2070&auto=format&fit=crop',
        content: `<h2>Legal Minds, United Hearts</h2>
                  <p class="lead">Navigate the complexities of life and law with a partner who speaks your language. Our dedicated service for legal professionals connects you with individuals who appreciate intellectual rigor, ambition, and a shared understanding of the legal world.</p>
                  <h3>Benefits for Legal Professionals:</h3>
                  <ul>
                    <li>A network of verified lawyers, judges, and paralegals.</li>
                    <li>Privacy-focused features for a discreet search.</li>
                    <li>Matchmaking that considers career goals and work-life balance.</li>
                  </ul>` 
    },
    { 
        id: 's3', 
        title: '90s Kids Nostalgia Hub', 
        description: 'For those who grew up in the vibrant 90s.', 
        slug: '90s-kids-matrimony', 
        heroImageUrl: 'https://images.unsplash.com/photo-1574868792033-0c3b4c13a34a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: `<h2>Find a Love as Classic as a 90s Movie</h2>
                  <p class="lead">Remember the thrill of a new cassette, the sound of a dial-up modem, and the comfort of your favorite TV show's theme song? This is a space for the generation that experienced the best of both analog and digital worlds. Find someone who not only gets your pop culture references but also shares the values you grew up with.</p>
                  <h3>Why You'll Connect Here:</h3>
                  <ul>
                    <li>Bond over shared memories of Mario, MTV, and iconic fashion trends.</li>
                    <li>Find partners who appreciate a mix of old-school romance and modern ambitions.</li>
                    <li>Our AI understands the unique cultural context of the 90s to find your perfect match.</li>
                    <li>Special icebreakers like "What was your first email address?"</li>
                  </ul>`
    },
    { 
        id: 's4', 
        title: 'Elite Matrimony', 
        description: 'A premium, personalized service for the discerning.', 
        slug: 'elite-matrimony', 
        heroImageUrl: 'https://images.unsplash.com/photo-1521405920953-a3d6061a2b?q=80&w=2070&auto=format&fit=crop',
        content: `<h2>A Bespoke Matchmaking Experience</h2>
                  <p class="lead">Our Elite service is designed for distinguished professionals and high-net-worth individuals who require the utmost discretion and personalization. We offer a white-glove experience tailored to your unique lifestyle and preferences.</p>
                  <h3>The Elite Advantage:</h3>
                  <ul>
                    <li>A dedicated, experienced relationship manager.</li>
                    <li>Handpicked profiles that meet your exacting criteria.</li>
                    <li>Confidential introductions and personalized support.</li>
                    <li>Access to exclusive networking events.</li>
                  </ul>` 
    },
];

export const MANUAL_PAYMENT_METHODS: ManualPaymentMethod[] = [
    {
        id: 'mpm1',
        name: 'Bank Transfer',
        type: 'Bank Transfer',
        thumbnailUrl: '',
        instructions: 'Please transfer the amount to the account below and submit the transaction ID in the payment modal.',
        bankAccounts: [
            { id: 'ba1', bankName: 'HDFC Bank', accountName: 'matrimony.ai Pvt Ltd', accountNumber: '50200012345678', ifscCode: 'HDFC0001234' },
            { id: 'ba2', bankName: 'ICICI Bank', accountName: 'matrimony.ai Pvt Ltd', accountNumber: '000105123456', ifscCode: 'ICIC0000001' },
        ],
        enabled: true,
    }
];

export const WEBSITE_SETTINGS: WebsiteSettings = {
    siteName: 'matrimony.ai',
    logoUrl: 'https://i.ibb.co/7zJ4Q0Y/logo.png',
    slogan: 'Find Your Perfect Match',
    stickyHeader: true,
    headerLinks: [
        { id: 'h1', text: 'Home', url: '#/' },
        { id: 'h2', text: 'Packages', url: '#/pricing' },
        { id: 'h3', text: 'FAQ', url: '#/faq' },
        { id: 'h4', text: 'Register Now', url: '#/register' },
    ],
    heroTitle: 'An Elite Marriage Matrimony',
    heroSubtitle: 'Best Marriage Bureau In India',
    heroImageUrl: 'https://images.unsplash.com/photo-1597157639199-8742464a93f5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    heroImageZoom: 100,
    footerContent: 'A sleek, modern, AI-powered matrimony platform.',
    copyrightText: '© 2025 matrimony.ai. All Rights Reserved.',
    socialLinks: [
        { id: 's1', platform: 'Facebook', url: 'https://facebook.com' },
        { id: 's2', platform: 'Twitter', url: 'https://twitter.com' },
        { id: 's3', platform: 'Instagram', url: 'https://instagram.com' },
    ],
    contactEmail: 'info@matrimony.ai',
    contactPhonePrimary: '9840690727',
    address: '7/18 St. Thomas Mount, Alandur, Chennai 600016',
    maintenanceMode: {
        enabled: false,
        message: 'We are currently performing maintenance. We will be back shortly.'
    },
    theme: 'imperial-gold',
    typography: 'classic',
    manualPaymentMethods: MANUAL_PAYMENT_METHODS,
    siteBackgroundImageUrl: 'https://www.transparenttextures.com/patterns/lined-paper.png',
};

export const PAGES: Page[] = [
    {id: 'page1', title: 'Privacy Policy', slug: 'privacy-policy', content: '<h1>Privacy Policy</h1><p>Details about user data and privacy go here.</p>', status: 'published', isVisibleInMenu: false},
    {id: 'page2', title: 'About Us', slug: 'about-us', content: '<h1>About Us</h1><p>Information about the company.</p>', status: 'published', isVisibleInMenu: true},
];

export const REPORTS: Report[] = [];
export const CONTACT_QUERIES: ContactQuery[] = [];
export const LIVE_EVENTS: LiveEvent[] = [];
export const VENDOR_REVIEWS: VendorReview[] = [];
export const OFFLINE_PAYMENT_REQUESTS: OfflinePaymentRequest[] = [
    { id: 'opr1', userId: 'u2', userName: 'Rohit Verma', planName: 'Premium Monthly', referenceId: 'UPI-12345678', date: '2024-10-25' }
];

export const ASTROLOGERS: Astrologer[] = [
    {
        id: 'astro1',
        name: 'Dr. Vani Sharma',
        photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        specializations: ['Vedic Astrology', 'Numerology', 'Kundli Matching'],
        experience: 15,
        bio: 'A renowned Vedic astrologer with over 15 years of experience in guiding couples towards a harmonious marital life through deep astrological insights.',
        meetLink: 'https://meet.google.com'
    },
    {
        id: 'astro2',
        name: 'Pandit Ramesh Iyer',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        specializations: ['Prashna (Horary)', 'Nadi Astrology'],
        experience: 20,
        bio: 'Specializing in Nadi Astrology and Horary charts to provide precise answers and remedies for marital queries and challenges.',
        meetLink: 'https://meet.google.com'
    }
];

// ... other constants
export const FAQS: FaqItem[] = [];
export const ASTRO_PREDICTIONS: AstroPrediction[] = [];
export const AUSPICIOUS_DATES: AuspiciousDate[] = [];