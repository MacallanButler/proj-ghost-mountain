import { create } from 'zustand';
import type { GameState } from './types';
import { storyNodes } from '@/data/story-nodes'; // We will create this next

interface StoryStore extends GameState {
    setCurrentNode: (nodeId: string) => void;
    makeChoice: (choiceId: string) => void;
    resetGame: () => void;
    unlockFact: (factId: string) => void;
}

const INITIAL_STATE: GameState = {
    currentNodeId: 'start',
    history: [],
    stats: {
        health: 100,
        stealth: 50,
        empathy: 0,
    },
    unlockedFacts: [],
    isGameOver: false,
};

export const useStoryStore = create<StoryStore>((set, get) => ({
    ...INITIAL_STATE,

    setCurrentNode: (nodeId) => {
        set({ currentNodeId: nodeId });
    },

    makeChoice: (choiceId) => {
        const state = get();
        const currentNode = storyNodes[state.currentNodeId];
        const choice = currentNode?.choices.find((c) => c.id === choiceId);

        if (!choice) return;

        // Apply effects
        let newStats = { ...state.stats };
        if (choice.effect) {
            newStats[choice.effect.stat] = Math.max(0, Math.min(100, newStats[choice.effect.stat] + choice.effect.value));
        }

        set({
            currentNodeId: choice.nextNodeId,
            history: [...state.history, state.currentNodeId],
            stats: newStats,
        });
    },

    unlockFact: (factId) => {
        const { unlockedFacts } = get();
        if (!unlockedFacts.includes(factId)) {
            set({ unlockedFacts: [...unlockedFacts, factId] });
        }
    },

    resetGame: () => {
        set({ ...INITIAL_STATE });
    },
}));
