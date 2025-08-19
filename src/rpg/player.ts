/**
 * @file Declares a player.
 */
import { Boost } from "emath.js";
import type { Card } from "./cards";

/**
 * A player in the RPG game.
 * A player has a name, a list of cards, and boosts for attack and hp (can be modified by cards).
 */
export class Player {
    /**
     * The base hp of the player.
     */
    public static readonly baseHp = 10;

    /**
     * The base attack of the player.
     */
    public static readonly baseAttack = 1;

    /**
     * A list of cards owned by the player.
     */
    public readonly cards: Card[] = [];

    /**
     * The player's attack boost.
     */
    public readonly attackBoost = new Boost(Player.baseAttack);

    /**
     * The player's hp boost.
     */
    public readonly hpBoost = new Boost(Player.baseHp);

    /**
     * The name of the player.
     */
    public name: string;

    /**
     * Creates a new player.
     * @param name - The name of the player.
     */
    constructor(name: string) {
        this.name = name;
    }
}
