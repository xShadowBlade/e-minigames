/**
 * @file Declares a battle.
 */
import type { Player } from "./player";

/**
 * Executes an array of promises in sequence.
 * Each promise will wait for the previous one to resolve before executing.
 * @template T - The type of the resolved value of the promises.
 * @param promises - An array of promises to execute in sequence.
 * @returns A promise that resolves to an array of the resolved values of the input promises.
 */
function sequencePromises<T>(promises: Promise<T>[]): Promise<T[]> {
    // For each promise, wait for it to resolve and then accumulate the results.
    return promises.reduce(
        (accumulator, promise) => accumulator.then((results) => promise.then((result) => [...results, result])),
        Promise.resolve<T[]>([]),
    );
}

/**
 * Represents a battle between players.
 * A battle consists of multiple sides, each containing players.
 * At each player's turn, they can perform actions such as attacking or defending.
 */
export class Battle {
    /**
     * The players involved in the battle.
     */
    public readonly sides: Player[][];

    /**
     * Which side's turn it currently is. (index of the sides array)
     */
    public currentSideTurn = 0;

    /**
     * Creates a new battle with the given players.
     * @param sides - The players involved in the battle.
     */
    constructor(sides: Player[][] = []) {
        this.sides = sides;
    }

    private getCurrentSide(): Player[] {
        return this.sides[this.currentSideTurn];
    }

    /**
     * Advances the battle to the next turn.
     * - Executes all outgoing attacks for the current side.
     * - Clears the outgoing attacks queue for the current side.
     * - Increments the current side turn to the next side.
     */
    public async advanceToNextTurn(): Promise<void> {
        // Execute outgoing attacks
        await sequencePromises(
            // For each player on the current side, execute their outgoing attacks
            this.getCurrentSide().map(async (player) => {
                await sequencePromises(
                    player.outgoingAttacksQueue.map(async (outgoingAttack) => {
                        const { targetPlayer, playerPerforming } = outgoingAttack.data;

                        await outgoingAttack.data.action.data.execute(playerPerforming, targetPlayer);
                    }),
                );
            }),
        );

        // Clear the outgoing attacks queue for the current side
        this.getCurrentSide().forEach((player) => {
            player.outgoingAttacksQueue.length = 0;
        });

        // Increment the current side turn
        this.currentSideTurn = (this.currentSideTurn + 1) % this.sides.length;
    }
}
