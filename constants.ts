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
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop", 
    bio: "Software Engineer passionate about travel, hiking, and exploring new cuisines. Looking for a meaningful connection with someone who is ambitious, kind, and has a good sense of humor. I value honesty and open communication in a relationship.",
    interests: ["Travel", "Hiking", "Foodie", "Technology"],
    isPremium: true,
    isOnline: true,
    bioDataUrl: '/assets/sample-biodata.pdf',
    gallery: [
      { url: "https://images.unsplash.com/photo-1594744803329-e58b3147368a?q=80&w=1887&auto=format&fit=crop", status: 'approved'},
      { url: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1889&auto=format&fit=crop", status: 'approved'},
      { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop", status: 'pending'},
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
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop", 
    bio: "Product Manager and a foodie at heart. I enjoy long drives, old movies, and a good book on a rainy day.",
    interests: ["Movies", "Reading", "Driving", "Cooking"],
    isPremium: false,
    isOnline: false,
    documentForVerification: { url: 'https://i.ibb.co/example-doc.png', type: 'Aadhaar'},
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
    photo: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1887&auto=format&fit=crop",
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
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1770&auto=format&fit=crop",
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
    photo: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1771&auto=format&fit=crop",
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
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
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
    photo: "https://images.unsplash.com/photo-1599577182250-138d61a4cc83?q=80&w=1887&auto=format&fit=crop", 
    bio: "Banker and part-time baker. I find joy in numbers and dough. Looking for someone genuine, witty, and who enjoys the simple things in life.",
    interests: ["Baking", "Finance", "Stand-up Comedy", "Yoga"],
    isPremium: true,
    isOnline: true,
    documentForVerification: { url: 'https://i.ibb.co/example-passport.png', type: 'Passport'},
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
    photo: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1974&auto=format&fit=crop',
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
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
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
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da60710?q=80&w=1964&auto=format&fit=crop",
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
    photo: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=1770&auto=format&fit=crop",
    bio: "A dentist with a passion for creating beautiful smiles. I enjoy painting, yoga, and trying out new cafes in the city. Seeking a partner who is understanding, supportive, and has a great sense of humor.",
    interests: ["Painting", "Yoga", "Foodie", "Dentistry"],
    isPremium: false, isOnline: false, gallery: [],
    customFields: { occupation: "Doctor", education: "BDS", height: "5' 4\"", maritalStatus: "Never Married", religion: "Muslim", caste: "Khan", annualIncome: "₹12L - ₹18L", rasi: "Libra (Tula)", nakshatra: "Chitra" },
  },
   {
    id: "u12",
    name: "Siddharth Menon",
    age: 30,
    city: "Kochi",
    email: "sid.menon@example.com",
    role: "user", status: "active", approvalStatus: "approved",
    photo: "https://images.unsplash.com/photo-1542327897-4141c2522011?q=80&w=1887&auto=format&fit=crop",
    bio: "Filmmaker and storyteller. I see the world through a camera lens. Love discussing cinema, philosophy, and embarking on spontaneous road trips.",
    interests: ["Filmmaking", "Photography", "Road Trips", "Philosophy"],
    isPremium: true, isOnline: true, gallery: [],
    customFields: { occupation: "Filmmaker", education: "M.A. in Film Studies", height: "5' 10\"", maritalStatus: "Never Married", religion: "Hindu", caste: "Nair", annualIncome: "₹8L - ₹12L", rasi: "Kumbha (Aquarius)", nakshatra: "Shatabhisha" },
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
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop",
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
    photo: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1887&auto=format&fit=crop",
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
    { id: 'hs1', coupleNames: 'Rohan & Meera', weddingDate: '15th Dec 2023', imageUrl: 'https://images.unsplash.com/photo-1597343449836-9d68c171e367?q=80&w=1887&auto=format&fit=crop', story: 'We connected over our shared love for classic literature and long walks. The AI match was spot on! We knew from our first conversation that this was something special. Thank you matrimony.ai!' },
    { id: 'hs2', coupleNames: 'Priya & Sameer', weddingDate: '28th Jan 2024', imageUrl: 'https://images.unsplash.com/photo-1551847683-6d14b6c31899?q=80&w=1887&auto=format&fit=crop', story: 'Finding someone who understands your past and looks forward to your future is a blessing. We found that in each other here. Our families couldn\'t be happier.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 'hs3', coupleNames: 'Anjali & Vikram', weddingDate: '09th Mar 2024', imageUrl: 'https://images.unsplash.com/photo-1599335607392-49593215a31a?q=80&w=1887&auto=format&fit=crop', story: 'We were both busy doctors with little time for socializing. The platform\'s filters helped us find each other, and the compatibility report was incredibly insightful. It felt like destiny.' },
    { id: 'hs4', coupleNames: 'Aisha & Karan', weddingDate: '20th May 2024', imageUrl: 'https://images.unsplash.com/photo-1610642372651-fe4e7bc20914?q=80&w=1887&auto=format&fit=crop', story: 'Our first date was a video call set up through the platform\'s live event feature. We talked for hours, and the rest is history. We are so grateful for this amazing service!', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

export const SERVICES: Service[] = [
    { 
        id: 's1', 
        title: 'Doctors Matrimony', 
        description: 'Exclusive matchmaking for medical professionals.', 
        slug: 'doctors-matrimony', 
        heroImageUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
        heroImageUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
        title: '90s Nostalgia Hub', 
        description: 'For those who grew up in the vibrant 90s.', 
        slug: '90s-kids-matrimony', 
        isSpecialCategory: '90s-hub',
        heroImageUrl: 'https://i.ibb.co/6g2Sk7B/90s-collage.jpg',
        content: `<h2>Find a Love as Classic as a 90s Movie</h2>
                  <p class="lead">Remember the thrill of a new cassette, the sound of a dial-up modem, and the comfort of your favorite TV show's theme song? This is a space for the generation that experienced the best of both analog and digital worlds. Find someone who not only gets your pop culture references but also shares the values you grew up with.</p>`
    },
    { 
        id: 's4', 
        title: 'Elite Matrimony', 
        description: 'A premium, personalized service for the discerning.', 
        slug: 'elite-matrimony', 
        heroImageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
    siteNamePosition: 'right',
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
    heroImageUrl: 'https://images.unsplash.com/photo-1597686252444-3644b1c85347?q=80&w=1887&auto=format&fit=crop',
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
    homepageSettings: [
        { id: 'matchmaker', title: 'AI Matchmaker Suggestion', enabled: true },
        { id: '90s-hub', title: 'Step Back in Time', enabled: true },
        { id: 'featured-services', title: 'Featured Services', enabled: true },
        { id: 'recommendations', title: 'Recommended for You', enabled: true },
    ],
    backendStatus: 'simulated',
    storySubmissionFounderName: 'Anupam Mittal',
    storySubmissionFounderMessage: 'The Shaadi Team would like to wish you and your better half, a life full of love, laughter and togetherness!',
    storySubmissionFounderImage: 'https://i.ibb.co/6rC6P2Q/anupam-mittal.png',
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
        photo: 'https://images.pexels.com/photos/3775540/pexels-photo-3775540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        specializations: ['Vedic Astrology', 'Numerology', 'Kundli Matching'],
        experience: 15,
        bio: 'A renowned Vedic astrologer with over 15 years of experience in guiding couples towards a harmonious marital life through deep astrological insights.',
        meetLink: 'https://meet.google.com'
    },
    {
        id: 'astro2',
        name: 'Pandit Ramesh Iyer',
        photo: 'https://images.pexels.com/photos/54123/pexels-photo-54123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        specializations: ['Prashna (Horary)', 'Nadi Astrology'],
        experience: 20,
        bio: 'Specializing in Nadi Astrology and Horary charts to provide precise answers and remedies for marital queries and challenges.',
        meetLink: 'https://meet.google.com'
    }
];

export const NOSTALGIA_PUZZLE_IMAGES = {
    'power-rangers': 'https://i.ibb.co/9v0Gk0c/power-rangers.jpg',
    'shinchan': 'https://i.ibb.co/k3V9tPh/shinchan.jpg',
    'mr-bean': 'https://i.ibb.co/W2zT9dG/mr-bean.jpg',
};


export const NOSTALGIA_GAMES = [
    { name: 'Ludo', image: 'https://i.ibb.co/hK8C7v7/ludo.jpg', link: '#/90s-hub/games' },
    { name: 'Snakes & Ladders', image: 'https://i.ibb.co/6y45k1v/snakes-ladders.jpg', link: '#/90s-hub/games' },
    { name: 'Thirudan Police', image: 'https://i.ibb.co/Jqj84FT/thirudan-police.jpg', link: '#/90s-hub/games' },
];

export const NOSTALGIA_STICKERS = [
    'https://i.ibb.co/Bq5L6yV/sticker1.png',
    'https://i.ibb.co/Q8Qf7Mh/sticker2.png',
    'https://i.ibb.co/gDFsC2q/sticker3.png',
    'https://i.ibb.co/Y05rL3N/sticker4.png',
    'https://i.ibb.co/Wc63d6h/sticker5.png',
    'https://i.ibb.co/gVrG9x7/sticker6.png'
];

export const NOSTALGIA_MEMORIES = [
    { title: 'First day of school', image: 'https://i.ibb.co/56wBD0b/memory1.png' },
    { title: 'Family vacation', image: 'https://i.ibb.co/VMyX72N/memory2.png' },
    { title: 'Favorite movie', image: 'https://i.ibb.co/k5J0Y94/memory3.png' }
];


// ... other constants
export const FAQS: FaqItem[] = [
    { question: 'How does the AI matchmaking work?', answer: 'Our AI analyzes your profile, preferences, and activity to suggest highly compatible matches based on hundreds of data points.'},
    { question: 'Is my data secure?', answer: 'Yes, we use industry-standard encryption and privacy protocols to ensure your data is always safe.'},
    { question: 'How do I get a verified badge?', answer: 'You can submit a government-issued ID in your profile settings. Our team will review it and add a verified badge to your profile upon successful verification.'}
];
export const ASTRO_PREDICTIONS: AstroPrediction[] = [];
export const AUSPICIOUS_DATES: AuspiciousDate[] = [];