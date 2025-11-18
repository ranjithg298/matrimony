import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Profile, Conversation, Message } from '../types';
import { PROFILES as initialProfiles, CONVERSATIONS as initialConversations } from '../constants';
import { db, auth } from './firebaseConfig';

// Seed Database Helper
export const seedDatabase = async () => {
    try {
        const profilesRef = db.collection('profiles');
        const snapshot = await profilesRef.get();
        
        // Only seed if profiles collection is empty
        if (snapshot.empty) {
            console.log("Seeding database...");
            const batch = db.batch();
            
            // Seed Profiles
            initialProfiles.forEach(profile => {
                const docRef = profilesRef.doc(profile.id);
                batch.set(docRef, profile);
            });

            await batch.commit();
            console.log("Profiles seeded.");

            // Seed Conversations separately due to subcollections
            for (const conv of initialConversations) {
                 await db.collection('conversations').doc(conv.id).set({
                     id: conv.id,
                     participantIds: conv.participantIds,
                     participants: conv.participants,
                     lastReadTimestamp: conv.lastReadTimestamp,
                     typing: conv.typing
                 });
                 
                 for (const msg of conv.messages) {
                     await db.collection('conversations').doc(conv.id).collection('messages').doc(msg.id).set({
                         ...msg,
                         timestamp: firebase.firestore.Timestamp.fromMillis(msg.timestamp)
                     });
                 }
            }
            console.log("Conversations seeded.");
        }
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

export const getProfiles = async (): Promise<Profile[]> => {
    // Check if we need to seed first
    await seedDatabase();

    const snapshot = await db.collection('profiles').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Profile));
};

export const getConversations = async (): Promise<Conversation[]> => {
    // In a real app with security rules, you would filter this by user ID
    const snapshot = await db.collection('conversations').get();
    
    // We need to fetch messages for each conversation to match the type definition
    const conversations: Conversation[] = [];
    
    for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const messagesSnap = await db.collection('conversations').doc(docSnap.id).collection('messages').orderBy('timestamp', 'asc').get();
        
        const messages = messagesSnap.docs.map(mDoc => {
            const mData = mDoc.data();
            return {
                ...mData,
                id: mDoc.id,
                timestamp: mData.timestamp instanceof firebase.firestore.Timestamp ? mData.timestamp.toMillis() : Date.now()
            } as Message;
        });

        conversations.push({
            id: docSnap.id,
            participantIds: data.participantIds,
            participants: data.participants,
            lastReadTimestamp: data.lastReadTimestamp,
            typing: data.typing,
            messages: messages
        });
    }
    
    return conversations;
}

export const signIn = async (email: string, password?: string): Promise<Profile> => {
    if (!password) throw new Error("Password is required.");

    // Handle "admin" username mapping for demo purposes
    const loginEmail = email.toLowerCase() === 'admin' ? 'admin@matrimony.ai' : email;
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(loginEmail, password);
        
        // Find profile by email since our seeded IDs (u1, u2) don't match Auth UIDs
        // In a production app, you would use db.collection('profiles').doc(userCredential.user.uid).get()
        const querySnapshot = await db.collection('profiles').where('email', '==', loginEmail).get();

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as Profile;
        } else {
            throw new Error("Profile not found in database.");
        }
    } catch (error: any) {
        console.error("Login error:", error);
        throw new Error(error.message || "Failed to sign in");
    }
};

export const register = async (newUser: Omit<Profile, 'id' | 'status'>, password?: string): Promise<Profile> => {
    if (!password) throw new Error("Password is required for registration.");
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(newUser.email, password);
        const uid = userCredential.user ? userCredential.user.uid : 'unknown';
        
        const finalUser: Profile = {
            ...newUser,
            id: uid, // Use Auth UID for new users
            approvalStatus: 'pending',
            status: 'active',
        };

        await db.collection('profiles').doc(uid).set(finalUser);
        return finalUser;
    } catch (error: any) {
        console.error("Registration error:", error);
        throw new Error(error.message || "Failed to register");
    }
};

export const updateProfile = async (updatedProfile: Profile): Promise<Profile> => {
    const profileRef = db.collection('profiles').doc(updatedProfile.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = updatedProfile; // Exclude ID from data payload
    await profileRef.update(data);
    return updatedProfile;
};

export const sendMessage = async (conversationId: string, message: { senderId: string, text: string }): Promise<void> => {
    const messagesRef = db.collection('conversations').doc(conversationId).collection('messages');
    await messagesRef.add({
        ...message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        isRead: false
    });
};

export const listenForMessages = (conversationId: string, callback: (conversation: Conversation) => void): (() => void) => {
    const unsubscribe = db.collection('conversations').doc(conversationId).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(async (snapshot) => {
            const messages = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    id: doc.id,
                    timestamp: data.timestamp instanceof firebase.firestore.Timestamp ? data.timestamp.toMillis() : Date.now()
                } as Message;
            });

            // Fetch parent conversation data to maintain full object structure
            const convDoc = await db.collection('conversations').doc(conversationId).get();
            if (convDoc.exists) {
                const convData = convDoc.data();
                if (convData) {
                    const fullConversation: Conversation = {
                        id: conversationId,
                        participantIds: convData.participantIds,
                        participants: convData.participants,
                        lastReadTimestamp: convData.lastReadTimestamp,
                        typing: convData.typing || {},
                        messages: messages
                    };
                    callback(fullConversation);
                }
            }
        });
    
    return unsubscribe;
};

export const acceptInterest = async (currentUser: Profile, interestedProfileId: string) => {
    const otherUserDoc = await db.collection('profiles').doc(interestedProfileId).get();
    
    if (!otherUserDoc.exists) throw new Error("User not found");
    const otherUser = otherUserDoc.data() as Profile;

    // Create updated profile objects
    const updatedCurrentUser = {
        ...currentUser,
        interestsReceived: (currentUser.interestsReceived || []).filter(id => id !== interestedProfileId)
    };
    
    const updatedOtherUser = {
        ...otherUser,
        interestsSent: (otherUser.interestsSent || []).filter(id => id !== currentUser.id)
    };

    // Check if conversation already exists
    const convsSnap = await db.collection('conversations')
        .where('participantIds', 'array-contains', currentUser.id)
        .get();
        
    let existingConv = convsSnap.docs.find(doc => {
        const data = doc.data();
        return data.participantIds.includes(interestedProfileId);
    });

    let conversationId: string;

    if (!existingConv) {
        // Create new conversation
        const newConvRef = db.collection('conversations').doc();
        conversationId = newConvRef.id;
        
        const newConversation = {
            id: conversationId,
            participantIds: [currentUser.id, interestedProfileId],
            participants: {
                [currentUser.id]: { name: currentUser.name, photo: currentUser.photo, isOnline: currentUser.isOnline, isPremium: currentUser.isPremium, isVerified: currentUser.isVerified },
                [interestedProfileId]: { name: otherUser.name, photo: otherUser.photo, isOnline: otherUser.isOnline, isPremium: otherUser.isPremium, isVerified: otherUser.isVerified },
            },
            lastReadTimestamp: { [currentUser.id]: Date.now(), [interestedProfileId]: 0 },
            typing: {}
        };
        
        await newConvRef.set(newConversation);
    } else {
        conversationId = existingConv.id;
    }

    // Update both profiles in Firestore
    await db.collection('profiles').doc(currentUser.id).update({ interestsReceived: updatedCurrentUser.interestsReceived });
    await db.collection('profiles').doc(otherUser.id).update({ interestsSent: updatedOtherUser.interestsSent });

    return { updatedCurrentUser, updatedOtherUser, conversationId };
}