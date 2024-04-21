/**
 * @file Declares the info
 */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { E } from "emath.js";
import { Rarity } from "./rarity";

const rarityListGenerator = (rarity: string, i: number) => (
    // <li key={rarity}>{rarity} ({i}): {Rarity.rarityFn(E(i)).format()} - {Rarity.rarityFn(E(i + 1)).format()}</li>
    `${rarity} (${i}): ${Rarity.rarityFn(E(i)).format()} - ${Rarity.rarityFn(E(i + 1)).format()}`
);

(window as any).rarityListGenerator = rarityListGenerator;
(window as any).customListRarities = (start = 0, end = Rarity.rarities.length - 1) => {
    for (let i = start; i <= end; i++) {
        console.log(rarityListGenerator(Rarity.getRarityName(i), i));
    }
};

/**
 * The main component for the info.
 * @returns The rendered component.
 */
function Info () {
    const [show, setShow] = useState(false);
    return (
        <div>
            <Button onClick={() => setShow(true)}>Show Info</Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        The Luck minigame is a game where you can roll for rarities.
                        The rarities are in order from most common to most rare:
                    </p>
                    <ul>
                        {Rarity.rarities.map((rarity, i) => (
                            // <li key={rarity}>{rarity} ({i}): {Rarity.rarityFn(E(i)).format()} - {Rarity.rarityFn(E(i + 1)).format()}</li>
                            <li key={rarity}>{rarityListGenerator(rarity, i)}</li>
                        ))}
                    </ul>
                    <p>
                        The probability of getting a certain rarity is calculated using the formula:
                    </p>
                    <pre>
                        {/* 7.5\sqrt[3]{\frac{\ln(x+5)}{\ln(5)}}-7.5 */}
                        <img
                            src="https://latex.codecogs.com/gif.latex?7.5%5Csqrt%5B3%5D%7B%5Cfrac%7B%5Cln%28x&plus;5%29%7D%7B%5Cln%285%29%7D%7D-7.5"
                            alt="7.5\sqrt[3]{\frac{\ln(x+5)}{\ln(5)}}-7.5"
                        />
                    </pre>
                    <p>
                        Where <code>P(r)</code> is the probability of getting the rarity <code>r</code>.
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Info;