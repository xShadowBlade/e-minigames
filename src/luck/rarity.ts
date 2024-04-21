/**
 * @file Declares the rarity
 */
import { Game } from "../game";
import { E, ESource, inverseFunctionApprox, roundingBase } from "emath.js";

class Rarity {
    /**
     * The rarities in order from most common to most rare.
     */
    public static rarities = [
        "Common",
        "Uncommon",
        "Rare",
        "Very Rare",
        "Ultra Rare",
        "Epic",
        "Legendary",
        "Mythical",
        "Godlike",
        "Transcendent",
        "Cosmic",
        "Celestial",
        "Divine",
        "Supreme",
        "Exalted",
        "Peerless",
        "Grandmaster",
        "Ethereal",
        "Mythos",
        "Primordial",
        "Timeless",
        "Infinite",
        "Omnipotent",
        "Ultimate",
        "Apex",
        "Transcendent",
        "Ultimate",
        "Unfathomable",
        "Mystical",
        "Mythos",
        "Primordial",
        "Omnipotent",
        "Exalted",
        "Eonian",
        "Timeless",
        "Eternal",
        "Supreme",
        "Cosmic",
        "Grand",
        "Infinite",
        "Venerable",
        "Enigmatic",
        "Illustrious",
        "Singularity",
    ];

    /**
     * Gets the probability of getting a certain rarity.
     * @param rarity - The rarity to get the probability of. (inverse)
     * @returns The probability of getting the rarity.
     */
    public static rarityFn (rarity: E): E {
        // TODO: Create a better formula for this.
        // return rarity.add(1).pow(5);
        // return E.pow(5, rarity.add(1));
        return roundingBase(E.pow(5, rarity.div(7.5).add(1).pow(3)).sub(4), 10, 1, 1e3);
    }

    /**
     * Gets the rarity of a certain probability.
     * @param probability - The probability to get the rarity of. (inverse)
     * @returns The rarity of the probability.
     */
    public static rarityFnInverse (probability: E): E {
        // return probability.root(5).sub(1);
        // return E.log(5, probability.add(1)).sub(1);
        // return probability.ln().div(E.ln(5));
        // return probability.log(5);
        // return inverseFunctionApprox(Rarity.rarityFn, probability).value.round();
        // 7.5\sqrt[3]{\frac{\ln(x+5)}{\ln(5)}}-7.5
        return E(7.5).mul(probability.add(5).ln().div(E.ln(5)).root(3)).sub(7.5).floor();
    }

    /**
     * Gets the name of a rarity.
     * @param rarity - The rarity to get the name of.
     * @returns The name of the rarity.
     */
    public static getRarityName (rarity: ESource): string {
        rarity = E(rarity);
        const isExtended = rarity.gte(Rarity.rarities.length);
        if (isExtended) {
            const e = rarity.sub(Rarity.rarities.length).add(1).toRoman();
            const ext = typeof e === "string" ? `(${e})` : "(???)";
            return `${Rarity.rarities[Rarity.rarities.length - 1]} ${ext}`;
        }
        return Rarity.rarities[Math.floor(rarity.toNumber())];
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
     * The base rarity of the object, before the RNG multiplier.
     */
    public baseRarity: E;

    /**
     * @returns The RNG of the object.
     */
    public get rarityRng (): E {
        return Rarity.rarityFn(E(this.rarity));
    }

    /**
     * The RNG of the object.
     */
    public rng: E;

    /**
     * @returns The name of the rarity.
     */
    public get rarityName (): string {
        return Rarity.getRarityName(this.rarity);
    }

    /**
     * Creates a new rarity.
     * @param rngMultiplier - The multiplier for the RNG. (for creating the rarity of the object)
     */
    constructor (rngMultiplier: E = E(1)) {
        this.rngMultiplier = rngMultiplier;
        const baseRng = E.random().recip();
        this.baseRarity = baseRng;
        const rng = rngMultiplier.mul(baseRng);
        this.rng = rng;
        this.rarity = Rarity.rarityFnInverse(rng);
    }

    // public toJSON () {
    //     return {
    //         rarity: this.rarity.toString(),
    //         rngMultiplier: this.rngMultiplier.toString(),
    //     };
    // }

}

// debug
(window as any).Rarity = Rarity;

export { Rarity };