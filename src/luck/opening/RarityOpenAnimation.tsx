/**
 * @file Declares the RarityOpenAnimation component
 */
import React from "react";
import "./rarityOpen.css";

import { RarityData, Rarity } from "../rarity";

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
            <div className="rarity-open-animation">{children ?? <></>}</div>

            <div className="rarity-open-animation-after">{afterChildren ?? <></>}</div>
        </>
    );
};
