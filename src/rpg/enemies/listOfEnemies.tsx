/**
 * @file Declares the list of enemies available in the RPG game.
 */
import React from "react";
import { Card, CardType } from "../cards";
import { Player, PlayerAction } from "../player";
import { Decimal } from "emath.js";

const boss1 = new Player("crueler king");
boss1.addCards([
    new Card({
        name: "crueler king",
        description: "the crueler king",
        type: CardType.Passive,
        effect: (player: Player): void => {
            // Base HP
            player.hpBoost.setBoost({
                id: "base",
                order: 0,
                value: () => new Decimal(30),
            });

            // Base Strength
            player.strengthBoost.setBoost({
                id: "base",
                order: 0,
                value: () => new Decimal(5),
            });
        },
    }),
    new Card({
        name: "ice dagger but crueler",
        description: "cold",
        type: CardType.Action,
        effect: (player: Player): void => {
            player.addAction(
                new PlayerAction({
                    name: "ice dagger but crueler",
                    description: "cold",
                    requiresTarget: true,
                    execute: (playerPerforming: Player, targetPlayer: Player): void => {
                        targetPlayer.hp = Decimal.random(
                            0,
                            targetPlayer.hp.sub(playerPerforming.getStrength()),
                        ).round();
                    },
                }),
            );
        },
    }),
]);

export const listOfEnemies: Player[] = [boss1];
