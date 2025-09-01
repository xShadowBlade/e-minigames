/**
 * @file Declares the Luck Minigame.
 */
import { Game } from "../game";
import { Decimal } from "emath.js";
import { Rarity } from "./rarity";

/**
 * The main currency for the Luck Minigame.
 * Rolls can increase this currency.
 */
export const luckCoins = Game.addCurrency("luckCoins");

/**
 * Data from {@link Rarity} that is serialized for saving/loading.
 * Should include enough values to reconstruct a {@link Rarity} instance as well as useful data.
 */
export interface RaritySerializedData {
    name: string;
    index: Decimal;
    modifier: Decimal;
}

/**
 * An inventory item in the Luck Minigame.
 */
export interface InventoryItem extends RaritySerializedData {
    amount: Decimal;
}

/**
 * The inventory for the Luck Minigame.
 * Each item has a name (which corresponds to the rarity) and an amount.
 */
const luckInventory = Game.dataManager.setData<string, InventoryItem[]>(
    "luckInventory",
    Rarity.raritiesWithModifiers
    // Sort by rarity chance descending
        .sort((a, b) => -a.rarityChance.compare(b.rarityChance))
        .map(
            (rarity, i) =>
                ({
                    ...rarity.serialize(),
                    amount: new Decimal(0),
                }) as InventoryItem,
        ),
);

let isLuckInventoryDeserialized = false;

/**
 *
 */
export function getLuckInventory(): InventoryItem[] {
    // If the inventory is not deserialized yet, we need to deserialize it
    if (isLuckInventoryDeserialized) return luckInventory.value;

    const inventory = luckInventory.value;
    for (const item of inventory) {
        // If the item is already a Decimal, skip it
        // if (item.amount instanceof Decimal) continue;

        // Otherwise, deserialize it
        item.amount = Decimal.fromComponents(item.amount.sign, item.amount.layer, item.amount.mag);
        item.index = Decimal.fromComponents(item.index.sign, item.index.layer, item.index.mag);
        item.modifier = Decimal.fromComponents(item.modifier.sign, item.modifier.layer, item.modifier.mag);
    }

    // Set the inventory
    luckInventory.setValue(inventory);

    isLuckInventoryDeserialized = true;
    return inventory;
}

/**
 * Updates the inventory for the Luck Minigame.
 * @param item - The item to update or add to the inventory. If the item already exists, its amount will be increased.
 */
export function updateInventory(item: InventoryItem[]): void {
    // Temporarily store the inventory in a variable and set it at the end
    const inventory = luckInventory.value;

    for (const newItem of item) {
        // const existingItem = inventory[newItem.name];
        const existingItem = Object.values(inventory).find((invItem) => invItem.name === newItem.name);

        if (existingItem) {
            // Update existing item
            existingItem.amount = existingItem.amount.add(newItem.amount);
        } else {
            // Add new item (should never happen)
            // inventory[newItem.name] = newItem;
            console.warn(`Item ${newItem.name} not found in inventory. Adding it.`);
            inventory.push(newItem);
        }

        // Gain coins based on rarity and amount
        const amountOfCoinsToGain = newItem.amount.mul(Rarity.fromString(newItem.name).value).mul(1000);

        if (amountOfCoinsToGain.gt(0)) {
            // TODO: Debug this (should work without using toString), this is probably a vite issue
            luckCoins.gain(amountOfCoinsToGain.toString());
        }
    }

    // Update the inventory
    luckInventory.setValue(inventory);
}

// Debug
if (Game.config.mode === "development") {
    Object.assign(window, { luckCoins, luckInventory, updateInventory, getLuckInventory });
}
