declare enum Language {
    ENGLISH = 'English',
    SPANISH = 'Spanish',
    FRENCH = 'French',
    GERMAN = 'German',
    JAPANESE = 'Japanese',
    MANDARIN = 'Mandarin Chinese'
}

declare enum ProficiencyLevel {
    BEGINNER = 'Beginner',
    INTERMEDIATE = 'Intermediate',
    ADVANCED = 'Advanced'
}

declare enum VoiceName {
    ZEPHYR = 'Zephyr',
    PUCK = 'Puck',
    KORE = 'Kore',
    FENRIR = 'Fenrir',
    CHARON = 'Charon'
}

declare interface AIConfig {
    language: Language;
    level: ProficiencyLevel;
    voice: VoiceName;
}

declare type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

declare interface LogMessage {
    role: 'user' | 'model' | 'system';
    text: string;
    timestamp: Date;
}