/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue' : '#166c96',
        'custom-gray' : '#edeae1',
        'custom-red' : '#cd2028',
        'custom-darkBlue' : '#1b2651',
      }
    },
  },
  plugins: [],
}

