/**
 * @file Declares the menu component for when a battle is ongoing.
 */
import React from "react";
import type { PlayerActionConstructorData } from "../player";

interface ActionDisplayInBattleMenuProps {
    /**
     * The data for the action.
     */
    data: PlayerActionConstructorData;
}

/**
 * Displays an action in the battle menu.
 * @param props - The props for the action display.
 * @returns The action display component.
 */
export const ActionDisplayInBattleMenu: React.FC<ActionDisplayInBattleMenuProps> = (props) => {
    return (
        <button
            className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${props.data.className || ""}`}
            onClick={() => console.log(`Action ${props.data.name} executed!`)}
        >
            {props.data.name}
        </button>
    );
};

interface MenuProps {
    /**
     * Whether the menu is open.
     * @default false
     */
    isOpen?: boolean;

    /**
     * The actions available in the menu.
     */
    actions: PlayerActionConstructorData[];
}

/**
 * @returns The battle menu component.
 * @param props - props.
 */
export const BattleMenu: React.FC<MenuProps> = (props) => {
    return (
        <div className="absolute left-10 top-10 z-50 flex flex-col gap-2 rounded-lg border bg-slate-500 p-4">
            {props.actions.map((action, index) => (
                <ActionDisplayInBattleMenu key={index} data={action} />
            ))}
        </div>
    );
};
