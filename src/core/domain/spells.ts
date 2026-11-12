import {type ElementId, ElementType} from "./types";

export type ActionId = 0 | 1 | 2 | 3 | 4 | 5;

export interface SpellDefinition {
    readonly id: ActionId;
    readonly name: string;
    readonly usesCasterElement: boolean;
    readonly element: ElementId;
    readonly changeStance: boolean;
    readonly baseDamage: number;
        // Layer 2
    readonly manaCost: number;
    readonly manaGain: number;
    readonly cooldown: number;
    readonly personaEffects?: Readonly<Record<ElementId, PersonaEffect>>;
}
    // Layer 3
export interface PersonaEffect {
    readonly bonusDamage?: number;
    readonly healAmount?: number;
    readonly shieldGain?: number;
    readonly burnTurns?: number;
    readonly cleansesBurn?: boolean;
}

export const SPELL_BOOK: Readonly<Record<ActionId, SpellDefinition>> = {
    0: {
        id: 0,
        name: 'Arcane Meditate',
        element: ElementType.Neutral,
        usesCasterElement: false,
        changeStance: true,
        baseDamage: 0,
        manaCost: 0,
        manaGain: 35,
        cooldown: 0, // is this good?
    },
    1: {
        id: 1,
        name: 'Elemental Strike',
        element: ElementType.Neutral,
        usesCasterElement: true,
        changeStance: false,
        baseDamage: 20,
        manaCost: 15,
        manaGain: 0,
        cooldown: 0,
    },
    2: {
        id: 2,
        name: 'Persona Mastery',
        element: ElementType.Neutral,
        usesCasterElement: true,
        changeStance: false,
        baseDamage: 0,
        manaCost: 30,
        manaGain: 0,
        cooldown: 2,
        personaEffects: {
            [ElementType.Neutral]:  {bonusDamage: 35},
            [ElementType.Water]:    {healAmount: 25, cleansesBurn: true},
            [ElementType.Fire]:     {bonusDamage: 25, burnTurns: 3},
            [ElementType.Plant]:    {shieldGain: 30},
        },
    },
    3: {
        id: 3,
        name: 'Shift Water',
        element: ElementType.Water,
        usesCasterElement: false,
        changeStance: true,
        baseDamage: 10,
        manaCost: 10,
        manaGain: 0,
        cooldown: 1,
    },
    4: {
        id: 4,
        name: 'Shift Fire',
        element: ElementType.Fire,
        usesCasterElement: false,
        changeStance: true,
        baseDamage: 10,
        manaCost: 10,
        manaGain: 0,
        cooldown: 1,
    },
    5: {
        id: 5,
        name: 'Shift Plant',
        element: ElementType.Plant,
        usesCasterElement: false,
        changeStance: true,
        baseDamage: 10,
        manaCost: 10,
        manaGain: 0,
        cooldown: 1,
    },
} as const;

const ELEMENT_MULTIPLIER_MATRIX: ReadonlyArray<ReadonlyArray<number>> = [
    // Target: Neutral, Water, Fire, Plant
    /* Neutral */ [1.0, 1.0, 1.0, 1.0],
    /* Water */ [1.0, 1.0, 1.5, 0.5],
    /* Fire */ [1.0, 0.5, 1.0, 1.5],
    /* Plant */ [1.0, 1.5, 0.5, 1.0],

];
    // Function to get the multiplier for the attack Layer 1
export function getElementMultiplier(attackerEle: ElementId, defenderEle: ElementId): number {
    return ELEMENT_MULTIPLIER_MATRIX[attackerEle][defenderEle];
}
export const COMBAT_CONSTANTS = {
    burnDamagePerTurn: 10,
    lowHpThreshold: 0.3,
    lowHpCritMultiplier: 1.5,
} as const;


