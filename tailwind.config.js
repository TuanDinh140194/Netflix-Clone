/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      screens: { xs: { max: "640px" } },

      
      keyframes: {
        "slide-in-left": {
          from: {
            transform: "translateX(-100%)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0)",
            opacity: 1,
          },
        },

        "slide-out-right":{
          from: {
            transform: "translateX(0)",
            opacity: 1,
          },
          to: {
            transform: "translateX(-100)",
            opacity: 0,
          },
        }
      },
      animation: {
        "slide-in-left": "slide-in-left 0.5s ease-in-out forwards",
        "slide-out-right" : "slide-out-right 2.5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],

  
};


