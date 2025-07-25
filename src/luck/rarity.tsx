/**
 * @file Declares the rarity
 */
// import { Game } from "../game";
import React, { useState } from "react";
import type { DecimalSource } from "emath.js";
import { Decimal, roundingBase, RandomSelector } from "emath.js";

/**
 * Used to define the data for a rarity.
 * Does not include the chance of the rarity (automatically calculated).
 */
export interface RarityData {
    /**
     * The name of the rarity.
     */
    name: string;

    /**
     * The class name of the rarity.
     */
    divClassName?: string;

    /**
     * Optional children to render inside the rarity display.
     */
    children?: React.ReactNode;
}

interface RaritySquareEffectProps {
    /***
     * How much to vary the position of the square effect.
     */
    positionOffsetVariation?: number;

    /**
     * How often to update the position offset in milliseconds.
     */
    updateInterval?: number;

    /**
     * Optional class name for the square effect.
     */
    className?: string;
}

const RaritySquareEffect: React.FC<RaritySquareEffectProps> = (props) => {
    const { positionOffsetVariation = 2, updateInterval = 100, className = "square-effect" } = props;

    const [positionOffsetX, setPositionOffsetX] = useState(0);
    const [positionOffsetY, setPositionOffsetY] = useState(0);

    // Update the position offset every 100ms
    React.useEffect(() => {
        const interval = setInterval(() => {
            setPositionOffsetX(Math.random() * positionOffsetVariation - positionOffsetVariation / 2);
            setPositionOffsetY(Math.random() * positionOffsetVariation - positionOffsetVariation / 2);
        }, updateInterval);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={className}
            style={{ "--x-offset": `${positionOffsetX}%`, "--y-offset": `${positionOffsetY}%` } as React.CSSProperties}
        ></div>
    );
};

class Rarity {
    public static rarities: RarityData[] = [
        // {
        //     name: "Common",
        //     divClassName: "rarity-common",
        // },
        // Basic rarities (no class names)
        ...[
            "Common",
            "Uncommon",
            "Rare",
            "Epic",
            "Legendary",
            "Mythical",
            "Godlike",
            "Ultimate",
            "Transcendent",
            "Cosmic",
            "Celestial",
            "Divine",
            "Mystical",
            "Supreme",
            "Exalted",
            "Ethereal",
            "Unfathomable",
            "Mythos",
            "Apex",
            "Timeless",
            "Primordial",
            "Eonian",
            "Eternal",
            "Venerable",
            "Enigmatic",
            "Illustrious",
            "Singularity",
        ].map((name): RarityData => ({ name })),
        {
            name: "Infinite",
            divClassName: "rarity-infinite",
            children: (
                <>
                    <RaritySquareEffect />
                    <RaritySquareEffect updateInterval={150} className="square-effect square-effect-border" />
                    <div className="rarity-infinite-orbital"></div>
                    <div className="rarity-infinite-orbital rarity-infinite-orbital-1"></div>
                    <div className="rarity-infinite-orbital rarity-infinite-orbital-2"></div>
                </>
            ),
        },
        { name: "placeholder " },
    ];

    /**
     * Gets the probability of getting a certain rarity.
     * @param rarity - The rarity to get the probability of. (inverse)
     * @returns The probability of getting the rarity.
     */
    public static rarityFn(rarity: Decimal): Decimal {
        // TODO: Create a better formula for this.
        return roundingBase(Decimal.pow(5, rarity.div(7.5).add(1).pow(3)).sub(4), 10, 1, 1e3);
    }

    /**
     * Gets the rarity of a certain probability.
     * @param probability - The probability to get the rarity of. (inverse)
     * @returns The rarity of the probability.
     */
    public static rarityFnInverse(probability: Decimal): Decimal {
        // 7.5\sqrt[3]{\frac{\ln(x+5)}{\ln(5)}}-7.5
        return new Decimal(7.5)
            .mul(probability.add(5).ln().div(Decimal.ln(5)).root(3))
            .sub(7.5)
            .floor();
    }

    /**
     * Gets the data of a rarity.
     * @param rarity - The rarity to get the name of.
     * @returns The data of the rarity.
     */
    public static getRarityData(rarity: DecimalSource): RarityData {
        rarity = new Decimal(rarity);

        // If the rarity is greater than the number of defined rarities, extend it with a Roman numeral.
        const isExtended = rarity.gte(Rarity.rarities.length);
        if (isExtended) {
            const e = rarity.sub(Rarity.rarities.length).add(1).toRoman();
            const ext = typeof e === "string" ? `(${e})` : "(???)";

            return {
                ...Rarity.rarities[Rarity.rarities.length - 1],
                name: `${Rarity.rarities[Rarity.rarities.length - 1].name} ${ext}`,
            };
        }

        return Rarity.rarities[Math.floor(rarity.toNumber())];
    }

    /**
     * Gets the value of a rarity.
     * @param rarity - The rarity to get the value of.
     * @returns The value of the rarity.
     */
    public static getValue(rarity: Decimal): Decimal {
        return Rarity.rarityFn(rarity).pow(0.75);
    }

    /**
     * The selector for the rarities.
     */
    public static selector = new RandomSelector(
        Rarity.rarities.map((rarity, index) => ({
            name: rarity.name,
            chance: Rarity.rarityFn(new Decimal(index)),
        })),
    );

    /**
     * Gets a random rarity based on the given luck.
     * @param luck - The luck to use for the random selection.
     * @returns The random rarity.
     */
    public static getRandomRarity(luck: DecimalSource = Decimal.dOne): Rarity {
        return new Rarity(Rarity.selector.select(luck) ?? Rarity.rarities[0].name);
    }

    /**
     * The rarity index of the object.
     */
    public rarity: Decimal;

    /**
     * @returns The value of the rarity.
     */
    public get value(): Decimal {
        return Rarity.getValue(this.rarity);
    }

    /**
     * @returns The RNG of the object.
     */
    public get rarityRng(): Decimal {
        return Rarity.rarityFn(new Decimal(this.rarity));
    }

    /**
     * @returns The data of the rarity.
     */
    public get rarityData(): RarityData {
        return Rarity.getRarityData(this.rarity);
    }

    /**
     * Creates a new rarity.
     * @param name - The name of the rarity.
     */
    constructor(name: string) {
        const index = Rarity.rarities.findIndex((rarity) => rarity.name === name);
        if (index === -1) {
            throw new Error(`Rarity "${name}" not found.`);
        }

        this.rarity = new Decimal(index);
    }
}

// debug
Object.assign(window, { Rarity });

export { Rarity };
