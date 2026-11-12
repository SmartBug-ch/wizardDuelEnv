export const ElementType = {
    Neutral: 0,
    Water: 1,
    Fire: 2,
    Plant: 3,
} as const;

export type ElementId = (typeof ElementType)[keyof typeof ElementType];
export type LayerLevel = 1 | 2 | 3 | 4;

export interface FlatGameState {
    layer: LayerLevel;
    turn: number;
    rngState: number; // for random number consistency true States for equivalent random generation so that participants have the same values true the studies.

    // Player 1 values
        // Layer 1
    p1Hp: number;
    p1MaxHp: number;
    p1Element: number;
        // Layer 2
    p1Mana: number;
    p1MaxMana: number;
    p1Cd0: number; // cool downs for the Attacks
    p1Cd1: number;
    p1Cd2: number;
    p1Cd3: number;
        //Layer 3
    p1Shield: number;
    p1BurnTurns: number;


    // Player 2 Stats ( Bot )
        // Layer 1
    p2Hp: number;
    p2MaxHp: number;
    p2Element: number;
        // Layer 2
    p2Mana: number;
    p2MaxMana: number;
    p2Cd0: number;
    p2Cd1: number;
    p2Cd2: number;
    p2Cd3: number;
        //Layer 3
    p2Shield: number;
    p2BurnTurns: number;
}

export interface StepResult {
    observation: number[];
    reward: number;
    terminated: boolean;
    truncated: boolean;
    info: {
        turn: number;
        p1Action: number;
        p2Action: number;
        validActionMask: number[];
    }
}

export interface ResetOptions {
    layer?: LayerLevel;
    seed?: number;
}

export interface ISimulator {
    envReset(options?: ResetOptions): {observation: number[]; info: Record<string, unknown> };
    envStep(action: number): StepResult;
    getState(): FlatGameState;
    setState(state: FlatGameState): void;
}