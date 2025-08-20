/**
 * @file Declares the app component.
 */
import React from "react";

import { Game } from "./game";
import "./luck/luckMinigame";
import { LuckMain } from "./luck/luckMain";
import { Rpg } from "./rpg/Rpg";

Game.dataManager.init();
Game.dataManager.loadData();

// Save on exit
window.addEventListener("beforeunload", () => {
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
            <h1 className="mb-4 text-3xl font-bold">E Minigames</h1>

            <LuckMain />

            <Rpg />
        </div>
    );
};
