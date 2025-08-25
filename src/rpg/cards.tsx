/**
 * @file Declares cards
 */
import type React from "react";
import { PlayerAction, type Player } from "./player";
import { Decimal } from "emath.js";

/**
 * The type of card.
 * Currently, this is cosmetic.
 */
export enum CardType {
    /**
     * An action card that can be used to perform an action.
     */
    Action,

    /**
     * A passive card that affects the player or game state.
     */
    Passive,
}

interface CardConstructorData {
    /**
     * The name/id of the card.
     */
    name: string;

    /**
     * The type of the card. See {@link CardType} for the available types.
     */
    type: CardType;

    /**
     * A brief description of the card.
     */
    description?: string;

    /**
     * Components to render inside the card (on top of the existing card).
     */
    components?: React.ReactNode;

    /**
     * The effect of the card.
     * This function is called when a battle is started.
     * @param player - The player that owns the card.
     */
    effect: (player: Player) => void;
}

/**
 * Represents a card in the RPG game.
 * A card can affect the state of the game or the player.
 */
export class Card {
    /**
     * The list of all cards.
     */
    public static readonly listOfCards: Card[] = [
        // Actions
        new Card({
            name: "Attack",
            description: "Perform an attack on the opponent.",
            type: CardType.Action,
            effect: (player: Player): void => {
                player.addAction(
                    new PlayerAction({
                        name: "Attack",
                        description: "Deal damage to the opponent equal to your strength.",
                        requiresTarget: true,
                        execute: (playerPerforming: Player, targetPlayer: Player): void => {
                            targetPlayer.hp = targetPlayer.hp.sub(playerPerforming.getStrength());
                        },
                    }),
                );
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

        new Card({
            name: "Mistake",
            description: "best card in the game",
            type: CardType.Passive,
            effect: (player: Player): void => {
                player.strengthBoost.setBoost({
                    id: "card-black-hole-strength",
                    value: (input) => input.add("-1e300"),
                    order: 1,
                });
            },
        }),
    ];

    /**
     * The data for the card.
     */
    public data: CardConstructorData;

    /**
     * Creates a new card.
     * @param data - The data for the card.
     */
    constructor(data: CardConstructorData) {
        this.data = data;
    }
}
