/**
 * @file Declares cards
 */
import React from "react";
import type { Player } from "./player";

interface CardConstructorData {
    /**
     * The name/id of the card.
     */
    name: string;

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
        new Card({
            name: "Black Hole",
            effect: (player: Player): void => {
                player.attackBoost.setBoost({
                    id: "card-black-hole-attack",
                    value: (input) => input.multiply(2),
                    order: 2,
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
