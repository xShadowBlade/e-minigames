/**
 * @file Main entry point for the Luck minigame.
 */
import React, { useEffect, useState } from "react";
import type { DecimalSource } from "emath.js";
import { Decimal } from "emath.js";
import { Rarity } from "./rarity";
import { RarityDisplay } from "./RarityDisplay";
import { Inventory } from "./Inventory";
import { luckCoins, updateInventory } from "./luckMinigame";
import { RarityOpenAnimation, RarityOpenAnimationOrbs } from "./opening/RarityOpenAnimation";
import { Game } from "../game";

/**
 * The main component for the Luck minigame.
 * @returns The rendered component.
 */
export const LuckMain: React.FC = () => {
    const [pressCount, setPressCount] = useState<number>(0);

    const [isOpeningAnimation, setIsOpeningAnimation] = useState<boolean>(false);

    /**
     * Rolls a rarity and updates the inventory.
     * @param times - The number of times to roll the rarity.
     * @param luck - The luck multiplier for the roll.
     */
    function rollRarityAndUpdateInventory(times?: DecimalSource, luck?: DecimalSource): void {
        const newRarities = Rarity.selector.selectMultiple(times, luck);

        updateInventory(
            newRarities.map((rarity) => ({
                ...Rarity.fromString(rarity.name).serialize(),
                amount: rarity.numberOfSelections,
            })),
        );

        setPressCount(pressCount + 1);
    }

    useEffect(() => {
        Object.assign(window, { rollRarityAndUpdateInventory });
    }, []);

    return (
        <>
            {pressCount}
            <p>Coins: {luckCoins.value.format()}</p>
            <button onClick={() => rollRarityAndUpdateInventory(1, 1)}>Roll Rarity</button>

            <button onClick={() => rollRarityAndUpdateInventory(1, 1000)}>Roll x1000 luck</button>
            <button onClick={() => setIsOpeningAnimation(true)}>open</button>
            <button onClick={() => Game.dataManager.resetData(true)}>reset data</button>
            <hr className="my-4 border-gray-300" />
            <Inventory isVisibleOverride={!isOpeningAnimation} />

            {isOpeningAnimation && (
                <>
                    <RarityOpenAnimation
                        afterChildren={
                            <>
                                {/* <div className="rarity-open-shockwave border-slate-400 shadow-slate-200"></div> */}
                                <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
                                    <RarityDisplay rarity={new Rarity("Infinite")} count={new Decimal(1)} />
                                </div>
                            </>
                        }
                        onClick={() => setIsOpeningAnimation(false)}
                    >
                        {/* <div className="rarity-open-orb bg-black shadow-white"></div>
                        <div className="rarity-open-orb rarity-open-orb-left from-neutral-100 to-neutral-400 shadow-white"></div>
                        <div className="rarity-open-orb rarity-open-orb-top from-neutral-100 to-neutral-400 shadow-white"></div>
                        <div className="rarity-open-orb rarity-open-orb-bottom from-neutral-100 to-neutral-400 shadow-white"></div> */}
                        {/* <RarityOpenAnimationOrbs
                            numberOfOrbs={10}
                            className="bg-gradient-radial from-neutral-600 to-neutral-900 shadow-white"
                            distanceFromCenter={40}
                        /> */}
                        <RarityOpenAnimationOrbs numberOfOrbs={8} className="bg-black shadow-white" />
                    </RarityOpenAnimation>
                </>
            )}
        </>
    );
};
