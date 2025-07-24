/**
 * @file Declares the main game class.
 */
import { Game as GameClass } from "emath.js/game";

/**
 * The main game instance for the E-Minigames.
 * Used for all minigames.
 */
export const Game = new GameClass({
    mode: "development",
    name: {
        id: "e-minigames",
        title: "E-Minigames",
    },
});

// Expose the game instance and emath.js modules in development mode for debugging
if (Game.config.mode === "development") {
    Object.assign(window, { Game });

    void (async (): Promise<void> => {
        const keysToLoad = {
            eMath: await import("emath.js"),
            eMathGame: await import("emath.js/game"),
            eMathPresets: await import("emath.js/presets"),
        };

        Object.assign(window, keysToLoad);
    })();
}
