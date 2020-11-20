module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.html"],
  theme: {
    fontFamily: {
      gopher: ["gopher", "ui-sans-serif"],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
