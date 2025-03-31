// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  // configureWebpack: {
  //   plugins: [
  //     new VuetifyLoaderPlugin()
  //   ],
  // },
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