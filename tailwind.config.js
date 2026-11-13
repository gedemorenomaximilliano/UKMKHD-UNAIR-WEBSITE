/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        utama: "var(--warna-utama)",
        aksen: "var(--warna-aksen)",
        maroon: "var(--warna-maroon)",
        "biru-baja": "var(--warna-biru-baja)",
        "merah-muda": "var(--warna-merah-muda)",
        "biru-muda": "var(--warna-biru-muda)",
        krem: "var(--warna-krem)",
        latar: "var(--warna-latar)",
        teks: "var(--warna-teks)",
      },
      fontFamily: {
        heading: ["var(--font-afacad)", "Afacad", "sans-serif"],
        subheading: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        body: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-flame": "linear-gradient(135deg, var(--warna-merah-muda) 0%, #c1111e 40%, var(--warna-utama) 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 100%)",
        "gradient-glass-dark": "linear-gradient(135deg, rgba(2, 48, 72, 0.75) 0%, rgba(2, 48, 72, 0.90) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(2, 48, 72, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)",
        "glass-hover": "0 16px 40px 0 rgba(2, 48, 72, 0.20), inset 0 1px 2px 0 rgba(255, 255, 255, 0.7)",
        "glow-red": "0 0 25px -3px rgba(193, 17, 30, 0.45)",
        "glow-blue": "0 0 25px -3px rgba(139, 212, 255, 0.45)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
