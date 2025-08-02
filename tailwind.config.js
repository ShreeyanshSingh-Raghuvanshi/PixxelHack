// /** @type {import('tailwindcss').Config} */
// // const defaultConfig = require("shadcn/ui/tailwind.config")

// module.exports = {
//   ...defaultConfig,
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
//   theme: {
//     ...defaultConfig.theme,
//     extend: {
//       ...defaultConfig.theme.extend,
//       fontFamily: {
//         sans: ["Inter", "sans-serif"],
//         mono: ["JetBrains Mono", "monospace"],
//       },
//       colors: {
//         ...defaultConfig.theme.extend.colors,
//         primary: {
//           ...defaultConfig.theme.extend.colors.primary,
//           50: "#eff6ff",
//           100: "#dbeafe",
//           200: "#bfdbfe",
//           300: "#93c5fd",
//           400: "#60a5fa",
//           500: "#3b82f6",
//           600: "#2563eb",
//           700: "#1d4ed8",
//           800: "#1e40af",
//           900: "#1e3a8a",
//         },
//       },
//       animation: {
//         float: "float 6s ease-in-out infinite",
//         "pulse-glow": "pulse-glow 2s ease-in-out infinite",
//         gradient: "gradient-shift 3s ease infinite",
//       },
//       backdropBlur: {
//         xs: "2px",
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//     },
//   },
//   plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
// }










/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.8s ease-out",
        "slide-in-right": "slide-in-right 0.8s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        marquee: "marquee 20s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}