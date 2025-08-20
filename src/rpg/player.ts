/**
 * @file Declares a player.
 */
import { Boost, Decimal } from "emath.js";
import type { Card } from "./cards";
import type { Battle } from "./battle";

/**
 * Data required to create a player action.
 */
export interface PlayerActionConstructorData {
    /**
     * The name of the action.
     */
    name: string;

    /**
     * A brief description of the action.
     */
    description: string;

    /**
     * The function to execute when the action is performed.
     * @param player - The player performing the action.
     * @param targetPlayer - The target player of the action. (note: can be itself)
     */
    execute: (playerPerforming: Player, targetPlayer: Player) => void;
}

/**
 * An action that can be performed by a player.
 */
export class PlayerAction {
    /**
     * The data for the player action.
     */
    public readonly data: PlayerActionConstructorData;

    /**
     * Creates a new player action.
     * @param data - The data for the player action.
     */
    constructor(data: PlayerActionConstructorData) {
        this.data = data;
    }
}

interface OutgoingAttackConstructorData {
    /**
     * The player that is performing the attack.
     */
    player: Player;

    /**
     * The target player of the attack.
     */
    target: Player;

    /**
     * The corresponding action that triggered this attack.
     */
    action: PlayerAction;
}

/**
 * Represents an outgoing attack initiated by a player.
 */
export class OutgoingAttack {
    public readonly data: OutgoingAttackConstructorData;

    constructor(data: OutgoingAttackConstructorData) {
        this.data = data;
    }
}

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
     * The base strength of the player.
     */
    public static readonly baseStrength = 1;

    /**
     * The current battle the player is engaged in.
     * This is set when the player starts a battle and reset when the battle ends.
     */
    public currentBattle: Battle | null = null;

    /**
     * A list of cards owned by the player.
     */
    public readonly cards: Card[] = [];

    /**
     * A list of possible actions the player can perform.
     * This is reset on each battle.
     */
    public readonly actions: PlayerAction[] = [];

    /**
     * The player's strength boost.
     */
    public readonly strengthBoost = new Boost(Player.baseStrength);

    /**
     * The player's hp boost. Also determines max hp.
     */
    public readonly hpBoost = new Boost(Player.baseHp);

    /**
     * A queue of outgoing attacks that the player has initiated.
     * This is reset at the start of each battle and on every turn.
     */
    public readonly outgoingAttacksQueue: OutgoingAttack[] = [];

    /**
     * The current hp.
     */
    public hp: Decimal = this.getMaxHp();

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

    /**
     * @returns The player's current strength value.
     */
    public getStrength(): Decimal {
        return this.strengthBoost.calculate();
    }

    /**
     * @returns The player's current maximum hp value.
     */
    public getMaxHp(): Decimal {
        return this.hpBoost.calculate();
    }

    /**
     * Adds a card to the player's hand.
     * @param card - The card to add.
     */
    public addCard(card: Card): void {
        this.cards.push(card);
    }

    /**
     * Adds an action to the player's list of actions.
     * @param action - The action to add.
     */
    public addAction(action: PlayerAction): void {
        this.actions.push(action);
    }

    /**
     * Runs all card effects on the player.
     */
    private runCardEffects(): void {
        // Run all card effects on the player
        for (const card of this.cards) {
            card.data.effect(this);
        }
    }

    /**
     * Resets the player before starting a new battle.
     */
    public resetPlayerBeforeBattle(): void {
        // Clear actions
        this.actions.length = 0;
        this.outgoingAttacksQueue.length = 0;

        // Reset boosts
        this.strengthBoost.clearBoosts();
        this.hpBoost.clearBoosts();
        this.hp = this.getMaxHp();

        // Run card effects to apply boosts
        this.runCardEffects();
    }

    /**
     * Adds an outgoing attack to the player's queue.
     * @param attack - The attack to add to the queue.
     */
    public addOutgoingAttack(attack: OutgoingAttack): void {
        this.outgoingAttacksQueue.push(attack);
    }

    // TODO: add way to execute outgoing attacks
}
