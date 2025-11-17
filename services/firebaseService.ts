import { Profile, Conversation, Message } from '../types';
import { PROFILES as initialProfiles, CONVERSATIONS as initialConversations } from '../constants';

// --- DATABASE SIMULATION ---
// In a real app, this data would live in Firestore.
let PROFILES: Profile[] = [...initialProfiles];
let CONVERSATIONS: Conversation[] = [...initialConversations];
// -------------------------

// --- REAL-TIME LISTENER SIMULATION ---
type ListenerCallback = (conversation: Conversation) => void;
const listeners: { [conversationId: string]: ListenerCallback[] } = {};

const notifyListeners = (conversationId: string, conversation: Conversation) => {
    if (listeners[conversationId]) {
        listeners[conversationId].forEach(callback => callback(conversation));
    }
};
// ------------------------------------

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


export const getProfiles = async (): Promise<Profile[]> => {
    await delay(500); // Simulate network latency
    return JSON.parse(JSON.stringify(PROFILES));
};

export const getConversations = async (): Promise<Conversation[]> => {
    await delay(500);
    return JSON.parse(JSON.stringify(CONVERSATIONS));
}

export const signIn = async (email: string, password?: string): Promise<Profile> => {
    await delay(1000);
    const lowerEmail = email.toLowerCase();
    
    let userToLogin: Profile | undefined;

    if (lowerEmail === 'admin') {
        if (password !== 'admin@123') {
            throw new Error('Invalid password for admin user.');
        }
        userToLogin = PROFILES.find(p => p.role === 'admin');
    } else {
        userToLogin = PROFILES.find(p => p.email.toLowerCase() === lowerEmail);
    }
    
    if (userToLogin) {
        return userToLogin;
    } else {
        throw new Error('Invalid credentials or user not found.');
    }
};

export const register = async (newUser: Omit<Profile, 'id' | 'status'>): Promise<Profile> => {
    await delay(1000);
     const finalUser: Profile = {
        ...newUser,
        id: `u${Date.now()}`,
        approvalStatus: 'pending',
        status: 'active',
      };
      PROFILES.push(finalUser);
      return finalUser;
};

export const updateProfile = async (updatedProfile: Profile): Promise<Profile> => {
    await delay(300);
    PROFILES = PROFILES.map(p => p.id === updatedProfile.id ? updatedProfile : p);
    return updatedProfile;
};

export const sendMessage = async (conversationId: string, message: { senderId: string, text: string }): Promise<void> => {
    await delay(200);
    const conversation = CONVERSATIONS.find(c => c.id === conversationId);
    if (conversation) {
        const newMessage: Message = {
            id: `m${Date.now()}`,
            senderId: message.senderId,
            text: message.text,
            timestamp: Date.now(),
            isRead: false
        };
        conversation.messages.push(newMessage);
        notifyListeners(conversationId, conversation);

        // Simulate AI reply
        const otherUserId = conversation.participantIds.find(id => id !== message.senderId);
        const otherUser = PROFILES.find(p => p.id === otherUserId);
        if (otherUser) {
            setTimeout(async () => {
                // In a real app, this would be a Cloud Function call
                const replyText = `This is a simulated reply for ${otherUser.name}.`;
                 const replyMessage: Message = { id: `m${Date.now() + 1}`, senderId: otherUser.id, text: replyText, timestamp: Date.now(), isRead: false };
                 conversation.messages.push(replyMessage);
                 notifyListeners(conversationId, conversation);
            }, 2000 + Math.random() * 2000);
        }
    }
};

export const listenForMessages = (conversationId: string, callback: ListenerCallback): (() => void) => {
    if (!listeners[conversationId]) {
        listeners[conversationId] = [];
    }
    listeners[conversationId].push(callback);

    // Return an unsubscribe function
    return () => {
        listeners[conversationId] = listeners[conversationId].filter(cb => cb !== callback);
    };
};

export const acceptInterest = async (currentUser: Profile, interestedProfileId: string) => {
    await delay(500);
    
    const otherUser = PROFILES.find(p => p.id === interestedProfileId);
    if (!otherUser) throw new Error("User not found");

    const updatedCurrentUser = {
        ...currentUser,
        interestsReceived: (currentUser.interestsReceived || []).filter(id => id !== interestedProfileId)
    };
    
    const updatedOtherUser = {
        ...otherUser,
        interestsSent: (otherUser.interestsSent || []).filter(id => id !== currentUser.id)
    };

    PROFILES = PROFILES.map(p => {
        if (p.id === updatedCurrentUser.id) return updatedCurrentUser;
        if (p.id === updatedOtherUser.id) return updatedOtherUser;
        return p;
    });

    const existingConversation = CONVERSATIONS.find(c =>
        c.participantIds.includes(currentUser.id) && c.participantIds.includes(interestedProfileId)
    );

    let conversationId: string;

    if (!existingConversation) {
        const newConversation: Conversation = {
            id: `c${Date.now()}`,
            participantIds: [currentUser.id, interestedProfileId],
            participants: {
                [currentUser.id]: { name: currentUser.name, photo: currentUser.photo, isOnline: currentUser.isOnline, isPremium: currentUser.isPremium, isVerified: currentUser.isVerified },
                [interestedProfileId]: { name: otherUser.name, photo: otherUser.photo, isOnline: otherUser.isOnline, isPremium: otherUser.isPremium, isVerified: otherUser.isVerified },
            },
            messages: [],
            lastReadTimestamp: { [currentUser.id]: Date.now(), [interestedProfileId]: 0 },
            typing: {}
        };
        CONVERSATIONS.unshift(newConversation);
        conversationId = newConversation.id;
    } else {
        conversationId = existingConversation.id;
    }

    return { updatedCurrentUser, updatedOtherUser, conversationId };
}