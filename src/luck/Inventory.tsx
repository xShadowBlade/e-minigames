/**
 * @file Declares the inventory for the Luck Minigame.
 */
import React, { useEffect, useState } from "react";
import "./inventory.css";
import { Game } from "../game";
import { luckInventory } from "./luckMinigame";
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
    const [inventory, setInventory] = useState(luckInventory.value);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <button onClick={() => setIsVisible(!isVisible)} className="inventory-toggle-button">
                Inventory
            </button>
            <div className={"luck-inventory" + (isVisible && props.isVisibleOverride ? "" : " closing")}>
                {Object.values(inventory)
                    .sort((a, b) => -a.index.compare(b.index))
                    .map(
                        (item) =>
                            item.amount.gt(0) && (
                                <RarityDisplay key={item.name} rarity={new Rarity(item.name)} count={item.amount} />
                            ),
                    )}
            </div>
        </>
    );
};
