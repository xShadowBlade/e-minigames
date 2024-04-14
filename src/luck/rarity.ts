/**
 * @file Declares the rarity
 */
import { Game } from "../game";
import { E } from "emath.js";

class Rarity {
    /**
     * The rarities in order from most common to most rare.
     */
    public static rarities = [
        "common",
        "uncommon",
        "rare",
        "very rare",
        "legendary",
        "mythical",
    ];

    /**
     * Gets the probability of getting a certain rarity.
     * @param rarity - The rarity to get the probability of. (inverse)
     * @returns The probability of getting the rarity.
     */
    public static rarityFn (rarity: E): E {
        // TODO: Create a better formula for this.
        return rarity.add(1).pow(3);
    }

    /**
     * Gets the rarity of a certain probability.
     * @param probability - The probability to get the rarity of. (inverse)
     * @returns The rarity of the probability.
     */
    public static rarityFnInverse (probability: E): E {
        return probability.sub(1).root(3);
    }

    /**
     * The multiplier for the RNG. (for creating the rarity of the object)
     */
    public rngMultiplier: E;

    /**
     * The rarity index of the object.
     */
    public rarity: E;

    /**
     * @returns The RNG of the object.
     */
    public get rng (): E {
        return Rarity.rarityFn(E(this.rarity));
    }

    /**
     * @returns The name of the rarity.
     */
    public get rarityName (): string {
        return Rarity.rarities[Math.floor(this.rarity.toNumber())];
    }

    /**
     * Creates a new rarity.
     * @param rngMultiplier - The multiplier for the RNG. (for creating the rarity of the object)
     */
    constructor (rngMultiplier: E = E(1)) {
        this.rngMultiplier = rngMultiplier;
        const rng = E.random().recip().mul(this.rngMultiplier);
        this.rarity = Rarity.rarityFnInverse(rng);
    }
}

// debug
(window as any).Rarity = Rarity;