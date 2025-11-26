export const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';

export const INITIAL_CONFIG = {
    language: Language.ENGLISH,
    level: ProficiencyLevel.INTERMEDIATE,
    voice: VoiceName.ZEPHYR,
};

export const VOICE_OPTIONS = [
    { value: VoiceName.PUCK, label: 'Puck (Playful)' },
    { value: VoiceName.KORE, label: 'Kore (Calm)' },
    { value: VoiceName.FENRIR, label: 'Fenrir (Deep)' },
    { value: VoiceName.CHARON, label: 'Charon (Authoritative)' },
    { value: VoiceName.ZEPHYR, label: 'Zephyr (Friendly)' },
];

export const LANGUAGE_OPTIONS = Object.values(Language);
export const LEVEL_OPTIONS = Object.values(ProficiencyLevel);