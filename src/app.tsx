/**
 * @file Declares the app component.
 */
import React from "react";

import { Game } from "./game";
import "./luck/luckMinigame";
import { LuckMain } from "./luck/luckMain";

Game.dataManager.init();
Game.dataManager.loadData();

// Save on exit
window.addEventListener("beforeunload", function (e) {
    Game.dataManager.saveData();
});

Game.eventManager.setEvent("save", "interval", 30e3, () => {
    Game.dataManager.saveData();
    console.log("Auto save complete.");
});

/**
 * @returns The main app component.
 */
export const App: React.FC = () => {
    return (
        <div className="m-4">
            <h1>E Minigames</h1>
            <p>
                A collection of minigames for my library
                <a href="https://github.com/xshadowblade/emath.js">emath.js</a>.
            </p>
            <hr />

            <LuckMain />
        </div>
    );
};
