import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#FFFFFF",
        panel: "#F8F5FF",
        steel: "#F3F0FF",
        cyan: "#6D28D9",
        mint: "#8B5CF6",
        periwinkle: "#A78BFA",
        amber: "#FFB020"
      },
      fontFamily: {
        sans: [
          "Inter",
          "PingFang SC",
          "HarmonyOS Sans SC",
          "Microsoft YaHei",
          "sans-serif"
        ],
        mono: ["Roboto Mono", "DIN", "monospace"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(109, 40, 217, 0.18)",
        mint: "0 0 34px rgba(139, 92, 246, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
