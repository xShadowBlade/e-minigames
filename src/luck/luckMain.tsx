/**
 * @file Main entry point for the Luck minigame.
 */
import React, { useEffect, useState } from "react";
import type { DecimalSource } from "emath.js";
import { Decimal } from "emath.js";
import { Rarity } from "./rarity";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Info from "./info";

/**
 * The main component for the Luck minigame.
 * @returns The rendered component.
 */
const LuckMain: React.FC = () => {
    const [rarity, setRarity] = useState<Rarity>();
    const [tempRarity, setTempRarity] = useState<Rarity>();
    const [rolls, setRolls] = useState<number>(0);
    const [effectiveRolls, setEffectiveRolls] = useState<Decimal>(new Decimal(0));
    const roll = (luck: DecimalSource = 1, loop = false): void => {
        luck = new Decimal(luck);
        if (loop) {
            let maxTempRarity = new Rarity(new Decimal(0));
            for (let i = 0; i < luck.toNumber(); i++) {
                // console.log(i);
                // setRolls(rolls + 1);
                // setEffectiveRolls(effectiveRolls.add(1));
                // setTempRarity(new Rarity(new Decimal(1)));
                // if (!rarity || tempRarity?.rng.gt(rarity.rng)) {
                //     setRarity(tempRarity);
                // }

                const tempRarityLoop = new Rarity(new Decimal(1));
                if (tempRarityLoop.rng.gt(maxTempRarity.rng)) {
                    maxTempRarity = tempRarityLoop;
                }
            }
            if (!rarity || maxTempRarity.rng.gt(rarity.rng)) {
                setRarity(maxTempRarity);
            }
            setRolls(rolls + luck.toNumber());
            setEffectiveRolls(effectiveRolls.add(luck));
            return;
        }
        setRolls(rolls + 1);
        setEffectiveRolls(effectiveRolls.add(luck));
        setTempRarity(new Rarity(luck));
        if (!rarity || tempRarity?.rng.gt(rarity.rng)) {
            setRarity(tempRarity);
        }
    };
    useEffect(() => {
        Object.assign(window, { roll });
    }, []);
    return (
        <div>
            <h3>Luck</h3>
            <Info />
            {["1", "10", "100", "1000", "10000"].map((luck) => (
                <Button style={{ margin: "5px" }} key={luck} onClick={() => { roll(luck); }}>Roll (multiplier) {luck}</Button>
            ))}
            <br />
            {["1", "10", "100", "1000", "10000"].map((luck) => (
                <Button style={{ margin: "5px" }} key={luck} onClick={() => { roll(luck, true); }}>Roll (repeat) {luck}</Button>
            ))}
            <hr />
            <FloatingLabel label="Roll (luck multiplier)">
                <Form.Control
                    id="roll-luck-multiplier"
                    type="text"
                    placeholder="1"
                />
            </FloatingLabel>
            <Button onClick={() => { roll(new Decimal((document.getElementById("roll-luck-multiplier") as HTMLInputElement | null ?? { value: 0 }).value)); }}>Custom Roll</Button>
            <hr />
            <p>Rolls: {rolls}</p>
            <p>Effective Rolls: {effectiveRolls.format()}</p>
            {rarity && (
                <div>
                    <h2>{rarity.rarityName} ({rarity.rarity.floor().format(0)})</h2>
                    <p>RNG: {rarity.rng.format()}</p>
                    <p>Effective RNG: {rarity.baseRarity.format()}</p>
                </div>
            )}
            {tempRarity && (
                <div>
                    <h2>{tempRarity.rarityName} ({tempRarity.rarity.floor().format(0)})</h2>
                    <p>RNG: {tempRarity.rng.format()}</p>
                    <p>Effective RNG: {tempRarity.baseRarity.format()}</p>
                </div>
            )}
        </div>
    );
};

export default LuckMain;
