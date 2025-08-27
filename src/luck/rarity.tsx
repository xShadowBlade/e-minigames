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

    /**
     * What to display when the rarity is opened.
     */
    openAnimation?: React.ReactNode;
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
        {
            name: "Common",
            divClassName: "bg-gradient-to-r from-gray-100 to-gray-200",
        },
        {
            name: "Uncommon",
            divClassName: "bg-gradient-to-r from-green-100 to-green-200 border-green-300",
        },
        {
            name: "Rare",
            divClassName: "bg-gradient-to-r from-blue-100 to-blue-200 border-blue-400",
        },
        {
            name: "Epic",
            divClassName: "bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300",
        },
        {
            name: "Legendary",
            divClassName: "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300",
        },
        {
            name: "Mythical",
            divClassName: "bg-gradient-to-r from-pink-100 to-pink-200 border-pink-300",
        },
        {
            name: "Godlike",
            divClassName: "bg-gradient-to-r from-cyan-100 to-cyan-200 border-cyan-300",
        },
        // Basic rarities (no class names)
        ...[
            // "Rare",
            // "Epic",
            // "Legendary",
            // "Mythical",
            // "Godlike",
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
            // "Singularity",
        ].map((name): RarityData => ({ name })),
        {
            name: "Singularity",
            divClassName: "rarity-singularity",
            children: (
                <>
                    {/* <RaritySquareEffect positionOffsetVariation={4} updateInterval={100} className="square-effect square-effect-border from-orange-600 to-orange-500 shadow-orange-800 !h-[120%] !rounded-3xl" /> */}
                </>
            ),
        },
        {
            name: "Infinite",
            divClassName: "rarity-infinite",
            children: (
                <>
                    <RaritySquareEffect />
                    <RaritySquareEffect updateInterval={150} className="square-effect square-effect-border shadow-black" />
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
        return roundingBase(Decimal.pow(1.75, rarity.add(1).pow(1.25)), 10, 1, 1e3);
    }

    /**
     * Gets the rarity of a certain probability.
     * @param probability - The probability to get the rarity of. (inverse)
     * @returns The rarity of the probability.
     */
    // public static rarityFnInverse(probability: Decimal): Decimal {
    //     // 7.5\sqrt[3]{\frac{\ln(x+5)}{\ln(5)}}-7.5
    //     return new Decimal(7.5)
    //         .mul(probability.add(5).ln().div(Decimal.ln(5)).root(3))
    //         .sub(7.5)
    //         .floor();
    // }

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

        // If the rarity is not found, return the default rarity.
        if (index === -1) {
            console.warn(`Rarity "${name}" not found.`);
            this.rarity = new Decimal(0);
            return;
        }

        this.rarity = new Decimal(index);
    }
}

// debug
Object.assign(window, { Rarity });

export { Rarity };
