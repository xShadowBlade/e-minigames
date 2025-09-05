/**
 * @file Declares a very simple RPG game component.
 */
import React from "react";
import { Player } from "./player";
import { Card } from "./cards";
import { Battle } from "./battle";
import { Game } from "../game";
import { BattleMenu } from "./gui/BattleMenu";
import { GameStateProvider } from "./RpgGameState";

// debug
const testPlayer = new Player("test player");
testPlayer.addCard(Card.listOfCards[0]);
testPlayer.resetPlayerBeforeBattle();

Object.assign(window, { Player, Card, Battle, testPlayer });

/**
 * @returns A simple RPG game component.
 */
export const Rpg: React.FC = () => {
    return (
        <GameStateProvider>
            <div>
                <BattleMenu isOpen={true} actions={testPlayer.actions.map((action) => action.data)} />
            </div>
        </GameStateProvider>
    );
};
