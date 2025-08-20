/**
 * @file Declares a battle.
 */
import { Player } from "./player";

/**
 * Represents a battle between players.
 * A battle consists of multiple sides, each containing players.
 * At each player's
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

    public advanceToNextTurn(): void {
        // Execute outgoing attacks
        this.getCurrentSide().forEach((player) => {
            player.actions.forEach((action) => {
                // TODO
                // action.data.execute(player, player);
            });
        });
    }
}
