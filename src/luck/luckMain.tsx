/**
 * @file Main entry point for the Luck minigame.
 */
import React, { useEffect, useState } from "react";
import type { DecimalSource } from "emath.js";
import { Decimal } from "emath.js";
import { Rarity } from "./rarity";
import { RarityDisplay } from "./RarityDisplay";
import { Inventory } from "./Inventory";
import { luckCoins, luckInventory, updateInventory } from "./luckMinigame";
import { RarityOpenAnimation, RarityOpenAnimationOrbs } from "./opening/RarityOpenAnimation";

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
                name: rarity.name,
                index: new Rarity(rarity.name).rarity,
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
            <hr className="my-4 border-gray-300" />
            <Inventory />

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
                        <RarityOpenAnimationOrbs
                            numberOfOrbs={8}
                            className="bg-black shadow-white"
                        />
                    </RarityOpenAnimation>
                </>
            )}
        </>
    );

    // const [rarity, setRarity] = useState<Rarity>();
    // const [tempRarity, setTempRarity] = useState<Rarity>();
    // const [rolls, setRolls] = useState<number>(0);
    // const [effectiveRolls, setEffectiveRolls] = useState<Decimal>(new Decimal(0));

    // const roll = (luck: DecimalSource = 1, loop = false): void => {
    //     luck = new Decimal(luck);
    //     if (loop) {
    //         let maxTempRarity = new Rarity(new Decimal(0));
    //         for (let i = 0; i < luck.toNumber(); i++) {
    //             // console.log(i);
    //             // setRolls(rolls + 1);
    //             // setEffectiveRolls(effectiveRolls.add(1));
    //             // setTempRarity(new Rarity(new Decimal(1)));
    //             // if (!rarity || tempRarity?.rng.gt(rarity.rng)) {
    //             //     setRarity(tempRarity);
    //             // }

    //             const tempRarityLoop = new Rarity(new Decimal(1));
    //             if (tempRarityLoop.rng.gt(maxTempRarity.rng)) {
    //                 maxTempRarity = tempRarityLoop;
    //             }
    //         }
    //         if (!rarity || maxTempRarity.rng.gt(rarity.rng)) {
    //             setRarity(maxTempRarity);
    //         }
    //         setRolls(rolls + luck.toNumber());
    //         setEffectiveRolls(effectiveRolls.add(luck));
    //         return;
    //     }
    //     setRolls(rolls + 1);
    //     setEffectiveRolls(effectiveRolls.add(luck));
    //     setTempRarity(new Rarity(luck));
    //     if (!rarity || tempRarity?.rng.gt(rarity.rng)) {
    //         setRarity(tempRarity);
    //     }
    // };
    // useEffect(() => {
    //     Object.assign(window, { roll });
    // }, []);
    // return (
    //     <div>
    //         <h3>Luck</h3>
    //         <Info />
    //         {["1", "10", "100", "1000", "10000"].map((luck) => (
    //             <Button
    //                 style={{ margin: "5px" }}
    //                 key={luck}
    //                 onClick={() => {
    //                     roll(luck);
    //                 }}
    //             >
    //                 Roll (multiplier) {luck}
    //             </Button>
    //         ))}
    //         <br />
    //         {["1", "10", "100", "1000", "10000"].map((luck) => (
    //             <Button
    //                 style={{ margin: "5px" }}
    //                 key={luck}
    //                 onClick={() => {
    //                     roll(luck, true);
    //                 }}
    //             >
    //                 Roll (repeat) {luck}
    //             </Button>
    //         ))}
    //         <hr />
    //         <FloatingLabel label="Roll (luck multiplier)">
    //             <Form.Control id="roll-luck-multiplier" type="text" placeholder="1" />
    //         </FloatingLabel>
    //         <Button
    //             onClick={() => {
    //                 roll(
    //                     new Decimal(
    //                         (
    //                             (document.getElementById("roll-luck-multiplier") as HTMLInputElement | null) ?? {
    //                                 value: 0,
    //                             }
    //                         ).value,
    //                     ),
    //                 );
    //             }}
    //         >
    //             Custom Roll
    //         </Button>
    //         <hr />
    //         <p>Rolls: {rolls}</p>
    //         <p>Effective Rolls: {effectiveRolls.format()}</p>
    //         {rarity && <RarityDisplay rarity={rarity} />}
    //         {tempRarity && <RarityDisplay rarity={tempRarity} />}
    //     </div>
    // );
};
