/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,tsx}"],
  mode: "jit",

  theme: {
    extend: {
      fontFamily: {
        sans: ["DIN"],
      },
      colors: {
        primary: "#cc0000",
        "primary-focus": "#ff0000",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        // https://daisyui.com/docs/colors/#-2
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#cc0000",
          "primary-content": "#fff",
          "base-100": "#fff",
        },
      },
    ],
  },
};
