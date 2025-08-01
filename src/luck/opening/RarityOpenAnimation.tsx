/**
 * @file Declares the RarityOpenAnimation component
 */
import React from "react";
import "./rarityOpen.css";

import { RarityData, Rarity } from "../rarity";

interface RarityOpenAnimationOrbsProps {
    /**
     * The number of orbs to display.
     * Each orb will be placed in a positions corresponding to the vertices of a regular polygon with the specified number of sides, starting from the right side of the screen.
     * @default 1
     */
    numberOfOrbs?: number;

    /**
     * The distance that each circle should be from the center of the screen, in vh.
     * @default 40
     */
    distanceFromCenter?: number;

    /**
     * Class name to apply to the orbs container on top of the default class.
     */
    className?: string;
}

/**
 * @returns A component to display orbs in a circular pattern for the rarity open animation.
 * @param props - Props for the component.
 */
export const RarityOpenAnimationOrbs: React.FC<RarityOpenAnimationOrbsProps> = (props) => {
    const { numberOfOrbs = 1, className = "", distanceFromCenter = 40 } = props;

    const angleBetweenOrbsRad = (2 * Math.PI) / numberOfOrbs;

    return new Array(numberOfOrbs).fill(null).map((_, index) => {
        // Calculate position
        const angle = index * angleBetweenOrbsRad;
        const x = distanceFromCenter * Math.cos(angle);
        const y = distanceFromCenter * Math.sin(angle);

        return (
            <div
                className={`rarity-open-orb ${className}`}
                key={`rarity-open-orb-${index}`}
                style={{ "--animation-initial-translate": `${x}vh, ${y}vh` } as React.CSSProperties}
            ></div>
        );
    });
};

/**
 * Props for the RarityOpenAnimation component.
 */
interface RarityOpenAnimationProps {
    /**
     * Any children to render inside the animation.
     */
    children?: React.ReactNode;

    /**
     * Any children that should be rendered after the animation.
     */
    afterChildren?: React.ReactNode;
}

/**
 * @returns A component to display an animation when a rarity is opened.
 * By default, it will fade the entire screen to black and display the children.
 * @param props - Props for the component.
 */
export const RarityOpenAnimation: React.FC<RarityOpenAnimationProps> = (props) => {
    const { children, afterChildren } = props;

    return (
        <>
            <div className="rarity-open-animation">{children}</div>

            <div className="rarity-open-animation-after">{afterChildren}</div>
        </>
    );
};
