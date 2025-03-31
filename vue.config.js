module.exports = {
  css: {
    loaderOptions: {
      scss: {
          prependData: `
          @import "@/assets/sass/styles.scss";
          `
      }
    }
  },
  "transpileDependencies": [
    "vuetify" 
  ],
  productionSourceMap: false,
}