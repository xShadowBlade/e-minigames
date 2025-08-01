/**
 * @file Tailwind CSS configuration file.
 */
/* global module */
// eslint-disable-next-line jsdoc/check-tag-names
/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: "selector",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
