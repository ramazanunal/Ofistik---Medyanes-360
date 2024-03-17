/** @type {import('tailwindcss').Config} */

const shadcn_preset = {
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./dashboard/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  presets: [shadcn_preset],
  prefix: "",
  theme: {
    screens: {
      telefon: "578px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      colors: {
        "royal-purple": "hsl(330, 100%, 50%)",
        "vivid-orange": "hsl(48, 100%, 50%)",
        "deep-slate-blue": "hsl(270, 100%, 29.75%)",
        coral: "hsl(0, 89.87%, 60.5%)",
        black: "hsl(0, 0%, 0%)",
        white: "hsl(0, 0%, 100%)",

        blueOne: "#34a0a4",
        lightBlue: "#eef8f5",
        redOne: "#ca2b43",
        grayOne: "#e6e4e5",
        grayButton: "#6f6f6f",
        infoIcon: "#5d5d5d",
        bgColour: "#fcfcfc",
        buttonColor: "#40769f",
        buttonEnd: "gray",
        skillsBg: "#dedede",
        greenText: "#77ce7e",
        redText: "#d91512",
        favShare: "#39455d",
        appointmentColor: "#52b69a",
        thinkColor: "#064A52",
        contentThinkColor: "#E9F6F8",
        darkgreen: "#1dbab5",
        grey: "#e5e7eb",
        grey2: "#9999",

        customRed: "#E74B3C",
        gabiGreen: "#51E7AD",
        bgGray: "#F7FAFC",
        primaryGray: "#999999",
        textGray: "#757a81",
        textBoldBlue: "#212529",
        textBlue: "#353539",
        primaryGreen: "#0ECA2D",
        primaryBlue: "#033CAA",
        primaryYellow: "#FACC15",
        primaryRed: "#ff1a1a",
        primaryPink: "#B181F8",
        secondaryBlue: "#013089",
        secondaryGray: "#1E1E1E",
        secondaryRed: "#ffcccc",
        tertiaryBlue: "#0F2557",
        tertiaryRed: "#ff4d4d",

        stepBorder1: "#b1babf",
        dayComponentBg: "#f1f2f6",
        calanderAppointment: "hsl(36, 100%, 80%)",
        appointmentRequest: "#5D3587",
        deepSlateBlue: "hsl(270, 100%, 29.75%)",
        coral: "hsl(0, 89.87%, 75%)",
        premiumOrange: "hsl(7, 90%, 64%)",
        lightOrange: "hsl(7, 90%, 72%)",
        purpleElite: "hsl(267, 100%, 47%)",
        grayBg: "#f1f2f6",
        lightGray: "#f8f8f8",
        lightGray2: "hsl(0, 0%, 92%)",
        lightRed: "hsl(0, 100%, 97%)",
        lightRed2: "hsl(0, 100%, 92%)",
        lightGreen: "hsl(100, 100%, 97%)",
        lightGreen2: "hsl(100, 100%, 92%)",
        lightOrange3: "hsl(44, 100%, 92%)",
        lightPurple: "hsl(230, 100%, 94%)",
        purpleStatus: "hsl(239, 60%, 68%)",
        greenStatus: "#409e77",
        lightOrange2: "hsl(44, 100%, 97%)",
        orangeTable: "hsl(44, 100%, 45%)",
        greenCalendar: "hsl(155, 42%, 60%)",
        grayCalendar: "hsl(0, 0%, 75%)",
      },
      gridTemplateRows: {
        layout: "min-content 1fr min-content",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
