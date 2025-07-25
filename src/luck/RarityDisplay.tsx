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
            <h1 className="mb-2 text-lg font-bold">{rarity.rarityData.name}</h1>
            <h1 className="absolute right-2 top-2 text-lg font-bold">({rarity.rarity.floor().format(0)})</h1>

            <p className="mb-1 text-gray-500">Chance: 1 in {rarity.rarityRng.format()}</p>
            <p className="mb-1 text-gray-500">Value: {rarity.value.format()}</p>

            <p className="absolute bottom-2 right-2 m-0 text-gray-500">x{count.formatInteger()}</p>

            {rarity.rarityData.children ?? null}
        </div>
    );
};
