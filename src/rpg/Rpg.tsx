/**
 * @file Declares a very simple RPG game component.
 */
import React from "react";
import { Player } from "./player";
import { Card } from "./cards";
import { Battle } from "./battle";
import { Game } from "../game";

// debug
if (Game.config.mode === "development") {
    const testPlayer = new Player("test player");
    testPlayer.addCard(Card.listOfCards[0]);
    testPlayer.resetPlayerBeforeBattle();

    Object.assign(window, { Player, Card, Battle, testPlayer });
}

export const Rpg: React.FC = () => {
    return (
        <div>
            <h1>RPG Game</h1>
        </div>
    );

}
