/**
 * @file Declares the RarityDisplay component for the Luck Minigame.
 */
import React from "react";
import type { Rarity } from "./rarity";
import type { Decimal } from "emath.js";

/**
 * @returns A display component for a Rarity.
 * @param props - Props.
 */
export const RarityDisplay: React.FC<{ rarity: Rarity; count: Decimal }> = (props) => {
    const { rarity, count } = props;

    return (
        // Use the given class name if provided, otherwise use a default class name.
        <div className={`rarity-base ${rarity.rarityData.divClassName ?? ""}`}>
            <h1 className="text-lg font-bold mb-2">
                {rarity.rarityData.name} ({rarity.rarity.floor().format(0)})
            </h1>

            <p className="text-gray-500 mb-1">Chance: 1 in {rarity.rarityRng.format()}</p>
            <p className="text-gray-500 mb-1">Value: {rarity.value.format()}</p>

            <p className="text-gray-500 absolute bottom-2 right-2 m-0">x{count.formatInteger()}</p>
        </div>
    );
};
