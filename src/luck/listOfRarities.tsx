/**
 * @file Declares the list of possible rarities.
 */
import React, { useState } from "react";
import type { RarityData } from "./rarity";

interface RaritySquareEffectProps {
    /***
     * How much to vary the position of the square effect.
     */
    positionOffsetVariation?: number;

    /**
     * How often to update the position offset in milliseconds.
     */
    updateInterval?: number;

    /**
     * Optional class name for the square effect.
     */
    className?: string;
}

const RaritySquareEffect: React.FC<RaritySquareEffectProps> = (props) => {
    const { positionOffsetVariation = 2, updateInterval = 100, className = "square-effect" } = props;

    const [positionOffsetX, setPositionOffsetX] = useState(0);
    const [positionOffsetY, setPositionOffsetY] = useState(0);

    // Update the position offset every 100ms
    React.useEffect(() => {
        const interval = setInterval(() => {
            setPositionOffsetX(Math.random() * positionOffsetVariation - positionOffsetVariation / 2);
            setPositionOffsetY(Math.random() * positionOffsetVariation - positionOffsetVariation / 2);
        }, updateInterval);

        return (): void => clearInterval(interval);
    }, []);

    return (
        <div
            className={className}
            style={{ "--x-offset": `${positionOffsetX}%`, "--y-offset": `${positionOffsetY}%` } as React.CSSProperties}
        ></div>
    );
};

// Old list
// export const listOfRarities: RarityData[] = [
//     {
//         name: "Common",
//         divClassName: "bg-gradient-to-r from-gray-100 to-gray-200",
//     },
//     {
//         name: "Uncommon",
//         divClassName: "bg-gradient-to-r from-green-100 to-green-200 border-green-300",
//     },
//     {
//         name: "Rare",
//         divClassName: "bg-gradient-to-r from-blue-100 to-blue-200 border-blue-400",
//     },
//     {
//         name: "Epic",
//         divClassName: "bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300",
//     },
//     {
//         name: "Legendary",
//         divClassName: "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300",
//     },
//     {
//         name: "Mythical",
//         divClassName: "bg-gradient-to-r from-pink-100 to-pink-200 border-pink-300",
//     },
//     {
//         name: "Godlike",
//         divClassName: "bg-gradient-to-r from-cyan-100 to-cyan-200 border-cyan-300",
//     },
//     // Basic rarities (no class names)
//     ...[
//         // "Rare",
//         // "Epic",
//         // "Legendary",
//         // "Mythical",
//         // "Godlike",
//         "Ultimate",
//         "Transcendent",
//         "Cosmic",
//         "Celestial",
//         "Divine",
//         "Mystical",
//         "Supreme",
//         "Exalted",
//         "Ethereal",
//         "Unfathomable",
//         "Mythos",
//         "Apex",
//         "Timeless",
//         "Primordial",
//         "Eonian",
//         "Eternal",
//         "Venerable",
//         "Enigmatic",
//         "Illustrious",
//         // "Singularity",
//     ].map((name): RarityData => ({ name })),
//     {
//         name: "Singularity",
//         divClassName: "rarity-singularity",
//         children: (
//             <>
//                 {/* <RaritySquareEffect positionOffsetVariation={4} updateInterval={100} className="square-effect square-effect-border from-orange-600 to-orange-500 shadow-orange-800 !h-[120%] !rounded-3xl" /> */}
//             </>
//         ),
//     },
//     {
//         name: "Infinite",
//         divClassName: "rarity-infinite",
//         children: (
//             <>
//                 <RaritySquareEffect />
//                 <RaritySquareEffect updateInterval={150} className="square-effect square-effect-border shadow-black" />
//                 <div className="rarity-infinite-orbital"></div>
//                 <div className="rarity-infinite-orbital rarity-infinite-orbital-1"></div>
//                 <div className="rarity-infinite-orbital rarity-infinite-orbital-2"></div>
//             </>
//         ),
//     },
//     { name: "placeholder " },
// ];

// New list
export const listOfRarities: RarityData[] = [
    ...["nooblet", "winged nooblet", "sharp nooblet", "cruleler king"].map((name): RarityData => ({ name })),
];

// TODO: implement
const listOfModifers: string[] = ["Ice", "Venom", "Ghost", "Fire", "Wind", "Illuminated", "Dark"];
