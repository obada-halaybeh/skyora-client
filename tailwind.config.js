/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        rausch: "#ff385c",
        magenta: "#92174d",
        luxe: "#460479",
        ink: "#222222",
        ash: "#6a6a6a",
        hairline: "#dddddd",
        cloud: "#f7f7f7",
        canvas: "#ffffff",
        error: "#c13515",
        info: "#428bff",
        success: "#2d6a4f",
        amber: "#a07000",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "skyora-gradient":
          "linear-gradient(90deg, #ff385c 0%, #e00b41 50%, #92174d 100%)",
      },
      boxShadow: {
        "auth-modal": "0 24px 64px rgba(0,0,0,0.45)",
        "card-rest":
          "0 0 0 1px rgba(0,0,0,0.02), 0 2px 6px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.10)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
