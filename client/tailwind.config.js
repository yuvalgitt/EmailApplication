/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "gmail-black": "#111111",
        "gmail-grey": "#474747",
        "gmail-darkgrey" : "#2c2c2c",
        "gmail-lightgrey" : "#858585",
        "gmail-blue" :"#004d80",
        "gmail-lightblue" : "#99d6ff"
      },
      backgroundClip: {
        text: "text", // Adds support for text background-clip (non-prefixed)
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme, e }) {
      addUtilities(
        {
          ".bg-clip-text": {
            backgroundClip: "text",
            WebkitBackgroundClip: "text", // Adding vendor prefix for Safari and Chrome
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
