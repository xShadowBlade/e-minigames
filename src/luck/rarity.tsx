/**
 * @file Declares the rarity
 */
import type React from "react";
import type { DecimalSource, RandomOptionEntry } from "emath.js";
import { Decimal, roundingBase, RandomSelector } from "emath.js";
import {
    getBaseModifierMultiplier,
    getModifierLuckMultiplier,
    listOfModifiers,
    listOfRarities,
} from "./listOfRarities";
import type { RaritySerializedData } from "./luckMinigame";

/**
 * Used to define the data for a rarity for rendering such as its display name and class name.
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

/**
 * Represents a rarity that can be rolled.
 * - Rarity is determined by an index (0 = common, 1 = uncommon, etc.) and a modifier (0 = none, 1 = shiny, 2 = rainbow, etc.).
 */
class Rarity {
    /**
     * A list of all defined rarities.
     */
    public static readonly rarities: RarityData[] = listOfRarities;

    /**
     * The data to use when the rarity is invalid or undefined.
     */
    public static readonly invalidRarityData: RarityData = {
        name: "Unknown",
    };

    /**
     * A list of all defined rarities including duplicates with modifiers.
     */
    public static readonly raritiesWithModifiers: Rarity[] = Rarity.getSelectorEntries().map((entry) =>
        Rarity.fromString(entry.name),
    );

    /**
     * Gets the probability of getting a certain rarity.
     * @param rarity - The rarity to get the probability of. (inverse)
     * @param modifier - The modifier to get the probability of. (default: 0)
     * @returns The probability of getting the rarity.
     */
    public static rarityFn(rarity: Decimal, modifier: Decimal = Decimal.dZero): Decimal {
        return roundingBase(
            Decimal.pow(1.75, rarity.add(1).pow(1.25)).mul(getBaseModifierMultiplier(modifier)),
            10,
            1,
            1e3,
        );
    }

    /**
     * Gets the data of a rarity.
     * @param rarity - The rarity to get the name of.
     * @returns The data of the rarity.
     */
    public static getRarityData(rarity: DecimalSource): RarityData {
        rarity = new Decimal(rarity);

        // If the rarity is less than 0, return the invalid rarity data.
        if (rarity.lt(0)) return Rarity.invalidRarityData;

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

        // Return the defined rarity or the invalid rarity data if the index is out of bounds.
        try {
            return Rarity.rarities[Math.floor(rarity.toNumber())];
        } catch {
            return Rarity.invalidRarityData;
        }
    }

    /**
     * Gets the value of a rarity.
     * @param rarity - The rarity to get the value of.
     * @param modifier - The modifier to get the value of. (default: 0)
     * @returns The value of the rarity.
     */
    public static getValue(rarity: Decimal, modifier: Decimal = Decimal.dZero): Decimal {
        return Rarity.rarityFn(rarity, modifier).pow(0.75);
    }

    /**
     * A list of entries for the selector.
     * Can be changed depending on luck.
     */
    private static selectorEntries: RandomOptionEntry[] = Rarity.getSelectorEntries();

    /**
     * Gets the selector entries based on the given modifier luck.
     * @param modifierLuck - The modifier luck to use for the update. (default: 1)
     * @param isSorted - Whether to sort the entries from highest to lowest chance. (default: true)
     * @returns The selector entries.
     */
    public static getSelectorEntries(modifierLuck: DecimalSource = Decimal.dOne, isSorted = true): RandomOptionEntry[] {
        const out: RandomOptionEntry[] = Rarity.rarities.flatMap((rarity, index) => [
            // Base rarity
            {
                name: rarity.name,
                chance: Rarity.rarityFn(new Decimal(index)),
            },
            // Modifiers
            ...listOfModifiers.slice(1).map((modifier, modIndex) => ({
                name: `${modifier} ${rarity.name}`,
                chance: Rarity.rarityFn(new Decimal(index)).mul(getModifierLuckMultiplier(modIndex + 1, modifierLuck)),
            })),
        ]);

        // Sort from highest to lowest chance
        if (isSorted) out.sort((a, b) => -b.chance.compare(a.chance));

        return out;
    }

    /**
     * The selector for the rarities.
     */
    public static selector = new RandomSelector(() => Rarity.selectorEntries);

    /**
     * Gets a random rarity based on the given luck.
     * @param times - The number of times to roll the rarity.
     * @param luck - The luck multiplier for the roll.
     * @returns The random rarities
     */
    public static getMultipleRandomRarities(times?: DecimalSource, luck?: DecimalSource): Rarity[] {
        const selections = Rarity.selector.selectMultiple(times, luck);
        return selections.map((selection) => Rarity.fromString(selection.name));
    }

    /**
     * Gets a single random rarity based on the given luck.
     * @param luck - The luck multiplier for the roll.
     * @returns The random rarity.
     */
    public static getRandomRarity(luck?: DecimalSource): Rarity {
        const selection = Rarity.selector.select(luck);
        return Rarity.fromString(selection);
    }

    /**
     * The rarity index of the object.
     */
    public rarity: Decimal;

    /**
     * The modifier index of the object.
     */
    public modifier: Decimal;

    /**
     * @returns The value of the rarity.
     */
    public get value(): Decimal {
        return Rarity.getValue(this.rarity, this.modifier);
    }

    /**
     * @returns The chance of the rarity without the modifier applied.
     */
    public get rarityChanceWithoutModifier(): Decimal {
        return Rarity.rarityFn(new Decimal(this.rarity));
    }

    /**
     * @returns The chance of the rarity with the modifier applied.
     */
    public get rarityChance(): Decimal {
        return this.rarityChanceWithoutModifier.mul(getModifierLuckMultiplier(this.modifier));
    }

    /**
     * @returns The data of the rarity.
     */
    public get rarityData(): RarityData {
        return Rarity.getRarityData(this.rarity);
    }

    /**
     * Creates a new rarity.
     * @param index - The index of the rarity.
     * @param modifier - The modifier of the rarity. (default: 0)
     */
    constructor(index: DecimalSource, modifier: DecimalSource = 0) {
        this.rarity = new Decimal(index);
        this.modifier = new Decimal(modifier);
    }

    /**
     * Creates a new rarity from a string.
     * @param name - The name of the rarity. If the name includes a modifier, it should be in the format "Modifier Rarity". If the name is not found, the default rarity (0) will be returned.
     * @returns The new rarity.
     */
    public static fromString(name: string | undefined): Rarity {
        // Handle undefined name
        if (!name) {
            console.warn(`Rarity "${name}" not found. Returning invalid rarity.`);
            return new Rarity(-1);
        }

        // Split into modifier and rarity
        const parts = name.split(" ");
        const modifierName = parts.length > 1 ? parts[0] : "";
        const rarityName = parts.length > 1 ? parts.slice(1).join(" ") : parts[0];

        // Find the index of the rarity and modifier
        const index = Rarity.rarities.findIndex((rarity) => rarity.name === rarityName);
        const modifierIndex = listOfModifiers.indexOf(modifierName);

        // If the rarity is not found, return the default rarity.
        if (index === -1) {
            console.warn(`Rarity "${name}" not found. Returning invalid rarity.`);
            return new Rarity(-1);
        }

        return new Rarity(index, modifierIndex !== -1 ? modifierIndex : 0);
    }

    /**
     * Serializes the rarity to {@link RaritySerializedData}.
     * @returns The serialized data.
     */
    public serialize(): RaritySerializedData {
        return {
            name: this.toString(),
            index: this.rarity,
            modifier: this.modifier,
        };
    }

    /**
     * Deserializes the rarity from a serialized object.
     * @param data - The serialized data to deserialize.
     * @returns A new Rarity instance.
     */
    public static deserialize(data: RaritySerializedData): Rarity {
        return new Rarity(data.index, data.modifier);
    }

    /**
     * Returns a string representation of the rarity.
     * @returns The string representation.
     */
    public toString(): string {
        const modifierString = this.modifier.gt(0) ? `${listOfModifiers[this.modifier.toNumber()]} ` : "";

        return `${modifierString}${this.rarityData.name}`;
    }
}

// debug
Object.assign(window, { Rarity });

export { Rarity };
