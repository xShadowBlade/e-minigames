/**
 * @file Declares the game class.
 */
import { Game as GameClass } from "emath.js/game";

const Game = new GameClass({
    mode: "development",
    name: {
        id: "e-minigames",
        title: "E-Minigames",
    },
});

if (Game.config.mode === "development") {
    (window as any).Game = Game;
    (async () => {
        const eMathImport = await import("emath.js");
        const eMathGameImport = await import("emath.js/game");
        const eMath = Object.assign({}, eMathImport, eMathGameImport);
        (window as any).eMath = eMath;
    })();
}

export { Game };