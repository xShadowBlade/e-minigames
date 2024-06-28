/**
 * @file Declares the app component.
 */
import React from "react";

import "./game";
import "./luck/luckMain";
import LuckMain from "./luck/luckMain";

/**
 * @returns The main app component.
 */
const App: React.FC = () => {
    return (
        <div style={{
            margin: "2%",
        }}>
            <h1>E Minigames</h1>
            A collection of minigames for my library <a href="https://github.com/xshadowblade/emath.js">emath.js</a>.
            <hr />
            <LuckMain />
        </div>
    );
};

export default App;
