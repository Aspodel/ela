import type { Quiz } from '../types';

export const MOCK_QUIZZES: Quiz[] = [
    {
        id: '1',
        title: 'Basic Grammar Essentials',
        description: 'Test your knowledge of fundamental grammar rules including tenses, articles, and prepositions.',
        difficulty: 'Easy',
        questionsCount: 5,
        timeEstimate: '5 mins',
        timeLimit: 5 * 60,
        points: 100,
        tags: ['Grammar', 'Basics'],
        questions: [
            {
                id: '1',
                question: 'Which sentence is grammatically correct?',
                options: [
                    'She don\'t like apples.',
                    'She doesn\'t like apples.',
                    'She not like apples.',
                    'She no like apples.',
                ],
                correctAnswer: 1,
                explanation: '"She" is a third-person singular subject, so it requires "doesn\'t" (does not) instead of "don\'t" (do not).',
            },
            {
                id: '2',
                question: 'What is the past tense of "go"?',
                options: ['Goed', 'Gone', 'Went', 'Going'],
                correctAnswer: 2,
                explanation: '"Go" is an irregular verb. The past tense is "Went". "Gone" is the past participle.',
            },
            {
                id: '3',
                question: 'Choose the correct synonym for "Happy".',
                options: ['Sad', 'Joyful', 'Angry', 'Tired'],
                correctAnswer: 1,
                explanation: '"Joyful" means feeling, expressing, or causing great pleasure and happiness.',
            },
            {
                id: '4',
                question: 'I ___ to the store yesterday.',
                options: ['go', 'gone', 'went', 'going'],
                correctAnswer: 2,
                explanation: 'The sentence describes a completed action in the past, so the past simple "went" is required.',
            },
            {
                id: '5',
                question: 'They ___ playing soccer right now.',
                options: ['is', 'am', 'are', 'be'],
                correctAnswer: 2,
                explanation: '"They" is a plural subject, so it requires the plural verb "are" in the present continuous tense.',
            },
        ],
    },
    {
        id: '2',
        title: 'Business English Vocabulary',
        description: 'Master common terms and phrases used in professional settings and corporate environments.',
        difficulty: 'Medium',
        questionsCount: 5,
        timeEstimate: '10 mins',
        timeLimit: 10 * 60,
        points: 250,
        tags: ['Vocabulary', 'Business'],
        questions: [
            {
                id: '1',
                question: 'What does "ASAP" stand for?',
                options: [
                    'As Soon As Possible',
                    'Always Stay At Place',
                    'All Systems Are Perfect',
                    'Ask Some Awesome People',
                ],
                correctAnswer: 0,
                explanation: 'ASAP is a common business acronym meaning "As Soon As Possible".',
            },
            {
                id: '2',
                question: 'Which word means "to work together"?',
                options: ['Compete', 'Collaborate', 'Calculate', 'Communicate'],
                correctAnswer: 1,
                explanation: '"Collaborate" means to work jointly on an activity, especially to produce or create something.',
            },
            {
                id: '3',
                question: 'A "deadline" is:',
                options: [
                    'A line that is dead',
                    'The latest time or date by which something should be completed',
                    'A boring meeting',
                    'A type of phone call',
                ],
                correctAnswer: 1,
                explanation: 'A deadline is the time limit for completing a task.',
            },
            {
                id: '4',
                question: 'To "brainstorm" means to:',
                options: [
                    'Have a headache',
                    'Generate ideas in a group discussion',
                    'Criticize someone\'s work',
                    'Take a break',
                ],
                correctAnswer: 1,
                explanation: 'Brainstorming is a group creativity technique by which efforts are made to find a conclusion for a specific problem by gathering a list of ideas.',
            },
            {
                id: '5',
                question: 'What is an "agenda"?',
                options: [
                    'A list of items to be discussed at a meeting',
                    'A secret plan',
                    'A type of calendar',
                    'A business card',
                ],
                correctAnswer: 0,
                explanation: 'An agenda is a list of meeting activities in the order in which they are to be taken up.',
            },
        ],
    },
    // Add more quizzes with questions as needed...
    {
        id: '3',
        title: 'Advanced Listening Comprehension',
        description: 'Challenge your listening skills with complex dialogues and academic lectures.',
        difficulty: 'Hard',
        questionsCount: 3,
        timeEstimate: '15 mins',
        timeLimit: 15 * 60,
        points: 500,
        tags: ['Listening', 'Advanced'],
        questions: [
            {
                id: '1',
                question: 'What is the main idea of the lecture?',
                options: ['Global warming', 'Economic growth', 'History of art', 'Quantum physics'],
                correctAnswer: 0,
                explanation: 'This is a placeholder question for listening comprehension.',
            },
            {
                id: '2',
                question: 'What did the speaker imply?',
                options: ['He was happy', 'He was angry', 'He was indifferent', 'He was confused'],
                correctAnswer: 1,
                explanation: 'This is a placeholder question for listening comprehension.',
            },
            {
                id: '3',
                question: 'What is the tone of the conversation?',
                options: ['Formal', 'Informal', 'Sarcastic', 'Serious'],
                correctAnswer: 0,
                explanation: 'This is a placeholder question for listening comprehension.',
            }
        ]
    },
    {
        id: '4',
        title: 'Travel & Tourism',
        description: 'Essential vocabulary and phrases for navigating airports, hotels, and tourist attractions.',
        difficulty: 'Easy',
        questionsCount: 3,
        timeEstimate: '8 mins',
        timeLimit: 8 * 60,
        points: 150,
        tags: ['Vocabulary', 'Travel'],
        questions: [
            {
                id: '1',
                question: 'Where do you check in at an airport?',
                options: ['Gate', 'Terminal', 'Check-in counter', 'Runway'],
                correctAnswer: 2,
                explanation: 'You go to the check-in counter to get your boarding pass and drop off bags.',
            },
            {
                id: '2',
                question: 'What is a "boarding pass"?',
                options: ['A ticket to enter the plane', 'A passport', 'A visa', 'A luggage tag'],
                correctAnswer: 0,
                explanation: 'A boarding pass is the document that gives you permission to board the airplane.',
            },
            {
                id: '3',
                question: 'What does "itinerary" mean?',
                options: ['A planned route or journey', 'A type of food', 'A travel agent', 'A suitcase'],
                correctAnswer: 0,
                explanation: 'An itinerary is a detailed plan for a journey, including a list of places to visit.',
            }
        ]
    },
    {
        id: '5',
        title: 'Idioms and Phrasal Verbs',
        description: 'Learn to speak like a native by mastering common English idioms and phrasal verbs.',
        difficulty: 'Medium',
        questionsCount: 3,
        timeEstimate: '12 mins',
        timeLimit: 12 * 60,
        points: 300,
        tags: ['Idioms', 'Speaking'],
        questions: [
            {
                id: '1',
                question: 'What does "break a leg" mean?',
                options: ['Get hurt', 'Good luck', 'Stop working', 'Run fast'],
                correctAnswer: 1,
                explanation: '"Break a leg" is a common idiom used to wish someone good luck, especially before a performance.',
            },
            {
                id: '2',
                question: 'To "give up" means to:',
                options: ['Start something new', 'Stop trying', 'Give a gift', 'Go up'],
                correctAnswer: 1,
                explanation: '"Give up" is a phrasal verb meaning to cease making an effort; resign; surrender.',
            },
            {
                id: '3',
                question: 'What does "piece of cake" mean?',
                options: ['Something very easy', 'A delicious dessert', 'Something hard', 'A party'],
                correctAnswer: 0,
                explanation: '"Piece of cake" is an idiom used to describe something that is very easy to do.',
            }
        ]
    },
];
