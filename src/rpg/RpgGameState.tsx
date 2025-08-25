/**
 * @file Declares the RPG game state context and provider.
 */
import React, { createContext, useContext } from "react";
import { Player } from "./player";
import { Battle } from "./battle";

/**
 * The state of the RPG game.
 * Includes the current player, the current battle.
 * Does not include persistent data (see {@link Game}).
 */
export interface RpgGameState {
    /**
     * Set the value of a state.
     * @param key - The key of the state.
     * @param value - The value of the state.
     */
    readonly set: <K extends keyof RpgGameState>(key: K, value: RpgGameState[K]) => void;

    /**
     * The current player.
     */
    player: Player | null;

    /**
     * The current battle.
     */
    battle: Battle | null;
}

/**
 * @returns The context for the RPG game state.
 */
// @ts-expect-error - Initialized later
const RpgGameStateContext = createContext<RpgGameState>(undefined);

/**
 * @returns The RPG game state context.
 */
export const useRpgGameState = (): RpgGameState => useContext(RpgGameStateContext);

/**
 * @returns The context provider for the RPG game state.
 * @param props - The props.
 */
export const GameStateProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    // Initialize with default values
    const [state, setState] = React.useState<RpgGameState>({
        set: (key, value) => setState((prev) => ({ ...prev, [key]: value })),

        player: null,
        battle: null,
    });

    return <RpgGameStateContext.Provider value={state}>{props.children}</RpgGameStateContext.Provider>;
};
