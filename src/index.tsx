/**
 * @file This file is the entry point for your project.
 */

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);