import type { StoryNode } from '@/features/story/types';

export const storyNodes: Record<string, StoryNode> = {
    'start': {
        id: 'start',
        text: "The wind howls across the fractured peaks of the Spiti Valley. You are Khangri. Your belly is empty, and the winter snows have driven the blue sheep down to the valleys. You must hunt.",
        background: '/images/backgrounds/start-peak.jpg',
        choices: [
            {
                id: 'c1',
                text: 'Descend to the valley floor',
                nextNodeId: 'valley_floor',
                effect: { stat: 'stealth', value: -10 }
            },
            {
                id: 'c2',
                text: 'Stay high on the ridge',
                nextNodeId: 'ridge_path',
                effect: { stat: 'health', value: -5 } // Exploring takes energy
            }
        ]
    },
    'valley_floor': {
        id: 'valley_floor',
        text: "The valley floor is easier to traverse, but human settlements are close. You smell woodsmoke and hear the distant chime of livestock bells.",
        choices: [
            {
                id: 'c3',
                text: 'Investigate the livestock pen',
                nextNodeId: 'livestock_conflict',
                effect: { stat: 'health', value: 20 } // Potential food
            },
            {
                id: 'c4',
                text: 'Avoid the settlement and move to the river',
                nextNodeId: 'river_crossing',
                effect: { stat: 'stealth', value: 10 }
            }
        ],
        factId: 'human_wildlife_conflict'
    },
    'ridge_path': {
        id: 'ridge_path',
        text: "The ridge is treacherous, but offers a vantage point. Below, you spot a lone blue sheep separated from the herd.",
        choices: [
            {
                id: 'c5',
                text: 'Attempt a stalk',
                nextNodeId: 'hunt_success',
                requiredStat: 'stealth',
                requiredValue: 40,
                effect: { stat: 'health', value: 30 }
            },
            {
                id: 'c6',
                text: 'It\'s too far, conserve energy',
                nextNodeId: 'rest_cave',
                effect: { stat: 'health', value: 5 }
            }
        ],
        factId: 'snow_leopard_range'
    },
    'livestock_conflict': {
        id: 'livestock_conflict',
        text: "You approach the pen. A dog barks. Men shout. You barely escape with your life, but no food. This is the danger of the lowlands.",
        choices: [
            {
                id: 'c7',
                text: 'Retreat to the high mountains',
                nextNodeId: 'start',
                effect: { stat: 'health', value: -20 }
            }
        ]
    },
    'river_crossing': {
        id: 'river_crossing',
        text: "The river is frozen in patches. You move silently across the ice.",
        choices: [
            {
                id: 'c8',
                text: 'Continue patrol',
                nextNodeId: 'start',
            }
        ]
    },
    'hunt_success': {
        id: 'hunt_success',
        text: "Your patience pays off. You secure a meal that will sustain you for days.",
        choices: [
            {
                id: 'c9',
                text: 'Sleep and digest',
                nextNodeId: 'start',
                effect: { stat: 'health', value: 20 }
            }
        ]
    },
    'rest_cave': {
        id: 'rest_cave',
        text: "You find a small cave sheltered from the wind. It's safe here.",
        choices: [
            {
                id: 'c10',
                text: 'Wake up',
                nextNodeId: 'start',
                effect: { stat: 'health', value: 10 }
            }
        ]
    }
};
