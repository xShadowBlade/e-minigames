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
function App () {
    return (
        <div>
            <h1>Hello World!</h1>
            <hr />
            <LuckMain />
        </div>
    );
}

export default App;