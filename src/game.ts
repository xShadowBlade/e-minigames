/**
 * @file Declares the game class.
 */
import { Game as GameClass } from "emath.js/game";

const Game = new GameClass({
    mode: "development",
    name: {
        id: "e-minigames",
        title: "Decimal-Minigames",
    },
});

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

export { Game };
