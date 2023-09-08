import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#19191B",
        "primary-dark": "#d1d1d1",
        "primary-lighter": "#E8E8E8",
        "primary-light": "#F8F8F8",
        light: "#FFFFFF",
        secondary: "#FED933",
        "secondary-dark": "#FECF00",
        "secondary-light": "#FEE266",
        right: "#61ac27",
        "right-light": "#22d659",
        "right-dark": "#009926",
        wrong: "#f53a47",
        "wrong-light": "#fc112f",
        "wrong-dark": "#d30f00",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config
