/**
 * @file This file is the entry point for your project.
 */

import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(<App />);
