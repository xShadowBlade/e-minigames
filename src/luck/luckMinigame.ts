/**
 * @file Declares the Luck Minigame.
 */
import { Game } from "../game";
import type { DecimalSource } from "emath.js";
import { Decimal } from "emath.js";
import { Rarity } from "./rarity";

/**
 * The main currency for the Luck Minigame.
 * Rolls can increase this currency.
 */
export const luckCoins = Game.addCurrency("luckCoins");

/**
 * An inventory item in the Luck Minigame.
 */
export interface InventoryItem {
    name: string;
    index: Decimal;
    amount: Decimal;
}

/**
 * The inventory for the Luck Minigame.
 * Each item has a name (which corresponds to the rarity) and an amount.
 */
export const luckInventory = Game.dataManager.setData<string, Record<string, InventoryItem>>(
    "luckInventory",
    Object.fromEntries(
        Rarity.rarities.map((rarity, i) => [
            rarity.name,
            {
                name: rarity.name,
                index: new Decimal(i),
                amount: new Decimal(0),
            },
        ]),
    ),
);

/**
 * Updates the inventory for the Luck Minigame.
 * @param item The item to update or add to the inventory.
 */
export function updateInventory(item: InventoryItem[]): void {
    const inventory = luckInventory.value;

    for (const newItem of item) {
        const existingItem = inventory[newItem.name];
        if (existingItem) {
            // Update existing item
            existingItem.amount = existingItem.amount.add(newItem.amount);
        } else {
            // Add new item (should never happen)
            inventory[newItem.name] = {
                name: newItem.name,
                index: newItem.index,
                amount: newItem.amount,
            };
        }

        const amountOfCoinsToGain = newItem.amount.mul(new Rarity(newItem.name).value).mul(1000);

        if (amountOfCoinsToGain.gt(0)) {
            // console.log(
            //     `Gained ${amountOfCoinsToGain.format()} coins for ${newItem.amount.format()}x ${newItem.name} (${new Rarity(newItem.name).value.format()})`,
            // );
            // TODO: Debug this
            luckCoins.gain(amountOfCoinsToGain.toString());
            // (window as any).luckCoins.gain(amountOfCoinsToGain);
        }

        // luckCoins.gain(1e9);
    }

    luckInventory.setValue(inventory);
}

// Debug
if (Game.config.mode === "development") {
    Object.assign(window, { luckCoins, luckInventory, updateInventory });
}
