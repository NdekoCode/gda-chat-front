/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-chat": "url('/img/WhatsappImage.png')",
      },
    },
  },
  plugins: [],
};
