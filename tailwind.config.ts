import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        gold: "var(--gold)",
        ink: "var(--ink)",
        wine: "var(--wine)",
      },
      fontFamily: {
        display: ["var(--f-display)", "serif"],
        sans: ["sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
