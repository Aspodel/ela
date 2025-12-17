
export type QuestionType = 'listening' | 'reading' | 'speaking' | 'writing';

export interface BaseQuestion {
    id: string;
    type: QuestionType;
    instruction: string;
}

export interface ListeningQuestion extends BaseQuestion {
    type: 'listening';
    audioUrl: string; // detailed implementation would likely have an array of questions per audio
    imageUrl?: string;
    options: string[];
    correctAnswer: number;
}

export interface ReadingQuestion extends BaseQuestion {
    type: 'reading';
    passage: string;
    questionText: string;
    options: string[];
    correctAnswer: number;
}

export interface SpeakingQuestion extends BaseQuestion {
    type: 'speaking';
    prompt: string;
    preparationTimeSeconds: number;
    responseTimeSeconds: number;
    imageUrl?: string;
}

export interface WritingQuestion extends BaseQuestion {
    type: 'writing';
    prompt: string;
    imageUrl?: string;
    minWords?: number;
    timeLimitSeconds: number;
}

export const MOCK_LISTENING_QUESTIONS: ListeningQuestion[] = [
    {
        id: 'L1',
        type: 'listening',
        instruction: 'Listen to the audio and choose the best description of the picture.',
        audioUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg', // Placeholder
        imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad', // Placeholder
        options: [
            'They are having a meeting.',
            'They are eating lunch.',
            'They are buying groceries.',
            'They are waiting for a bus.'
        ],
        correctAnswer: 0
    },
    {
        id: 'L2',
        type: 'listening',
        instruction: 'Listen to the question and choose the best response.',
        audioUrl: 'https://actions.google.com/sounds/v1/crowds/battle_crowd_celebrate_stutter.ogg', // Placeholder
        options: [
            'Yes, I did.',
            'Tomorrow at 5.',
            'It is in the drawer.',
            'John sent it.'
        ],
        correctAnswer: 1
    }
];

export const MOCK_READING_QUESTIONS: ReadingQuestion[] = [
    {
        id: 'R1',
        type: 'reading',
        instruction: 'Read the passage and answer the question.',
        passage: 'To: All Staff\nFrom: Management\nSubject: Office Renovation\n\nPlease be advised that the west wing of the office will be closed for renovations starting next Monday. All employees seated in that area should move to the temporary desks in the conference room.',
        questionText: 'Who is this memo intended for?',
        options: [
            'The cleaning crew',
            'All employees',
            'The management team',
            'Clients'
        ],
        correctAnswer: 1
    },
    {
        id: 'R2',
        type: 'reading',
        instruction: 'Choose the word that best completes the sentence.',
        passage: 'The quarterly report needs to be __________ by Friday.',
        questionText: 'Select the best word.',
        options: [
            'submit',
            'submitted',
            'submitting',
            'submission'
        ],
        correctAnswer: 1
    }
];

export const MOCK_SPEAKING_QUESTIONS: SpeakingQuestion[] = [
    {
        id: 'S1',
        type: 'speaking',
        instruction: 'Read the text aloud.',
        prompt: 'Welcome to the annual science fair. Today we have many exciting exhibits to show you. Please make sure to visit all the booths and vote for your favorite project.',
        preparationTimeSeconds: 45,
        responseTimeSeconds: 45
    },
    {
        id: 'S2',
        type: 'speaking',
        instruction: 'Describe a picture.',
        prompt: 'Describe what you see in the picture in as much detail as possible.',
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
        preparationTimeSeconds: 45,
        responseTimeSeconds: 60
    }
];

export const MOCK_WRITING_QUESTIONS: WritingQuestion[] = [
    {
        id: 'W1',
        type: 'writing',
        instruction: 'Write a sentence based on the picture.',
        prompt: 'Write ONE sentence based on the picture using the two words provided: \n\n desk / computer',
        imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b4bef9720',
        timeLimitSeconds: 480 // 8 minutes
    },
    {
        id: 'W2',
        type: 'writing',
        instruction: 'Write an opinion essay.',
        prompt: 'Some people prefer to work alone. Others prefer to work in a team. Which do you prefer and why? Use specific reasons and examples to support your opinion.',
        minWords: 300,
        timeLimitSeconds: 1800 // 30 minutes
    }
];
