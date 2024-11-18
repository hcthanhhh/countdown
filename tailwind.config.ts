/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-import-module-exports
import { COLORS } from "./src/common/colors";

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        system: ["Plus Jakarta Sans", "system-ui", "-apple-system", "Segoe UI"],
        code: ["Space Mono", "monospace"],
      },
      borderRadius: {
        primary: "8px",
      },
      colors: {
        primary: COLORS.primary,
        textDark: COLORS.textDark,
        hoverItemMenu: COLORS.hoverItemMenu,
        lightPrimary: COLORS.lightPrimary,
        bgDark: COLORS.bgDark,
        bgWhiteGray: COLORS.bgWhiteGray,
        bgMenuDashboard: COLORS.bgMenuDashboard,
        textGray: COLORS.textGray,
        success: COLORS.success,
        error: COLORS.error,
        blue: COLORS.blue,
        bgGray: COLORS.bgGray,
        bgComponentDark: COLORS.bgComponentDark,
        bgPurple: COLORS.bgPurple,
      },
      backgroundImage: {
        bgMenuDashboardImage: COLORS.bgMenuDashboardImage,
        bgBannerGradientImage: COLORS.bgBannerGradientImage,
      },
      boxShadow: {
        "inset-lg": "inset 0 4px 6px rgba(0, 0, 0, 0.1)", // Thêm shadow tùy chỉnh
      },
    },
  },

  plugins: [require("@tailwindcss/line-clamp")],
  corePlugins: {
    preflight: false, // <== disable this to use TailwindCSS with Antd
  },
};
