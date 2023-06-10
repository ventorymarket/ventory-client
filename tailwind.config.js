/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/assets/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mini: "480px",
        "2md": "900px",
      },
      boxShadow: {
        default: "0px 0px 30px 10px rgba(131, 88, 255, 0.25)",
        mobileMenu: "4px 4px 46px rgba(0, 0, 0, 0.6)",
      },
      backgroundColor: {
        "layer-1": "#0F131C",
        "layer-2": "#131924",
        "layer-3": "#1B2333",
        "layer-4": "#323268",
        "layer-focus": "#364055",
      },
      borderColor: {
        DEFAULT: "#A688FF",
        stroke: "#1D2535",
        divider: "#1B2332",
        focus: "#4F5C71",
      },
      colors: {
        primary: "#00C089",
        "primary-hover": "#008861",
        secondary: "#94A7C6",
        tertiary: "#41516C",
        placeholder: "#6D7080",
        disabled: "#6D7080",
        grey: "#A1B0CC",
        error: "#E94949",
        "semi-black": "#0F131C",
        dark: "#030209",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-in-from-right": "slide-in 0.2s linear",
      },
    },
  },
  plugins: [],
};
