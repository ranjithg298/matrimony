import { GoogleGenAI, Modality, Type } from "@google/genai";
import { Profile, Attribute, AuspiciousDate, Message, AdminAssistantMessage, QuizQuestion, AIWeddingPlan } from '../types';

// NOTE: Do not throw an error here for the API key.
// The key is injected by the environment, and runtime errors (like an invalid key)
// are handled gracefully where the function is called.
// A new GoogleGenAI instance is created in each function to ensure the latest API key from process.env is used.

const buildDynamicProfileString = (profile: Profile, attributes: Attribute[]): string => {
  let profileString = `
    **Profile ID: ${profile.id}, Name: ${profile.name}**
    - Age: ${profile.age}, City: ${profile.city}
    - Bio: ${profile.bio}
    - Interests: ${profile.interests.join(', ')}
  `;

  attributes.forEach(attr => {
    if (profile.customFields && profile.customFields[attr.id]) {
      const value = profile.customFields[attr.id];
      // Handle array values for multoselect
      const displayValue = Array.isArray(value) ? value.join(', ') : value;
      profileString += `\n    - ${attr.label}: ${displayValue}`;
    }
  });

  return profileString;
}

const buildPrompt = (profileA: Profile, profileB: Profile, attributes: Attribute[]): string => {
  const profileAString = buildDynamicProfileString(profileA, attributes);
  const profileBString = buildDynamicProfileString(profileB, attributes);

  return `
    Analyze the matrimonial compatibility between these two profiles based on all their details, including personal info, interests, and custom attributes like religion, education, and lifestyle.

    ${profileAString}

    ${profileBString}

    **Your Task:**
    Provide a concise compatibility analysis. Your response MUST be plain text and include:
    1. A "Compatibility Score" out of 100, on its own line like this: **Compatibility Score: [score]/100**
    2. A short "Summary" paragraph explaining the reasoning behind the score.
    3. Three "Key Compatibility Points" as a bulleted list, highlighting areas of synergy.
    4. Two "Potential Challenges" as a bulleted list, noting areas where they might differ.
  `;
};

const handleGeminiError = (error: unknown): string => {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('permission denied'))) {
        return "Error: The AI service could not be reached. This is likely due to an invalid or missing API key in the application's environment configuration.";
    }
    return "Error: Could not complete the AI request. Please try again later.";
}

export const getAdminConfigHelp = async (query: string): Promise<string> => {
    try {
        const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
            You are an expert frontend developer and CSS specialist assisting a non-technical website administrator. 
            The admin is using a system with predefined CSS variables for theming.
            Your task is to provide clear, simple, copy-pasteable CSS code snippets to help them with their customization query.
            Explain what the code does in one simple sentence.
            The app uses Tailwind CSS and has theme variables like '--color-bg', '--color-surface', '--color-text-primary', '--color-accent-primary', etc.

            Admin's Query: "${query}"

            Your Response Format:
            1.  A one-sentence explanation of what the code will do.
            2.  A CSS code block that the admin can copy and paste.
        `;
        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        return handleGeminiError(error);
    }
};


export const getCompatibilityAnalysis = async (profileA: Profile, profileB: Profile, attributes: Attribute[]): Promise<string> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = buildPrompt(profileA, profileB, attributes);

    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    return handleGeminiError(error);
  }
};

export const getAstrologicalCompatibility = async (profileA: Profile, profileB: Profile, attributes: Attribute[]): Promise<string> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const profileAString = buildDynamicProfileString(profileA, attributes);
    const profileBString = buildDynamicProfileString(profileB, attributes);
    
    const prompt = `
      You are an expert Vedic astrologer. Analyze the matrimonial compatibility between these two profiles based on their astrological details.

      **Profile 1:**
      ${profileAString}

      **Profile 2:**
      ${profileBString}

      **Your Task:**
      Provide a detailed Vedic compatibility report. Your response must be in plain text and formatted clearly with headings. Include the following sections:
      1.  **Guna Milan (Ashta Koota) Score:** State the score out of 36 (e.g., "28/36"). Provide a brief summary of what this score signifies for their marital harmony.
      2.  **Mangal Dosha (Kuja Dosha) Analysis:** Analyze if either individual has Mangal Dosha. Explain the implications and whether any cancellation or remedy is present.
      3.  **Key Yogas and planetary positions:** Briefly mention any significant planetary alignments for each person that might affect their marital life.
      4.  **Overall Conclusion and Recommendation:** Give a final summary of their compatibility and a recommendation, written in a supportive and guiding tone.
    `;

    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    return handleGeminiError(error);
  }
};

export const getAuspiciousDates = async (month: number, year: number): Promise<AuspiciousDate[]> => {
    try {
        const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });
        const prompt = `
            List the most auspicious Hindu wedding dates (Shubh Vivah Muhurat) for ${monthName} ${year}.
            Consider factors like Panchang Shuddhi, auspicious Nakshatras (like Rohini, Mrigashira, Uttara Phalguni, etc.), and avoid inauspicious periods.
            For each date, provide the date, the day of the week, and a brief, simple reason for its auspiciousness.
        `;
    
        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            date: { type: Type.STRING, description: "The full date, e.g., 'October 26, 2024'" },
                            day: { type: Type.STRING, description: "The day of the week, e.g., 'Saturday'" },
                            reason: { type: Type.STRING, description: "A brief astrological reason, e.g., 'Benefic Nakshatra and Tithi combination'" }
                        },
                        required: ['date', 'day', 'reason']
                    }
                }
            }
        });
        
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error getting auspicious dates:", error);
        throw new Error(handleGeminiError(error));
    }
}


export const getMatchmakerSuggestion = async (currentUser: Profile, candidates: Profile[], attributes: Attribute[]): Promise<{bestMatchId: string, reason: string} | null> => {
    if (candidates.length === 0) return null;

    try {
        const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const currentUserString = buildDynamicProfileString(currentUser, attributes);
        const candidatesString = candidates.map(c => buildDynamicProfileString(c, attributes)).join('\n\n');

        const prompt = `
            You are an expert relationship coach and matchmaker for an Indian matrimony platform.
            Your task is to analyze the current user's profile and, from the list of candidates, select the single best potential match.
            Provide a warm, insightful, and personalized reason for your choice, highlighting key areas of compatibility like lifestyle, values, or interests.

            This is the user you are finding a match for:
            ${currentUserString}

            Here are the candidates to choose from:
            ${candidatesString}

            Analyze all candidates and select only the one with the highest compatibility.
            Your response MUST be a JSON object with this exact structure: { "bestMatchId": "...", "reason": "..." }.
            The 'bestMatchId' must be the ID of the candidate you chose (e.g., "u2").
            The 'reason' must be a short paragraph (2-3 sentences) explaining why they are a great match for the current user.
        `;
    
        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        bestMatchId: { type: Type.STRING },
                        reason: { type: Type.STRING }
                    },
                    required: ['bestMatchId', 'reason']
                }
            }
        });
        
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error getting matchmaker suggestion:", error);
        throw new Error(handleGeminiError(error));
    }
}

export const generateProfileImage = async (user: Profile): Promise<string | null> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const occupation = user.customFields?.occupation || 'professional';
    const prompt = `Generate an artistic, abstract, professional profile picture background. It should represent a person who is a '${occupation}' and is interested in ${user.interests.join(', ')}. Use vibrant, elegant, and modern colors. The style should be sophisticated and suitable for a high-end matrimonial profile. Do not include any text or recognizable faces.`;
    
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data; // This is the base64 string
      }
    }
    return null;

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    return null;
  }
};

export const generateWeddingVows = async (inputs: { partnerName: string; yearsTogether: string; feeling: string; }): Promise<string> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
        You are a romantic and eloquent speechwriter. Write a set of personalized, heartfelt wedding vows for someone to say to their partner, ${inputs.partnerName}. 
        They have been together for ${inputs.yearsTogether} and the feeling they want to convey is "${inputs.feeling}".
        Craft vows that are about 150 words long. The tone should be deeply personal, loving, and sincere. Avoid clichés.
        Return only the text of the vows, without any additional titles or formatting.
    `;
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return handleGeminiError(error);
  }
};

export const getAIcebreaker = async (profileA: Profile, profileB: Profile): Promise<string> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
        You are a friendly and witty conversation starter for a matrimony app.
        Based on the profiles of ${profileA.name} and ${profileB.name}, generate one engaging, open-ended icebreaker question.
        The question should be relevant to their shared interests or unique aspects of their profiles.
        - ${profileA.name}'s interests: ${profileA.interests.join(', ')}
        - ${profileB.name}'s interests: ${profileB.interests.join(', ')}
        - ${profileA.name}'s bio: ${profileA.bio}
        - ${profileB.name}'s bio: ${profileB.bio}

        Return only the question as a single string, without any prefixes like "Here's a question:".
    `;
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating icebreaker:", error);
    return `I saw you're into ${profileB.interests[0] || 'cool things'}, what's your favorite thing about it?`;
  }
};


export const generateChatReply = async (conversationHistory: Message[], replyingUser: Profile): Promise<string> => {
    try {
        const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const history = conversationHistory.slice(-5).map(msg => `${msg.senderId === replyingUser.id ? 'You' : 'They'} said: "${msg.text}"`).join('\n');

        const prompt = `
            You are ${replyingUser.name}, and you are chatting with someone on a matrimony app.
            Based on this brief conversation history, provide a short, natural, and friendly reply to the last message.
            Keep it to 1-2 sentences. Do not ask more than one question.

            Conversation History:
            ${history}

            Your personality: Your bio says "${replyingUser.bio}". Your interests are ${replyingUser.interests.join(', ')}.
            
            Your task: Write a reply as ${replyingUser.name} to the last message. Return only the text of your reply.
        `;
        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        return handleGeminiError(error);
    }
}

export const getAdminAssistantResponse = async (
    history: AdminAssistantMessage[],
    query: string,
    contextData: object
): Promise<string> => {
    try {
        const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const contextString = JSON.stringify(contextData, (key, value) => {
            if (typeof value === 'string' && value.length > 200) {
                return value.substring(0, 200) + '...';
            }
            return value;
        }, 2);

        const prompt = `
            You are "Matrimony.AI Admin Assistant", a helpful AI designed to assist the administrator of a matrimony website.
            Your responses should be concise, professional, and directly answer the admin's query based on the JSON data provided.
            When asked to list users, provide their name and ID.
            When asked to draft messages, provide only the message content in a friendly and professional tone.
            
            Here is the relevant data from the platform, in JSON format:
            \`\`\`json
            ${contextString}
            \`\`\`

            Based on this data, please answer the following query:
            "${query}"
        `;

        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        return handleGeminiError(error);
    }
};

export const generateBioSuggestion = async (profile: Profile): Promise<string> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
        You are a creative and witty profile writer for a high-end matrimony website.
        Based on the following user details, write an engaging and appealing bio of about 50-70 words.
        The bio should be in the first person. It should highlight their profession and interests in a warm and inviting way.
        
        User Details:
        - Name: ${profile.name}
        - Age: ${profile.age}
        - Profession: ${profile.customFields?.occupation || 'a professional'}
        - Interests: ${profile.interests.join(', ')}
        - Bio so far: "${profile.bio}"
        
        Generate a new bio. Return only the text of the bio, nothing else.
    `;
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    return handleGeminiError(error);
  }
};

export const generateCompatibilityQuiz = async (profileA: Profile, profileB: Profile): Promise<QuizQuestion[]> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
        You are an AI that creates fun, insightful compatibility quizzes for a matrimony app.
        Generate a unique 5-question multiple-choice quiz for two people, ${profileA.name} and ${profileB.name}.
        The questions should be about lifestyle, values, personality, and relationship expectations.
        Each question must have exactly 4 concise, distinct options.

        Your response MUST be a JSON array of objects, where each object has this exact structure: { "question": "...", "options": ["...", "...", "...", "..."] }.
    `;
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['question', 'options'],
          },
        },
      },
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating compatibility quiz:", error);
    // Fallback to a default quiz in case of API error
    return [
      { question: 'What is your ideal weekend?', options: ['A quiet night in', 'A big party with friends', 'A trip to the mountains', 'Exploring the city'] },
      { question: 'When it comes to finances, are you more of a...', options: ['Saver', 'Spender', 'Investor', 'It\'s complicated'] },
    ];
  }
};

export const getQuizSummary = async (questions: QuizQuestion[], answersA: string[], answersB: string[]): Promise<string> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let combinedAnswers = '';
    for (let i = 0; i < questions.length; i++) {
        combinedAnswers += `
        Question: "${questions[i].question}"
        - User A chose: "${answersA[i]}"
        - User B chose: "${answersB[i]}"
        `;
    }

    const prompt = `
        You are a witty and insightful relationship analyst.
        Based on the following quiz answers from two people, provide a short, fun, and optimistic summary (2-3 sentences) of their compatibility.
        Focus on both the similarities and what the differences might bring to a relationship.
        
        ${combinedAnswers}
        
        Return only the summary text.
    `;
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    return handleGeminiError(error);
  }
};

export const generateAIWeddingPlan = async (inputs: { budget: number; guests: number; city: string; style: string; }, vendors: Profile[]): Promise<AIWeddingPlan> => {
    try {
        const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const vendorString = vendors.map(v => `- ${v.name} (Category: ${v.serviceCategory}, City: ${v.city})`).join('\n');
        const prompt = `
            You are an AI Wedding Concierge. Your goal is to create a practical, starter wedding plan based on user inputs and a list of available vendors.

            User Inputs:
            - Budget: ₹${inputs.budget.toLocaleString()}
            - Guest Count: ${inputs.guests}
            - City: ${inputs.city}
            - Wedding Style: ${inputs.style}

            Available Vendors:
            ${vendorString}

            **Your Task:**
            Generate a JSON object with a wedding plan. The JSON object must have three keys: "budgetBreakdown", "vendorSuggestions", and "checklist".

            1.  **budgetBreakdown**: Create an array of objects. Each object should have "category" (e.g., "Venue", "Catering", "Decor", "Photography") and "cost" (a number). Allocate the total budget logically across 5-7 key categories based on the style and guest count. The sum of costs should be close to the total budget.
            2.  **vendorSuggestions**: Create an array of objects. Each object should have "category" and "name". Suggest 2-3 relevant vendors from the provided list that match the user's city and the required service category.
            3.  **checklist**: Create an array of objects. Each object should have "category" (e.g., "12+ Months Out", "8-10 Months Out") and "task". Generate 5-7 high-priority, actionable checklist items a couple should tackle first, based on their wedding style.
        `;
    
        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        budgetBreakdown: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { category: { type: Type.STRING }, cost: { type: Type.NUMBER } },
                                required: ['category', 'cost']
                            }
                        },
                        vendorSuggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { category: { type: Type.STRING }, name: { type: Type.STRING } },
                                required: ['category', 'name']
                            }
                        },
                        checklist: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { category: { type: Type.STRING }, task: { type: Type.STRING } },
                                required: ['category', 'task']
                            }
                        }
                    },
                    required: ['budgetBreakdown', 'vendorSuggestions', 'checklist']
                }
            }
        });
        
        return JSON.parse(response.text);
    } catch (error) {
        throw new Error(handleGeminiError(error));
    }
}

export const analyzeProfilePhoto = async (base64Image: string): Promise<string> => {
  try {
    const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // The base64 string might have a data URL prefix. Gemini needs just the data.
    const imageData = base64Image.split(',')[1] || base64Image;

    const prompt = `You are an encouraging and helpful dating profile assistant. Analyze this photo for a matrimony profile. Provide constructive feedback on photo quality (lighting, clarity), facial expression, and overall impression. The goal is to help the user choose their best photos. Keep the tone positive and provide 2-3 actionable suggestions for improvement. Format the response with a title, a summary paragraph, and a bulleted list of suggestions. Do not use markdown.`;

    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageData,
            },
          },
          { text: prompt },
        ],
      },
    });

    return response.text;
  } catch (error) {
    return handleGeminiError(error);
  }
};