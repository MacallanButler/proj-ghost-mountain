export type StatType = 'health' | 'stealth' | 'empathy';

export interface Choice {
    id: string;
    text: string;
    nextNodeId: string;
    requiredStat?: StatType;
    requiredValue?: number;
    effect?: {
        stat: StatType;
        value: number;
    };
}

export interface StoryNode {
    id: string;
    text: string;
    image?: string; // Path to image asset
    background?: string; // Path to background image
    choices: Choice[];
    factId?: string; // ID of an educational fact to reveal
}

export interface GameState {
    currentNodeId: string;
    history: string[]; // List of visited node IDs
    stats: {
        health: number;
        stealth: number;
        empathy: number;
    };
    unlockedFacts: string[];
    isGameOver: boolean;
}
