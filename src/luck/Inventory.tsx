/**
 * @file Declares the inventory for the Luck Minigame.
 */
import React, { useEffect, useState } from "react";
import { Game } from "../game";
import { luckInventory } from "./luckMinigame";
import { RarityDisplay } from "./RarityDisplay";
import { Rarity } from "./rarity";

/**
 * @returns The Inventory component for the Luck Minigame.
 */
export const Inventory: React.FC = () => {
    const [inventory, setInventory] = useState(luckInventory.value);

    return (
        <div className="flex flex-wrap gap-4">
            {Object.values(inventory)
                .sort((a, b) => -a.index.compare(b.index))
                .map(
                    (item) =>
                        item.amount.gt(0) && (
                            <RarityDisplay key={item.name} rarity={new Rarity(item.name)} count={item.amount} />
                        ),
                )}
        </div>
    );
};
