/**
 * @file Declares the inventory for the Luck Minigame.
 */
import React, { useEffect, useState } from "react";
import "./inventory.css";
import { Game } from "../game";
import { getLuckInventory } from "./luckMinigame";
import { RarityDisplay } from "./RarityDisplay";
import { Rarity } from "./rarity";

interface InventoryProps {
    /**
     * If true, the inventory is visible regardless of the game's state.
     */
    isVisibleOverride: boolean;
}

/**
 * @returns The Inventory component for the Luck Minigame.
 * @param props - Props.
 */
export const Inventory: React.FC<InventoryProps> = (props) => {
    const [inventory, setInventory] = useState(getLuckInventory());
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <button onClick={() => setIsVisible(!isVisible)} className="inventory-toggle-button">
                Inventory
            </button>
            <div className={"luck-inventory" + (isVisible && props.isVisibleOverride ? "" : " closing")}>
                {inventory
                // TODO: add configurable sorting method
                    // .sort((a, b) => -a.index.compare(b.index))
                    // .sort((a, b) => a.)
                    .map((item) => {
                        // If the amount is 0, skip it
                        if (item.amount.lte(0)) return;

                        const correspondingRarity = Rarity.fromString(item.name);

                        // If the rarity is invalid, skip it
                        if (correspondingRarity.rarity.lt(0)) return;
                        return <RarityDisplay key={item.name} rarity={correspondingRarity} count={item.amount} />;
                    })}
            </div>
        </>
    );
};
